const express = require('express');
const router = express.Router();
const db = require('../db');

/** GET forgot */
router.get('/', function (req, res, next) {
  /* var nome = req.user.nome;
  var sobrenome = req.user.sobrenome; */
  db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    res.render('eventosUsuario', { title: 'Usuários Eventos', docs: docs });
  })
});

router.post('/cadastroUsuarioEvento', function(req, res) {
  
    var evento = req.body.evento;
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone =  req.body.telefone;
    
    db.criarNovoUsuario({evento, nome, email, telefone}, (err, result) =>{
      if(err){ return console.log(err) };
        
      res.redirect('/eventosUsuario');
    });
})

module.exports = router;