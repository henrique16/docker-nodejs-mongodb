const controller = require("../controller/projetoController");

module.exports = function handleRoutes(app) {
    app.post('/projeto', controller.insertProjeto);
    app.put("/projeto/:id", controller.updateProjeto);
    app.get("/projetos", controller.getProjetos);
    app.get("/projeto/:id", controller.getProjeto);
    app.delete("/projeto/:id", controller.deleteProjeto);
};