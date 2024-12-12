export function useVoid() {
  const config = useAppConfig()
  return config.void
}
