const { requiredScopes } = require('express-oauth2-jwt-bearer');

const checkScopes = requiredScopes('edit:database');

export default checkScopes
