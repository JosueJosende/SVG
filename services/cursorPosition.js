export const cursorPosition = (event, element) => {
  const rect = element.getBoundingClientRect()

  const offsetX = event.clientX - rect.left
  const offsetY = event.clientY - rect.top

  const x = (offsetX / 14).toFixed(1)
  const y = (offsetY / 14).toFixed(1)

  return { x, y, offsetX, offsetY }
}
