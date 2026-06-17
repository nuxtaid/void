import speakeasy from 'speakeasy'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token } = body

  if (!token) {
    throw createError({
      status: 400,
      message: 'Missing token in request body',
    })
  }

  const { totp } = useRuntimeConfig()

  const verified = speakeasy.totp.verify({
    secret: totp.secret,
    encoding: 'base32',
    token,
    window: 1,
  })

  return {
    verified,
  }
})
