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
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const segundos = data.getSeconds();
        const datasql = ano +'-'+mes+'-'+dia+' ' + hora + ':' + minutos + ':' + segundos;
        await Jogada.create({
            jogador: req.me.id,
            pontuacao: req.body.pontuacao,
            data: datasql,
        })
    },

    rankingindex : async function (req, res) {
        const sql = "select fullName, pontuacao, DATE_FORMAT(data,'%d/%m/%y %H:%i') as data from jogada, user where user.id = jogada.jogador order by pontuacao desc"
        var rawResult = await sails.getDatastore().sendNativeQuery(sql);
        res.view('pages/ranking', { jogadas: rawResult.rows })
     
    },
};

