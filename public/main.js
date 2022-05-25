// haciendo la petición con promise

const URL = "https://api.thecatapi.com/v1/images/search";


// llamando la funcion desde el html con onclick para ello el button de tenereste metodo 
function cargarGatitos(){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    })
}
