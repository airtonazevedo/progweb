/**
 * CursoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: async function (req, res) {
        var cursos = await Curso.find();

        res.view('curso/index', { cursos: cursos });
    },

    create: async function (req, res) {
        console.log("asd");
        if (req.route.methods.get) {
            res.view('curso/create');
        }
        else {
            console.log("qawedqweq");
            try {
                await Curso.create ({
                    sigla: req.body.sigla,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    
                });
                res.redirect('curso');
            } catch (error) {
                res.view('curso/create' , { error : error});
            }
        }
    },

    read: async function (req, res) {
        res.end(req.param("cursoId"));
    },

    update: async function (req, res) { },

    delete: async function (req, res) { }

};