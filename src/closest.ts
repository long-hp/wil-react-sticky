// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// For browsers that do not support Element.closest(), but carry support for element.matches() (or a prefixed equivalent, meaning IE9+), a polyfill exists:

if (typeof Element !== 'undefined') {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s: string) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let el: Element = this;

      do {
        if (el.matches(s)) return el;
        // @ts-ignore
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
}
