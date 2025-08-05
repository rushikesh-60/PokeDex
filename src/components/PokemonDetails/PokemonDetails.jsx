import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails({pokemonName}){

    const {id} = useParams();
    const[pokemon,setPokemon] = useState({});

    async function downloadPokemon(){
        try{
                let response;
            if(pokemonName){
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            }
            else{
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const typeName = response.data.types[0].type.name;
            const pokemonsOfSimilarTypes = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
            // console.log("here is details ",response.data);
            setPokemon({
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t)=> t.type.name),
                similarPokemons:pokemonsOfSimilarTypes.data.pokemon
            })
        }
        catch(error){
            console.log("Something went wrong.",error.data);
        }
    }


    useEffect(()=>{
        downloadPokemon();
    },[]);

    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image}/>
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div  className="pokemon-details-name">Height: {pokemon.height}</div>
            <div  className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((p)=><div key={p}>{p}</div>)}
            </div>

            {
                pokemon.types && pokemon.similarPokemons &&
                <div>
                    more {pokemon.types[0]} type pokemons
                    <ul>
                        {pokemon.similarPokemons.map((p)=> <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
            }
            
        </div>
        
    );
}

export default PokemonDetails;