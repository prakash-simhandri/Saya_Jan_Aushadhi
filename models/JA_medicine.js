const { Model } = require('objection');
const knex = require('../Config/knex')
Model.knex(knex)
class JA_Medicine extends Model {
  static get tableName() {
    return 'JA_medicine';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        Drug_Code: { type: 'string'},
        Method: { type: 'string' },
        Generic_Name: { type: 'string' },
        Database_Comp: { type: 'string' },
        Packet: { type: 'string' },
        MRP: { type: 'string' },
        Specialty: { type: 'string' },
        perquant: { type: 'string' },
        perquant_digit: { type: 'string' },
        perquant_string: { type: 'string' },
        d_perquant: { type: 'string' },
        packet_string: { type: 'string' },
        packet_digit: { type: 'string' },
      }
    };
  }
}

module.exports = JA_Medicine;  