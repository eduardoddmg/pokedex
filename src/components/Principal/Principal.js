import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./principal.css";
import { FaSyncAlt } from "react-icons/fa";

const Principal = () => {
  const [dataText, setDataText] = useState(null);
  const [dataHability, setDataHability] = useState(null);
  let params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/ability/${params.id}`)
      .then((response) => response.json())
      .then((data) => setDataText(Object.values(data.effect_entries[1].effect)))
      .catch((e) => console.log(e));
  }, [dataText]);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/characteristic/${params.id}`)
      .then((response) => response.json())
      .then((data) =>
        setDataHability(Object.values(data.descriptions[7].description))
      )
      .catch((e) => console.log(e));
  }, [dataHability]);

  return (
    <>
      {(!dataHability || !dataHability) && (
        <section className="espera">
          <FaSyncAlt className="loading" />
          <p>Aguarde enquanto os dados carregam</p>
        </section>
      )}
      {(dataHability && dataText) && (
        <div className="principal">
          <img 
          src={
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`
                  }
            alt="pokemon img"
          />
          <p>{dataText}</p>
          <p>{dataHability}</p>
        </div>
      )}
    </>
  );
};

export default Principal;
