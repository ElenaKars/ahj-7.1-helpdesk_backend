const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const { TicketFull } = require('./src/TicketFull');

const app = new Koa();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));

let tickets = [];

app.use(async (ctx) => {
  let { method } = ctx.request.query;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (ctx.request.method === 'POST') {
    ctx.response.set('Content-Type', ctx.request.header['content-type']);
  }

  let ticket, id;

  switch (method) {
    case 'addTickets':
      tickets = ctx.request.body;
      ctx.response.body = tickets;
      return;

    case 'allTickets':
      ctx.response.body = tickets;
      return;

    case 'createTicket':
      const { name, description } = ctx.request.body;
      ticket = new TicketFull(name, description);
      tickets.push(ticket);
      ctx.response.body = ticket;
      return;

    case 'deleteTicket':
      ({ id } = ctx.request.query);
      tickets = tickets.filter((t) => t.id !== id);
      ctx.response.body = tickets;
      return;

    case 'changeTicket':
      ({ id } = ctx.request.body);
      ticket = tickets.find((t) => t.id === id);
      Object.assign(ticket, ctx.request.body);
      ctx.response.body = ticket;
      return;

    case 'ticketById':
      ctx.response.body = tickets.find((t) => t.id === ctx.request.body.id);
      return;

    default:
      ctx.response.status = 404;
      return;
  }
});

const server = http.createServer(app.callback());
const port = 5050;

server.listen(port, (err) => {
  if (err) {
    console.log('ошибка в listen', err);
    return;
  }
  console.log(`Server is listening to ${port}`);
});