import React, { createContext, useCallback, useState } from 'react'
import firebase from 'services/firebase'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

function Auth ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const handleFacebookLogin = useCallback(() => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      window.alert('Desconectado com sucesso')
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    }).catch((error) => {
      console.log(error)
      // An error happened.
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      handleFacebookLogin,
      logout,
      userInfo,
      setUserInfo
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
