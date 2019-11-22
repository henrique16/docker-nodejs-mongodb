const endereco = window.location.origin;

window.addEventListener("DOMContentLoaded", function () {
    new Projeto().render();
});

class Projeto {
    component(pData) {
        var comp = (
            `<table id="${Projeto.name}">
                <tbody>
                    <tr>
                        <th>Imagem</th>
                        <th>Titulo</th>
                        <th>Texto</th>
                        <th></th>
                        <th></th>
                    </tr>`
        );
        pData.forEach(element => {
            comp += (
                `<tr>
                    <td id="img">${element.img.value}</td>
                    <td id="titulo">${element.titulo.value}</td>
                    <td id="texto">${element.texto.value}</td>
                    <td><i class="far fa-edit" onclick="new Editar().render(event)"></i></td>
                    <td>
                        <i class="far fa-window-close" onclick=""></i>
                    </td>
                    <input id="_id" type="hidden" value="${element._id}" />
                </tr>`
            );
        });
        comp += (`</tbody></table>`);
        return comp;
    };

    getProjetos(pEvent = null) {
        new ProjetoService().getProjetos()
            .then((e) => {
                return e.json();
            }).then((res) => {
                const comp = new Projeto().component(res.data);
                const divTable = document.getElementById("div-table");
                if (divTable !== null) {
                    render(divTable, comp, pEvent);
                }
            }).catch((err) => {
                alert(err.message);
            });
    };

    render(pEvent = null) {
        this.getProjetos(pEvent);
    };
};

class Gravar {
    component() {
        return (
            `<div id="${Gravar.name}" class="div-pop">
                <div id="div-campos-gravar" class="div-pop-campos">
                    <input id="img" class="mr-bott projeto-model" type="text" placeholder="Img" />
                    <input id="titulo" class="mr-bott projeto-model" type="text" placeholder="titulo" />
                    <input id="texto" class="mr-bott projeto-model" type="text" placeholder="texto" />
                </div>
                <div id="div-btn-gravar">
                    <input type="submit" value="Gravar" onclick="new Gravar().insertProjeto(event)" />
                    <input type="submit" value="Cancelar" onclick="new Gravar().close()" />
                </div>
            </div>`
        );
    };

    getCamposProjeto() {
        const arrModel = Array.apply(null, document.getElementsByClassName("projeto-model"));
        var objReq = {};
        arrModel.forEach(element => {
            objReq[element.id] = element.value;
        });
        return objReq;
    };

    insertProjeto(pEvent = null) {
        const req = this.getCamposProjeto();
        new ProjetoService().insertProjeto(req)
            .then(e => {
                return e.json();
            }).then(res => {
                const projetos = document.getElementById(Projeto.name);
                if (projetos !== null) {
                    projetos.remove();
                }
                new Gravar().close();
                alert(res.message);
                new Projeto().render(pEvent);
            }).catch(err => {
                alert(err.message);
            });
    };

    close() {
        const gravar = document.getElementById(Gravar.name);
        if (gravar !== null) {
            gravar.remove();
        }
    };

    render(pEvent = null) {
        const gravar = document.getElementById(Gravar.name);
        if (gravar !== null) {
            gravar.remove();
        }
        render(document.body, this.component(), pEvent);
    };
};

class Editar {
    component() {
        return (
            `<div id="${Editar.name}" class="div-pop">
                <div id="div-campos-gravar" class="div-pop-campos">
                    <input id="img" class="mr-bott projeto-model" type="text" placeholder="Img" />
                    <input id="titulo" class="mr-bott projeto-model" type="text" placeholder="titulo" />
                    <input id="texto" class="mr-bott projeto-model" type="text" placeholder="texto" />
                    <input id="_id" class="projeto-model" type="hidden" />
                </div>
                <div id="div-btn-gravar">
                    <input type="submit" value="Editar" onclick="new Editar().updateProjeto(event)" />
                    <input type="submit" value="Cancelar" onclick="new Editar().close()" />
                </div>
            </div>`
        );
    };

    getCamposProjeto() {
        const arrModel = Array.apply(null, document.getElementsByClassName("projeto-model"));
        var objReq = {};
        arrModel.forEach(element => {
            objReq[element.id] = element.value;
        });
        return objReq;
    };

    getTr(pEvent) {
        var cont = 0;
        var tr = pEvent.target;
        for (let index = 0; index <= cont; index++) {
            if (tr.localName === "tr") {
                break;
            }
            else {
                tr = tr.parentElement;
                cont++;
            }
        }
        return tr;
    };

    popularCamposProjeto(pEvent) {
        debugger
        const tr = this.getTr(pEvent);
        const ch = Array.apply(null, tr.children);
        const arrModel = Array.apply(null, document.getElementsByClassName("projeto-model"));
        var objProjeto = {};
        ch.forEach(element => {
            if(element.id === "_id") {
                objProjeto[element.id] = element.value;    
            }
            else {
                objProjeto[element.id] = element.textContent;
            }
        });
        arrModel.forEach(e => {
            e.value = objProjeto[e.id];
        });
    };

    updateProjeto(pEvent = null) {
        debugger
        const objProjeto = this.getCamposProjeto();
    };

    close() {
        const editar = document.getElementById(Editar.name);
        if (editar !== null) {
            editar.remove();
        } 
    };

    render(pEvent = null) {
        const editar = document.getElementById(Editar.name);
        if (editar !== null) {
            editar.remove();
        }
        render(document.body, this.component(), pEvent);
        this.popularCamposProjeto(pEvent);
    };
};

class ProjetoService {
    getProjetos() {
        return fetch(`${endereco}/projetos`, { method: "GET", headers: { "Content-Type": "application/json" } });
    };

    getProjeto(pId) {
        return fetch(`${endereco}/projeto/${pId}`, { method: "GET", headers: { "Content-Type": "application/json" } });
    };

    insertProjeto(pRequest) {
        return fetch(`${endereco}/projeto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pRequest)
        });
    };
};

function render(pParent, pComponent, pEvent = null) {
    pParent.innerHTML += pComponent;
    if (pEvent !== null && pEvent !== undefined) {
        pEvent.stopPropagation();
    }
};