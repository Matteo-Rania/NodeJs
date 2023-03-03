import { Request, Response } from "express";
import Joi from "joi";
import {db} from "../db.js";
  

  const getAll = async (req: Request, res: Response) => {
    const planets = await db.many("SELECT * FROM planets;");
    res.status(200).json(planets);
  };
  
  const getOneById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const planet = await db.one("SELECT * FROM planets WHERE id=$1;", id);
    res.status(200).json(planet);
  }
  
  const planetSchema = Joi.object({
    name: Joi.string().required(),
  });

  const create = async(req: Request, res: Response) => {
    const { name } = req.body;
    const newPlanet = { name };
    const validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
      res
        .status(400)
        .json({ message: validatedNewPlanet.error.details[0].message });
      return;
    }
  
    await db.none("INSERT INTO planets (name) VALUES ($1);", name);
  
  
    res.status(201).json({ message: "Planet added successfully" });
  }

  const updateById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const validatedNewPlanet = planetSchema.validate({ name });
    if (validatedNewPlanet.error) {
      res
        .status(400)
        .json({ message: validatedNewPlanet.error.details[0].message });
      return;
    }
    await db.none("UPDATE planets SET name=$2 WHERE id=$1;", [id, name]);
  
    res.status(200).json({ message: "Planet updated successfully" });
  
  }

  const deleteById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    await db.none("DELETE FROM planets WHERE id=$1;", id);
    res.status(200).json({ message: "Planet deleted successfully" });
  }

  const createImage = async(req: Request, res: Response) => {
    const {id} = req.params;
    const fileName = req.file?.path;

    if (fileName) {
      db.none("UPDATE planets SET image=$2 WHERE id=$1;", [id, fileName]);
      res.status(201).json({ message: "Image added successfully" });
    } else {
      res.status(400).json({ message: "Image not added" });
    }
  }


  export { getAll, getOneById, create, updateById, deleteById, createImage };
