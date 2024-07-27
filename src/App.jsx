import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });

    data.map((pokemon, index) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setData((prevData) => {
            return [
              ...prevData,
              { name: data.name, url: data.sprites.front_default },
            ];
          });
        });
    });
  }, []);
  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl text-center">Pokemon</h1>
        <div className="grid grid-cols-3 gap-4 w-full">
          {data.map((pokemon, index) => {
            return (
              <div key={index} className="bg-gray-200 p-4 rounded-lg">
                <img src={pokemon.url} alt="" className="mx-auto" />
                <p className="text-center">{pokemon.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
