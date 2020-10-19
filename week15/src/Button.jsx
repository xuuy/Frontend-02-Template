import { Component, createElement } from './framework'

export class Button extends Component {
  constructor() {
    super()
  }

  appendChild(child) {
    if (!this.childContainer) this.render()
    this.childContainer.appendChild(child)
  }

  render() {
    this.childContainer = <span />
    this.root = (<div>{this.childContainer}</div>).render()
    return this.root
  }
}
