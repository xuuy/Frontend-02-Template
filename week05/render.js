const images = require('images')

module.exports = function render(viewport, element) {
  const img = images(200, 200)
  // TODO: 渲染每个元素
  img.fill(255, 255, 255, 1)
  viewport.draw(img, 0, 0)
}
