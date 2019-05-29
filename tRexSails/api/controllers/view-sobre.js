module.exports = async function (req, res) {
  var released = 2019;
  res.view('pages/sobre', { released: released });
};