export default function errorHandling(err) {
  if (err.code === "ENOENT") {
    return "Arquivo não encontrado!\n" + err;
  } else {
    return "Ocorreu um erro!\n" + err;
  }
}