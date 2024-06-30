
const mysql = require("mysql");
const options = require("./connection-options.json");

function getPeople(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry FROM users";
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "people": rows });
      }
      connection.end();
    });
  }

function getPersonById(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry FROM users WHERE id = ?";
    connection.query(query, [req.params.id], function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": rows[0] });
      }
      connection.end();
    });

}

function createUser(req, res) {
    var createConnection = mysql.createConnection(options);
    createConnection.connect();
    var query = "INSERT INTO projetofinalpw.users(name, email, phone, password, type_use) VALUES(?, ?, ?, ?, ?)";
    createConnection.query(query, [req.body.name, req.body.email, req.body.phone, req.body.password, req.body.user_type], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "status": "201",  "body": result });
      }
      createConnection.end();
    });
}

function updatePerson(req, res) {
    var updateConnection = mysql.createConnection(options);
    updateConnection.connect();
    var query = "UPDATE person SET name = ?, birthDate = ?, idCountry = ? WHERE id = ?";
    updateConnection.query(query, [req.body.name, req.body.birthDate, req.body.idCountry, req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": req.params.id });
      }
      updateConnection.end();
    });
}

function deletePerson(req, res) {
    var deleteConnection = mysql.createConnection(options);
    deleteConnection.connect();
    var query = "DELETE FROM person WHERE id = ?";
    deleteConnection.query(query, [req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "person": req.params.id });
      }
      deleteConnection.end();
    });
}

function getCountries(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, shortName FROM country";
    connection.query(query, function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "countries": rows });
      }
    });
}

function getCountryById(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, shortName FROM country WHERE id = ?";
    connection.query(query, [req.params.id], function (err, rows) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "country": rows[0] });
      }
      connection.end();
    });
}

function createCountry(req, res) {
    var createConnection = mysql.createConnection(options);
    createConnection.connect();
    var query = "INSERT INTO country (name, shortName) VALUES (?, ?)";
    createConnection.query(query, [req.body.name, req.body.shortName], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "country": result.insertId });
      }
      createConnection.end();
    });
}

function updateCountry(req, res) {
    var updateConnection = mysql.createConnection(options);
    updateConnection.connect();
    var query = "UPDATE country SET name = ?, shortName = ? WHERE id = ?";
    updateConnection.query(query, [req.body.name, req.body.shortName, req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "country": req.params.id });
      }
      updateConnection.end();
    });
}

function deleteCountry(req, res) {
    var deleteConnection = mysql.createConnection(options);
    deleteConnection.connect();
    var query = "DELETE FROM country WHERE id = ?";
    deleteConnection.query(query, [req.params.id], function (err, result) {
      if (err) {
        res.json({"message": "error", "error": err });
      } else {
        res.json({"message": "success", "country": req.params.id });
      }
      deleteConnection.end();
    });
}

module.exports = {
    getPeople: getPeople,
    getPerson: getPersonById,
    createUser: createUser,
    updatePerson: updatePerson,
    deletePerson: deletePerson,
    getCountries: getCountries,
    getCountry: getCountryById,
    createCountry: createCountry,
    updateCountry: updateCountry,
    deleteCountry: deleteCountry
};
