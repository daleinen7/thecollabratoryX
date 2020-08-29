const User = require('../models/user');

module.exports = {
  edit
}

function edit(req, res) {
  // if req.params.id is in req.user.followedSets remove it
  // const user = req.user.followedSets.splice(req.params.id, 1);
  
  req.user.followedSets.push(req.params.id);
  
  // if (req.user.followedSets.some(req.params.id)) {
  //   console.log(" it");
  //   const user = req.user.followedSets.splice(req.params.id, 1);
  // // else add it to req.user.followedSets
  // } else {
  //   console.log(" you");
  //   req.user.followedSets.push(req.params.id);
  // }
  req.user.save(function(err){
    if (err) return res.redirect('/sets/new'); ///////////// FIX THIS
    res.redirect(`/`);
  })
}