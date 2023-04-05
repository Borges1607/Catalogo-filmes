class Ator{
    constructor(id, nome){
        this.nome = nome;
        this.id = id;
    }
}

class Diretor{
    constructor(id, nome){
        this.nome = nome;
        this.id = id;
    }
}

class Filme{
    constructor(id, titulo, ano, genero, duracao, sinopse, cartaz, direcao, elenco, classificacao, avaliacao){
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.duracao = duracao;
        this.sinopse = sinopse;
        this.cartaz = cartaz;
        this.direcao = direcao;
        this.elenco = elenco;
        this.classificacao = classificacao;
        this.avaliacao = avaliacao;
        this.btnDetalhes = null;
    }

    getCard = async () =>{
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let imgCartaz = document.createElement("img");
        imgCartaz.setAttribute("class", "card-img-topz");
        imgCartaz.setAttribute("src", this.cartaz);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let hCardTitle = document.createElement("h5");
        hCardTitle.setAttribute("class", "card-title");
        hCardTitle.appendChild(document.createTextNode(this.titulo));

        let divDetalhes = document.createElement("div");
        divDetalhes.setAttribute("style", "display: flex; justify-content: space-around; text-align: center;");

        let divGenero = document.createElement("div");
        divGenero.setAttribute("style", "flex-grow:0.5;");
        divGenero.appendChild(document.createTextNode(this.genero));

        let divAnoProducao = document.createElement("div");
        divAnoProducao.setAttribute("style", "flex-grow:1.5;");
        divAnoProducao.appendChild(document.createTextNode(this.ano));

        let divClassificacao = document.createElement("div");
        divClassificacao.setAttribute("style", "flex-grow:0.75;");
        divClassificacao.appendChild(document.createTextNode(this.classificacao));
        divDetalhes.appendChild(divGenero);
        divDetalhes.appendChild(divAnoProducao);
        divDetalhes.appendChild(divClassificacao);

        card.appendChild(imgCartaz);
        card.appendChild(cardBody);
        cardBody.appendChild(hCardTitle);
        cardBody.appendChild(divDetalhes);
        this.setBtnDetalhes();
        cardBody.appendChild(this.getBtnDetalhes());
    
        return card;
    }

    getBtnDetalhes = () =>{
        return this.btnDetalhes;
    }

    

    getDetalhesFilme = () =>{
        let divDetalhesFilme = document.createElement("div");
        divDetalhesFilme.setAttribute("class", "div-detalhes-filme");
        let imagemDetalhes = document.createElement("img");
        imagemDetalhes.setAttribute("id", "imagem-detalhes");
        imagemDetalhes.setAttribute("src", this.cartaz);
        divDetalhesFilme.appendChild(imagemDetalhes);

        let divDetalhesCard = document.createElement("div");
        divDetalhesCard.setAttribute("id", "div-detalhes-card");
        divDetalhesFilme.appendChild(divDetalhesCard);

        let divTitulo = document.createElement("div");
        divTitulo.appendChild(document.createTextNode("Título: "+this.titulo));
        divDetalhesCard.appendChild(divTitulo);

        let divAno = document.createElement("div");
        divAno.appendChild(document.createTextNode("Ano: "+this.ano));
        divDetalhesCard.appendChild(divAno);

        let divGenero = document.createElement("div");
        divGenero.appendChild(document.createTextNode("Gênero: "+this.genero));
        divDetalhesCard.appendChild(divGenero);

        let divDuracao = document.createElement("div");
        divDuracao.appendChild(document.createTextNode("Duração: "+this.duracao));
        divDetalhesCard.appendChild(divDuracao);

        let divDirecao = document.createElement("div");
        divDirecao.appendChild(document.createTextNode("Direção: "+this.direcao));
        divDetalhesCard.appendChild(divDirecao);

        let divElenco = document.createElement("div");
        divElenco.appendChild(document.createTextNode("Elenco: "+this.elenco));
        divDetalhesCard.appendChild(divElenco);

        let divSinopse = document.createElement("div");
        divSinopse.appendChild(document.createTextNode("Sinopse: "+this.sinopse));
        divDetalhesCard.appendChild(divSinopse);

        let divAvaliacao = document.createElement("div");
        divAvaliacao.appendChild(document.createTextNode("Avaliação: "+this.avaliacao));
        divDetalhesCard.appendChild(divAvaliacao);

        let btnFechar = document.createElement("button");
        btnFechar.setAttribute("id", "btn-fechar");
        btnFechar.appendChild(document.createTextNode("Fechar"));
        divDetalhesFilme.appendChild(btnFechar);

        let btnSalvar = document.createElement("button");
        btnSalvar.setAttribute("id", "btn-salvar");
        btnSalvar.appendChild(document.createTextNode("Favoritar"));
        divDetalhesFilme.appendChild(btnSalvar);
        let btnExcluir = document.createElement("button");
        btnExcluir.setAttribute("id", "btn-excluir");
        btnExcluir.appendChild(document.createTextNode("Desfavoritar"));
        divDetalhesFilme.appendChild(btnExcluir);

        return divDetalhesFilme;
    }
    
    setBtnDetalhes = () =>{
        this.btnDetalhes = document.createElement("button");
        this.btnDetalhes.appendChild(document.createTextNode("Detalhes"));
        this.btnDetalhes.setAttribute("id", this.id);
        this.btnDetalhes.setAttribute("class", "btnDetalhesFilme");

    }
}