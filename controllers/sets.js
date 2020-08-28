const Set = require('../models/set');

module.exports = {
  new: newSet,
  create,
  show
}

function newSet(req, res) {
  res.render('sets/new', {
    title: 'The Collabratory | Add Set',
    user: req.user,
    name: req.query.name
  });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const set = new Set(req.body);
  set.save(function(err) {
    if (err) return res.redirect('/sets/new');
    // <--------------------------- UPDATE TO /sets/:id/edit
    res.redirect('/');
  });
}

function show(req, res) {
  Set.findById(req.params.id, function(err, set) {
    res.render('sets/show', {title: `The Collabratory | ${set.title}`, set});
  });
}