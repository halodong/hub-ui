import { Tether, addClass, removeClass, Evented } from '../../plugins/tether.js'

const hasClass = (el: HTMLElement, className: string): boolean => {
  console.log('hasclass', el.classList.contains(className), className)
  return el.classList.contains(className)
}
// const defaults = {
//   /**
//    * attachment: A string of the form 'vert-attachment horiz-attachment'
//    * vert-attachment can be any of 'top', 'middle', 'bottom'
//    * horiz-attachment can be any of 'left', 'center', 'right'
//    */
//   pin: 'top, bottom',
//   attachment: 'top center',
//   targetAttachment: 'bottom center'
// }
const classPrefix = 'drop'
const defaults = {
  position: 'bottom left',
  openOn: 'click',
  beforeClose: null,
  constrainToScrollParent: true,
  constrainToWindow: true,
  classes: '',
  remove: true,
  openDelay: 0,
  closeDelay: 50,
  // inherited from openDelay and closeDelay if not explicitly defined
  focusDelay: null,
  blurDelay: null,
  hoverOpenDelay: null,
  hoverCloseDelay: null,
  tetherOptions: {}
}
const MIRROR_ATTACH = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
}
const clickEvents = ['click']
const drops: any[] = []
const allDrops: any = {}
function sortAttach (str): string {
  let [first, second] = str.split(' ')
  if (['left', 'right'].includes(first)) {
    [first, second] = [second, first]
  }
  return [first, second].join(' ')
}
const transitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}

let transitionEndEvent = ''
for (const name in transitionEndEvents) {
  if ({}.hasOwnProperty.call(transitionEndEvents, name)) {
    const tempEl = document.createElement('p')
    if (typeof tempEl.style[name] !== 'undefined') {
      transitionEndEvent = transitionEndEvents[name]
    }
  }
}
const updateBodyClasses = (): void => {
  // There is only one body, so despite the context concept, we still iterate through all
  // drops which share our classPrefix.

  let anyOpen = false
  const drops = allDrops[classPrefix]
  const len = drops.length
  for (let i = 0; i < len; ++i) {
    if (drops[i].isOpened() === true) {
      anyOpen = true
      break
    }
  }

  if (anyOpen) {
    addClass(document.body, `${classPrefix}-open`)
  } else {
    removeClass(document.body, `${classPrefix}-open`)
  }
}
export class Drop extends Evented {
  public options: any
  public target: HTMLElement
  public drop: HTMLElement | null = null
  public content: HTMLElement | null = null
  public tether: Tether
  public _boundEvents: any
  public isClosing: boolean = false
  constructor (opts) {
    super()
    this.options = { ...defaults, ...opts }
    this.target = this.options.target

    if (typeof this.target === 'undefined') {
      throw new Error('Drop Error: You must provide a target.')
    }

    const dataPrefix = `data-${classPrefix}`

    const contentAttr = this.target.getAttribute(dataPrefix)
    if (contentAttr != null && this.options.content == null) {
      this.options.content = contentAttr
    }

    const attrsOverride = ['position', 'openOn']
    for (let i = 0; i < attrsOverride.length; ++i) {
      const override = this.target.getAttribute(
        `${dataPrefix}-${attrsOverride[i]}`
      )
      if (override != null && this.options[attrsOverride[i]] == null) {
        this.options[attrsOverride[i]] = override
      }
    }

    if (
      this.options.classes != null &&
      this.options.addTargetClasses !== false
    ) {
      addClass(this.target, this.options.classes)
    }

    if (typeof allDrops[classPrefix] === 'undefined') {
      allDrops[classPrefix] = []
    }
    drops.push(this)
    allDrops[classPrefix].push(this)

    this._boundEvents = []
    this.setupElements()
    this.setupEvents()
    this.setupTether()
  }

  transitionEndHandler (e): void {
    if (e.target !== e.currentTarget) {
      return
    }
    if (this.drop == null) return
    if (!hasClass(this.drop, `${classPrefix}-open`)) {
      removeClass(this.drop, `${classPrefix}-open-transitionend`)
    }
    this.drop.removeEventListener(transitionEndEvent, this.transitionEndHandler)
  }

  _on (element, event, handler): void {
    this._boundEvents.push({ element, event, handler })
    element.addEventListener(event, handler)
  }

  toggle (event): void {
    if (this.isOpened()) {
      this.close(event)
    } else {
      this.open(event)
    }
  }

  setupElements (): void {
    this.drop = document.createElement('div')
    addClass(this.drop, classPrefix)

    if (this.options.classes != null) {
      addClass(this.drop, this.options.classes)
    }

    this.content = document.createElement('div')
    addClass(this.content, `${classPrefix}-content`)

    if (typeof this.options.content === 'function') {
      const generateAndSetContent = (): void => {
        // content function might return a string or an element
        const contentElementOrHTML = this.options.content.call(this, this)
        if (this.content == null) return
        if (typeof contentElementOrHTML === 'string') {
          this.content.innerHTML = contentElementOrHTML
        } else if (typeof contentElementOrHTML === 'object') {
          this.content.innerHTML = ''
          this.content.appendChild(contentElementOrHTML)
        } else {
          throw new Error(
            'Drop Error: Content function should return a string or HTMLElement.'
          )
        }
      }

      generateAndSetContent()
      ;(this as any).on('open', generateAndSetContent.bind(this))
    } else if (typeof this.options.content === 'object') {
      this.content.appendChild(this.options.content)
    } else {
      this.content.innerHTML = this.options.content
    }

    this.drop.appendChild(this.content)
  }

  setupTether (): void {
    // Tether expects two attachment points, one in the target element, one in the
    // drop.  We use a single one, and use the order as well, to allow us to put
    // the drop on either side of any of the four corners.  This magic converts between
    // the two:
    let dropAttach = this.options.position.split(' ')
    dropAttach[0] = MIRROR_ATTACH[dropAttach[0]]
    dropAttach = dropAttach.join(' ')

    const constraints: any[] = []
    if (this.options.constrainToScrollParent != null) {
      constraints.push({
        to: 'scrollParent',
        pin: 'top, bottom',
        attachment: 'together none'
      })
    } else {
      // To get 'out of bounds' classes
      constraints.push({
        to: 'scrollParent'
      })
    }

    if (this.options.constrainToWindow !== false) {
      constraints.push({
        to: 'window',
        attachment: 'together'
      })
    } else {
      // To get 'out of bounds' classes
      constraints.push({
        to: 'window'
      })
    }

    const opts = {
      element: this.drop,
      target: this.target,
      attachment: sortAttach(dropAttach),
      targetAttachment: sortAttach(this.options.position),
      classPrefix,
      offset: '0 0',
      targetOffset: '0 0',
      enabled: false,
      constraints: constraints,
      addTargetClasses: this.options.addTargetClasses
    }

    if (this.options.tetherOptions !== false) {
      this.tether = new Tether({ ...opts, ...this.options.tetherOptions })
    }
  }

  setupEvents (): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.options.openOn) {
      return
    }

    if (this.options.openOn === 'always') {
      setTimeout(this.open.bind(this))
      return
    }

    const events = this.options.openOn.split(' ')

    if (events.indexOf('click') >= 0) {
      const openHandler = (event): void => {
        this.toggle(event)
        event.preventDefault()
      }

      const closeHandler = (event): void => {
        if (!this.isOpened()) {
          return
        }

        // Clicking inside dropdown
        if (this.drop != null && (event.target === this.drop || this.drop.contains(event.target))) {
          return
        }

        // Clicking target
        if (event.target === this.target || this.target.contains(event.target)) {
          return
        }

        this.close(event)
      }

      for (let i = 0; i < clickEvents.length; ++i) {
        const clickEvent = clickEvents[i]
        this._on(this.target, clickEvent, openHandler)
        this._on(document, clickEvent, closeHandler)
      }
    }

    let inTimeout: NodeJS.Timeout | null = null
    let outTimeout: NodeJS.Timeout | null = null

    const inHandler = (event: any): void => {
      if (outTimeout != null) {
        clearTimeout(outTimeout)
      } else {
        const optionsDelay = event.type === 'focus'
          ? this.options.focusDelay
          : this.options.hoverOpenDelay
        inTimeout = setTimeout(() => {
          this.open(event)
          inTimeout = null
        }, (optionsDelay != null
          ? optionsDelay
          : this.options.openDelay))
      }
    }

    const outHandler = (event): void => {
      if (inTimeout != null) {
        clearTimeout(inTimeout)
      } else {
        const optionsDelay = event.type === 'blur'
          ? this.options.blurDelay
          : this.options.hoverCloseDelay
        outTimeout = setTimeout(() => {
          this.close(event)
          outTimeout = null
        }, (optionsDelay != null
          ? optionsDelay
          : this.options.openDelay))
      }
    }

    if (events.indexOf('hover') >= 0) {
      this._on(this.target, 'mouseover', inHandler)
      this._on(this.drop, 'mouseover', inHandler)
      this._on(this.target, 'mouseout', outHandler)
      this._on(this.drop, 'mouseout', outHandler)
    }

    if (events.indexOf('focus') >= 0) {
      this._on(this.target, 'focus', inHandler)
      this._on(this.drop, 'focus', inHandler)
      this._on(this.target, 'blur', outHandler)
      this._on(this.drop, 'blur', outHandler)
    }
  }

  isOpened (): boolean {
    if (this.drop != null) {
      return hasClass(this.drop, `${classPrefix}-open`)
    }
    return false
  }

  beforeCloseHandler (event): boolean {
    let shouldClose = true

    if (!this.isClosing && typeof this.options.beforeClose === 'function') {
      this.isClosing = true
      shouldClose = this.options.beforeClose(event, this) !== false
    }

    this.isClosing = false

    return shouldClose
  }

  open (event): void {
    /* eslint no-unused-vars: 0 */
    if (this.isOpened()) {
      return
    }
    console.log('open')
    if (this.drop != null && this.drop.parentNode == null) {
      document.body.appendChild(this.drop)
    }

    if (typeof this.tether !== 'undefined') {
      this.tether.enable()
    }

    addClass(this.drop, `${classPrefix}-open`)
    addClass(this.drop, `${classPrefix}-open-transitionend`)

    setTimeout(() => {
      if (this.drop != null) {
        addClass(this.drop, `${classPrefix}-after-open`)
      }
    })

    if (typeof this.tether !== 'undefined') {
      this.tether.position()
    }

    ;(this as any).trigger('open')

    updateBodyClasses()
  }

  remove (event): void {
    this.close(event)
    if (this.drop == null) return
    if (this.drop.parentNode != null) {
      this.drop.parentNode.removeChild(this.drop)
    }
  }

  close (event): void {
    if (!this.isOpened()) {
      return
    }

    if (!this.beforeCloseHandler(event)) {
      return
    }

    removeClass(this.drop, `${classPrefix}-open`)
    removeClass(this.drop, `${classPrefix}-after-open`)

    if (this.drop != null) {
      this.drop.addEventListener(transitionEndEvent, this.transitionEndHandler)
    }

    ;(this as any).trigger('close')
    console.log('close')
    if (typeof this.tether !== 'undefined') {
      this.tether.disable()
    }

    updateBodyClasses()

    if (this.options.remove === true) {
      this.remove(event)
    }
  }
}
