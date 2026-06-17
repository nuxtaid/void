import speakeasy from 'speakeasy'

export default defineEventHandler(() => {
  // don't want to expose this endpoint yet
  return {}

  const secret = speakeasy.generateSecret({
    name: 'NuxtPiArash',
    // length: 20, // Optional, default is 32
    symbols: true,
    length: 64,
  })

  return {
    otpauth_url: secret.otpauth_url,
    secret: secret.base32,
  }
})
