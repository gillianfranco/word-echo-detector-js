import fs from 'fs';
import errorHandling from './errors/errorFunctions.js';
import { countWordsPerParagraph } from './index.js';
import { buildOutput } from "./helpers.js";

const filePath = process.argv[2];
const path = process.argv[3];

fs.readFile(filePath, "utf8", (err, data) => {
  try {
    if (err) throw err;
    const resultado = countWordsPerParagraph(data);
    createFile(path, resultado);
  } catch (err) {
    console.log(errorHandling(err));
  }
});

// --- Forma síncrona e assíncrona da função createFile() ---

// Forma síncrona:

// function createFile(path, data) {
//   const newFilePath = `${path}/resultado.txt`;

//   try {
//     fs.writeFile(newFilePath, JSON.stringify(data), (err) => {
//       if (err) throw err;
//       console.log("Arquivo criado com sucesso!");
//     });
//   } catch (err) {
//     console.log(errorHandling(err));
//   }
// }

// Usando async/await:

// async function createFile(path, data) {
//   const newFilePath = `${path}/resultado.txt`;

//   try {
//     await fs.promises.writeFile(newFilePath, JSON.stringify(data));
//     console.log("Arquivo criado com sucesso!");
//   } catch (err) {
//     console.log(errorHandling(err));
//   }
// }

// Usando then:

function createFile(path, data) {
  const newFilePath = `${path}/resultado.txt`;

  fs.promises.writeFile(newFilePath, buildOutput(data))
    .then(() => console.log("Arquivo criado com sucesso!"))
    .catch((err) => console.log(errorHandling(err)))
    .finally(() => console.log("Operação finalizada."));
}

// Lendo múltiplos arquivos simultaneamente de forma assíncrona:

// async function readMultipleFiles(arrayPaths) {
//   try {
//     const promisesArray = arrayPaths.map((path) => {
//       return fs.promises.readFile(path, "utf8");
//     });
//     const dataList = await Promise.all(promisesArray);
//     return dataList;
//   } catch (error) {
//     throw error;
//   }
// }

// console.log(await readMultipleFiles(["./arquivos/texto-aprendizado.txt", "./arquivos/texto-kanban.txt", "./arquivos/texto-web.txt"]));
