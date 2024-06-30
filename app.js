const express = require("express");
const bodyParser = require("body-parser");//para fazer a interpretacao do corpo da requisicao
const requestHandlers = require("./request-handlers.js");//importando os manipuladores de requisicao

const app =  express();
app.use(express.static("www"));//arquivos estaticos
app.use(bodyParser.urlencoded({ extended: true }));//para fazer a interpretacao do body

// People
app.get("/person", requestHandlers.getPeople);
app.get("/person/:id", requestHandlers.getPerson);
app.post("/person", requestHandlers.createPerson);
app.put("/person/:id", requestHandlers.updatePerson);
app.delete("/person/:id", requestHandlers.deletePerson);

// Countries
app.get("/country", requestHandlers.getCountries);
app.get("/country/:id", requestHandlers.getCountry);
app.post("/country", requestHandlers.createCountry);
app.put("/country/:id", requestHandlers.updateCountry);
app.delete("/country/:id", requestHandlers.deleteCountry);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});

