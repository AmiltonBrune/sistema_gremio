var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  if(req.query.fail)
    res.render('signup', {message: 'Falha no cadastro do usuário!'});
  else
    res.render('signup', {message:null});
});

/* POST users */
router.post('/signup', function(req, res, next){
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var nomeUsuario = req.body.username;
  var senha = req.body.password;
  var email = req.body.email;
  db.createUser(nome, sobrenome, nomeUsuario, senha, email, (err, result) => {
    if(err) return res.redirect('/users/signup?fail=true');
    else{
      var text = 'Obrigado por se cadastrar {fulano}, sua senha é {senha}';
      text = text.replace('{fulano}', nomeUsuario).replace('{senha}', senha);
      require('../mail')(email, 'Cadastro realizado com sucesso!', text);
    };
  });
});

/* POST forgot */
router.post('/forgot', function(req, res, next){
  var email = req.body.email;
  db.resetPassword(email, (err, result, newPassword) => {
    if(err) {
      console.log(err);
      return res.redirect('/login?reset=true');
    }
    else{
      console.log(result);
      var text = `Olá,sua nova senha é ${newPassword}. Sua senha antiga, não funciona mais!`;
      require('../mail')(email, 'Sua senha foi alterada!', text);
    }
  })
})

/** GET forgot */
router.get('/forgot', function(req, res, next){
  res.render('forgot', {});
});

module.exports = router;
