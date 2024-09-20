import { useState, useEffect } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";
import { GetAllPokemons } from "../wailsjs/go/main/Pokemon";

interface Pokemon {
    id: number;
    name: string;
    // Add other fields if necessary
}

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    useEffect(() => {
        GetAllPokemons().then((data: any[]) => {
            const transformedData = data.map((item) => ({
                id: item.id,
                name: item.Name,
                // Map other fields if necessary
            }));
            setPokemons(transformedData);
        });
    }, []);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div>
                {pokemons.length > 0 ? (
                    <ul>
                        {pokemons.map((pokemon) => (
                            <li key={pokemon.id}>{pokemon.name}</li>
                        ))}
                    </ul>
                ) : (
                    <div>Loading Pokemons...</div>
                )}
            </div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </div>
    );
}

export default App;
