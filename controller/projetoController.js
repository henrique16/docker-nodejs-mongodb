const ProjetoModel = require("../model/projetoModel"),
    responseModel = require("../model/responseModel");

function insertProjeto(req, res, next) {
    const projeto = new ProjetoModel({
        img: {value: req.body.img, name: "Imagem"},
        titulo: {value: req.body.titulo, name: "Título"},
        texto: {value: req.body.texto, name: "Texto"}
    });
    projeto.save((err, response) => {
        if (err) {
            return res.json(400, err);
        }
        responseModel.data = response;
        responseModel.message = "Projeto gravado";
        return res.json(200, responseModel);
    });
};

function updateProjeto(req, res, next) {
    ProjetoModel.findById(req.params.id, (err, projeto) => {
        if (err) {
            return res.json(400, err);
        }
        if (req.body.img.trim()) projeto.img = {value: req.body.img, name: "Imagem"};
        if (req.body.titulo.trim()) projeto.titulo = {value: req.body.titulo, name: "Título"};
        if (req.body.texto.trim()) projeto.texto = {value: req.body.texto, name: "Texto"};
        projeto.save((err, response) => {
            if (err) {
                return res.json(400, err);
            }
            responseModel.data = response;
            responseModel.message = "Atualizado com sucesso";
            return res.json(200, responseModel);
        });
    });
};

function deleteProjeto(req, res, next) {
    ProjetoModel.findById(req.params.id, (err, projeto) => {
        if(err) {
            return res.json(400, err);
        }
        projeto.remove((err, response) => {
            if(err){
                return res.json(400, err);
            }
            responseModel.data = response;
            responseModel.message = "Deletado com sucesso";
            return res.json(200, responseModel);
        });
    });
};

function getProjetos(req, res, next) {
    ProjetoModel.find((err, response) => {
        if (err) {
            return res.json(400, err);
        }
        responseModel.data = response;
        responseModel.message = "Busca realizada com sucesso";
        return res.json(200, responseModel);
    });
};

function getProjeto(req, res, next) {
    ProjetoModel.findById(req.params.id, (err, projeto) => {
        if (err) {
            return res.json(400, err);
        }
        responseModel.data = projeto.toObject({ versionKey: false });
        responseModel.message = "Busca realizada com sucesso";
        return res.json(200, responseModel);
    });
};

module.exports = {
    insertProjeto, updateProjeto, getProjetos, getProjeto, deleteProjeto
};