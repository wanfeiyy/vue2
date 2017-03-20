/**
 * 存储localStorage
 */
export const setStore = (name,content) => {
  if (! name) return;
  typeof content !== 'string' && (content = JSON.stringify(content));
  window.localStorage.setItem(name,content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const getStyle = (element,attr,NumberMode = 'int') => {
  let target;
  if (attr == 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element,null)['attr']
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target)
}