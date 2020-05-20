import React, { useState, useEffect } from 'react'
import config from "../config"

export default function AddForm() {
  const [symbol, setSymbol] = useState({ value: '', touched: false, error: '' })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)


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
        : ''
    }
    return ''
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    const postBody = {
      term: symbol.value.trim(),
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
        setServerError({ status: response.status, message: body.message })
        setFetching(false)
        console.log('RES', response)
      } else {
        setFetching(false)
        resetForm()
        let { term } = body
        console.log(`Successfully added feed for ${term}`)
      }
    } catch (err) {
      setServerError({ message: err.message })
      setFetching(false)
    }

  }

  const required = ''

  return (
      <form className='AddForm' onSubmit={handleOnSubmit}>
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
        </fieldset>
        <div className='form-controls'>
          <button type='submit' disabled={symbol.error}>Add</button>
        </div>
      </form>
  );
}

AddForm.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // })
}
