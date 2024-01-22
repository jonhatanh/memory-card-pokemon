const prettierConfigStandard = require('prettier-config-standard')

const modifiedConfig = {
  ...prettierConfigStandard,
  "plugins": ["prettier-plugin-tailwindcss"]
}

module.exports = modifiedConfig
