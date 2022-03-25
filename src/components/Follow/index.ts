import { Tether } from '../../plugins/tether.js'
export const follow = (
  el: HTMLElement,
  trigger: HTMLElement,
  options
): void => {
  const defaults = {
    /**
     * attachment: A string of the form 'vert-attachment horiz-attachment'
     * vert-attachment can be any of 'top', 'middle', 'bottom'
     * horiz-attachment can be any of 'left', 'center', 'right'
     */
    pin: 'top, bottom',
    attachment: 'top center',
    targetAttachment: 'bottom center'
  }

  const params = { ...defaults, ...options }
  const t = new Tether({
    element: el,
    target: trigger,
    ...params
  })
  t.position()
  console.log(t, params)
}
;(window as any).follow = follow

// types
