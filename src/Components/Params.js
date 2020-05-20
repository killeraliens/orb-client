import React, { useContext } from 'react'
import Button from './Button'
import AppContext from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import DuoButton from './DuoButton'

export default function Params({ params }) {
  const { deleteParam } = useContext(AppContext)

  const handleDelete = (e) => {
    e.preventDefault()
    const param = e.target.getAttribute('value')
    deleteParam(param)
  }

  const deleteParamButtons = params.map((param, i) => {
    return (
        <DuoButton value={param} key={i}>
          {param}
          <FontAwesomeIcon icon={faTimesCircle} value={param} onClick={handleDelete}/>
        </DuoButton>
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
