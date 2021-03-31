import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://hvz-keycloak.herokuapp.com/auth/', 
    realm: 'hvz', 
    clientId: 'localhost'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak