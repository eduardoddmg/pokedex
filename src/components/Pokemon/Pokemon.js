import React from "react";
import { useState, useEffect } from "react";
import "./pokemon.css";
import { Link } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";


const Pokemon = () => {
  const [info, setInfo] = useState(null);

  const fetching = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000")
      .then((response) => response.json())
      .then((data) => setInfo(() => data.results))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetching();
  }, [info]);

  return (
    <>
      {!info && (
        <section className="espera">
          <FaSyncAlt className="loading" />
          <p>Aguarde enquanto os dados carregam</p>
        </section>
      )}
      {info && (
        <h1 className="titulo">
          {" "}
          <img
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            alt="logo"
          />{" "}
          Pokedex
        </h1>
      )}
      <div className="container_principal">
        {info &&
          info.map((value, index) => {
            return (
              <Link
                key={index}
                className="container_pokemon"
                to={`principal/${index + 1}`}
              >
                <h1>{value.name}</h1>
                <img
                  src={
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
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
