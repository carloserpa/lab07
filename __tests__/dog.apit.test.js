const request = require('supertest');

request('https://dog.ceo')
  .get('/api/breeds/image/random')
  .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
  });