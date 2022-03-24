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
  const tirTop = trigger.offsetTop

  target.style.cssText += `position: absolute;
  left: Math.round(${tirLeft});
  top:  Math.round(${tirTop})`
}

(window as any)._follow = follow
