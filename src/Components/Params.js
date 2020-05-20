import React, { useContext } from 'react'
import Button from './Button'
import AppContext from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export default function Params({ params }) {
  const { deleteParam } = useContext(AppContext)

  const handleDelete = (e) => {
    e.preventDefault()
    deleteParam(e.target.getAttribute('value'))
  }

  const deleteParamButtons = params.map((param, i) => {
    return (
      <Button value={param} key={i} handleClick={handleDelete}>
        {param}
        <FontAwesomeIcon icon={faTimesCircle}/>
      </Button>
    )
  })

  return (
    <div className='Params'>
      { deleteParamButtons }
    </div>
  )
}

Params.defaultProps = {
  params: []
}
