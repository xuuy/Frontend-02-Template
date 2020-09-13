# Proxy

Vue2.x时代采用`Object.defineProperty`来实现双向绑定，通过对prop、data上每个属性上拦截getter、setter，
进行依赖收集和更新通知，Vue3.x采用ES6的Proxy实现了双向绑定，优点也很明显，对于object、array的监听更加的容易便捷，
例如新增属性、动态改变数组长度。缺点就是IE的兼容性问题。

