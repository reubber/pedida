import React, { Suspense, lazy, useContext, useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import firebase from 'services/firebase'
import { AuthContext } from 'contexts/auth'
import t from 'prop-types'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App ({ location }) {
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { userInfo, setUserInfo, logout } = useContext(AuthContext)

  const { isUserLoggedIn } = userInfo
  useEffect(() => {
    // evento que executa quando estado de login for alterado
    firebase.auth().onAuthStateChanged((user) => {
      console.log('dados do usuario', user)
      setUserInfo({
        isUserLoggedIn: !!user,
        user
      })
      setDidCheckUserIn(true)
    })
    window.logout = logout
  }, [])

  if (!didCheckUserIn) {
    console.log('ainda nao checou se usuario esta logado ou nao')
    return (
      <>
        <LinearProgress />
        <h1>carregando...</h1>
      </>
    )
  }

  console.log('ja checou se o usuario esta logado ou nao')

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Redirect to='/' />
  }

  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Redirect to='/login' />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  location: t.object.isRequired
}

export default App
