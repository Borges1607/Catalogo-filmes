let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFIlme = document.querySelector("#input-buscar-filme");


let listarFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    console.log(listaFilmes);
    if(filmes.length > 0){
        filmes.forEach(async(filme) => {
            listaFilmes.appendChild(await filme.getCard());
        });
    }
}

btnBuscarFIlme.onclick = () => {
    
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=b908047c&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp) => resp.json())
        .then((resp) => {
            resp.Search.forEach((item) => {
                console.log(item)
                let filme=new Filme(
                    item.imdbId,
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


