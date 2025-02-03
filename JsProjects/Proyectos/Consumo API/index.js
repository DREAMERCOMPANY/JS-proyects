const URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_ElVN7v31435gBlrPBh39LDnLk0ttBDhg5pj9GU9J5SI2rD0WEjc2qDvxhKEvUWjk'

/* fetch(URL)
.then(res => res.json())
.then(data =>{
    const michiImg = document.getElementById('michi-al')
    michiImg.src = data[0].url
    data[0].width = ''
    data[0].height = ''

    
    
    
    
}) */

async function getMichis(url) {
    const michisData = await fetch(url)
    const data = await michisData.json()
    console.log(data);
    
    const michiImg1 = document.getElementById('img-1')
    const michiImg2 = document.getElementById('img-2')
    const michiImg3 = document.getElementById('img-3')
    michiImg1.src = data[0].url
    michiImg2.src = data[1].url
    michiImg3.src = data[2].url
    
    michiImg1.style.display = 'block'
    michiImg2.style.display = 'block'
    michiImg3.style.display = 'block'
}

const btnMichi = document.getElementById('btn-get-michi')
btnMichi.addEventListener('click', ()=> getMichis(URL))

