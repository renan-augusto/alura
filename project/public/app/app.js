import {
  handleStatus,
  log,
  timeoutPromise,
  delay,
} from "./utils/promise-helpers.js";
import "./utils/array-helpers.js";
import { notasService as service } from "./nota/service.js";
import { takeUntil, debounceTime, partialize } from "./utils/operators.js";
import { EventEmitter } from "./utils/event-emitter.js";
import { Maybe } from "./utils/maybe.js";

Promise.race([p1, p2]).then(console.log).catch(console.log);

const operation = pipe(partialize(debounceTime, 500), partialize(takeUntil, 3));

const action = operation(() =>
  retry(3, 3000, () =>
    timeoutPromise(200, service.sumItems("2143"))
      .then((total) => EventEmitter.emit("itensTotalizados", total))
      .catch(console.log)
  )
);

document.querySelector("#myButton").onclick = action;

EventEmitter.on("itensTotalizados", console.log);
EventEmitter.on("itensTotalizados", (total) => alert(total));
