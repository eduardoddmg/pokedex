import React from "react";
import { useState, useEffect } from "react";
import "./pokemon.css";
import { Link } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";


const Pokemon = () => {
  const [info, setInfo] = useState(null);
  const [nameSearch, setNameSearch] = useState();

  const fetching = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898")
      .then((response) => response.json())
      .then((data) => setInfo(() => data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetching();
  }, []);



  const searchPokemon = (e) => {
    const searchTerm = e.target.value;
    setNameSearch(searchTerm);
    const filteredData = info.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(filteredData);
    setInfo(() => filteredData);
    if(info.length === 0) fetching();
  }

  return (
    <>
      {!info && (
        <section className="espera">
          <FaSyncAlt className="loading" />
          <p>Aguarde enquanto os dados carregam</p>
        </section>
      )}
      {info && (
        <div className="header_principal">
        <h1 className="titulo">
          {" "}
          <img
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            alt="logo"
            />{" "}
          Pokedex
        </h1>
        <input type="name" className="input_principal" placeholder="Digite um pokemon" value={nameSearch} onChange={searchPokemon}/>
        </div>
      )}
      <div className="container_principal">
        {info &&
          info.map((value, index) => {
            console.log(value)
            return (
              <Link
                key={index}
                className="container_pokemon"
                to={`principal/${index + 1}`}
              >
                <h1>{value.name}</h1>
                <img
                  src={
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${value.id}.png`
                  }
                  alt="img"
                />{" "}
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Pokemon;
