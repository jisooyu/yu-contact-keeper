import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

/* @loadUser  - load token into global headers
if token is passed in then set it to the global header
otherwise delete it from the global header
*/
