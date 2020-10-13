const { Model } = require('objection');
const knex = require('../Config/knex')
Model.knex(knex)
class Medicine extends Model {
  static get tableName() {
    return 'medicine';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        NameID: { type: 'string'},
        Composition: { type: 'string' },
        Method: { type: 'string' },
        Packet: { type: 'string' },
        Quantity: { type: 'string' },
        perquant: { type: 'string' },
        compcount: { type: 'string' },
        quantcount: { type: 'string' },
        quantcount2: { type: 'string' },
        Link: { type: 'string' },
        unitcount2: { type: 'string' },
        specialty: { type: 'string' },
        string_packet: { type: 'string' },
        digity_packet: { type: 'string' },
        stringperquant: { type: 'string' },
        F_Composition: { type: 'string' },
        validated: { type: 'string' },
        Price: { type: 'string' },
        newdrug: { type: 'string' },
      }
    };
  }
}

module.exports = Medicine;  