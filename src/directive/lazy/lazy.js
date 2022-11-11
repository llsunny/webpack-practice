/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-10-25 10:48:12
 */
import formatUtils from "../../utils/formatUtils";
const defaultGif = require('../../assets/images/loading.gif')
import eventBus from "../../utils/eventBus";
// 调用setImages函数，就可以处理那些符合条件的图片
function setImages() {
  for(const img of imgs) {
    setImage(img) // 处理该图片
  }
}
//监听事件总线中的mainScroll事件，该事件触发时调用setImages函数来加载图片
eventBus.$on('mainScroll', formatUtils.throttle(setImages, 500))

let imgs = [] //存储收集到的的图片信息 当图片加载好后删除该图片信息

// 调用setImage函数，就可以进行单张图片的加载
function setImage(img) {
  console.log(3)
  img.dom.src = defaultGif
  const clientHeight = document.documentElement.clientHeight //视口高度
  const rect = img.dom.getBoundingClientRect() //图片的位置信息
  //取默认值300 是为了解决图片未加载成功时高度缺失的问题
  const height = rect.height || 300 //图片的高度
  // 判断该图片是否在视口范围内
  if (-rect.top <= height && rect.top <= clientHeight) {
    // 在视口范围内 进行相关处理操作
    const tempImg = new Image() //新建Image对象实例
    // 改写onload事件
    tempImg.onload = function () {
      // 当图片加载完成后
      img.dom.src = img.src //替换img元素的src属性
    }
    tempImg.src = img.src
    imgs = imgs.filter((i) => i !== img) //将已加载好的图片进行删除
  } else {
    // 不在视口范围内 不进行操作
  }
}

export default {
  install(Vue) {
    Vue.directive('lazy', {
      inserted(el, bindings) {
        // 刚插入父节点时 收集img节点信息
        const img = {
          dom: el, // img 元素DOM节点
          src: bindings.value, // img的src属性值
        }
        imgs.push(img) //先将图片信息存储到imgs数组
        setImage(img)
      },
      unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el)
      },
    })
  }
}