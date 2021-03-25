import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {keycloak} = useKeycloak();
    return (
        // Show component only if the user is logged in       
        <Route {...rest} render={props => (
            keycloak.authenticated ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;