import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import useFetchPokemon from "./services/useFetchPokemon";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function App() {
  // const [pokemon, setPokemon] = useState();
  const pokeRef = useRef();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const [{ data, loading, error }] = useFetchPokemon(url);

  const [gen1Pokemon, setGen1Pokemon] = useState([]);
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then((res) => {
      setGen1Pokemon(res.data.results.map((pokemon) => pokemon.name));
    });
  }, []);

  const handlePokemonRequest = (e) => {
    if (pokeRef.current.value === "") return;
    if (
      (pokeRef.current.value > 0 && pokeRef.current.value < 152) ||
      gen1Pokemon.includes(pokeRef.current.value)
    ) {
      setUrl(`https://pokeapi.co/api/v2/pokemon/${pokeRef.current.value}`);
    }
    e.preventDefault();
  };

  // useEffect(() => {}, [url]);

  // useEffect(() => {
  //   let mounted = true;
  //   fetchPokemon(pokemonRequest).then((items) => {
  //     if (mounted) {
  //       setPokemon(items);
  //       console.log(pokemon);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);

  // function displayImage(sprite) {
  //   return (
  //     <li key={sprite}>
  //       <img src={sprite} alt="showme"></img>
  //     </li>
  //   );
  // }

  // let images_list = [];
  // function deepImg(object) {
  //   if (object === null) return;
  //   Object.entries(object).forEach(([key, val]) => {
  //     if (typeof val === "string") {
  //       let image = { image_name: key, image_url: val };
  //       images_list.push(image);
  //     } else if (typeof val === "object") {
  //       deepImg(val);
  //     }
  //   });
  // }

  return (
    <>
      <div>
        {/* <input type="text" ref={pokeRef}></input> */}
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          inputRef={pokeRef}
        ></TextField>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handlePokemonRequest}
        >
          <Typography variant="button" display="block">
            Pokemon
          </Typography>
        </Button>
      </div>
      {error && <div>Unable to load Pokedex entry</div>}
      {loading && <div>Loading Pokedex Entry ...</div>}
      {data && (
        <div>
          {data.name && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1">Name: {data.name}</Typography>
                <Typography variant="subtitle1">
                  Sprite:{" "}
                  <img src={data.sprites.front_default} alt="pokemon img" />
                </Typography>
                <Typography variant="subtitle1">
                  Type: {data.types[0].type.name}
                </Typography>
                <Typography variant="subtitle1">
                  Height: {data.height}
                </Typography>
                <Typography variant="subtitle1">
                  Weight: {data.weight}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      {/* {pokemon && (
        <div className="wrapper">
          <h1>{pokemon.name}</h1>
          <ul>
            <li>Name: {pokemon.name}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>
              1 sprite check:
              <img src={pokemon.sprites.front_default} alt="front"></img>
            </li>

            {Object.keys(pokemon.sprites).map((item) => (
              <li key={item}>{item}</li>
            ))}

            {Object.entries(pokemon.sprites).map(([prop, val]) => {
              return (
                <li key={prop}>
                  <img
                    src={typeof val === "string" ? val : null}
                    alt="not what I expected"
                  ></img>
                </li>
              );
            })}

            {displayImage(pokemon.sprites.back_default)}
            {deepImg(pokemon.sprites)}
            {images_list.map((entry) => displayImage(entry.image_url))}
          </ul>
        </div>
      )} */}
    </>
  );
}
