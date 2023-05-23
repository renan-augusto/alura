import { handleStatus } from "../utils/promise-helpers";
import { partialize } from "../utils/operators";
import { pipe } from "../utils/operators";
import { Maybe } from "../utils/maybe";

const API = "https://localhost:3000/notas";

const getItemsFromNotas = (notasM) =>
  notasM.map((notas) => notas.$flatMap((nota) => nota.itens));
const filterItemsByCode = (code, itemsM) =>
  itemsM.map((items) => items.filter((item) => item.codigo == code));
const sumItemsValue = (itemsM) =>
  itemM.map((items) => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .then((notas) => Maybe.of(notas))
      .catch((err) => {
        console.log(err);
        return Promise.reject("Nao foi possivel obter as notas fiscais");
      });
  },

  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);
    const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);
    return this.listAll()
      .then(sumItems)
      .then((result) => result.getOrElse(0));
  },
};
