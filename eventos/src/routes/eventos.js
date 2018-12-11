const express = require('express');
const router = express.Router();
const db = require('../db');
var upload = require('./upload');
/* GET home page. */
router.get('/', global.authenticationMiddleware(), function (req, res) {
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  var foto = req.user.path;
  db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    db.todasSalas((err, doc) => {
      if (err) { return console.log(err); }
      db.todosUsuariosCadastrados((err, usuarios) => {
        if (err) { return console.log(err); }
        res.render('eventos', { title: 'Eventos', usuarios: usuarios, docs: docs, nome: nome, sobrenome: sobrenome, foto: foto, doc: doc });
      });    
    });
  });
});


router.get('/cadastroEvento', function (req, res, next) {
  var nome = req.user.nome;
  var sobrenome = req.user.sobrenome;
  db.todasSalas((err, docs) => {
    if (err) { return console.log(err); }     
    res.render('cadastroEvento', { title: 'Cadastrar Novo Evento', doc: { "nome": "", "descricao": "", "data": "", "estado": "" }, action: '/eventos/cadastroEvento', docs: docs,nome: nome, sobrenome: sobrenome });
  })
});

router.post('/cadastroEvento', function (req, res) {


  upload(req, res, (error) => {
    
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var myDate = req.body.data;
    myDate = myDate.split("-");
    var newDate = myDate[0] + "/" + myDate[1] + "/" + myDate[2];
    var dataFinal = (new Date(newDate).getTime());
    var dtaCompra = new Date(dataFinal);
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var ano = dtaCompra.getFullYear();
    var mes = meses[dtaCompra.getMonth()];
    var dia = dtaCompra.getDate();
    var data = dia + ' de ' + mes + ' de ' + ano;
    var estado = req.body.estado;
    var fullPath = "files/" + req.file.filename;
    var path = fullPath;
    var sala = req.body.sala;
    db.insert({ nome, descricao, data, estado, path, sala }, (err, result) => {
      if (err) { return console.log(err); }
      res.redirect('/eventos');
    })
  });
});

router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  db.findOne(id, (e, docs) => {
    if (e) { return console.log(e); }
    res.render('cadastroEvento', { title: 'Edição de Eventos', doc: docs[0], action: '/eventos/edit/' + docs[0]._id });
  });
});

router.post('/edit/:id', function (req, res) {
  upload(req, res, (error) => {
  var id = req.params.id;
  var nome = req.body.nome;
    var descricao = req.body.descricao;
    var myDate = req.body.data;
    myDate = myDate.split("-");
    var newDate = myDate[0] + "/" + myDate[1] + "/" + myDate[2];
    var dataFinal = (new Date(newDate).getTime());
    var dtaCompra = new Date(dataFinal);
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var ano = dtaCompra.getFullYear();
    var mes = meses[dtaCompra.getMonth()];
    var dia = dtaCompra.getDate();
    var data = dia + ' de ' + mes + ' de ' + ano;
    var estado = req.body.estado;
    var fullPath = "files/" + req.file.filename;
    var path = fullPath;
    var sala = req.body.sala;
  db.update(id, { nome, descricao, data, estado, path, sala }, (e, result) => {
    if (e) { return console.log(e); }
    res.redirect('/eventos');
  });
});
});

router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  db.deleteOne(id, (e, r) => {
    if (e) return console.log(e);
    res.redirect('/eventos');
  });
});

router.get('/todosEventos', function (req, res) {
  db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    res.json(docs);
        res.end();
  })
})
module.exports = router;

