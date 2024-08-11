import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundComponent = () => {
  return (
    <div>
        <h1 className='text-center'>404 Not Found</h1>
        <h2 className='text-center'><Link to="/">return</Link></h2>
    </div>
  )
}

export default NotFoundComponent