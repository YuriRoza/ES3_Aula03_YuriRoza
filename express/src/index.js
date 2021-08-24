const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let clients = [
    {id: 8, nome: 'Yuri da Roza', telefone: '53981000000'},
    {id: 1, nome: 'Bart Simpson', telefone: '53981010203'},
    {id: 3, nome: 'Matt Murdock', telefone: '53981040506'},
    {id: 5, nome: 'Jessica Jones', telefone: '53981070809'}
]

app.get('/clients', (request, response) => response.json(clients));

app.get('/clients/:id', (request, response) => {
    const client = clients.filter(value => value.id == request.params.id);
    return response.json(client);
});

/*
Possível fazer com
app.get('/clients/:id", (request, response) =>
response.json(clients.filter(value => value.id == request.params.id)));
*/

app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client);
    response.json(client);
});

app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.filter(value => value.id == id);

    client[0].nome = nome;

    response.json(client[0]);
});

app.delete('/clients/:id', (request, response) =>{
    const id = request.params.id;
    clients = clients.filter(value => value.id != id);
    response.json(clients);
});

app.listen(3000);
