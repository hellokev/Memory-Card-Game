import { useEffect, useState } from 'react';

function Card() {

    const [pokemonImages, setPokemonImages] = useState([]);
    const [score, setScore] = useState(0);

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

    useEffect(() => {
        const shuffleImages = (pokeArr) => {
            // Fisher-Yates shuffle algorithm
            for (let i = pokeArr.length - 1; i > 0;  i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pokeArr[i], pokeArr[j]] = [pokeArr[j], pokeArr[i]] 
            }
            return pokeArr;
        }

        const shuffle = shuffleImages([...pokemonImages]);
        setPokemonImages(shuffle);
    }, [score])
    
    const handleScore = () => {
        setScore(score + 1);
    }
    useEffect(() => {
        fetchPokemonImages();
    }, [])

    return (
        <div>
            {pokemonImages.map((imageUrl, index) => (
                <img 
                    key={index} 
                    src={imageUrl} 
                    alt={`Pokemon ${index + 1}`}
                    onClick={() => handleScore(index)} 
                />                
            ))}
            <h1>{score}</h1>
        </div>
    );
}

export default Card;
