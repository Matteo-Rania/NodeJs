const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const { PORT } = process.env;

const schema = new mongoose.Schema({
  id: Number,
  name: String,
})

app.use(express.json());

type Planet = {
    
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
  

app.get('/planets', (req, res) => {
    res.status(200).json(planets)
})
  
app.get('/planets:id', (req, res) => {
    const { id } = req.params;
    const findPlanet = planets.find(p => p.id === id);
    res.status(200).json(findPlanet)
})
  
app.post('/planets', (req, res) => {
    const { id, name } = req.body;

    const newPlanet = {id, name};
    planets = [...planets,newPlanet ];
    console.log(planets);
    res.status(201).json({message: 'Planet added'})
})
  

app.delete('/planets:id', (req, res) => {
    const {id} = req.params;
    const deletePlanent = planets.filter(p => p.id !== id)
    planets = deletePlanent;
    console.log(planents);
    res.status(200).json({message: 'Planet deleted'})
})
  

app.put('/planents/:id', (req, res) => {
    const { id } = req.params;
    const newPlanetName = req.body.name;
    planets = planets.map(p => p.id === id ?{...planets, name: newPlanetName}: p);
    console.log(planets);
    res.status(200).json({message: 'Planet updated'})
})
  
  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });




