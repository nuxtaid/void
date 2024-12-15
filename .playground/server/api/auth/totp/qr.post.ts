import QrCode from 'qrcode'

export default defineEventHandler(async () => {
  // don't want to expose the QR code to the client for now
  return {}

  const { totp } = useRuntimeConfig()

  return await QrCode.toDataURL(totp.qr)
})
