import React, { createContext, useCallback, useState, useEffect } from 'react'
import firebase from 'services/firebase'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

function Auth ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const [token, setToken] = useState('')

  const handleFacebookLogin = useCallback(() => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider).then(function (result) {
        setToken(result.credential.accessToken)
      })
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

  useEffect(() => {
    if (userInfo.user !== null && token) {
      window.localStorage.setItem('image', `${userInfo.user.photoURL}?access_token=${token}`)
    }
  }, [userInfo])

  return (
    <AuthContext.Provider value={{
      handleFacebookLogin,
      logout,
      userInfo,
      setUserInfo,
      token
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
