
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
  window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
  window.msIDBKeyRange

if (!window.indexedDB) {
  window.Swal.fire("Su navegador no soporta una version estable de IndexedDB.")
}

const usuarioData = [
  { id: "0001", nombre: "ADMIN", clave: '1234' , balance: 0 , transacciones : [] }
];
var db;
var request = window.indexedDB.open("ATM", 1);

request.onerror = function (event) {
  console.log("error: ");
};

request.onsuccess = function (event) {
  db = request.result;
  console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("usuario", { keyPath: "id" });

  for (var i in usuarioData) {
    objectStore.add(usuarioData[i]);
  }
}

function read(id="") {
  var transaction = db.transaction(["usuario"]);
  var objectStore = transaction.objectStore("usuario");
  var request = objectStore.get(id);

  request.onerror = function (event) {
    Swal.fire("No se obtuvieron resultados");
  };

  request.onsuccess = function (event) {
    // Do something with the request.result!
    if (request.result) {
      return request.result;
    } else {
      Swal.fire("El registro no existe en la base de datos");
      return null;
    }
  };
}

function readAll() {
  var objectStore = db.transaction("usuario").objectStore("usuario");

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log(request.result);
      cursor.continue();
    } else {
      Swal.fire("No más datos");
    }
  };
}

function add(object = {}) {
  var request = db.transaction(["usuario"], "readwrite")
    .objectStore("usuario")
    .add(object);

  request.onsuccess = function (event) {
    Swal.fire("El registro fue agregado correctamente", "Exito", 'success');
  };

  request.onerror = function (event) {
    Swal.fire("El registro ya existe en la base de datos");
  }
}

function remove(id = "") {
  var request = db.transaction(["usuario"], "readwrite")
    .objectStore("usuario")
    .delete(id);

  request.onsuccess = function (event) {
    Swal.fire("El registro fue removido");
  };
}

function CreateObjectStore(dbName, storeName) {
  var request = indexedDB.open(dbName);
  request.onsuccess = function (e) {
    var database = e.target.result;
    var version = parseInt(database.version);
    database.close();
    var secondRequest = indexedDB.open(dbName, version + 1);
    secondRequest.onupgradeneeded = function (e) {
      var database = e.target.result;
      var objectStore = database.createObjectStore(storeName, {
        keyPath: 'id'
      });
    };
    secondRequest.onsuccess = function (e) {
      e.target.result.close();
    }
  }
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}