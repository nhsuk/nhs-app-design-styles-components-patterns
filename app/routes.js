// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

// Adding "query" to every page. There could be a better implementaion using middleware. 
// in nunjkucks you can call {{query[key]}}

router.get('*', function(req, res) {
  let path = req.params[0]
  let pathEnd = path.slice(-1)
  let newPath = path.substring(1)
  if (path == "/") {
    // Top home page
    path = "index"
  } else if (pathEnd == "/") {
    // Check if this is the route folder, if so, then render the index page.
    path = newPath + "index"
  } else {
    path = newPath
  }
  res.render(path, {
    "query": req.query,
  });
})

// GP Appointments - Appointment type
router.post('/pages/services/gp-appointment-type-answer', function (req, res) {

  var install = req.session.data['gp-appointment-type']

  if (install == "Routine GP"){
    res.redirect('/pages/services/gp-appointment-select-appointment-v4')
  } else if (install == "none") {
    res.redirect('/pages/services/gp-appointment-type')
  } else {
    res.redirect('/pages/services/gp-appointment-invite')
  }
})

// GP Appointments - Invited to this appointment?
router.post('/pages/services/gp-appointment-invite-answer', function (req, res) {

  var install = req.session.data['gp-appointment-invite']

  if (install == "No"){
    res.redirect('/pages/services/gp-appointment-type-not-available')
  } else {
    res.redirect('/pages/services/gp-appointment-select-appointment-v4')
  }
})

module.exports = router;
