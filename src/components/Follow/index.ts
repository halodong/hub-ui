export const follow = (
  target: HTMLElement,
  trigger: HTMLElement,
  options
): void => {
  //   const defaults = {
  //     offsets: {
  //       x: 0,
  //       y: 0
  //     }
  //   }

  //   const params = { ...defaults, ...options }
  //   const tarWidth = target.offsetWidth
  //   const tarHeight = target.offsetHeight
  const tirLeft = trigger.offsetLeft
  let tirTop = trigger.offsetTop
  // const tirWidth = trigger.offsetWidth
  const tirHeight = trigger.offsetHeight

  tirTop += tirHeight
  target.style.cssText += `position: absolute;
  left: ${Math.round(tirLeft)}px;
  top:  ${Math.round(tirTop)}px`
  console.log(tirLeft, tirTop)
}
;(window as any)._follow = follow
