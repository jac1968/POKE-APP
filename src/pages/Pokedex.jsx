import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles/pokedex.css'
import useFetch from '../hooks/useFetch'
import PokemonCard from '../components/pokedex/PokemonCard'
import { useRef } from 'react'
import { useState } from 'react'
import PokeSelet from '../components/pokedex/PokeSelet'
import Pagination from '../components/pokedex/Paginacion'

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('')
  const [inpuValue, setInpuValue] = useState('')
  const [pokemons, getPokemons, getType] = useFetch()
  const trainer = useSelector(store => store.trainer)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (selectValue) {
      getType(selectValue) 
    }
    else { 
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=3000'
      getPokemons(url) 
    }
  
  }, [selectValue])

  const textInput =useRef()

  const handleSubmit = (event)=> {
    event.preventDefault()
    setInpuValue(textInput.current.value.toLowerCase().trim())
    textInput.current.value=''
    total=1
  }

  
  const pokeSearch = (poke)=> {
    const perName = poke.name.includes(inpuValue)
    return perName
  }
  
  var quantity = 20
  var total = Math.ceil(pokemons?.results.filter(pokeSearch).length / quantity)

  const parts = () => { 
    const last = quantity * page
    const first = last - quantity
    return pokemons?.results.slice(first, last)
  }

  return (
    <div className='pokedex'>
          <div className='pokedex__banner'></div>
            <div className='pokedex__head'>
              <h2 className='pokedex__title'><span>Bienvenido {trainer}, </span></h2>
              <h2> aqui podrás encontrar tu pokemon favorito</h2>          
            </div>  
            <div className='pokedex__select'>  
              <form onSubmit={handleSubmit}>
                <input className='pokedex__inp' ref={textInput} type="text" placeholder='Busca tu Pokemon' />
                <button className='pokedex__btn'>Searche</button>
                </form>
                <PokeSelet
                  setSelectValue={setSelectValue}
                />
            </div>
                {
                    total > 1 && 
                    <Pagination
                    setPage={setPage}
                    page={page}
                    total={total}
                    />
                }        
            <div className='pokedex__container'>
            {
              parts()?.filter(pokeSearch).map(poke => (
                <PokemonCard
                  key={poke.url}
                  url={poke.url}
                />
              ))
            }
          </div>
          {
            total > 1 && 
              <div className='footer'>
                  <Pagination
                    setPage={setPage}
                    page={page}
                    total={total}
                  />
              </div>
          }
    </div>
  )
}

export default Pokedex