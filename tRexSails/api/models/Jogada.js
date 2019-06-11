/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    jogador: {
      type: 'number',
      columnType: 'int',
      required: true,
      description: "chave estrangeira do user",
      example: '54'
    },

    pontuacao: {
      type: 'number',
      columnType: 'int',
      description: "pontos no jogo",
      example: '10496'
    },

    data: {
      type: 'string',
      description: "data da partida",
      columnType: 'date',
      example: '2019-05-04'
    },


  },


};
