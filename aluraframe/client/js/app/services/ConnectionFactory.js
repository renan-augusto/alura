var ConnectionFactory = (function () {
  var stores = ["negociacoes"];
  var version = 4;
  var dbName = "aluraframe";

  var connection = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error("Nao eh possivel criar instancias de Connection Factory");
    }

    static getConnection() {
      return new Promise((resolved, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = (e) => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = (e) => {
          if (!connection) connection = e.target.result;
          resolve(connection);
        };

        openRequest.onerror = (e) => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };
      });
    }

    static _createStores(connection) {
      stores.forEach((store) => {
        if (connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store);
        connection.createObjectStore(store, { autoIncrement: true });
      });
    }
  };
})();
