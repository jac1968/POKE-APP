import React from 'react'
import './paginacion.css'

const Pagination = ({setPage, page, total}) => {

    const handlePrev = (num) => {
        if (page>num) setPage(page - num)
        else if (page>1) setPage(1)
        else setPage(total)
        scroll(0, 0)
    }

    const handleNext = (num) => {
        if (page<=total - num) setPage(page + num)
        else if (page<total) setPage(total)
        else setPage(1) 
        scroll(0, 0)
    }

  return (
    <div>
        <button onClick={()=>handlePrev(5)} className='btn__pn'>{` << `}</button>
        <button onClick={()=>handlePrev(1)} className='btn__pn'>{` < `}</button>
        <span> {page} / {total} </span>
        <button onClick={()=>handleNext(1)} className='btn__pn'>{` > `}</button>
        <button onClick={()=>handleNext(5)} className='btn__pn'>{` >> `}</button>
    </div>
  )
}

export default Pagination