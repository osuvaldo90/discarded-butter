import { getEnvInt } from './config'
import { startServer } from './server'

async function main(): Promise<void> {
  startServer({ port: getEnvInt('PORT', 8080) })
}

main()
