import React, { createContext, useCallback } from 'react'
import firebase from 'services/firebase'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

function Auth ({ children }) {
  const handleFacebookLogin = useCallback(() => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
  }, [])

  return (
    <AuthContext.Provider value={{
      handleFacebookLogin
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
}

export default Auth
