  
import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom' 
import { useKeycloak } from '@react-keycloak/web'


const LoginPage = () => { 
   const { keycloak, initialized } = useKeycloak();


   useEffect(() => { 
    if (initialized){
      if (!keycloak.authenticated)
        keycloak.login()        
      }}) 

    if (initialized && keycloak.authenticated){
      console.log(keycloak.token)      
      return <Redirect to='/games'/>
    }

  return (
    <div>
      <p>Initializing authentiation server...</p>
    </div>
  )
}

export default LoginPage