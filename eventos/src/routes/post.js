const express = require('express');
const router = express.Router();
const db = require('../db');
var upload = require('./upload');
/* GET home page. */
router.get('/', global.authenticationMiddleware(), function (req, res) {
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  var foto = req.user.path;
  db.todosPosts((e, docs) => {
    if (e) { return console.log(e) }
    res.render('post', { title: 'Posts', docs: docs, nome: nome, sobrenome: sobrenome, foto: foto});
  })
});


router.get('/cadastroPost', function (req, res, next) {
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  db.todasSalas((err, docs) => {
    if (err) { return console.log(err); }     
    res.render('cadastroPost', { title: 'Cadastrar Novo Post', docs: { "nome":"", "descricao":"", "data":"", "path":"" }, action: '/post/cadastroPost', docs: docs,nome: nome, sobrenome: sobrenome });
  })
});

router.post('/cadastroPost', function (req, res) {


  upload(req, res, (error) => {
    
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var dataAtual = new Date;
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var mes = meses[dataAtual.getMonth()];
    var dia = dataAtual.getDate();
    var data = dia + ' de ' + mes;
    var fullPath = "files/" + req.file.filename;
    var path = fullPath;
    db.adicionaPost({ nome, descricao, data, path}, (err, result) => {
      if (err) { return console.log(err); }
      res.redirect('/post');
    })
  });
});

router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  db.selecionaPost(id, (e, docs) => {
    if (e) { return console.log(e); }
    res.render('cadastroPost', { title: 'Edição de post', docs: docs[0], action: '/post/edit/' + docs[0]._id });
  });
});

router.post('/edit/:id', function (req, res) {
  upload(req, res, (error) => {
    var id = req.params.id;
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var dataAtual = (new Date).getTime();
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var mes = meses[dataAtual.getMonth()];
    var dia = dataAtual.getDate();
    var data = dia + ' de ' + mes;
    var fullPath = "files/" + req.file.filename;
    var path = fullPath;
  db.atualizaPost(id, { nome, descricao, data, path }, (e, result) => {
    if (e) { return console.log(e); }
    res.redirect('/post');
  });
});
});

router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  db.excluiPost(id, (e, r) => {
    if (e) return console.log(e);
    res.redirect('/post');
  });
});

router.get('/todospost', function (req, res) {
  db.todosPosts((e, docs) => {
    if (e) { return console.log(e); }
    res.json(docs);
        res.end();
  })
})
module.exports = router;

