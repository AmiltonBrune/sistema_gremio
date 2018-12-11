const bcrypt = require('bcryptjs');

function findAll(callback){  
    global.db.collection("eventos").find({}).toArray(callback);
};

function insert(evento, callback){
    global.db.collection("eventos").insert(evento, callback);
};

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.db.collection("eventos").find(new ObjectId(id)).toArray(callback);
};

function update(id, evento, callback){
    global.db.collection("eventos").update({_id:new ObjectId(id)}, evento, callback);
};

function deleteOne(id, callback){
    global.db.collection("eventos").deleteOne({_id: new ObjectId(id)}, callback);
}

function qtdEventos(callback){
    global.db.collection("eventos").count(callback);
}

function createUser(nome, sobrenome,username, password, email, callback){
    const cryptoPassword = bcrypt.hashSync(password, 10);
    global.db.collection("users").insert({nome, sobrenome,username, password: cryptoPassword, email}, callback);
}

function resetPassword(email, callback){
    const utils = require('./utils');
    const newPassword = utils.generatePassword();
    const cryptoPassword = bcrypt.hashSync(newPassword, 10);
    global.db.collection("users").updateOne({email: email}, { $set: {password: cryptoPassword }}, (err, res) => {
        callback(err, res, newPassword);
    });
}


function todasSalas(callback){  
    global.db.collection("salas").find({}).toArray(callback);
};

function adicionarNovaSala(evento, callback){
    global.db.collection("salas").insert(evento, callback);
};

var ObjectId = require("mongodb").ObjectId;
function selecionarSala(id, callback){  
    global.db.collection("salas").find(new ObjectId(id)).toArray(callback);
};

var ObjectNome = require('mongodb').ObjectNome;
function selecionarSalaPorNome(nome, callback) {
    global.db.collection("salas").find(new ObjectNome(nome)).toArray(callback);
}

function atualiazarSala(id, evento, callback){
    global.db.collection("salas").update({_id:new ObjectId(id)}, evento, callback);
};

function deletarSala(id, callback){
    global.db.collection("salas").deleteOne({_id: new ObjectId(id)}, callback);
}

function criarNovoUsuario(usuarioEvento, callback){
    global.db.collection("usuariosEvento").insert(usuarioEvento, callback);
}

function todosUsuariosCadastrados(callback){  
    global.db.collection("usuariosEvento").find({}).toArray(callback);
};


/* Posts */

function todosPosts(callback){  
    global.db.collection("post").find({}).toArray(callback);
};

function retornaApenasAlgunsPosts(callback){
    global.db.collection("post").find().limit(4, callback);
};

function adicionaPost(evento, callback){
    global.db.collection("post").insert(evento, callback);
};

var ObjectId = require("mongodb").ObjectId;
function selecionaPost(id, callback){  
    global.db.collection("post").find(new ObjectId(id)).toArray(callback);
};

function atualizaPost(id, evento, callback){
    global.db.collection("post").update({_id:new ObjectId(id)}, evento, callback);
};

function excluiPost(id, callback){
    global.db.collection("post").deleteOne({_id: new ObjectId(id)}, callback);
}

function qtdPosts(callback){
    global.db.collection("post").count(callback);
}

function qtdUsuarios(callback){
    global.db.collection("usuariosEvento").count(callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne, 
    createUser, resetPassword, todasSalas, adicionarNovaSala, 
    selecionarSala,deletarSala, atualiazarSala, 
    selecionarSalaPorNome, qtdEventos, criarNovoUsuario,
    todosPosts, adicionaPost, selecionaPost, atualizaPost,
    excluiPost, qtdPosts, retornaApenasAlgunsPosts, todosUsuariosCadastrados,
    qtdUsuarios
}
    