import React, { useState, useContext, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { Button, Grid } from '@material-ui/core'
import { AuthContext } from 'contexts/auth'
import firebase from 'services/firebase'

import { ReactComponent as MainLogo } from './logopedida.svg'

const Container = styled.div`
  padding: 20px;
  background-color: black;
`
const Logo = styled(MainLogo)`
  width: 100%;
  z-index: 100;
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

function Login () {
  const { handleFacebookLogin } = useContext(AuthContext)

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

            <>
              <FacebookButton onClick={handleFacebookLogin}>
                Entrar com Facebook
              </FacebookButton>
            </>

          )}

        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
