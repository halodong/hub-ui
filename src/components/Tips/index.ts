import { Drop } from 'components/Drop'

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
  const drop = new Drop({
    target: params.trigger,
    content: '<a>Welcome to the future</a>',
    classes: 'drop-theme-arrows',
    position: 'bottom center',
    openOn: 'hover'
  })
  console.log('tips', drop)
}

;(window as any).tips = Tips
// const positionMap = {
//   'bottom center': 'top center',
//   'top center': 'bottom center',
//   'middle left': 'right'
// }
