import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './styles/pokeinfo.css'

const PokeInfo = () => {

  const params = useParams()

  const [pokemon, getPokemon] = useFetch()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
    getPokemon(url)
  }, [])

    const barraPro = (valor)=> {
      const porcent = ((valor*100)/150).toFixed(0)+'%'
      const etiBarra = {
        width : porcent,  
      }
      return etiBarra
    }

  return (
    <div className='pokeinfo__contenedor'>
      <section className='pokeinfo'>
        <figure className='pokeinfo__img'>
          <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="Pokemon Image" />
        </figure>
        <div className={`pokeinfo__back ${pokemon?.types[0].type.name}`} ></div>
        <span className='pokeinfo__id'># {pokemon?.id}</span>
        <hr />
        <h2 className='pokeinfo__name'> ————— {pokemon?.name} ————— </h2>
        <ul className='pokeinfo__peso_altura'>
          <li className='pokeinfo__peso' ><span>Peso</span><span> {pokemon?.weight}</span></li>
          <li className='pokeinfo__altura'><span>Altura</span><span> {pokemon?.height}</span></li>
        </ul>
        <div className='pokeinfo__tip_hab'>
          <article className='pokeinfo__article'>
            <h3>Tipo</h3>
            <ul className='pokeinfo__d_tipo'>
              {
                pokemon?.types.map(type => (
                  <li className={`pokeinfo__tipo ${type.type.name}`} key={type.type.url}> {type.type.name}</li>
                ))
              }
            </ul>
          </article>
          <article className='pokeinfo__article'>
            <h3>Habilidades</h3>
            <ul className='pokeinfo__d_habilidades'>
              {
                pokemon?.abilities.map(ability => (
                  <li className='pokeinfo__habilidades' key={ability.ability.url}> {ability.ability.name}</li>
                ))
              }
            </ul>
          </article>
        </div>
        <h2 className='pokeinfo__estadistica'>Estadisticas</h2>
        <ul className='pokeinfo__d_estadistica'>
          {
            pokemon?.stats.map(stat => (
              <li key={stat.stat.url}><span>{stat.stat.name} </span><span>{stat.base_stat} / 150</span>
                <div className='pokeinfo__barra'>
                  <div className='pokeinfo__progre' style={barraPro(stat.base_stat)}>
                    <span>{((stat.base_stat*100)/150).toFixed(0)}</span><span>%</span>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
        <h2 className='pokeinfo__movimientos'>Movimientos</h2>
        <br />
        <ul className='pokeinfo__d_movimientos'>
          {
            pokemon?.moves.map(move=>(
              <li key={move.move.url}>{move.move.name}</li>     
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export default PokeInfo