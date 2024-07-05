// Arquivo: user.api.test.js
const request = require("supertest")
const api = require("../app.js")
var expect = require("chai").expect

// Arrange
const newUser = { 
  name:"Joao Freitas", 
  email:"joao@example.com", 
  phone:"320549879586",
  password:"1!2@3#4$5%", 
  user_type:"USER"
 };

 var user_id = 0;

describe("API de usuários", () => {
  it("Deve criar um novo usuário corretamente", async () => {
    // Act
    const response = await request(api)
            .post("/user")
            .set('Content-Type', 'application/json')
            .send(newUser);
    // Assert
    expect(response.status).to.equal(201);
    expect(response.body.user.name).to.equal(newUser.name);
    expect(response.body.user.email).to.equal(newUser.email);
    expect(response.body.user.phone).to.equal(newUser.phone);
    expect(response.body.user.user_type).to.equal(newUser.user_type);
    user_id = response.body.user.id;
  });
});

describe("API de usuários", () => {
  it("Deve recuparar usuário pelo id", async () => {
    // Act
    const response = await request(api)
            .get("/user/" + user_id)
            .set('Content-Type', 'application/json')
            .send(newUser);
    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.user.name).to.equal(newUser.name);
    expect(response.body.user.email).to.equal(newUser.email);
    expect(response.body.user.phone).to.equal(newUser.phone);
    expect(response.body.user.user_type).to.equal(newUser.user_type);
  });
});

describe("API de usuários", () => {
  it("Deve recuparar todos usuário", async () => {
    // Act
    const response = await request(api)
            .get("/user")
            .set('Content-Type', 'application/json')
            .send(newUser);
    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.users.length).to.be.above(0);
  });
});

describe("API de usuários", () => {
  it("Deve autenticar usuário com sucesso", async () => {
    // Act
    const response = await request(api)
            .post("/user/auth")
            .set('Content-Type', 'application/json')
            .send(newUser);
    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.auth).to.equal(true);
  });
});

describe("API de usuários", () => {
  it("Deve alterar usuário corretamente", async () => {

    // Arrange
    const alterUser = { 
      name:"Joao Freitas Alteracao", 
      email:"alteracao@example.com", 
      phone:"320549879586",
      password:"222222222", 
      user_type:"ADMIN"
    };
    // Act
    const response = await request(api)
            .put("/user/" + user_id)
            .set('Content-Type', 'application/json')
            .send(alterUser);
  
    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.user.name).to.equal(alterUser.name);
    expect(response.body.user.email).to.equal(alterUser.email);
    expect(response.body.user.phone).to.equal(alterUser.phone);
    expect(response.body.user.user_type).to.equal(alterUser.user_type);
  });
});


describe("API de usuários", () => {
  it("Deve remover usuário corretamente", async () => {
    // Act
    const response = await request(api)
            .del("/user/" + user_id)
            .set('Content-Type', 'application/json')
            .send(newUser);
    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.user.id).to.equal(newUser.id);
  });
});
