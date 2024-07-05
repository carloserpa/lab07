const crypto = require("crypto")
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
    var query = "INSERT INTO projetofinalpw.users(name, email, phone, password, salt,user_type) VALUES(?, ?, ?, ?, ?, ?)";
    var password = generatePassword(req.body.password)
    createConnection.query(query, [req.body.name, req.body.email, req.body.phone, password.hash, password.salt,req.body.user_type], function (err, result) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        var query = "SELECT id, name, email, phone, password, salt, user_type FROM projetofinalpw.users WHERE id = ?;";
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
    var query = "UPDATE projetofinalpw.users SET name = ?, email = ?, phone = ?, password = ?, salt = ? , user_type= ? WHERE id = ?";
    var password = generatePassword(req.body.password)
    updateConnection.query(query, [req.body.name, req.body.email, req.body.phone, password.hash, password.salt, req.body.user_type, req.params.id], function (err, result) {
      if (err) {
        res.status(400).json({"message": "error", "error": err });
      } else {
        var query = "SELECT id, name, email, phone, password, salt, user_type FROM projetofinalpw.users WHERE id = ?;";        
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

function authUser(req, res) {
  var createConnection = mysql.createConnection(options);  
  createConnection.connect();   
  var query = "SELECT email, password, salt FROM projetofinalpw.users where email = ?";
  createConnection.query(query, [req.body.email], function (err, rows) {    
    if (err) {
      res.status(400).json({"message": "error", "error": err });
    } else {
        var checkHash = rows[0].password
        var checkSalt = rows[0].salt   
        if (validPassword(req.body.password, checkHash, checkSalt)) {
          res.status(200).json({"message": "success", "auth": true });
        } else {
          res.status(200).json({"message": "success", "auth": false });
        }                   
    }
    createConnection.end();
  });
}


function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return {
        salt: salt,
        hash: genHash
    }
}
function validPassword(password, hash, salt) {
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

module.exports = {
    getUser: getUser,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    authUser: authUser
};
