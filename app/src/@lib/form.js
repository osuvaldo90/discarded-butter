const { indexBy, prop } = require('ramda')

export const makeFormConfig = indexBy(prop('name'))
