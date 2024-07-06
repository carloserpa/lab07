"use strict";

 /* Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */

window.onload = function (event) {
    var info = new Information("divInformation");
    info.getPerson();
    //info.getCountry();
    window.info = info;
    var divForm = document.getElementById("divForm");  


};

/* Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
* @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
* @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
*/

function tableLine(object, headerFormat) {
    var tr = document.createElement("tr");
    var tableCell = null;
    for (var property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement("th");
            tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {
            tableCell = document.createElement("td");
            tableCell.textContent = object[property];
        }
        tr.appendChild(tableCell);
    }
    tableCell = document.createElement("th");
    tableCell.textContent = "Actions";
    tr.appendChild(tableCell);
    var celulaAcoes = document.createElement('td');
    var link=document.createElement("a");
    link.appendChild(document.createTextNode("Atualizar"));
    link.setAttribute("class","btn btn-dark me-1");
    link.setAttribute("role", "button");
    /*link.href = '/usuario/atualizar?usuarioId=' + itemData.profissao.id;
    link.addEventListener("click",  function () {
    preAtualizacao(itemData.id);
    });*/
    celulaAcoes.appendChild(link);

    var link=document.createElement("a");
    link.appendChild(document.createTextNode("Deletar"));
    link.setAttribute("class","btn btn-dark");
    link.setAttribute("role", "button");
    link.href = '#';
    link.addEventListener("click",  function () {
    deletePerson(itemData.id);
    });
    celulaAcoes.appendChild(link)
    tr.appendChild(celulaAcoes);
    return tr;
};