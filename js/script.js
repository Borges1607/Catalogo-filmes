let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let mostrarFilme = document.getElementById("mostrar-filme");
let btnFechar = document.getElementById("btnfecha");
let imgCartaz= document.createElement("img");
let card = document.querySelector("#lista-filmes");

btnBuscarFilme.onclick = async () => {
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=b908047c&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp) => resp.json())
        .then((resp) => {
            resp.Search.forEach((item) => {
                console.log(item);
                let filme=new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    null,
                    null,
                    item.Poster,
                    null,
                    null,
                    null,
                    null,
                    null
                )
                filmes.push(filme);
            })
            listarFilmes(filmes);
        })
    }
    return false;
}

let listarFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.style.display ="flex";
    listaFilmes.innerHTML = "";
    if(filmes.length > 0){
        filmes.forEach(async(filme) => {
            console.log(filme);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                 detalhesFilme(filme.id);
            }
        });
    }
}

let detalhesFilme = async (id) => {
    fetch("http://www.omdbapi.com/?apikey=b908047c&i="+id)
    .then ((resp) => resp.json())
    .then ((resp)=> {
        console.log(resp);
        let filme=new Filme(
            resp.imbdID,
            resp.Title,
            resp.Year,
            resp.Genre.split(","),
            resp.Runtime,
            resp.Poster,
            resp.plot,
            resp.Director,
            resp.Actors.split(","),
            resp.Awars,
            resp.imdbRating
        )
        document.querySelector("#mostrar-filme").appendChild(filme.getDetalhesFilme());
        document.querySelector("#lista-filmes").style.display="none";
        document.querySelector("#mostrar-filme").style.display="flex";
    });
}  

