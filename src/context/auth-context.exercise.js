import React from 'react';
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as auth from 'auth-provider'

const AuthContext = React.createContext();

const useAuth = ()=>{
    const contextValue = React.useContext(AuthContext);
    if(!contextValue){
        throw new Error('Only use this hook in provider')
    }
    return contextValue
}

async function getUser() {
    let user = null
  
    const token = await auth.getToken()
    if (token) {
      const data = await client('me', {token})
      user = data.user
    }
  
    return user
  }


function AuthProvider(props) {
    const {
      data: user,
      error,
      isLoading,
      isIdle,
      isError,
      isSuccess,
      run,
      setData,
    } = useAsync()
  
    React.useEffect(() => {
      run(getUser())
    }, [run])
  
    const login = form => auth.login(form).then(user => setData(user))
    const register = form => auth.register(form).then(user => setData(user))
    const logout = () => {
      auth.logout()
      setData(null)
    }
  
    if (isLoading || isIdle) {
      return <FullPageSpinner />
    }
  
    if (isError) {
      return <FullPageErrorFallback error={error} />
    }
  
    if (isSuccess) {
      const value = {user, login, register, logout}
        return (
            <AuthContext.Provider value={value} {...props}/>
        )
      
    }
}


export {AuthProvider,useAuth} 