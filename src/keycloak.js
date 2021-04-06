import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://hvz-keycloak.herokuapp.com/auth/', 
    realm: 'hvz', 
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak