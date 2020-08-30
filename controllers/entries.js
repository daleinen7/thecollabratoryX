const Set = require('../models/set');

module.exports = {
  create,
  deleteEntry
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
  console.log('this works for sure');
  Set.findOne({'entries._id': req.params.id}, function(err, set) {
    const entrySubdoc = set.entries.id(req.params.id);
    entrySubdoc.remove();
    set.save(function(err) {
      res.redirect(`/sets/${set._id}`);
    });
  });
}