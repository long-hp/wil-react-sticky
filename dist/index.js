'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function getWindow(el) {
    return el.nodeType === 9 && el.defaultView;
}
function offset(el) {
    var _a;
    var doc = (_a = el) === null || _a === void 0 ? void 0 : _a.ownerDocument;
    var docElem = doc.documentElement;
    var win = getWindow(doc);
    var box = { top: 0, left: 0 };
    if (!doc) {
        return {
            top: 0,
            left: 0,
        };
    }
    if (typeof el.getBoundingClientRect !== typeof undefined) {
        box = el.getBoundingClientRect();
    }
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft,
    };
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// For browsers that do not support Element.closest(), but carry support for element.matches() (or a prefixed equivalent, meaning IE9+), a polyfill exists:
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var el = this;
        do {
            if (el.matches(s))
                return el;
            // @ts-ignore
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

var Sticky = /** @class */ (function (_super) {
    __extends(Sticky, _super);
    function Sticky() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isEnableSticky: false,
            targetHeight: Infinity,
            innerPosition: 'static',
            containerMeasure: {},
            isLong: false,
            innerTop: 0,
        };
        _this._getContainerSelectorFocus = function () {
            var containerSelectorFocus = _this.props.containerSelectorFocus;
            return _this._container.closest(containerSelectorFocus);
        };
        _this._handleWindowResize = function () {
            var stickyEnableRange = _this.props.stickyEnableRange;
            var min = stickyEnableRange[0], max = stickyEnableRange[1];
            _this.setState({
                isEnableSticky: window.innerWidth >= min && window.innerWidth <= max,
            });
        };
        _this._handleWindowScroll = function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, isEnableSticky, isSticky, $containerSelectorFocus, windowHeight, innerHeight_1, containerMeasure, targetHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onChange = this.props.onChange;
                        isEnableSticky = this.state.isEnableSticky;
                        isSticky = this._checkSticky();
                        $containerSelectorFocus = this._getContainerSelectorFocus();
                        windowHeight = window.innerHeight;
                        if (!(this._container && this._inner && isEnableSticky)) return [3 /*break*/, 2];
                        innerHeight_1 = this._inner.clientHeight;
                        containerMeasure = this._container.getBoundingClientRect();
                        targetHeight = $containerSelectorFocus
                            ? $containerSelectorFocus.clientHeight
                            : Infinity;
                        return [4 /*yield*/, this.setState({
                                containerMeasure: {
                                    top: containerMeasure.top,
                                    left: containerMeasure.left,
                                    width: containerMeasure.width,
                                    height: innerHeight_1,
                                },
                                targetHeight: targetHeight,
                                isLong: innerHeight_1 > windowHeight,
                            })];
                    case 1:
                        _a.sent();
                        if (innerHeight_1 > windowHeight) {
                            this._handleLong();
                        }
                        else {
                            this._handleShort();
                        }
                        if (this._isPrevSticky !== isSticky) {
                            onChange(isSticky);
                        }
                        this._isPrevSticky = isSticky;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this._checkWrapBottom = function () {
            var offsetTop = _this.props.offsetTop;
            var $containerSelectorFocus = _this._getContainerSelectorFocus();
            var _a = _this.state, containerMeasure = _a.containerMeasure, isLong = _a.isLong;
            var targetHeight = $containerSelectorFocus ? $containerSelectorFocus.clientHeight : Infinity;
            return (containerMeasure.top -
                containerMeasure.height +
                (isLong ? containerMeasure.height - window.innerHeight + offsetTop : 0) -
                offsetTop <
                targetHeight * -1 -
                    (_this._getContainerSelectorFocusOffsetTop() - _this._getContainerOffsetTop()));
        };
        _this._handleLong = function () {
            var scrollY = window.scrollY;
            if (_this._prevScrollY > scrollY) {
                _this._handleLongScrollUp(scrollY);
            }
            else {
                _this._handleLongScrollDown(scrollY);
            }
            _this._prevScrollY = scrollY;
        };
        _this._getInnerTop = function () {
            var innerMeasure = _this._inner.getBoundingClientRect();
            var innerTop = innerMeasure.top || -1;
            return innerTop;
        };
        _this._getInnerOffsetTop = function () {
            return offset(_this._inner).top;
        };
        _this._getContainerOffsetTop = function () {
            return offset(_this._container).top;
        };
        _this._getContainerSelectorFocusOffsetTop = function () {
            var $containerSelectorFocus = _this._getContainerSelectorFocus();
            return $containerSelectorFocus ? offset($containerSelectorFocus).top : 0;
        };
        _this._getContainerSelectorFocusOffsetBottom = function () {
            var $containerSelectorFocus = _this._getContainerSelectorFocus();
            return $containerSelectorFocus
                ? Math.trunc(offset($containerSelectorFocus).top + $containerSelectorFocus.clientHeight)
                : 0;
        };
        _this._getInnerPositionTop = function () {
            if (_this._container && _this._inner) {
                return _this._getInnerOffsetTop() - _this._getContainerOffsetTop();
            }
            return 0;
        };
        _this._handleLongScrollUp = function (scrollY) { return __awaiter(_this, void 0, void 0, function () {
            var offsetTop, _a, containerMeasure, innerPosition, isTop, innerTop;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        offsetTop = this.props.offsetTop;
                        _a = this.state, containerMeasure = _a.containerMeasure, innerPosition = _a.innerPosition;
                        isTop = containerMeasure.top > offsetTop;
                        innerTop = this._getInnerTop();
                        if (!isTop) return [3 /*break*/, 1];
                        this.setState({
                            innerPosition: 'static',
                        });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(containerMeasure.top <= innerTop &&
                            (innerPosition === 'fixedBottom' ||
                                (innerPosition === 'absoluteBottom' &&
                                    scrollY + window.innerHeight <= this._getContainerSelectorFocusOffsetBottom())))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setState({
                                innerPosition: 'absoluteCenter',
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        this._setInnerPositionFixedTop();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._setInnerPositionFixedTop = function () {
            var offsetTop = _this.props.offsetTop;
            var innerPosition = _this.state.innerPosition;
            var innerTop = _this._getInnerTop();
            _this.setState({
                innerTop: _this._getInnerPositionTop(),
            });
            if (innerTop >= offsetTop && innerPosition === 'absoluteCenter') {
                _this.setState({
                    innerPosition: 'fixedTop',
                });
            }
        };
        _this._handleLongScrollDown = function (scrollY) {
            var _a = _this.state, containerMeasure = _a.containerMeasure, innerPosition = _a.innerPosition;
            var isBottom = Math.trunc(scrollY + window.innerHeight) >=
                Math.trunc(_this._getInnerOffsetTop() + containerMeasure.height);
            var isWrapBottom = _this._checkWrapBottom();
            if (innerPosition === 'fixedTop') {
                _this.setState({
                    innerPosition: 'absoluteCenter',
                });
            }
            if (isWrapBottom) {
                _this.setState({
                    innerPosition: 'absoluteBottom',
                });
            }
            else if (isBottom) {
                _this.setState({
                    innerPosition: 'fixedBottom',
                    innerTop: _this._getInnerPositionTop(),
                });
            }
        };
        _this._getShortPosition = function (containerMeasure) {
            var offsetTop = _this.props.offsetTop;
            if (containerMeasure.top <= offsetTop) {
                if (_this._checkWrapBottom()) {
                    return 'absoluteBottom';
                }
                return 'fixedTop';
            }
            return 'static';
        };
        _this._handleShort = function () {
            var containerMeasure = _this.state.containerMeasure;
            _this.setState({
                innerPosition: _this._getShortPosition(containerMeasure),
            });
        };
        _this._getInnerStyle = function () {
            var _a = _this.props, offsetTop = _a.offsetTop, zIndex = _a.zIndex;
            var _b = _this.state, targetHeight = _b.targetHeight, innerPosition = _b.innerPosition, containerMeasure = _b.containerMeasure, isLong = _b.isLong, innerTop = _b.innerTop;
            var topForAbsoluteBottom = targetHeight -
                containerMeasure.height +
                (_this._getContainerSelectorFocusOffsetTop() - _this._getContainerOffsetTop());
            if (isLong) {
                switch (innerPosition) {
                    case 'static':
                        return {};
                    case 'fixedTop':
                        return {
                            position: 'fixed',
                            top: offsetTop,
                            width: containerMeasure.width,
                            zIndex: zIndex,
                        };
                    case 'absoluteCenter':
                        return {
                            position: 'absolute',
                            top: innerTop,
                            width: containerMeasure.width,
                            zIndex: zIndex,
                        };
                    case 'absoluteBottom':
                        return {
                            position: 'absolute',
                            top: topForAbsoluteBottom,
                            width: containerMeasure.width,
                            zIndex: zIndex,
                        };
                    case 'fixedBottom':
                        return {
                            position: 'fixed',
                            bottom: 0,
                            width: containerMeasure.width,
                            zIndex: zIndex,
                        };
                    default:
                        return {};
                }
            }
            switch (innerPosition) {
                case 'static':
                    return {};
                case 'absoluteBottom':
                    return {
                        position: 'absolute',
                        top: topForAbsoluteBottom,
                        width: containerMeasure.width,
                        zIndex: zIndex,
                    };
                case 'fixedTop':
                    return {
                        position: 'fixed',
                        top: offsetTop,
                        width: containerMeasure.width,
                        zIndex: zIndex,
                    };
                default:
                    return {};
            }
        };
        _this._getContainerStyle = function () {
            var _a = _this.state, innerPosition = _a.innerPosition, containerMeasure = _a.containerMeasure;
            if (innerPosition === 'static') {
                return {
                    minHeight: containerMeasure.height,
                };
            }
            return {
                position: 'relative',
                minHeight: containerMeasure.height,
            };
        };
        _this._checkSticky = function () {
            var innerPosition = _this.state.innerPosition;
            return innerPosition.search(/fixedTop|fixedBottom/g) !== -1;
        };
        _this._setContainerRef = function (c) {
            _this._container = c;
        };
        _this._setInnerRef = function (c) {
            _this._inner = c;
        };
        _this._renderHackGetHeightWhenInnerContentMargin = function () {
            return React__default.createElement("div", { style: { fontSize: 0, visibility: 'hidden' } }, ".");
        };
        _this._renderChildren = function () {
            var children = _this.props.children;
            var isSticky = _this._checkSticky();
            return typeof children === 'function' ? children(isSticky) : children;
        };
        return _this;
    }
    Sticky.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this._handleWindowScroll);
        this._handleWindowResize();
        window.addEventListener('resize', this._handleWindowResize);
    };
    Sticky.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this._handleWindowScroll);
        window.removeEventListener('resize', this._handleWindowResize);
    };
    Sticky.prototype.render = function () {
        var isEnableSticky = this.state.isEnableSticky;
        var containerStyle = isEnableSticky ? this._getContainerStyle() : {};
        var innerStyle = isEnableSticky ? this._getInnerStyle() : {};
        return (React__default.createElement("div", { ref: this._setContainerRef, style: containerStyle },
            React__default.createElement("div", { ref: this._setInnerRef, style: innerStyle },
                this._renderHackGetHeightWhenInnerContentMargin(),
                this._renderChildren(),
                this._renderHackGetHeightWhenInnerContentMargin())));
    };
    Sticky.defaultProps = {
        offsetTop: 0,
        containerSelectorFocus: 'body',
        zIndex: 10,
        stickyEnableRange: [0, Infinity],
        onChange: function () { },
    };
    return Sticky;
}(React.PureComponent));

exports.default = Sticky;
//# sourceMappingURL=index.js.map
