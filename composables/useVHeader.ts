const open = ref(false)

export function useVHeader() {
  function toggle() {
    open.value = !open.value
  }

  return {
    open,
    toggle,
  }
}
