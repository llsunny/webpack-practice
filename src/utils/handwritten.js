/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-10-27 11:09:48
 */
// 手写new
function _new(fn) {
  if (typeof fn !== 'function') {
    throw '_new方法的第一参数必须是一个方法'
  }
  const newObj = Object.create(fn.prototype)
  const args = Array.prototype.slice.call(arguments, 1)
  const ret = fn.apply(newObj, args)
  return typeof ret === 'object'? ret : newObj
}
/**
* Object()方法
* 如果传入的是值类型 会返回对应类型的构造函数创建的实例
* 如果传入的是对象 返回对象本身
* 如果传入 undefined 或者 null 会返回空对象
*/
Function.prototype._call = function(ctx, ...args) {
  const o = ctx == undefined ? window : Object(ctx)
  const key = Symbol()
  o[key] = this
  const result = o[key](...args)
  delete o[key]
  return result
}
// 手写apply 只需要把第二个参数改成数组形式就可以了
Function.prototype._apply = function (ctx, array = []) {
  const o = ctx == undefined ? window : Object(ctx)
  const key = Symbol()
  o[key] = this
  const result = o[key](...array)
  delete o[key]
  return result
}
// 手写bind
Function.prototype._bind = function(ctx, ...outArgs) {
  const o = ctx == undefined ? window : Object(ctx)
  const key = Symbol()
  o[key] = this
  const newFn = function (...innerArgs) {
    const result = o[key](...outArgs, ...innerArgs)
    return result
  }
  if (o[key].prototype) {
    newFn.prototype = Object.create(o[key].prototype)
  }
  return newFn
}
// 手写instanceof
function _instanceof(target, origin) {
  if (typeof target !== 'object' || target === null) return false
  if (typeof origin !== 'function') {
    throw new TypeError('origin must be function')
  }
  let proto = Object.getPrototypeOf(target)
  while (proto) {
    if (proto === origin.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
// 事件总线（发布订阅模式）
class EventEmitter{
  constructor() {
    this.cache = {}
  }
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }
  off(name, fn) {
    let tasks = this.cache[name]
    if (tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback ===fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      let tasks = this.cache[name].slice()
      for(let fn of tasks) {
        fn(...args)
      }
      if (once) {
        delete this.cache[name]
      }
    }
  }
}
// 节流
function throttle(fn, interval = 500) {
  let timer = null
  let firstTime = true

  return function (...args) {
    if (firstTime) {
      fn.apply(this, args)
      return firstTime = false
    }
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, args)
    }, interval);
  }
}
function isElementViewport(el) {
  const { top, height, left, width} = el.getBoundingClientRect()
  const w = window.innerWidth || document.documentElement.clientWidth
  const h = window.innerHeight|| document.documentElement.clientHeight
  return (
    top <= h &&
    (top + height) >= 0 &&
    left <= w &&
    (left + width) >= 0
  )
}
// getBoundingClientRect()方法实现
function LazyLoad(el, options) {
  if (!(this instanceof LazyLoad)) {
    return new LazyLoad(el)
  }
  this.setting = Object.assign({}, {src: 'data-src', srcset: 'data-srcset', selector: ''})
  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
  }
  this.images = Array.from(el)
  this.isElementViewport = isElementViewport
  this.listener = this.loadImage()
  this.listener()
  this.initEvent()
}
LazyLoad.prototype = {
  loadImage() {
    return throttle(function() {
      let startIndex = 0
      while(startIndex < this.images.length) {
        const image = this.images[startIndex]
        if (this.isElementViewport(image)) {
          const src = image.getAttribute(this.setting.src)
          const srcset = image.getAttribute(this.setting.srcset)
          if (image.tagName.toLowerCase() === 'img') {
            if (src) {
              image.src = src
            }
            if (srcset) {
              image.srcset = srcset
            }
          } else {
            image.style.backgroundImage = `url(${src})`
          }
          this.images.splice(startIndex, 1)
          continue
        }
        startIndex++
      }
      if (!this.images.length) {
        this.destroy()
      }
    }).bind(this)
  },
  initEvent() {
    window.addEventListener('scroll', this.listener, false)
  },
  destroy() {
    window.removeEventListener('scroll', this.listener, false)
    this.images = null
    this.listener = null
  }
}

// class LazyLoad {
//   constructor(images, options = {}) {
//     if (!(this instanceof LazyLoad)) {
//       return new LazyLoad(images, options)
//     }
//     this.setting = Object.assign({}, {src: 'data-src', srcset: 'data-srcset', selector: '.lazyload'}, options)
//     this.images = images || document.querySelectorAll(this.setting.selector)
//     this.observer = null
//     this.init()
//   }
//   init() {
//     let self = this
//     let observerConfig = {
//       root: null,
//       rootMargin: '0px',
//       threshold: [0]
//     }
//     this.observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         const target = entry.target
//         if (entry.intersectionRatio > 0) {
//           self.observer.unobserve(target)
//           const src = target.getAttribute(self.setting.src)
//           const srcset = target.getAttribute(self.setting.srcset)
//           if ('img' === target.tagName.toLowerCase()) {
//             if (src) {
//               target.src = src
//             }
//             if (srcset) {
//               target.srcset = srcset
//             }
//           } else {
//             target.style.backgroundImage = `url${src}`
//           }
//         }
//       },)
//     }, observerConfig)
//     console.log(this.images)
//     this.images.forEach(image => this.observer.observe(image))
//   }
// }
// 数组扁平化
function flatten(arr) {
  var result = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// 解析 URL 参数为对象
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]
  const paramsArr = paramsStr.split('&')
  let paramsObj = {}
  paramsArr.forEach(param => {
    if (/=/.test(param)) {
      let [key, val] = param.split('=')
      val = decodeURIComponent(val)
      val = /^\d+$/.test(val) ? parseFloat(val) : val
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else {
        paramsObj[key] =val
      }
    } else {
      paramsObj[param] = true
    }
  })
  return paramsObj
}
export { 
  _new,
  _instanceof,
  EventEmitter,
  LazyLoad,
  flatten,
  parseParam
}