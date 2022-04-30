import { HubBtn } from '../src/components/Button'
import { HubInput } from '../src/components/Input'

// common
export const elHasClassName = (el: HTMLElement | null = null, className: string): boolean => {
  if (el == null) return false
  return el?.classList.contains(className)
}
// hub-btn
export const renderHubBtn = (): HubBtn => {
  const el = new HubBtn()
  document.body.appendChild(el)
  return el
}

// hub-input
export const renderHubInput = (): HubInput => {
  const el = new HubInput()
  document.body.appendChild(el)
  return el
}
