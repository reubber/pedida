import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Grid,
  Toolbar as MaterialUiToolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Paper,
  withStyles
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { ReactComponent as MainLogo } from 'images/logopedida.svg'
import { AuthContext } from 'contexts/auth'

const Content = styled.main`
  padding: 20px;
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
const Toolbar = styled(MaterialUiToolbar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
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
  const { userInfo, logout } = useContext(AuthContext)
  const userName = userInfo.user.displayName.split(' ')[0]

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <Typography>Olá {userName} :)</Typography>

          <IconButton color='inherit' onClick={handleOpenMenu}>
            <AccountCircle />
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
          <Typography variant='h3'>
            o que vai ser hoje, {userName}?
          </Typography>
          <Typography variant='h4'>
            Escolha o tamanho da pizza
          </Typography>
        </Grid>

        <Grid container spacing={10}>
          {PizzaSizes.map((pizza) => (
            <Grid item key={pizza.id} xs={4}>
              <Paper style={{ padding: 20 }}>
                <div>{pizza.size}cm</div>
                <Typography>{pizza.name}</Typography>
                <Typography>{pizza.slices} fatias, {pizza.flavours} sabores</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Content>
    </>
  )
}

export default Main
