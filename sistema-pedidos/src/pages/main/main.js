import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Avatar,
  Grid,
  Toolbar as MaterialUiToolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Paper,
  withStyles,
  Divider as MaterialDivider
} from '@material-ui/core'

import { ReactComponent as MainLogo } from 'images/logopedida.svg'
import { AuthContext } from 'contexts/auth'

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})`

`

const Content = styled.main`
  padding: 40px;
`

const Logo = styled(MainLogo)`
  width: initial;
  height: 50px;
`
const LogoContainer = styled.div`
  flex-grow: 1;

  & path {
    fill: #000;
  }
  & line {
    stroke: #000;
  }
`
const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
`
const Toolbar = styled(MaterialUiToolbar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`

const PizzasGrid = styled(Grid).attrs({
  container: true,
  spacing: 5
})`
  padding: 20px;
`

const PaperPizza = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  min-width: 250px;
`
const Pizza = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  justify-content: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;

  &::before,
  &::after{
    background: #ccc;
    content: '';
    position: absolute;
    transform: rotate(45deg)
  }

  &::before {
    height: 1px;
    width: 160px;
  }

  &::after {
    height: 160px;
    width: 1px;
  }
`
const PizzaText = styled(Typography).attrs({
  variant: 'h5'
})`
  align-items: center;
  background: #fff;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 80px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
`

const style = (theme) => {
  return {
    main: theme.mixins.toolbar
  }
}

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

const PizzaSizes = [
  {
    id: 0,
    name: 'Pequena',
    size: 28,
    slices: 2,
    flavours: 1
  },

  {
    id: 1,
    name: 'Média',
    size: 30,
    slices: 6,
    flavours: 2
  },
  {
    id: 2,
    name: 'Grande',
    size: 32,
    slices: 8,
    flavours: 3
  }

]

function Main () {
  const [anchorElement, setAnchorElement] = useState(null)
  const { userInfo, logout, token } = useContext(AuthContext)
  const userName = userInfo.user.displayName.split(' ')[0]
  const a = userInfo.user.photoURL
  const picture = `${a}?access_token=${token}`

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }
  console.log('userid', userInfo.user)
  console.log('pic', picture)

  return (
    <>
      <AppBar>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <Typography>Olá {userName} :)</Typography>

          <IconButton color='inherit' onClick={handleOpenMenu}>
            <Avatar src={picture} />
          </IconButton>

          <Menu
            open={Boolean(anchorElement)}
            onClose={handleClose}
            anchorEl={anchorElement}
          >
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      <Spacer />

      <Content>
        <Grid container direction='column' alignItems='center'>
          <Title variant='h3'>
            o que vai ser hoje, {userName}?
          </Title>
          <Title variant='h4'>
            Escolha o tamanho da pizza
          </Title>
        </Grid>

        <PizzasGrid container spacing={5}>
          {PizzaSizes.map((pizza) => (
            <Grid item key={pizza.id} xs>
              <PaperPizza>
                <Pizza>
                  <PizzaText>
                    {pizza.size}cm
                  </PizzaText>
                </Pizza>
                <Divider />
                <Typography variant='h5'>{pizza.name}</Typography>
                <Typography>{pizza.slices} fatias, {pizza.flavours} sabores</Typography>
              </PaperPizza>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
    </>
  )
}

export default Main
