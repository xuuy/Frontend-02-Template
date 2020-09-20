export class Component {
  constructor(props) {
    this.props = props || {};
  }

  setState(state, callback) {
    this.state = Object.assign(this.state, state);
    callback && callback();
  }
}

function isVaildTag(tag) {
  return typeof tag === "string" || typeof tag === "function";
}

// 事件委托
let eventId = 0;
const events = {
  click: new Map(),
};
Object.keys(events).forEach((type) =>
  document.body.addEventListener(type, (event) => {
    const { target } = event;
    const callback = events[type].get(target.eventId);
    if (callback) {
      callback({
        ...event,
        currentTarget: event.target
      });
    }
  })
);
// 1. event attribute
// 2. style attribute
// 3. native attribute(no contains event and style)
// 4. custom attribute
const nativeAttr = {};
const isNumber = (n) => /^(\.?[0-9]+|[0-9]+\.?[0-9]*)/.test(n);
const addPx = (n) => n + "px";

const calcStyle = (styles) => {
  const reg = /([a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)?/;
  return Object.keys(styles)
    .map((key) => {
      reg.test(key);
      const name = key.replace(reg, (i, a, b, c) => {
        return a + (b ? "-" + b.toLowerCase() : c ? "-" + c.toLowerCase() : "");
      });
      return `${name}: ${
        isNumber(styles[key]) ? addPx(styles[key]) : styles[key]
      }`;
    })
    .join(";");
};
const handleAttribute = (element, props) => {
  for (const key in props) {
    if (key !== "children") {
      if (props.hasOwnProperty(key)) {
        if (/^on([A-Z].+)/.test(key)) {
          // 事件由body进行分发
          const eid = eventId++;
          // 防止被人窜写、删除
          Object.defineProperty(element, "eventId", {
            value: eid,
          });
          events[RegExp.$1.toLowerCase()].set(eid, props[key]);
        } else if (key === "style") {
          element.setAttribute("style", calcStyle(props[key]));
        } else if (key === 'className') {
          element.classList.add(props[key])
        } else {
          element.setAttribute(key, props[key]);
        }
      }
    }
  }
};

export const h = (Tag, Props = {}, ...Childrens) => {
  if (!isVaildTag(Tag)) {
    throw new TypeError("tag is invalid");
  }

  let element;
  if (typeof Tag === "string") {
    element = document.createElement(Tag);
    element.append(...Childrens.flat());

    handleAttribute(element, Props);
  } else if (Tag.prototype instanceof Component) {
    const instance = new Tag({ ...Props, children: Childrens });
    return instance.render();
  } else {
    return Tag({ ...Props, children: Childrens });
  }

  return element;
};

export const render = (element, container) => {
  container.appendChild(element);
};
