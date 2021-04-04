/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {client} from './utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { useAsync } from 'utils/hooks'
import {FullPageSpinner} from './components/lib'
import * as colors from 'styles/colors'

async function getUser(){
  let user = null;
  const token = await auth.getToken()
  if(token){
    user = await client('me',{token})
  }
  return user;
}

function App() {
  const {data : user, run ,isIdle, isLoading, isSuccess, isError , setData, error} = useAsync()

  const login = (form)=>{
   return auth.login(form)
    .then(
      ourUser => setData(ourUser)
    )
  }

  const register = (form)=>{
    return auth.register(form)
    .then(
      ourUser => setData(ourUser)
    )
  }
  const logout = ()=>{
    auth.logout();
    setData(null)
  }


  React.useEffect(()=>{
    run(getUser())
  },[run])

  if(isLoading || isIdle){
    return <FullPageSpinner/>
  }
  if(isError){
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          }}
        >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if(isSuccess){
    return  user ? (<AuthenticatedApp user={user} logout={logout}/>) 
    : (<UnauthenticatedApp login={login} register={register}/ >)
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
