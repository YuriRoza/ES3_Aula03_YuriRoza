const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let clients = [
    {id: 8, nome: 'Yuri da Roza', telefone: '53981000000'},
    {id: 1, nome: 'Bart Simpson', telefone: '53981010203'},
    {id: 3, nome: 'Matt Murdock', telefone: '53981040506'},
    {id: 5, nome: 'Jessica Jones', telefone: '53981070809'}
]

function log (request, response, next) {
    const {url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`);
    next();
};

app.use(log);

app.get('/clients', (request, response) => response.status(200).json(clients));

app.get('/clients/:id', (request, response) => {
    const {id} = request.params;
    const client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).json({error: 'Requisição Inválida'});
    } else {
        response.status(200).json(client);
    }
});

/*
Possível fazer com:
app.get('/clients/:id", (request, response) =>
response.json(clients.filter(value => value.id == request.params.id)));
*/

app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client);
    response.status(201).json(client);
});

app.put('/clients/:id', (request, response) => {
    const {id} = request.params;
    const nome = request.body.nome;
    
    let client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).send();
    } else {
    client.nome = nome;
    response.status(200).json(client);
    }
});

app.delete('/clients/:id', (request, response) =>{
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id);
    if (index == - 1){
        response.status(400).send();
    } else {
        clients.splice(index, 1);
        response.status(204).send();
    }
});

app.listen(3000);
