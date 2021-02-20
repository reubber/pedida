import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Typography,
  Paper,
  withStyles,
  Divider as MaterialDivider
} from '@material-ui/core'

import { AuthContext } from 'contexts/auth'
import Header from 'pages/header'

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})`

`

const Content = styled.main`
  padding: 40px;
`

const Divider = styled(MaterialDivider)`
  margin: 20px 0;
  width: 100%;
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
  const { userInfo } = useContext(AuthContext)
  const userName = userInfo.user.displayName.split(' ')[0]

  console.log('userid', userInfo.user)

  function singularOrPlural (amount, singular, plural) {
    return amount === 1 ? singular : plural
  }

  return (
    <>
      <Header />

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
                <Typography>
                  {pizza.slices}, {' '}
                  fatias, {pizza.flavours} {' '}
                  {singularOrPlural(pizza.flavours, 'sabor', 'sabores')}
                </Typography>
              </PaperPizza>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
    </>
  )
}

export default Main
