import { follow } from 'components/Follow'

export const Tips = (options): void => {
  if (options.trigger == null) {
    throw new Error('Tips Error: You must provide a trigger.')
  }

  const defaults = {
    eventType: 'hover', // or 'click'
    content: '',
    align: 'top center',
    delay: 100
  }
  const params = { ...defaults, ...options }
  const el = document.createElement('div')
  el.id = 'el'
  params.trigger.addEventListener('mouseover', () => {
    console.log('tips')
    document.body.append(el)
    follow(el, params.trigger, { attachment: params.align })
  })
  params.trigger.addEventListener('mouseleave', () => {
    el.remove()
  })
}

;(window as any).tips = Tips
// const positionMap = {
//   'bottom center': 'top center',
//   'top center': 'bottom center',
//   'middle left': 'right'
// }
