const Set = require('../models/set');

module.exports = {
  create
}

function create(req, res) {
  Set.findById(req.params.id, function(err, set) {
    console.log("Wreck your body!", req.body);
    set.entries.push(req.body);
    set.save(function(err) {
      res.redirect(`/sets/${set._id}`);
    });
  });
}