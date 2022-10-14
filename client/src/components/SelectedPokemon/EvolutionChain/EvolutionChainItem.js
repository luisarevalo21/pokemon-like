import React from "react";
import "./EvolutionChain.css";
const EvolutionChainItem = props => {
  // console.log("props", props);
  const { name, dexnumber, type1, type2 } = props;
  const center = type2 == null ? "center" : null;

  const handlePokemonEvoClicked = () => {
    console.log("dex number", dexnumber);
    props.handlePokemonEvoClicked(dexnumber);
  };
  return (
    <div className="evolution-chain-item" onClick={handlePokemonEvoClicked}>
      <div className="evo-image-container">
        <img src={props.image} alt="pokemon" className="pokemon-evo-image" />
      </div>
      <div className="pokemon-details">
        <p className="pokemon-number">
          {name} #{dexnumber}
        </p>

        <div className={`types ${center}`}>
          <span className={type1}>{type1}</span>
          {type2 !== null ? <span className={type2}>{type2}</span> : null}{" "}
        </div>
      </div>
      {/* <div>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div> */}
    </div>
  );
};

export default EvolutionChainItem;
