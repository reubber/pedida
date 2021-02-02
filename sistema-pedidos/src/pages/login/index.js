import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'

import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

const Container = styled.div`
  padding: 20px;
`
const Logo = styled(MainLogo)`
  width: 100%;
`
const FacebookButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true,
  color: 'primary'
})`
  && {
    font-size: 25px;
    max-width: 480px;
    padding: 15px;
    text-transform: none;
  }
`

const config = {
  apiKey: 'AIzaSyCn8tDw1MSgDrIxRCBNtSl6lwKAxoeA2Ds',
  authDomain: 'reactzzaria-e84d6.firebaseapp.com',
  projectId: 'reactzzaria-e84d6',
  storageBucket: 'reactzzaria-e84d6.appspot.com',
  messagingSenderId: '987356352063',
  appId: '1:987356352063:web:6b03e99d6509835dfcb28a',
  measurementId: 'G-S77J43RGF6'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

function Login () {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const { isUserLoggedIn, user } = userInfo

  useEffect(() => {
    // evento que executa quando estado de login for alterado
    firebase.auth().onAuthStateChanged((user) => {
      setUserInfo({
        isUserLoggedIn: !!user,
        user
      })
    // * mesmo codigo que o de cima ^l *
    //   if (user) {
    //     console.log('usuário logado', user)
    //     this.setState({ isUserLoggedIn: true, user })
    //   } else {
    //     console.log('usuario não está logado', user)
    //     this.setState({ isUserLoggedIn: false, user: null })
    //   }
    // })
    })

    return () => {
      // unmount
    }
  }, [])

  const handleFacebookLogin = useCallback(() => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.log('error:', errorCode, errorMessage, email, credential)
      // ...
      })
  }, [])

  const handleLogout = useCallback(() => {
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
    <Container>
      <Grid container justify='center' alignItems='center' spacing={5}>
        <Grid>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify='center'>
          {isUserLoggedIn && (
            <>
              <pre>{`Olá, ${user.displayName}! `}</pre>
              <Button variant='contained' onClick={handleLogout} color='secondary'>
                Sair
              </Button>
            </>
          )}
          {!isUserLoggedIn && (
            <FacebookButton onClick={handleFacebookLogin}>
              Entrar com Facebook
            </FacebookButton>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
