import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

function Auth ({ children }) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

Auth.propTypes = {
  children: PropTypes.isRequired
}

export default Auth
