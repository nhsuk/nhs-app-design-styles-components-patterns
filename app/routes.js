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

module.exports = router;
