# "7.Working with HTTP"

![CI](https://github.com/ElenaKars/ahj-7.1-helpDesk/actions/workflows/web.yml/badge.svg)

Rules for submitting the assignment:

1. **Important**: within this DP you need to use npm (which means there should not be any `yarn.lock` in the repository)
2. Frontend must be assembled via Webpack (including images and styles) and uploaded to Github Pages via Appveyor
3. README.md must contain a build badge and a link to Github Pages
4. As a result, send the reviewer links to your GitHub projects
5. There is no need to write auto-tests

**Important**: in this remote control you will need to complete a mini-project. We understand that it may take a little more time than regular remote control, but the topic of HTTP is so important that it is worth spending a little more time on it.

---

### HelpDesk

#### Legend

While the backend developer is on vacation, you have been tasked with making an API prototype for the help request management service (you can be happy for yourself, it’s not far from fullstack), to which you will need to attach the frontend in the future.

#### Description

You will need to write [CRUD](https://ru.wikipedia.org/wiki/CRUD) functionality to work with requests using the koa server. To store data we will operate with the following structures:
```javascript
Ticket {
     id // identifier (unique within the system)
     name // brief description
     status // boolean - done or not
     created // creation date (timestamp)
}
TicketFull {
     id // identifier (unique within the system)
     name // brief description
     description // full description
     status // boolean - done or not
     created // creation date (timestamp)
}
```

Example requests:
* GET ?method=allTickets - list of tickets
* GET ?method=ticketById&id=`<id>` - full description of the ticket (where `<id>` is the ticket identifier)
* POST ?method=createTicket - creating a ticket (`<id>` is generated on the server, in the body of the form `name`, `description`, `status`)

Respectively:
* GET ?method=allTickets - an array of objects of type `Ticket` (i.e. without `description`)
* GET ?method=ticketById&id=`<id>` - object of type `TicketFull` (i.e. with `description`)
* POST ?method=createTicket - in the request body there is a form with fields for an object of type `Ticket` (with `id` = `null`)

There is no need to write auto tests.

Don't forget about [CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS). To handle CORS, koa has its own middleware [koa-CORS](https://github.com/koajs/cors)

To simplify testing, you can add several tickets there when starting the server.

To begin with, to send data from the server, just write in the koa handlers:
```js
const tickets = [];
app.use(async ctx => {
     const { method } = ctx.request.querystring;
     switch (method) {
         case 'allTickets':
             ctx.response.body = tickets;
             return;
         // TODO: processing other methods
         default:
             ctx.response.status = 404;
             return;
     }
});
```

And the code below will allow you to process the received response from the server in Frontend:
```js
xhr.addEventListener('load', () => {
     if (xhr.status >= 200 && xhr.status < 300) {
         try {
             const data = JSON.parse(xhr.responseText);
         } catch (e) {
             console.error(e);
         }
     }
});
```

As a result, send the reviewer a link to the GitHub repository.

---

### HelpDesk: Frontend

#### Legend

You have written part of the API, it’s time to start your direct responsibilities - writing a frontend that will work with this API.

#### Description

General view of the list of tickets (must be downloaded from the server in JSON format):

![](./pic/helpdesk.png)

Modal window for adding a new ticket (called by the "Add ticket" button in the upper right corner):

![](./pic/helpdesk-2.png)

Modal window for editing an existing ticket (called by the button with the “✎” - pencil icon):

![](./pic/helpdesk-3.png)

Modal window for confirming deletion (called by the button with the “x” icon - a cross):

![](./pic/helpdesk-4.png)

To view ticket details, you need to click on the ticket body (but not on the “done”, “edit” or “delete” buttons):

![](./pic/helpdesk-5.png)

Your application must implement the following functionality:
* Display all tickets
* Create a new ticket
* Deleting a ticket
* Ticket change
* Receive a detailed description of the ticket
* Marking the completion of each ticket

All this functionality must be connected to the server through methods. For example, to delete, you need to send a request with the appropriate method, receive confirmation and pull up an updated list of tasks.

As a bonus, you can display some kind of loading icon (see https://loading.io) while loading.

Auto-tests are not required for this task. All data and changes must be taken/saved on the server that you wrote in the previous task.

As a result, send the reviewer a link to the GitHub repository.

<details>
<summary>Note</summary>

To get data from the server you can use [XMLHttpRequest](https://developer.mozilla.org/ru