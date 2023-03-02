import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const data = new Uint8Array(Buffer.from("file di tipo testo creato"));
writeFile("message.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
