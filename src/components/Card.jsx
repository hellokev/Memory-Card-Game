import { useState } from 'react';

function Card() {

    const [pokemonImages, setPokemonImages] = useState([]);

    async function fetchPokemonImages() {
        try {
            const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
            const data = await resp.json();
            const pokemons = data.results;

            const images = [];
            for (const pokemon of pokemons) {
                const pokeResp = await fetch(pokemon.url)
                const pokeData = await pokeResp.json();
                const imageUrl = pokeData.sprites.front_default;
                images.push(imageUrl);
            }
            setPokemonImages(images);
        } catch (error) {
            console.error('Error fetch Pokemon images:', error);
        }
    }
    
    fetchPokemonImages();

    return (
        <div>
            {pokemonImages.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Pokemon ${index + 1}`} />                
            ))}
        </div>
    );
}

export default Card;
