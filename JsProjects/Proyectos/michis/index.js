//Analizando fetch



//Se crea una instancia de la libreria Axios
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
})

//Se define que todos los headers tendran en comun una X-API-KEY

api.defaults.headers.common['X-API-KEY'] = 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_DELETE_FAVOURITE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

let spanError = document.getElementById('error');
console.log(spanError);


const btnRandomMichis = document.getElementById('reload-btn');
btnRandomMichis.addEventListener('click', loadRandomMichis);

/* async function loadRandomMichis() {
    
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log({'Random': data});
    
    console.log(res)
    console.log(res.status) 

    if(res.status !== 200){
        spanError.innerText = 'All good'
        
    }else{
        
        document.getElementById('img1').setAttribute('src', data[0].url)
        document.getElementById('img2').setAttribute('src', data[1].url)
        document.getElementById('btn1').addEventListener('click', ()=> saveFavouriteMichis(data[0].id))
        document.getElementById('btn2').addEventListener('click', ()=> saveFavouriteMichis(data[1].id))
    } 

  
    console.log(data)
} */


async function loadRandomMichis() {
        const res = await fetch(API_URL_RANDOM, {
            method: 'GET',
            headers:{
                'X-API-KEY': 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'
            }
        });
        const data = await res.json();
    
        console.log({'Random': data});
    
        if (res.status !== 200) {
            spanError.innerText = 'Ups, hubo un error: ' + res.status;
        } else {
            const img1 = document.getElementById('img1');
            const img2 = document.getElementById('img2');
            const btn1 = document.getElementById('btn1');
            const btn2 = document.getElementById('btn2');
    
            img1.setAttribute('src', data[0].url);
            img2.setAttribute('src', data[1].url);
    
            // Remover event listeners existentes reemplazando los botones
            const newBtn1 = btn1.cloneNode(true);
            const newBtn2 = btn2.cloneNode(true);
    
            newBtn1.addEventListener('click', () => saveFavouriteMichis(data[0].id));
            newBtn2.addEventListener('click', () => saveFavouriteMichis(data[1].id));
    
            btn1.replaceWith(newBtn1);
            btn2.replaceWith(newBtn2);
        }
}

loadRandomMichis();

async function loadFavouriteMichis() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers:{
            'X-API-KEY': 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'
        }
    });

    console.log(res.status)
    
    if(res.status !== 200){
        spanError.innerHTML = 'Ups, hubo un error: ' + res.status
    }else{
        spanError.innerHTML = 'Todo salio bien 😊'
        const data = await res.json();

        //Limpiar la seccion
        
        const section = document.getElementById('favouritesMichis')
        section.innerHTML = ''
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Favourites Cats')
        h2.appendChild(h2Text)
        section.appendChild(h2) 

        data.forEach(michi =>{

            //<article>
                //<img id="img3" alt="fav cat">
                //<button id="">Remove from favourites</button>
            //</article>
            
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Remove from favourites')

            //Acomodar los elementos
            btn.appendChild(btnText)
            btn.addEventListener('click', ()=> deleteFavouriteMichi(michi.id))
        
            img.src = michi.image.url
            img.width = 150
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
            
        })
        console.log({'favourites': data});
    }
    
}

async function saveFavouriteMichis(id){

    /* const {data, status} = await api.post('/favourites',{
        image_id: id
    }) */

    const {status, data} = await api.post('/favourites',{
        image_id: id
    })

    //console.log({'res': response});
    

    
        /* const res = await fetch(API_URL_FAVOURITES, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-API-KEY': 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'
            },
            body: JSON.stringify({
                image_id: id
            })
        }) */

         if(status !== 200){
            spanError.innerHTML = 'Ups, hubo un error: ' + res.status

        }else{
            spanError.innerHTML = 'Todo salio bien 😊'
            //const data = await res.json();
            console.log({'Saved Favourites': data});
            console.log({'respuesta': status})
            loadFavouriteMichis()

        } 
        
}

async function deleteFavouriteMichi(id){
    const res = await fetch(API_DELETE_FAVOURITE(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'
        }
    })

    if(res.status !== 200){
        spanError.innerHTML = 'Ups, hubo un error: ' + res.status

    }else{
        spanError.innerHTML = 'Todo salio bien 😊'
        console.log('Michi eliminado!');
        const data = await res.json();
        console.log({'Deleted Michi': data});
        loadFavouriteMichis()
        
    }
}


async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers:{
            'X-API-KEY': 'live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'
        },

        body: formData  
    })

    if(res.ok){
        console.log('foto subida')
        const data = await res.json()
        console.log(data)
        saveFavouriteMichis(data.id)
        loadFavouriteMichis()
    }else{
        console.log('Hubo un error :(');
        
    }

    console.log(formData.get('file'));
    
}
loadFavouriteMichis();




