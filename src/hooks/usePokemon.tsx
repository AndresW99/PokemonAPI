import { useEffect, useState } from 'react';
import { fetchAllPokemons } from '../helpers/fetchAllPokemons';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';

export const usePokemon = () => {

    const [ isLoading, setisLoading ] = useState(true);
    const [ pokemons, setPokemons ] = useState<Pokemon[]>([]);

    useEffect(() => {
        
        // Carga de los pokemons
        fetchAllPokemons()
            .then( pokemons => {
                setisLoading(false);    //En false porque ya cargaron
                setPokemons( pokemons ); 
            })
    }, [])

    return {
        isLoading,
        pokemons
    }

}