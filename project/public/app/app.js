import { handleStatus, log, timeoutPromise } from "./utils/promise-helpers.js";
import "./utils/array-helpers.js";
import { notasService as service } from "./nota/service.js";
import { takeUntil, debounceTime, partialize } from "./utils/operators.js";

Promise.race([p1, p2]).then(console.log).catch(console.log);

const operation = pipe(partialize(debounceTime, 500), partialize(takeUntil, 3));

const action = operation(() =>
  timeoutPromise(200, service.sumItems("2143"))
    .then(console.log)
    .catch(console.log)
);

document.querySelector("#myButton").onclick = () => operation();
