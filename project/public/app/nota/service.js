import { handleStatus } from "../utils/promise-helpers";

const API = "https://localhost:3000/notas";

const sumItems = (code) => (notas) =>
  notas
    .$flatMap((nota) => nota.itens)
    .filter((item) => item.codigo == code)
    .reduce((total, item) => total + item.valor, 0);

export const notasService = {
  listAll() {
    return fetch(API).then(handleStatus);
  },

  sumItems(code) {
    return this.listAll().then(sumItems(code));
  },
};
