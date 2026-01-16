import fs from 'fs';
import path from 'node:path';
import errorHandling from './errors/errorFunctions.js';
import { countWordsPerParagraph } from './index.js';
import { buildOutput } from "./helpers.js";
import { program } from "commander";

program
  .version('0.1.0')
  .option('-t, --text <string>', 'caminho do texto a ser processado')
  .option('-d, --destination <string>', 'caminho da pasta para salvar o arquivo de resultado')
  .action((options) => {
    const { text, destination } = options;

    if (!text || !destination) {
      console.error("Error: por favor, insira o caminho do arquivo de texto e o caminho da pasta de destino para salvar o resultado");
      program.help();
      return;
    }

    const textPath = path.resolve(text);
    const destinationPath = path.resolve(destination);

    try {
      processText(textPath, destinationPath);
      console.log("Texto processado com sucesso!");
    } catch (error) {
      console.log("Ocorreu um erro no processamento\n", error);
    }

  });

program.parse();

function processText(text, destination) {
  fs.readFile(text, "utf8", (err, data) => {
    try {
      if (err) throw err;
      const resultado = countWordsPerParagraph(data);
      createFile(destination, resultado);
    } catch (err) {
      console.log(errorHandling(err));
    }
  });
}

// Forma assíncrona também (mas usando callback):

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

async function createFile(path, data) {
  const newFilePath = `${path}/resultado.txt`;

  try {
    await fs.promises.writeFile(newFilePath, buildOutput(data));
  } catch (err) {
    console.log(errorHandling(err));
  }
}

// Usando then:

// function createFile(path, data) {
//   const newFilePath = `${path}/resultado.txt`;

//   fs.promises.writeFile(newFilePath, buildOutput(data))
//     .then(() => console.log("Arquivo criado com sucesso!"))
//     .catch((err) => console.log(errorHandling(err)))
//     .finally(() => console.log("Operação finalizada."));
// }

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
