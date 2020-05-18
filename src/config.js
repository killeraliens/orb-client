export default {
  SERVER_ENDPOINT: process.env.NODE_ENV === 'production'
    ? process.env.SERVER_ENDPOINT
    : 'http://localhost:8000'
}


