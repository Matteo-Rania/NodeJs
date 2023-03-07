import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
  createImage,
} from "./controllers/planets.js";
import { logIn, signUp, logOut } from "./controllers/users.js";
import authorize from "./authorize.js";
import multer from "multer";
import "./passport.js";

const app = express();
dotenv.config();
const { PORT } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", authorize, updateById);

app.delete("/api/planets/:id", authorize, deleteById);

app.post(
  "/api/planets/:id/image",
  authorize,
  upload.single("image"),
  createImage
);

app.post("/api/users/login", logIn);

app.post("/api/users/signup", signUp);

app.get("/api/users/logout", authorize, logOut);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
