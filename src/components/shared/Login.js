import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom' 
import { useKeycloak } from '@react-keycloak/web'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/userActions'

const LoginPage = () => { 
   const { keycloak, initialized } = useKeycloak();
   const dispatch = useDispatch();

   //Handles the login with keycloak, sends user object to the redux actions
   useEffect(() => { 
    if (initialized){
      if (!keycloak.authenticated)
        keycloak.login()
        keycloak.onAuthSuccess(dispatch(login(keycloak.subject, keycloak.hasRealmRole('admin'))))        
      }}) 

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