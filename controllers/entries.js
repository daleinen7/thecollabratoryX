const Set = require('../models/set');

module.exports = {
  create,
  deleteEntry,
  edit
}

function create(req, res) {
  Set.findById(req.params.id, function(err, set) {
    set.entries.push(req.body);
    set.save(function(err) {
      res.redirect(`/sets/${set._id}`);
    });
  });
}

function deleteEntry(req, res) {
  Set.findOne({'entries._id': req.params.id}, function(err, set) {
    const entrySubdoc = set.entries.id(req.params.id);
    entrySubdoc.remove();
    set.save(function(err) {
      res.redirect(`/sets/${set._id}`);
    });
  });
}

function edit(req, res) {
  Set.findOne({'entries._id': req.params.id}, function(err, set) {
    // if the user did not create this entry then return back to the set
    if (!set.createdBy.equals(req.user._id)) return res.redirect(`/sets/${set._id}`);
    const entry = set.entries.id(req.params.id);
    console.log('why for? but ..');
    res.render('entries/edit', {title: 'The Collabratory | Edit Entry', entry, set});
  })
}