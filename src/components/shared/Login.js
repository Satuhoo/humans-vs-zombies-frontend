  
import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom' 
import { useKeycloak } from '@react-keycloak/web'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/userActions'


const LoginPage = () => { 
   const { keycloak, initialized } = useKeycloak();
   const dispatch = useDispatch();

   useEffect(() => { 
    if (initialized){
      if (!keycloak.authenticated)
        keycloak.login()
        keycloak.onAuthSuccess(dispatch(login(keycloak.subject)))        
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