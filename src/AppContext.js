import React, { createContext } from 'react'

const AppContext = createContext({
  params: [],
  addParam: () => {},
  deleteParam: () => {}
})

export default AppContext
