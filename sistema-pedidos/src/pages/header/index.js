import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { ReactComponent as MainLogo } from 'images/logopedida.svg'
import { AuthContext } from 'contexts/auth'

import {
  AppBar,
  Avatar,
  IconButton,
  Typography,
  Menu,
  Toolbar as MaterialUiToolbar,
  MenuItem
} from '@material-ui/core'

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

const Header = () => {
  const [anchorElement, setAnchorElement] = useState(null)
  const { logout, token } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)

  const a = userInfo.user.photoURL
  const picture = `${a}?access_token=${token}`
  const userName = userInfo.user.displayName.split(' ')[0]

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

  )
}

export default Header
