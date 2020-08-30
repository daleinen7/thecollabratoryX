const Set = require('../models/set');
const user = require('../models/user');

module.exports = {
  new: newSet,
  create,
  show,
  edit, 
  delete: deleteSet
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
  set.createdBy = req.params._id;
  set.popularity = 1;
  set.followedBy.push(req.user._id);
  req.user.save(function(err){
    set.save(function(err) {
      if (err) return res.redirect('/sets/new');
      res.redirect(`/sets/${set._id}`);
    });
  })
}

function show(req, res) {
  Set.findById(req.params.id, function(err, set) {
    res.render('sets/show', {title: `The Collabratory | ${set.title}`, set});
  });
}

function edit(req, res) {
  Set.findById(req.params.id, function(err, set) {
    if (set.followedBy.includes(req.user._id)) {
      const index = set.followedBy.indexOf(req.user._id);
      if (index > -1) {
        set.followedBy.splice(index, 1);
      }
    } else {
      set.followedBy.push(req.user.id);
    }
    set.save(function(err) {
      res.redirect('/');
    });
  }) 
}

function deleteSet(req, res) {
  Set.findByIdAndDelete(req.params.id, function(err, set) {
    res.redirect('/');
  });
}