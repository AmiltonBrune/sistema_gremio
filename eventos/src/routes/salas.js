const express = require('express');
const router = express.Router();
const db = require('../db');
var upload = require('./upload');
/* GET home page. */
router.get('/', global.authenticationMiddleware(), function (req, res) {
    var nome = req.user.nome;
    var sobrenome = req.user.sobrenome;
    var foto = req.user.path;
    db.todasSalas((e, docs) => {
        if (e) { return console.log(e); }
        res.render('salas', { title: 'Lista de salas', docs: docs, nome: nome, sobrenome: sobrenome, foto: foto });
        console.log(foto);

    });
});


router.get('/cadastroSala', function (req, res, next) {
    var nome = req.user.nome;
    var sobrenome = req.user.sobrenome;
    res.render('cadastroSala', { title: 'Nova sala',nome,sobrenome, doc: { "nome": "", "quantidadePessoas": "", "path": "", "caption": "", "descricaoSala": "" }, action: '/salas/cadastroSala' });
});

router.post('/cadastroSala', function (req, res) {


    upload(req, res, (error) => {
        /**
         * Create new record in mongoDB
         */
        var nome = req.body.nome;
        var quantidadePessoas = req.body.quantidadePessoas;
        var localizacao = req.body.localizacao;
        var fullPath = "files/" + req.file.filename;
        var path = fullPath;
        var descricaoSala = req.body.descricaoSala;
        db.adicionarNovaSala({ nome, quantidadePessoas, localizacao, path, descricaoSala }, (err, result) => {
            if (err) { return console.log(err); }
            res.redirect('/salas');
        })
    });



});

router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    db.selecionarSala(id, (e, docs) => {
        if (e) { return console.log(e); }
        res.render('cadastroSala', { title: 'Edição de salas', doc: docs[0], action: '/salas/edit/' + docs[0]._id });
    });
});

router.post('/edit/:id', function (req, res) {
    upload(req, res, (error) => {
        var id = req.params.id;
        var nome = req.body.nome;
        var quantidadePessoas = req.body.quantidadePessoas;
        var localizacao = req.body.localizacao;
        var fullPath = "files/" + req.file.filename;
        var path = fullPath;
        var descricaoSala = req.body.descricaoSala;
    db.atualiazarSala(id, { nome, quantidadePessoas, localizacao, path, descricaoSala }, (e, result) => {
        if (e) { return console.log(e); }
        res.redirect('/salas');
    });
});
});

router.post('/atualizar/:nome', function(req, res) {
    var nome = req.params.nome;
    var situacao = req.body.situacao;
    db.selecionarSalaPorNome(nome,{ situacao }, (e, result) => {
        if(e){ return console.log(e); }
        res.redirect('/eventos');
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    db.deletarSala(id, (e, r) => {
        if (e) return console.log(e);
        res.redirect('/salas');
    });
});


8
9


router.get('/todasSalas', function (req, res, next) {
    db.todasSalas((e, docs) => {
        if (e) { return console.log(e); }
        res.json(docs);
        res.end();
    });
});
module.exports = router;


