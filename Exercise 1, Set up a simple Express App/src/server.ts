import express from "express";
const app = express();
import "express-async-errors";
import morgan from "morgan";
import dotenv from 'dotenv';

dotenv.config();
const {PORT} = process.env;


app.use(morgan("dev"));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.status(200).send('hello world');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
