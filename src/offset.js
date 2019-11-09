function isWindow(obj) {
  return obj !== null && obj === obj.window;
}
function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {
  let box = { top: 0, left: 0 };
  const doc = elem && elem.ownerDocument;
  if (!doc) {
    return {
      top: 0,
      left: 0
    };
  }

  const docElem = doc.documentElement;

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }
  const win = getWindow(doc);
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
}
export default offset;
