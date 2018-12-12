const express = require('express');
const router = express.Router();
const db = require('../db');

/** GET forgot */
router.get('/', function(req, res, next){
  
  db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      db.todosPosts((e, doc)=>{
        if(e) { return console.log(e); }
        res.render('blog', { title: 'Blog', docs: docs,doc: doc });
      })
  })
  });

module.exports = router;