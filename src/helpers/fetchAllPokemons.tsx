import { pokemonApi } from '../api/pokemonApi'
import { FetchAllPokemonsResponse, Pokemon, SmallPokemon } from '../interfaces/fetchAllPokemonResponse';


export const fetchAllPokemons = async(): Promise<Pokemon[]> => {

    // Guardamos en una constante la llamada al api
    const resp = await pokemonApi.get<FetchAllPokemonsResponse>('/pokemon?limit=1500');
    const smallPokemonList = resp.data.results;
    
    return transformSmallPokemonIntoPokemon( smallPokemonList );
}

const transformSmallPokemonIntoPokemon = ( smallPokemonList: SmallPokemon[] ): Pokemon[] => {

    // Devolvemos un nuevo arreglo con los datos
    const pokemonArr: Pokemon[] = smallPokemonList.map( poke => {

        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`

        return {
            id,
            name: poke.name,
            pic
        }
    });

    return pokemonArr;

}
