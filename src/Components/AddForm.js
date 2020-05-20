import React, { useState, useEffect, useContext } from 'react'
import Button from './Button'
import config from '../config'
import AppContext from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function AddForm() {
  const [symbol, setSymbol] = useState({ value: '', touched: false, error: '' })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { params, addParam } = useContext(AppContext)

  const resetForm = () => {
    setSymbol({ value: '', touched: false, error: '' })
  }

  const updateValidationErrors = () => {
    setSymbol(prev => ({ ...prev, error: validateSymbol() }))
  }

  useEffect(() => {
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError])

  useEffect(() => {
    const clearServerErrors = () => {
      setServerError(null)
    }
    clearServerErrors()
  }, [symbol.value])

  const validateSymbol = () => {
    if (symbol.touched) {
      const trimmedSymbol = symbol.value.trim()
      return trimmedSymbol.length === 0
        ? 'symbol required'
        : trimmedSymbol.length > 5
        ? 'symbol is too long'
        : ''
    }
    return ''
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    const newTerm = symbol.value.trim().toUpperCase()
    const newParams = [...params, newTerm]
    const postBody = {
      terms: newParams.filter(param => { if (param !== 'All') return '$' + param } )
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(`${config.SERVER_ENDPOINT}/set-symbol`, options)
      const body = await response.json();
      if (!response.ok) {
        setServerError(response.message)
        setFetching(false)
        console.log('response not ok', response)
      } else {
        setFetching(false)
        resetForm()
        addParam(newTerm)
        let { query } = body
        console.log(`Successfully added feed for ${query.join(',')}`)
      }
    } catch (err) {
      setServerError(err.message)
      setFetching(false)
    }

  }

  const required = ''

  return (
    <form
      className='AddForm'
      onSubmit={handleOnSubmit}
      aria-describedby='serverError'
      >
        <fieldset>
          <label htmlFor='symbol' className=''>${required}</label>
          <input
            type='text'
            id='symbol'
            name='symbol'
            value={symbol.value || ''}
            onChange={e => setSymbol({ value: e.target.value, touched: true })}
            aria-label='enter your symbol'
            aria-required='true'
            aria-describedby='symbolError'
            aria-invalid={!!symbol.error}
            onBlur={updateValidationErrors}
          />
          <span id='symbolError' className='ValidationError'>{symbol.error}</span>
          <span id='serverError' className='ValidationError'>{serverError}</span>
        </fieldset>
        <div className='form-controls'>
        <Button type='submit' isDisabled={symbol.error || symbol.value.length === 0}><FontAwesomeIcon icon={faTwitter}/></Button>
        </div>
      </form>
  );
}
