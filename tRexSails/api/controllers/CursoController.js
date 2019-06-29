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
            try {
                await Curso.create({
                    sigla: req.body.sigla,
                    nome: req.body.nome,
                    descricao: req.body.descricao,

                });
                res.redirect('/curso');
            } catch (error) {
                res.view('curso/create', { error: error });
            }
        }
    },

    read: async function (req, res) {
        var curso = await Curso.findOne((req.param("cursoId")));
        res.view('curso/read', { curso : curso });
    },

    update: async function (req, res) {
        if (req.route.methods.get) {
            var curso = await Curso.findOne((req.param("cursoId")));
            res.view('curso/update', { curso : curso });
        }
        else {
            try {
                await Curso.updateOne(req.body.id).set({
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    sigla: req.body.sigla
                });
                res.redirect('/curso');
            } catch (error) {
                res.view('curso/update', { error: error });
            }
        }
    },

    delete: async function (req, res) {
        if (req.route.methods.get) {
            var curso = await Curso.findOne((req.param("cursoId")));
            res.view('curso/delete', { curso : curso });
        }
        else {
            try {
                await Curso.destroyOne(req.body.id);
                res.redirect('/curso');
            } catch (error) {
                res.view('curso/delete', { error: error });
            }
        }
    }

};