import React from 'react';
const AuthContext = React.createContext();

const useAuth = ()=>{
    const contextValue = React.useContext(AuthContext);
    if(!contextValue){
        throw new Error('Only use this hook in provider')
    }
    return contextValue
}
export {AuthContext, useAuth}