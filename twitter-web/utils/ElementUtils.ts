export const isScroll = (el: HTMLElement | null) => {
  return (el?.scrollHeight || 0) > (el?.clientHeight || 0)
}
