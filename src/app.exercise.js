/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const [user, setUser] = React.useState(null)

  const login = (form)=>{
   return auth.login(form)
    .then(
      ourUser => setUser(ourUser)
    )
  }

  const register = (form)=>{
    return auth.register(form)
    .then(
      ourUser => setUser(ourUser)
    )
  }
  const logout = ()=>{
    auth.logout();
    setUser(null)
  }
  
  return  user ? (<AuthenticatedApp user={user} logout={logout}/>) : (<UnauthenticatedApp login={login} register={register}/ >)
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
