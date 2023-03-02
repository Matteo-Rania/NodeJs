import { Request, Response } from "express";
import Joi from "joi";
type Planet = {
    id: number;
    name: string;
  };
  
  type Planets = Planet[];
  
  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

  const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
  };

  const getOneById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const planet = planets.find((planet) => planet.id === id);
    res.status(200).json(planet);
  }
  const planetSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });

  const create = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
      res
        .status(400)
        .json({ message: validatedNewPlanet.error.details[0].message });
      return;
    }
  
    planets = [...planets, newPlanet];
  
    console.log(planets);
  
    res.status(201).json({ message: "Planet added successfully" });
  }

  const updateById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const validatedNewPlanet = planetSchema.validate({ id, name });
    if (validatedNewPlanet.error) {
      res
        .status(400)
        .json({ message: validatedNewPlanet.error.details[0].message });
      return;
    }
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  
    res.status(200).json({ message: "Planet updated successfully" });
  
    console.log(planets);
  }

  const deleteById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    planets = planets.filter((p) => p.id !== id);
    res.status(200).json({ message: "Planet deleted successfully" });
  }

  export { getAll, getOneById, create, updateById, deleteById };
