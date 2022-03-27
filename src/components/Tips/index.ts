import { Drop } from 'components/Drop'

export const Tips = (options): void => {
  if (options.trigger == null) {
    throw new Error('Tips Error: You must provide a trigger.')
  }

  const defaults = {
    eventType: 'hover', // or 'click'
    text: '',
    position: 'top center',
    delay: 100
  }
  const params = { ...defaults, ...options }

  const { trigger, position, openOn, text } = params
  const el = document.createElement('div')
  const direction: string = position.split(' ')[0]
  const offset: string = position.split(' ')[1]
  el.id = 'el'
  const drop = new Drop({
    target: trigger,
    content: `<div class="hub-tips-content">${(text as string)}</div>`,
    contentClasses: `hub-tips hub-tips-${direction}-${offset}`,
    position,
    constrainToWindow: false,
    constrainToScrollParent: false,
    openOn
  })
  console.log('tips', drop)
}
;(window as any).tips = Tips
// const positionMap = {
//   'bottom center': 'top center',
//   'top center': 'bottom center',
//   'middle left': 'right'
// }
