import app from './app'
import env from './env'

app.listen(env.port, () => {
  console.log(`Listening on port ${env.port}`)
})