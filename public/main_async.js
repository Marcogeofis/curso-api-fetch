// usando async await sin key
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
// usando una key
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
// Actualizando url para borrar
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=39e08c3d-6ed1-4f60-a56b-3f4341ac8163`;
// para subur una imagen con gatitos
const API_URL_FAVOURITES_UPLOAD = "https://api.thecatapi.com/v1/images/upload?api_key=39e08c3d-6ed1-4f60-a56b-3f4341ac8163";




const buttom = document.getElementById('cargar_gatitos');
buttom.addEventListener('click', loadRandomMichis);

const spanError = document.getElementById('Error');

async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log(data)
    console.log('random');
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un erro " + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;    
        img2.src = data[1].url;    

        
        btn1.onclick = () => saveFavouriteMichis(data[0].id);
        btn2.onclick = () => saveFavouriteMichis(data[1].id);
    }
    
}


// métodos http
//  GET -> pedir una solicitud al backend
//  POST -> crear cosas como información, usuarios etc
//  PUT Y PATCH -> ambos nos permite editar informacion que hallamos creados
//  DELETE -> eliminar información que no quieramos.

async function loadFavouriteMichis(){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '39e08c3d-6ed1-4f60-a56b-3f4341ac8163',
        }
    });
    const data = await res.json();
    console.log('favoritos');
    console.log(data);

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un erro " + res.status + data.message;
    }else {
            const section = document.getElementById('favoriteMichis');
        section.innerHTML= "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2)



        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn= document.createElement('button');
            const btnText = document.createTextNode('Sacar gatito a favoritos');

            img.src = michi.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = ()=> deleteFavouriteMichi(michi.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    } 

}

// guardar en favouritesMichis
async function saveFavouriteMichis(id){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '39e08c3d-6ed1-4f60-a56b-3f4341ac8163',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('save');
    console.log(res);

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un erro " + res.status + data.message;
    } else {
        console.log('Michi guardado en favoritos');
        loadFavouriteMichis();
    }
}


async function deleteFavouriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un erro " + res.status + data.message;
    } else {
        console.log('Michi eliminado de favoritos')
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_FAVOURITES_UPLOAD, {
        method: 'POST',
        headers:{
            // 'Content-Type':'multipart/form-data',
            'X-API-KEY': '39e08c3d-6ed1-4f60-a56b-3f4341ac8163',
        },
        body: formData,
    })


}
// reto agregar una imagen antes de subir un michi mio para asegurarnos que quieros ese michi
document.getElementById('fileMichi').onchange = function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        let preview = document.getElementById('preview')
        let michiImg = document.createElement('img');
        michiImg.src = reader.result;
        michiImg.style.width= "200px";
        preview.innerHTML = "";
        preview.append(michiImg);
    }
}

loadRandomMichis();
loadFavouriteMichis();


// ¿que son los header?

// Lecturas recomendadas

// API Headers - What Are They? Examples & More [Explained] - Apipheny

// https://apipheny.io/api-headers/

// HTTP headers - HTTP | MDN

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers