import { Component, ATTRIBUTE, createElement } from "./framework"

export { ATTRIBUTE } from "./framework"

export class List extends Component {
    appendChild(child) {
        this.template = (child)
        // this.render()
    }

    render() {
        this.children = this[ATTRIBUTE].data.map(this.template)
        this.root = (<div>{this.children}</div>).render()
        return this.root
    }
}