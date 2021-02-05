import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, LinearProgress } from '@material-ui/core'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

const app = () => (

  <>
    <CssBaseline />

    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route component={MainPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </>

)

export default app
