import { store } from '../redux/store'

export default {
  authHeader
}

export function authHeader() {
  return {
    'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0
  }
}
