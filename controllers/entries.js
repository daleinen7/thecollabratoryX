const Set = require('../models/set');

module.exports = {
  create,
  deleteEntry,
  edit,
  update
}

function create(req, res) {
  Set.findById(req.params.id, function(err, set) {
    const entry = req.body;
    entry.description = entry.description.trim();

    set.entries.push(entry);
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
    res.render('entries/edit', {title: 'The Collabratory | Edit Entry', entry, set});
  })
}

function update(req, res) {
  Set.findOne({'entries._id': req.params.id}, function(err, set) {
    const entry = set.entries.id(req.params.id);
    if(!set.createdBy.equals(req.user._id)) return res.redirect(`/sets/${set._id}`);
    entry.category = req.body.category;
    entry.description = req.body.description;
    set.save(function(err) {
      res.redirect(`/sets/${set._id}`);
    });
  });
}