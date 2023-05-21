import { handleStatus, log } from "./utils/promise-helpers.js";
import "./utils/array-helpers.js";
import { notasService as service } from "./nota/service.js";
import { takeUntil, debounceTime, partialize } from "./utils/operators.js";

const operation = pipe(partialize(debounceTime, 500), partialize(takeUntil, 3));

const action = debounceTime(
  500,
  takeUntil(3, () =>
    service.sumItems("2143").then(console.log).catch(console.log)
  )
);

document.querySelector("#myButton").onclick = () => operation();
