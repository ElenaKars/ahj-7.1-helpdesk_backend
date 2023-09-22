const uuid = require('uuid');
const moment = require('moment');

moment.locale('ru');

class Ticket {
  constructor(name) {
    this.id = uuid.v4(); // идентификатор (уникальный в пределах системы)
    this.name = name; // краткое описание
    this.status = false; // boolean - сделано или нет
    this.created = moment().format('LLL'); // дата создания (timestamp)
  }
}

module.exports = {
  Ticket
};