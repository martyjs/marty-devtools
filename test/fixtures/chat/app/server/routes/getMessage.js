module.exports = function (req, res) {
  res.json({ id: req.params.id }).end();
};