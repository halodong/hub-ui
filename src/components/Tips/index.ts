import { Drop } from 'components/Drop'

export const Tips = (options: TipsOption): HubTips => {
  if (options.trigger == null) {
    throw new Error('Tips Error: You must provide a trigger.')
  }

  const defaults = {
    openOn: 'hover',
    text: '',
    position: 'top center',
    delay: 100
  }
  const params = { ...defaults, ...options }

  const { trigger, position, openOn, text } = params
  const direction: string = position.split(' ')[0]
  const offset: string = position.split(' ')[1]
  const drop = new Drop({
    target: trigger,
    content: `<div class="hub-tips-content">${(text)}</div>`,
    contentClasses: `hub-tips hub-tips-${direction}-${offset}`,
    position,
    constrainToWindow: false,
    constrainToScrollParent: false,
    openOn
  })
  return {
    type: 'hub-tips',
    drop,
    ...params
  }
}
;(window as any).tips = Tips

// types
// --------------------------------------------------------------------------------------------------------------
interface HubTips extends TipsOption{
  type: 'hub-tips'
  drop: Drop
}

interface TipsOption {
  trigger: HTMLElement
  openOn: 'hover'|'click'
  text: string
  position: 'top center'
  | 'bottom left'
  | 'bottom right'
  | 'bottom center'
  | 'top left'
  | 'top right'
  | 'top center'
  | 'top center'
  | 'right top'
  | 'right middle'
  | 'right bottom'
  | 'left top'
  | 'left middle'
  | 'left bottom'
  delay: number
}
