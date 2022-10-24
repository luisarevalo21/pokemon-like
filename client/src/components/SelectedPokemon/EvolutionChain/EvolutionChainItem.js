import React from "react";
import "./EvolutionChain.css";
import { useNavigate } from "react-router-dom";
const EvolutionChainItem = props => {
  // console.log("props", props);
  const navigate = useNavigate();

  // console.log("props inside chain", props);
  const { name, dexnumber, type1, type2, index, image, length } = props;
  // console.log(dexnumber);
  const center = type2 == null ? "center" : null;

  const icon =
    index <= 1 && index < length ? (
      <div className="icon">
        {/* <p> {props.evolutionTrigger}</p>{" "} */}
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
    ) : null;

  const handleEvolutionClicked = () => {
    navigate(`/pokemon/${dexnumber}`);
  };
  return (
    //places items into respective grid placement
    <div className={`evolution-details topRow${index + 1}`}>
      <div className="evolution-container-item">
        <div className="evolution-container-details">
          <div
            className="evo-image-container "
            onClick={handleEvolutionClicked}
          >
            <img alt="pokemon" src={image} className="pokemon-evo-image" />
          </div>
          <div className="pokemon-number-header">
            <p>
              {name} | #{dexnumber}
            </p>
          </div>
          <div className={`types ${center}`}>
            <span className={type1}>{type1}</span>
            {type2 !== null ? <span className={type2}>{type2}</span> : null}
          </div>
        </div>

        {icon}
      </div>
    </div>
  );

  // const topRowStyle = props.length === 1 ? "middleRow" : "topRow";
  // const handlePokemonEvoClicked = () => {
  //   // console.log("dex number", dexnumber);
  //   props.handlePokemonEvoClicked(dexnumber);
  // };

  // let arrow = null;

  // let evolutionItem = null;
  // let evoSteps = null;

  // // console.log("type of ", typeof evolvesTo);
  // if (props.index <= 1 && props.index !== props.length - 1) {
  //   arrow = (
  //     <div className="icon">
  //       {/* <p> {props.evolutionTrigger}</p>{" "} */}
  //       <i className="fa-solid fa-circle-chevron-right"></i>
  //     </div>
  //   );
  // }

  // evolutionItem = (
  //   <div
  //     className={`${topRowStyle}${index + 1}`}
  //     onClick={handlePokemonEvoClicked}
  //   >
  //     <div className="evo-image-container">
  //       <img src={props.image} alt="pokemon" className="pokemon-evo-image" />
  //     </div>
  //     <div className="pokemon-details">
  //       <p className="pokemon-number">
  //         {name} #{dexnumber}
  //       </p>

  //       <div className={`types ${center}`}>
  //         <span className={type1}>{type1}</span>
  //         {type2 !== null ? <span className={type2}>{type2}</span> : null}
  //       </div>
  //     </div>
  //   </div>
  // );

  // if (evolvesTo.length >= 2) {
  //   console.log("inside evolve 2");
  //   evoSteps = evolvesTo.map((pokemonEvoDetails, index) => {
  //     console.log("popkemon details", pokemonEvoDetails);
  //     return (
  //       <div
  //         className={`middleRow${index + 1}`}
  //         onClick={handlePokemonEvoClicked}
  //       >
  //         <div>
  //           <img
  //             src={pokemonEvoDetails.image}
  //             alt="pokemon"
  //             className="pokemon-evo-image"
  //           />
  //         </div>
  //         <div>
  {
    /* <p className="pokemon-number">
              {pokemonEvoDetails.species.name} #{pokemonEvoDetails.dexnumber}
            </p>

            <div className={`types ${center}`}>
              <span className={type1}>{type1}</span>
              {pokemonEvoDetails.type2 !== null ? (
                <span className={type2}>{type2}</span>
              ) : null}
            </div>
          </div>
          <div className="icon">
            {/* <p> {props.evolutionTrigger}</p>{" "} */
  }
  //           <i className="fa-solid fa-circle-chevron-right"></i>
  //         </div>
  //       </div>
  //     );
  //   });
  // } */}

  // {
  //   arrow;
  // }

  // if(typeof evolutionTrigger)
  // console.log("propsindex", props.index);
  // console.log("propsindex", props.length);

  // if (props.index <= 1 && props.index < props.length) {
  //   arrow = (
  //     <div className="icon">
  //       <i className="fa-solid fa-circle-chevron-right"></i>
  //     </div>
  //   );
  // }

  // return (
  <>
    {/* {evolutionItem} */}
    {/* // evolutionItem = ( */}
    {/* {result} */}

    {/* <div
        className={`${topRowStyle}${index + 1}`}
        onClick={handlePokemonEvoClicked}
      >
        <div className="evo-image-container">
          <img src={props.image} alt="pokemon" className="pokemon-evo-image" />
        </div>
        <div className="pokemon-details">
          <p className="pokemon-number">
            {name} #{dexnumber}
          </p>

          <div className={`types ${center}`}>
            <span className={type1}>{type1}</span>
            {type2 !== null ? <span className={type2}>{type2}</span> : null}
          </div>
        </div>
      </div> */}

    {/* {evoSteps} */}
    {/* <div className="evolution-chain-item" onClick={handlePokemonEvoClicked}>
        <div className="evo-image-container">
          <img src={props.image} alt="pokemon" className="pokemon-evo-image" />
        </div>
        <div className="pokemon-details">
          <p className="pokemon-number">
            {name} #{dexnumber}
          </p>

          <div className={`types ${center}`}>
            <span className={type1}>{type1}</span>
            {type2 !== null ? <span className={type2}>{type2}</span> : null}
          </div>
        </div>
      </div>
      {arrow} */}
  </>;
  //   );
};

export default EvolutionChainItem;
