const { Ticket } = require("./Ticket");

class TicketFull extends Ticket {
  constructor(name, description) {
    super(name);
    this.description = description; // полное описание
  }
}

module.exports = {
  TicketFull
};
