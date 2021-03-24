  
import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom' 
import { useKeycloak } from '@react-keycloak/web'
import GameDetails from '../pages/GameDetails';

const LoginPage = () => { 
   const { keycloak, initialized } = useKeycloak();


   useEffect(() => {
    if (initialized){
      if (!keycloak.authenticated){
      keycloak.login()
    }else{
      console.log(keycloak.token)      
    }}}); 
    if (initialized && keycloak.authenticated){
      return <Redirect to='/games'/>
    }

  return (
    <div>
      <p>Initializing authentiation server...</p>
    </div>
  )
}

export default LoginPage