// Arquivo: user.api.test.js

import request from 'supertest';
import app from './app';

describe('API de usuários', () => {
  it('deve criar um novo usuário corretamente', async () => {
    // Arrange
    const newUser = { name: 'Carlos', email: 'carlos@example.com', phone: '320549879586',
      password: '111111111', type_user: 'ADMIN'
     };
    
    // Act
    const response = await request(app).post('/person').send(newUser);
    
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.phone).toBe(newUser.phone);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.type_user).toBe(newUser.type_user);
  });
});

describe('API de usuários', () => {
  it('deve alterar usuário corretamente', async () => {
    // Arrange
    const newUser = { name: 'Carlos', email: 'carlos@example.com', phone: '320549879586',
      password: '222222222', type_user: 'ADMIN'
     };
    
    // Act
    const response = await request(app).put('/api/users/{0}').send(newUser);
    
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.phone).toBe(newUser.phone);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.type_user).toBe(newUser.type_user);
  });
});