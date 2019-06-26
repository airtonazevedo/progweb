/* eslint-disable indent */
/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    trex: async function (req, res) {
        res.view('game/trex');
       },

    salvarPontuacao: async function (req, res) {
        const data = new Date();
        const dia = data.getDate();
        const mes = data.getMonth();
        const ano = data.getFullYear();
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const segundos = data.getSeconds();

       await Jogada.create({
            jogador: req.me.id,
            pontuacao: req.body.pontuacao,
            data: ano +'-'+mes+'-'+dia+' ' + hora + ':' + minutos + ':' + segundos,
        })
    },

    rankingindex : async function (req, res) {
        var jogada = await Jogada.Find();
        jogada.forEach(element => {
            var user = await user.Find();

        });

        res.view('curso/index', { cursos: cursos });
    },
};

