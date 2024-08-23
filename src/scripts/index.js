import { applyInputRangeStyle } from "./inputRange.js";
import {albumList} from "./albunsDataBase.js"
import { fetchMusicData} from "./api.js";
import { toggleTheme, getInitialTheme, setTheme } from "./theme.js";


document.addEventListener("DOMContentLoaded", () => {
    applyInputRangeStyle();
    loadAlbuns();
    genreButtonClick();
  
    const customRange = document.getElementById("customRange");
    const priceValue = document.querySelector(".price--value");
  
    customRange.addEventListener("input", () => {
      const selectedPrice = parseInt(customRange.value);
      priceValue.innerHTML = `<span class="purple-letter">R$ ${selectedPrice}</span>`;
      filterPrice(selectedPrice);
    });
  });

async function loadAlbuns() {
    try{
        const musicData = await fetchMusicData(); 

        if (!musicData || musicData.length === 0){
            console.warn("nenhum dado retornado da API de músicas"); 
            return; 
        }

        musicData.sort((a, b) => b.price - a.price); 

        createCard(musicData); 
    } catch (error) {
        console.error("Erro ao carregar os álbuns:", error.message);
    }
}

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


function filterPrice(selectedPrice) {
    const albuns = document.querySelectorAll(".albuns");
  
    albuns.forEach((album) => {
      const priceText = album.querySelector("h6").textContent;
      const albumPrice = parseFloat(
        priceText.replace("R$ ", "").replace(",", ".")
      );
  
      if (albumPrice > selectedPrice) {
        album.style.display = "none";
      } else {
        album.style.display = "block";
      }
    });
  }

function genreButtonClick() {
    const genreButtons = document.querySelectorAll(".genrer-button");

    genreButtons.forEach((button) => {
        button.addEventListener("click", function() {
            genreButtons.forEach((btn) => btn.classList.remove("active")); 
            this.classList.add("active"); 

            const selectedGenre = this.dataset.genre;
            if (selectedGenre) {
                localStorage.setItem("selectedGenre", selectedGenre); 
            }
        });
    });

    const storedGenre = localStorage.getItem("selectedGenre"); 
    if(storedGenre) {
        const selectedButton = document.querySelector(`.genrer-button[data-genre="${storedGenre}"]`);

        if (selectedButton) {
            selectedButton.classList.add("active"); 
        }
    }
}