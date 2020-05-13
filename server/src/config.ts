import * as R from 'ramda'

export const getEnvInt = (name: string, fallbackValue: number | undefined): number | undefined => {
  const stringValue = process.env[name]

  if (R.isNil(stringValue) || R.isEmpty(stringValue)) {
    return fallbackValue
  }

  const numberValue = parseInt(stringValue)

  if (isNaN(numberValue)) {
    return fallbackValue
  }

  return numberValue
}
