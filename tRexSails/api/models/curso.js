/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    nome: {
      type: 'string',
      maxLength: 64,
      columnType: 'varchar(64)',
      description: "nome do curso",
      example: 'ciencia da computação'
    },

    sigla: {
      type: 'string',
      columnType: 'varchar(4)',
      maxLength: 4,
      description: "sigla do curso",
      example: 'cc'
    },

    descricao: {
      type: 'string',
      columnType: 'text',
      description: "descricao do curso",
    },


  },


};
