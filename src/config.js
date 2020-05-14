export default {
  SERVER_ENDPOINT: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:8000/'
}


