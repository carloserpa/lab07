// Arquivo: user.api.test.js

const express = require('express')
const request = require('supertest')
const chalk = require("chalk");
const app = require('../app')

describe('API de usuários', () => {
  it('deve criar um novo usuário corretamente', async () => {
    // Arrange
    const newUser = { name: 'Carlos', email: 'carlos@example.com', phone: '320549879586',
      password: '111111111', user_type: 'ADMIN'
     };
    
    // Act
    const response = await request(app).post('/user').send(newUser);
    
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.phone).toBe(newUser.phone);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.user_type).toBe(newUser.user_type);
  });
});