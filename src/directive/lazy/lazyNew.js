/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-10-25 18:09:01
 */
const defaultGif = require('../../assets/images/loading.gif')
let imgsInf = []//存储尚未加载的图片信息

//调用该函数 用于加载单张图片
function loadingImg(imgDOM) {
  //获得该img元素的src信息
  let imgSrc = imgsInf.filter((imgInf) => imgInf.dom === imgDOM)[0].src
  const tempImg = new Image()
  tempImg.onload = function() {
    imgDOM.src = imgSrc
  }
  tempImg.src = imgSrc
  imgsInf = imgsInf.filter((imgInf) => imgInf.dom !== imgDOM)
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((item) => {
    if (item.isIntersecting) {
      loadingImg(item.target)
      io.unobserve(item.target)
    }
  })
})

export default {
  install(Vue) {
    Vue.directive('lazy', {
      inserted(el, bindings) {
        el.src = defaultGif
        io.observe(el)
        const imgInf = {
          dom: el,
          src: bindings.value
        }
        imgsInf.push(imgInf)
      },
      update(el, bindings) {
        console.log('update', bindings)
      },
      componentUpdated(el, bindings) {
        console.log('componentUpdated', bindings)
      },
      unbind(el) {
        console.log('lazy解绑');
        io.unobserve(el); //停止监听
        imgsInf = imgsInf.filter((imgInf) => imgInf.dom !== el)
      }
    })
  }
}