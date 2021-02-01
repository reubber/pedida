import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'

import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

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

function facebookLogin () {
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
}

// function signOut () {
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     console.log(error)
//     // An error happened.
//   })
// }

function Login () {
  return (
    <Container>
      <Grid container justify='center' alignItems='center' spacing={5}>
        <Grid>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={facebookLogin}>
            Entrar com Facebook
          </GitHubButton>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`
const Logo = styled(MainLogo)`
  width: 100%;
`
const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: 25px;
    max-width: 480px;
    padding: 15px;
    text-transform: none;
  }
`
export default Login
