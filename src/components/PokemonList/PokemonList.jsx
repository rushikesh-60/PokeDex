import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    // const [pokemonList,setPokemonList] = useState([]);
    // const [isLoading,setIsLoading] = useState(true);
    // const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl,setNextUrl] = useState('');
    // const [prevUrl,setPrevUrl] = useState('');
    
    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
    });

    async function downloadPokemons(){
        // setIsLoading(false);
        setPokemonListState((state)=>({...state,isLoading:true}));
        const response = await axios.get(pokemonListState.pokedexUrl);// this downloads the list of 20 pokemons
        const pokemonResults = response.data.results; // we get the array of pokemons from result
        // console.log(pokemonResults);
        // setNextUrl(response.data.next);
        console.log(response.data.next,response.data.previous);
        setPokemonListState((state)=>({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }));
        // setPrevUrl(response.data.previous);
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));

        const pokemonData = await axios.all(pokemonResultPromise);
        // console.log(pokemonData);
        const res = pokemonData.map(pokeData=>{
            const pokemon = pokeData.data;
            // console.log(pokemon);
            return{
                id:pokemon.id,
                name:pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            };
        });
        // console.log(res);
        // setPokemonList(res);
        setPokemonListState((state)=>({
            ...state,
            pokemonList:res,
            isLoading:false
        }));
        // setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();

    },[pokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading)?'Loading ...':
                    pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>

            <div className="controls">
                <button disabled={(pokemonListState.prevUrl==null)} onClick={()=>{setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl})}}>Prev</button>
                <button disabled={(pokemonListState.nextUrl==null)} onClick={()=>{setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}}>Next</button>
            </div>
            
        </div>
    );
}

export default PokemonList;