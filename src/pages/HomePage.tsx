import { Loading } from '../components/Loading';
import { usePokemon } from '../hooks/usePokemon'
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';
import { useState } from 'react';

export const HomePage = () => {

    const { isLoading, pokemons } = usePokemon();
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');

    // Buscamos pokemon por nombre
    const filtrar = pokemons.filter( poke => poke.name.includes( search ) );

    // Filtramos a todos los pokemon en 5 resultados por pagina
    const filteredPokemons = (): Pokemon[] => {

        if( search.length === 0 ) 
            return pokemons.slice( currentPage, currentPage + 5);

        // Si hay algo en la caja de texto
        const filtered = filtrar;
        return filtered.slice( currentPage, currentPage + 5 );

    }

    // Avanzamos en paginacion
    const nextPage = () => {
        if( filtrar.length > currentPage + 5 )
        setCurrentPage( currentPage + 5 );

    }

    // Regresamos en paginacion 
    const previusPage = () => {
        if ( currentPage > 0)
        setCurrentPage( currentPage - 5 );
    }

    const onSearchChange = ( { target }: React.ChangeEvent<HTMLInputElement> ) => {

        // Regresa a la pagina 0 cuando se escribe en el input
        setCurrentPage(0);
        // Lee lo que escribimos
        setSearch( target.value );

    }

    return (
        <div className="mt-5">
            
            <h1>Listado de pokemons</h1>
            <hr/>

            <input 
                type="text"
                className="mb-2 form-control"
                placeholder="Buscar Pokémon"
                value={ search }
                onChange={ onSearchChange }
            />

            <button 
                className="btn btn-primary"
                onClick={ previusPage }
            >
                Anteriores
            </button>
            &nbsp;
            <button 
                className="btn btn-primary"
                onClick={ nextPage }
            >
                Siguientes
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 100 }}>ID</th>
                        <th style={{ width: 150 }}>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPokemons().map( ({ id, name, pic }) => (
                            <tr key={ id }>
                                <td>{ id }</td>
                                <td>{ name }</td>
                                <td>
                                    <img src={ pic } alt={ name } style={{ height: 75 }}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                isLoading && <Loading />
            }
        </div>
    )
}
