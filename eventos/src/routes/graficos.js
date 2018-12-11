const express = require('express');
const router = express.Router();
const db = require('../db');

/** GET forgot */
router.get('/', global.authenticationMiddleware(), function(req, res, next){
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      /* db.tamanhoEventos((e, doc)=>{
        if(e) { return console.log(e); } */
        res.render('graficos', { title: 'Gráficos', docs: docs, nome: nome, sobrenome: sobrenome });
    /*   }) */
  })
  });

module.exports = router;