const express = require("express");
const bodyParser = require("body-parser");//para fazer a interpretacao do corpo da requisicao
const requestHandlers = require("./request-handlers.js");//importando os manipuladores de requisicao

const app =  express();
app.use(express.static("www"));//arquivos estaticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//para fazer a interpretacao do body

// People
app.get("/user", requestHandlers.getUser);
app.get("/user/:id", requestHandlers.getUserById);
app.post("/user", requestHandlers.createUser);
app.post("/user/auth", requestHandlers.authUser);
app.put("/user/:id", requestHandlers.updateUser);
app.delete("/user/:id", requestHandlers.deleteUser);


app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});

module.exports = app
