import React from 'react'
import { Link } from 'react-router-dom'

/**
 * NotFoundComponent
 * 
 * http 404 status를 반환받을 때 라우팅되는 component
 * 
 */

const NotFoundComponent = () => {
  return (
    <div>
        <h1 className='text-center'>404 Not Found</h1>
        <h2 className='text-center'><Link to="/">return</Link></h2>
    </div>
  )
}

export default NotFoundComponent