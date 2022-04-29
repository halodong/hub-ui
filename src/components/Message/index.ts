const icon = {
  success: '<svg class="hub-msg-icon" t="1648568141814" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1390" width="200" height="200"><path d="M122.2656 565.0432c-9.9328-9.9328-11.5712-25.3952-2.7648-36.4544l20.48-25.8048c8.3968-10.5472 24.064-13.2096 35.2256-5.8368l177.3568 118.3744c9.3184 6.2464 25.4976 5.4272 34.2016-1.6384L855.3472 233.472c10.5472-8.4992 27.0336-7.7824 36.2496 1.4336l11.5712 11.5712c10.0352 10.0352 9.3184 25.9072-1.2288 36.4544L398.9504 785.1008c-15.6672 15.6672-41.3696 14.9504-57.4464-1.1264L122.2656 565.0432z" fill="#1bab07" p-id="1391"></path></svg>',
  error: '<svg class="hub-msg-icon" t="1648568245753" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3705" width="200" height="200"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="3706" fill="#cd360b"></path><path d="M657.066667 360.533333c-12.8-12.8-32-12.8-44.8 0l-102.4 102.4-102.4-102.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l102.4-102.4 102.4 102.4c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c12.8-12.8 12.8-32 0-44.8l-106.666666-100.266666 102.4-102.4c12.8-12.8 12.8-34.133333 0-46.933334z" p-id="3707" fill="#cd360b"></path></svg>',
  info: '<svg class="hub-msg-icon"t="1648568295138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4623" width="200" height="200"><path d="M512 128a384 384 0 1 1-0.042667 768.042667A384 384 0 0 1 512 128z m-19.2 553.258667l76.501333-248.362667-16-1.408-91.52 11.690667-4.693333 13.994666c3.754667 0.085333 6.954667 0.256 9.6 0.512a17.066667 17.066667 0 0 1 13.226667 7.253334c2.986667 4.266667 4.266667 9.088 3.84 14.293333-0.725333 8.277333-3.584 20.48-8.533334 36.565333l-51.754666 166.954667c-4.181333 13.312-6.656 24.277333-7.424 33.109333-1.152 13.226667 1.28 24.533333 7.338666 33.792a33.28 33.28 0 0 0 26.282667 15.402667c30.08 2.645333 61.098667-26.112 93.269333-86.229333l-8.362666-7.936c-13.141333 22.016-24.106667 37.077333-32.853334 45.184-3.285333 3.328-6.4 4.864-9.429333 4.565333-1.834667-0.128-3.413333-1.365333-4.778667-3.797333a12.714667 12.714667 0 0 1-1.706666-7.509334c0.384-4.437333 2.688-13.866667 6.954666-28.074666zM554.496 384a41.301333 41.301333 0 0 0 30.293333-12.458667A41.301333 41.301333 0 0 0 597.333333 341.333333a41.429333 41.429333 0 0 0-12.373333-30.208 41.344 41.344 0 0 0-30.421333-12.458666 40.96 40.96 0 0 0-30.165334 12.458666A41.429333 41.429333 0 0 0 512 341.333333c0 11.776 4.138667 21.845333 12.501333 30.208 8.405333 8.277333 18.346667 12.458667 30.037334 12.458667z" p-id="4624" fill="#bfbfbf"></path></svg>',
  warning: '<svg class="hub-msg-icon"  t="1648568176545" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="200" height="200"><path d="M934.4 770.133333L605.866667 181.333333C586.666667 147.2 550.4 128 512 128c-38.4 0-74.666667 21.333333-93.866667 53.333333L89.6 770.133333c-19.2 34.133333-19.2 76.8 0 110.933334S145.066667 938.666667 183.466667 938.666667h657.066666c38.4 0 74.666667-21.333333 93.866667-57.6 19.2-34.133333 19.2-76.8 0-110.933334z m-55.466667 81.066667c-8.533333 14.933333-23.466667 23.466667-38.4 23.466667H183.466667c-14.933333 0-29.866667-8.533333-38.4-23.466667-8.533333-14.933333-8.533333-34.133333 0-49.066667L473.6 213.333333c8.533333-12.8 23.466667-21.333333 38.4-21.333333s29.866667 8.533333 38.4 21.333333l328.533333 588.8c8.533333 14.933333 8.533333 32 0 49.066667z" p-id="2515" fill="#e8de1c"></path><path d="M512 746.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" p-id="2516" fill="#e8de1c"></path><path d="M512 629.333333c17.066667 0 32-14.933333 32-32v-192c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v192c0 17.066667 14.933333 32 32 32z" p-id="2517" fill="#e8de1c"></path></svg>'
}
class Message {
  static id: number
  public ul: HTMLUListElement
  constructor () {
    const container = document.createElement('div')
    this.ul = document.createElement('ul')
    container.appendChild(this.ul)
    container.classList.add('hub-msg')
    this.ul.classList.add('hub-msg-list')
    document.body.appendChild(container)
  }

  show (content: string, delay: number = 3000, type: string): void {
    const html = `
    <li class="hub-msg-item fade-in" data-id="${String(Message.id)}">
        <div>
             ${icon[type] as string}
            <span>${content}</span>
        </div>
    </li>`
    this.ul.insertAdjacentHTML('beforeend', html)
    Message.id++
    const lis = document.querySelectorAll('li.hub-msg-item')
    const length = lis.length
    const lastLi = lis[length - 1]
    if (lastLi == null) return
    ;(lastLi as any)._timeout = setTimeout(function () {
      lastLi.classList.remove('fade-in')
      lastLi.classList.add('fade-out')
      lastLi.addEventListener('animationend', function (e) {
        lastLi.remove()
      })
    }, delay)

    // Display up to 7
    if (length > 7) {
      clearTimeout((lis[0] as any)._timeout)
      lis[0].remove()
    }
  }

  hide (): void {
    const li = document.querySelector(
      `li.message-item[data-id="${String(Message.id)}"]`
    )
    if (li != null) {
      li.remove()
      clearTimeout((li as any)._timeout)
    }
  }

  success (content, delay): number {
    this.show(content, delay, 'success')
    return Message.id
  }

  error (content, delay): number {
    this.show(content, delay, 'error')
    return Message.id
  }

  warning (content, delay): number {
    this.show(content, delay, 'warning')
    return Message.id
  }

  info (content, delay): number {
    this.show(content, delay, 'info')
    return Message.id
  }
}

;(window as any).message = new Message()
