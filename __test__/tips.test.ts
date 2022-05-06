import '../dist'

jest.useFakeTimers()
describe('test Tips component', () => {
  it('tips should be mounted on the window object', () => {
    expect((window as any).tips).not.toBeNull()
  })

  it('should return a tips object after the call', () => {
    const btn = document.createElement('button')
    document.body.appendChild(btn)
    const tipsObj = (window as any).tips({
      trigger: btn,
      text: 'bottom left',
      position: 'bottom left',
      openOn: 'click'
    })
    expect(tipsObj.type === 'hub-tips').toBe(true)
    expect(tipsObj.drop).not.toBeNull()
  })

  it('should rendered tips element in document', () => {
    expect.assertions(3)
    const btn = document.createElement('button')
    document.body.appendChild(btn)
    ;(window as any).tips({
      trigger: btn,
      text: 'bottom left',
      position: 'bottom left',
      openOn: 'click'
    })
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(0)
    btn.click()
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(1)
    btn.click()
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(0)
  })

  it('should be rendered asynchronously in document', () => {
    expect.assertions(3)
    const btn = document.createElement('button')
    document.body.appendChild(btn)
    ;(window as any).tips({
      trigger: btn,
      text: 'bottom left',
      position: 'bottom left',
      openOn: 'hover',
      delay: 1000
    })
    btn.dispatchEvent(new Event('mouseover'))
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(0)
    jest.advanceTimersByTime(1000)
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(1)
    btn.dispatchEvent(new Event('mouseout'))
    jest.advanceTimersByTime(1000)
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(0)
  })
})
