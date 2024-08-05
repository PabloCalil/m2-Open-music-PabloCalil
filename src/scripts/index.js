import { applyInputRangeStyle } from "./inputRange.js";
import {albumList} from "./albunsDataBase.js"

function routine() {
    applyInputRangeStyle(); 
}

routine();

function createCard(albuns){
    const albumContainer = document.querySelector('.albuns__container')
    removeHtmlAlbuns();

    albuns.forEach(album => {
        const card = document.createElement('div');
        card.classList.add('albuns');

        const cardImg = document.createElement('img');
        cardImg.classList.add('albun-img')
        cardImg.src = album.img;
        cardImg.alt = album.title;

        const albumName = document.createElement('h2');
        albumName.classList.add('albun-name'); 
        albumName.innerHTML = album.title;

        const descript = document.createElement('div'); 
        descript.classList.add('albun-descript');

        const band = document.createElement('p')
        band.innerHTML = album.band; 
        
        const genre = document.createElement('p'); 
        genre.innerHTML = album.genre

        const albumPrice = document.createElement('div')
        albumPrice.classList.add('albun-price'); 

        const price = document.createElement('h6'); 
        price.innerHTML = `R$ ${album.price}`

        const buyButton = document.createElement('button'); 
        buyButton.classList.add('buy--button'); 
        buyButton.innerHTML = 'Comprar';

        albumContainer.appendChild(card); 
        card.appendChild(cardImg);
        card.appendChild(albumName); 
        card.appendChild(descript); 
        card.appendChild(albumPrice);
        descript.appendChild(band); 
        descript.appendChild(genre); 
        albumPrice.appendChild(price); 
        albumPrice.appendChild(buyButton);
 
    });
}

createCard(albumList);

function removeHtmlAlbuns(){
    const htmlAlbuns = document.querySelectorAll('.albuns');

    htmlAlbuns.forEach(album =>{
        album.remove(); 
    })
}

