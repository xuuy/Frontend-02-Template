import { Component, STATE, ATTRIBUTE } from './framework'
import { enableGesture } from './gesture'
import { Animation, TimeLine } from './animation'
import { ease } from './ease'

export { STATE, ATTRIBUTE } from './framework'

export class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (const record of this[ATTRIBUTE].src) {
      const child = document.createElement('div')
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)

    const timeline = new TimeLine()
    timeline.start()

    let handler = null

    const children = this.root.children
    this[STATE].position = 0

    let t = 0
    let ax = 0

    this.root.addEventListener('start', (event) => {
      timeline.pause()
      clearInterval(handler)
      const progress = (Date.now() - t) / 500
      ax = ease(progress) * 500 - 500
    })

    this.root.addEventListener('tap', (event) => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTE].src[this[STATE].position],
        position: this[STATE].position,
      })
    })

    this.root.addEventListener('pan', (event) => {
      const x = event.clientX - event.startX - ax

      const current = this[STATE].position - (x - (x % 500)) / 500

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length

        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${
          -pos * 500 + offset * 500 + (x % 500)
        }px)`
      }
    })

    this.root.addEventListener('end', (event) => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 3000)

      const x = event.clientX - event.startX - ax

      const current = this[STATE].position - (x - (x % 500)) / 500

      let direction = Math.round((x % 500) / 500)

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length

        children[pos].style.transition = 'none'

        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 500 + offset * 500 + (x % 500),
            -pos * 500 + offset * 500 + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          )
        )
      }

      this[STATE].position =
        this[STATE].position - (x - (x % 500)) / 500 - direction
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length

      this.triggerEvent('change', { position: this[STATE].position })
    })

    let nextPicture = () => {
      const child = this.root.children
      const nextIndex = (this[STATE].position + 1) % child.length

      const current = child[this[STATE].position]
      const next = child[nextIndex]

      t = Date.now()

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -this[STATE].position * 500,
          -500 - this[STATE].position * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )

      timeline.add(
        new Animation(
          next.style,
          'transform',
          500 - nextIndex * 500,
          -500 * nextIndex,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )

      this[STATE].position = nextIndex

      this.triggerEvent('change', { position: this[STATE].position })
    }

    handler = setInterval(nextPicture, 3000)

    return this.root
  }
}
