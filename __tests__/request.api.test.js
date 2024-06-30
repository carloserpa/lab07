// Arquivo: user.api.test.js

var express = require("express");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const request = require("supertest")

const api = require("../app.js")

describe("API de usuários", () => {
  it("deve criar um novo usuário corretamente", async () => {
    // Arrange
    const newUser = { 
          name:"jOAO", 
          email:"JOAO@example.com", 
          phone:"320549879586",
          password:"222222222", 
          user_type:"USER"
     };
    
    // Act
    const response = await request(api)
            .post("/user")
            .set('Content-Type', 'application/json')
            .send(newUser);
    
    // Assert
    request.expect(response.status).toBe(201);
    request.expect(response.body.name).toBe(newUser.name);
    request.expect(response.body.email).toBe(newUser.email);
    request.expect(response.body.phone).toBe(newUser.phone);
    request.expect(response.body.password).toBe(newUser.password);
    request.expect(response.body.user_type).toBe(newUser.user_type);
  });
});