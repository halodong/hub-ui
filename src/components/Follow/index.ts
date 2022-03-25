import { Tether } from '../../plugins/tether.js'
export const follow = (
  target: HTMLElement,
  trigger: HTMLElement,
  options
): void => {
  // const defaults = {
  //   offsets: {
  //     x: 0,
  //     y: 0
  //   },
  //   edgeAdjust: true
  // }
  // const params = { ...defaults, ...options }
  // //   const tarWidth = target.offsetWidth
  // //   const tarHeight = target.offsetHeight
  // const tirLeft = trigger.offsetLeft
  // let tirTop = trigger.offsetTop
  // // const tirWidth = trigger.offsetWidth
  // const tirHeight = trigger.offsetHeight

  // need to adjust the position, edge adjustment
  // if (params.edgeAdjust !== true) {
  //   // 判断是否溢出屏幕
  // }

  // tirTop += tirHeight
  // target.style.cssText += `position: absolute;
  // left: ${Math.round(tirLeft)}px;
  // top:  ${Math.round(tirTop)}px`
  // console.log(tirLeft, tirTop)
  const t = new Tether({
    element: target,
    target: trigger,
    attachment: 'top right',
    targetAttachment: 'top left'
  })
  console.log(t)
}
;(window as any)._follow = follow
