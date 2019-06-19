/**
 * Module dependencies
 */

// ...


/**
 * account/edit-curso.js
 *
 * Edit curso.
 */
module.exports = async function editCurso(req, res) {
  
  if (req.route.methods.get) {
    var cursos = await Curso.find();
    res.view('pages/account/edit-curso', {cursos: cursos})
  }
  else {
    try {
      await User.update({ id:req.me.id }).set({ curso: req.body.curso })
      res.redirect('/account');
    } catch (error) {
      //res.end(error);
      console.log(error)
    }
  }
};
