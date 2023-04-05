let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let listaFilmes = document.querySelector("#listar-filmes");
let card = document.querySelector("#mostrar-filme");
let navFavoritos = document.querySelector("#nav-favoritos");

btnBuscarFilme.onclick = () =>{
if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("https://www.omdbapi.com/?apikey=b908047c&s="+inputBuscarFilme.value, {mode: "cors"})
        .then((resp) => resp.json())
        .then((resp) =>{
            resp.Search.forEach(item =>{
                console.log(item);
                let filme = new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    item.Type,
                    null,
                    null,
                    item.Poster,
                    null,
                    null,
                    null,
                    null
                );
                filmes.push(filme);
            });
            listarFilmes(filmes);
        })
    }
    card.style.display = "none";
    return false;
}

let listarFilmes = async(filmes) =>{
    document.querySelector("#listar-filmes").style.display = "flex";
            document.querySelector("#mostrar-filme").innerHTML = "";
            document.querySelector("#mostrar-filme").style.display = "none";
    let listaFilmes = await document.querySelector("#listar-filmes");
    listaFilmes.style.display = "flex";
    listaFilmes.innerHTML = "";
    document.querySelector("#mostrar-filme").innerhtml = "";
    if(filmes.length > 0){
        filmes.forEach(async(filme) =>{
            console.log(filme);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick = () =>{
                listaFilmes.style.display = "none";
                detalhesFilme(filme.id);
            }
        });
    }
}

let detalhesFilme = async(id) =>{
    document.querySelector("#listar-filmes").style.display = "flex";
    document.querySelector("#mostrar-filme").style.display = "none";
    fetch("https://www.omdbapi.com/?apikey=b908047c&i="+id)
    .then((resp) => resp.json())
    .then((resp) =>{
        console.log(resp);
        let filme = new Filme(
            resp.imdbID,
            resp.Title,
            resp.Year,
            resp.Genre.split(",  "),
            resp.Runtime,
            resp.Plot,
            resp.Poster,
            resp.Director,
            resp.Actors.split(",  "),
            resp.Awards,
            resp.imdbRating
        )
        card.style.display = "flex";
        card.appendChild(filme.getDetalhesFilme());

        document.querySelector("#btn-fechar").onclick = () =>{
            document.querySelector("#listar-filmes").style.display = "flex";
            document.querySelector("#mostrar-filme").innerHTML = "";
            document.querySelector("#mostrar-filme").style.display = "none";
        }

        document.querySelector("#btn-salvar").onclick = () =>{
            favoritarFilme(filme);
        }
        document.querySelector("#btn-excluir").onclick = () =>{
            desfavoritarFilme(filme);
        }

        let filmesString = localStorage.getItem("favoritos");
        let filmes = JSON.parse(filmesString);
        filmes = JSON.stringify(filmes);

        document.querySelector("#listar-filmes").style.display = "none";
        document.querySelector("#mostrar-filme").style.display = "flex";
    });
}



let favoritarFilme = (filme) =>{
    let filmesString = localStorage.getItem("favoritos");
    let filmes = null;
    if(filmesString){
        filmes = JSON.parse(filmesString);
        filmes.push(filme);
    }
    else{
        filmes = [filme];
    }
    filmes = JSON.stringify(filmes);
    localStorage.setItem("favoritos", filmes);
}

function listarFavoritos(){
    document.querySelector("#listar-filmes").style.display = "flex";
    document.querySelector("#mostrar-filme").innerHTML = "";
    document.querySelector("#mostrar-filme").style.display = "none";
    document.querySelector("#mostrar-filme").style.display = "none";
    let favoritos = localStorage.getItem("favoritos");
    favoritos = JSON.parse(favoritos);
    let filmes = new Array();
    favoritos.forEach((item) =>{
        let filme = new Filme(
            item.id,
            item.titulo,
            item.ano,
            item.genero,
            item.duracao,
            item.cartaz,
            item.cartaz,
            item.direcao,
            item.elenco,
            item.classificacao,
            item.avaliacao
        );
        filmes.push(filme);
    });
    listarFilmes(filmes);
}

let desfavoritarFilme = (filme) =>{
    let filmesString = localStorage.getItem("favoritos");
    let filmes = null;
    if(filmesString){
        filmes = JSON.parse(filmesString);
        for(let i = 0; i < filmes.length; i++){
            if(filmes[i].id === filme.id){
                filmes.splice(i, 1);
                break;
            }
        }
    }
    filmes = JSON.stringify(filmes);
    localStorage.setItem("favoritos", filmes);
}

navFavoritos.onclick = () =>{
   listarFavoritos();
}