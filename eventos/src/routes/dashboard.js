const express = require('express');
const router = express.Router();
const db = require('../db');

/** GET forgot */
router.get('/', global.authenticationMiddleware(), function (req, res, next) {
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    db.qtdEventos((e, doc) => {
      if (e) { return console.log(e); }
      db.qtdPosts((e, post) => {
        if (e) { return console.log(e); }
        db.qtdUsuarios((e, usuario) => {
          res.render('index', { title: 'Tela Inicial', usuario:usuario,post: post, docs: docs, nome: nome, sobrenome: sobrenome, doc: doc });
        })
      })
    })
  })
});

module.exports = router;