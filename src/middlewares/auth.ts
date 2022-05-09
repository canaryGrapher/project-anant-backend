const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:3002/', // needs to be changed according to audience name
  issuerBaseURL: process.env.AUTH0_BASE_URL,
});

export default checkJwt
