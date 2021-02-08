import React, { useContext } from 'react'
import styled from 'styled-components'

import { Button, Grid } from '@material-ui/core'
import { AuthContext } from 'contexts/auth'

import { ReactComponent as MainLogo } from 'images/logopedida.svg'

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

  return (
    <Container>
      <Grid container justify='center' alignItems='center' spacing={5}>
        <Grid>
          <Logo />
        </Grid>

        <Grid item xs={12} container justify='center'>

          <FacebookButton onClick={handleFacebookLogin}>
            Entrar com Facebook
          </FacebookButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
