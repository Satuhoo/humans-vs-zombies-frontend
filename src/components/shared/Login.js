  
import React from 'react';
import { useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

const LoginPage = () => { 
   const { keycloak } = useKeycloak();

   const login = useCallback(() => {
    keycloak.login()    
  }, [keycloak])

  if (keycloak.authenticated){
    console.log(keycloak.token)
    return <Redirect to="/"/>
  }

  return (
    <div>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default LoginPage