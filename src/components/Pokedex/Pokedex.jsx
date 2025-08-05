import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";

import './Pokedex.css';
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex(){

    const[searchTerm, setSearchTerm] = useState('');

    return (
        <div className="pokedex-wrapper">
            <Search updateSearchTerm = {setSearchTerm}/>

            {(!searchTerm) ? <PokemonList /> : <div><PokemonDetails key={searchTerm} pokemonName={searchTerm}/></div>}
        </div>
    );

}


export default Pokedex;