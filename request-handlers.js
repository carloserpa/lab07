const express = require('express');
const mysql = require("mysql");
const options = require("./connection-options.json");

function getUser(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT name, email, phone, password, user_type FROM projetofinalpw.users";
    connection.query(query, function (err, rows) {
      if (err) {
        res.jstatus(400).son({"message": "error", "error": err });
      } else {
        res.status(200).json({"message": "success", "users": rows });
      }
      connection.end();
    });
  }

function getUserById(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT name, email, phone, password, user_type FROM projetofinalpw.users WHERE id = ?";
    connection.query(query, [req.params.id], function (err, rows) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        res.status(200).json({"message": "success", "user": rows[0] });
      }
      connection.end();
    });

}

function createUser(req, res) {
    var createConnection = mysql.createConnection(options);
    createConnection.connect();   
    var query = "INSERT INTO projetofinalpw.users(name, email, phone, password, user_type) VALUES(?, ?, ?, ?, ?)";
    createConnection.query(query, [req.body.name, req.body.email, req.body.phone, req.body.password, req.body.user_type], function (err, result) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        var query = "SELECT id, name, email, phone, password, user_type FROM projetofinalpw.users WHERE id = ?;";
        createConnection.query(query, result.insertId, function (err, rows){
          if (err) {
            res.status(400).json({"message": "error", "error": err });
          } else {
            res.status(201).json({"message": "success", "user": rows[0] });
          }  
        });
      }
      createConnection.end();
    });
}

function updateUser(req, res) {
    var updateConnection = mysql.createConnection(options);
    updateConnection.connect();
    
    var query = "UPDATE projetofinalpw.users SET name = ?, email = ?, phone = ?, password = ? , user_type= ? WHERE id = ?";
    updateConnection.query(query, [req.body.name, req.body.email, req.body.phone, req.body.password, req.body.user_type, req.params.id], function (err, result) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        var query = "SELECT id, name, email, phone, password, user_type FROM projetofinalpw.users WHERE id = ?;";        
        updateConnection.query(query, req.params.id, function (err, rows){
          if (err) {
            res.status(400).json({"message": "error", "error": err });
          } else {
            res.status(200).json({"message": "success", "user": rows[0] });           
          }  
        });
      }
      updateConnection.end();
    });
}

function deleteUser(req, res) {
    var deleteConnection = mysql.createConnection(options);
    deleteConnection.connect();
    var query = "DELETE FROM projetofinalpw.users WHERE id = ?";
    deleteConnection.query(query, [req.params.id], function (err, result) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        res.status(200).json({"message": "success", "user": req.params.id });
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
    getUser: getUser,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getCountries: getCountries,
    getCountry: getCountryById,
    createCountry: createCountry,
    updateCountry: updateCountry,
    deleteCountry: deleteCountry
};
