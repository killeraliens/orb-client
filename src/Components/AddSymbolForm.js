import React, { useState, useEffect } from 'react'
import config from "../config"

export default function AddSymbolForm() {
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
        "Content-Type": "application/json"
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
        // updateFilters(term)
        console.log(`Successfully added feed for ${term}`)
        // setToast({ message: `Successfully added feed for ${term}` })
        // history.push(`/`)
      }
    } catch (err) {
      setServerError({ message: err.message })
      setFetching(false)
    }

  }

  const required = "*"
  if (fetching) {
    return <span>loading...</span>
  }

  return (
      <form className="AddSymbolForm" onSubmit={handleOnSubmit}>
        <fieldset>
          <label htmlFor="symbol">symbol{required}</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={symbol.value || ''}
            onChange={e => setSymbol({ value: e.target.value, touched: true })}
            aria-label="enter your symbol"
            aria-required="true"
            aria-describedby="symbolError"
            aria-invalid={!!symbol.error}
            onBlur={updateValidationErrors}
          />
          <span id="symbolError">{symbol.error}</span>
        </fieldset>
        <div className="form-controls">
          <button type="submit" disabled={symbol.error}>Add</button>
        </div>
      </form>
  );
}

AddSymbolForm.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // })
}
