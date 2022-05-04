import '../dist'

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
    const btn = document.createElement('button')
    document.body.appendChild(btn)
    ;(window as any).tips({
      trigger: btn,
      text: 'bottom left',
      position: 'bottom left',
      openOn: 'click'
    })
    expect(document.querySelectorAll('.hub-tips').length).toBe(0)
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(0)
    btn.click()
    expect(document.querySelectorAll('.hub-tips').length).toBe(1)
    expect(document.querySelectorAll('.hub-tips-bottom-left').length).toBe(1)
  })
})
