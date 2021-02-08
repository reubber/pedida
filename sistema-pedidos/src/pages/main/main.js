import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar as MaterialUiToolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { ReactComponent as MainLogo } from 'images/logopedida.svg'
import { AuthContext } from 'contexts/auth'

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

function Main () {
  const [anchorElement, setAnchorElement] = useState(null)
  const { userInfo, logout } = useContext(AuthContext)

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <Typography>Olá {userInfo.user.displayName.split(' ')[0]} :)</Typography>

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

  )
}

export default Main
