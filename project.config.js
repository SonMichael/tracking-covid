import { Platform } from 'react-native'

const ENV = 'production'
const VERSION = '1.3.2'

let apiBaseUrl = ''
let mediaBaseUrl = ''
let codePushKey = Platform.select({

})
const appleAppID = '1506869739'
const googlePackageName = 'com.reactnativestarter'
const iosPackageName = 'com.reactnativestarter.app'
switch (ENV) {
  case 'staging':
    apiBaseUrl = 'https://api.covid19api.com/'
    mediaBaseUrl = 'https://media.covid19api.com/'
    break
  case 'production':
    apiBaseUrl = 'https://api.covid19api.com/'
    mediaBaseUrl = 'https://media.covid19api.com/'
    codePushKey = Platform.select({

    })
    break
  default:
    break
}

module.exports = {
  apiBaseUrl,
  mediaBaseUrl,
  codePushKey,
  ENV,
  VERSION,
  appleAppID,
  googlePackageName,
  iosPackageName
}

