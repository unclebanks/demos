import React, { FormEvent, useEffect, useState } from 'react';
import { getPokemon } from './remote/poke-api/poke.api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from './hooks';
import { add, remove } from './slices/pokemon.slice';
import './styles/App.css';

const App: React.FC<unknown> = () => {

  const dispatch = useAppDispatch();
  const pokemonState = useAppSelector( (state) => state.pokemon);

  const [name, setName] = useState("");

  useEffect( () => {
    (async () => {
      try {
        dispatch(add(await getPokemon(59)));
      } catch(error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let poke = await getPokemon(name);
      console.log(poke);
      dispatch(add(poke));
    } catch (error) {
      alert(`Pokemon ${name} not found!`);
      console.log(error);
    }
  };

  const handleRemove = (): void => {
    dispatch(remove(pokemonState[0].id));
  }

  return (
    <div id="pokedexContainer">
      <div id="pokedex">
        <div id="pokedexTop">
          <button id="pokedexTopBigGreenButton"/>
          <button id="pokedexTopLittleRedButton"/>
          <button id="pokedexTopLittleYellowButton"/>
          <button id="pokedexTopLittleGreenButton"/>
        </div>
        <div id="pokedexBottom">
          <div id="pokedexScreenContainer">
            <div id="pokedexScreenTop">PokemonImage</div>
            <div id="pokedexScreenBottomContainer">
              <div id="pokedexScreenBottomLeft">
                <div id="pokedexAttack">ATTACK</div>
                <div id="pokedexDefense">DEFENSE</div>
                <div id="pokedexSpeed">SPEED</div>
                <div id="pokedexSPAttack">SP. ATK</div>
                <div id="pokedexSPDefense">SP. DEF</div>
              </div>
              <div id="pokedexScreenBottomRight">
                <div id="pokedexType1">TYPE I</div>
                <div id="pokedexType2">TYPE II</div>
                <div id="pokedexOGRegion">REGION</div>
              </div>
            </div>
          </div>
          <div id="pokedexButtons">
            <div id="pokedexDirectionals">
              <button id="pokedexDirectionalLeft"/>
              <button id="pokedexDirectionalUp"/>
              <button id="pokedexDirectionalRight"/>
              <button id="pokedexDirectionalDown"/>
              <button id="pokedexDirectionalDummy"/>
            </div>
            <div id="pokedexButtonsLeft">
              <button id="pokedexMiniScreenLeft"/>
              <button id="pokedexStart"/>
              <button id="pokedexSelect"/>
              <button id="pokedexBlackButton"/>
            </div>
          </div>
        </div>
      </div>
      <div id="pokedexRight">Right</div>
    </div>
  );
}

export default App;
