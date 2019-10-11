import _ from 'lodash';
/** 引入css文件 */
import './style/index.css' //css-loader style-loader
/** 引入sass文件 */
import './style/a.sass'

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  /**  给dom元素添加类名 */ 
  // dom.className = 'box'
  dom.classList.add('box')
  return dom;
}

document.body.appendChild(createDomElement());
