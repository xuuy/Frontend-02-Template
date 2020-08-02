const getStyle = styles => {
  console.log(styles)
}

const Layout = function (element) {
  if (!element.computedStyle || JSON.stringify(element.computedStyle) === '{}') return
  const style = getStyle(element.computedStyle)
  
  if (style.display !== 'flex') return
  
  const items = element.children.filter(e => e.nodeType === 'element')
  
  items.sort((a, b) => ((a.order || 0) - b.order || 0))
}

module.exports = Layout
