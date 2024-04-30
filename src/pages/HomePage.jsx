import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice.js'
import { useNavigate } from 'react-router-dom'
import './styles/homepage.css'

const HomePage = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const textInput = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(setTrainer(textInput.current.value.trim()))
        textInput.current.value=''
        navigate('/pokedex')
    }

  return (
    <div className='homepage'>
      <div className='homepage__inicio'>
        <h1 className='homepage__saludo1'>¡Hola entrenador!</h1>
        <h2 className='homepage__saludo2'>Para poder comenzar, dame tu nombre</h2>
        <br />
        <form onSubmit={handleSubmit}>
            <input className='homepage__inp' ref={textInput} type="text" placeholder='Nombre de Usuario' />
            <button className='homepage__btn'>Start</button>
        </form>
      </div>
    </div>
  )
}

export default HomePage