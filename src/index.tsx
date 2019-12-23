import React, { PureComponent, CSSProperties } from 'react';
import offset from './offset';
import './closest';

interface StickyProps {
  children: JSX.Element | ((isSticky: boolean) => JSX.Element);
  offsetTop: number;
  containerSelectorFocus: string;
  zIndex: number;
  stickyEnableRange: number[];
  onChange: (isSticky: boolean) => void;
}

interface StickyState {
  isEnableSticky: boolean;
  targetHeight: number;
  innerPosition: string;
  containerMeasure: Partial<DOMRect>;
  isLong: boolean;
  innerTop: number;
}

type StickyDefaultProps = Pick<
  StickyProps,
  'offsetTop' | 'containerSelectorFocus' | 'zIndex' | 'stickyEnableRange' | 'onChange'
>;

export default class Sticky extends PureComponent<StickyProps, StickyState> {
  static defaultProps: StickyDefaultProps = {
    offsetTop: 0,
    containerSelectorFocus: 'body',
    zIndex: 10,
    stickyEnableRange: [0, Infinity],
    onChange: () => {},
  };

  state: StickyState = {
    isEnableSticky: false,
    targetHeight: Infinity,
    innerPosition: 'static',
    containerMeasure: {},
    isLong: false,
    innerTop: 0,
  };

  _container!: HTMLElement;

  _inner!: HTMLElement;

  _prevScrollY!: number;

  _isPrevSticky!: boolean;

  componentDidMount() {
    window.addEventListener('scroll', this._handleWindowScroll);
    this._handleWindowResize();
    window.addEventListener('resize', this._handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleWindowScroll);
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _getContainerSelectorFocus = () => {
    const { containerSelectorFocus } = this.props;
    return this._container.closest(containerSelectorFocus);
  };

  _handleWindowResize = () => {
    const { stickyEnableRange } = this.props;
    const [min, max] = stickyEnableRange;
    this.setState({
      isEnableSticky: window.innerWidth >= min && window.innerWidth <= max,
    });
  };

  _handleWindowScroll = async () => {
    const { onChange } = this.props;
    const { isEnableSticky } = this.state;
    const isSticky = this._checkSticky();
    const $containerSelectorFocus = this._getContainerSelectorFocus();
    const { innerHeight: windowHeight } = window;
    if (this._container && this._inner && isEnableSticky) {
      const { clientHeight: innerHeight } = this._inner;
      const containerMeasure = this._container.getBoundingClientRect();
      const targetHeight = $containerSelectorFocus
        ? $containerSelectorFocus.clientHeight
        : Infinity;
      await this.setState({
        containerMeasure: {
          top: containerMeasure.top,
          left: containerMeasure.left,
          width: containerMeasure.width,
          height: innerHeight,
        },
        targetHeight,
        isLong: innerHeight > windowHeight,
      });
      if (innerHeight > windowHeight) {
        this._handleLong();
      } else {
        this._handleShort();
      }
      if (this._isPrevSticky !== isSticky) {
        onChange(isSticky);
      }
      this._isPrevSticky = isSticky;
    }
  };

  _checkWrapBottom = () => {
    const { offsetTop } = this.props;
    const $containerSelectorFocus = this._getContainerSelectorFocus();
    const { containerMeasure, isLong } = this.state;
    const targetHeight = $containerSelectorFocus ? $containerSelectorFocus.clientHeight : Infinity;
    return (
      containerMeasure.top -
        containerMeasure.height +
        (isLong ? containerMeasure.height - window.innerHeight + offsetTop : 0) -
        offsetTop <
      targetHeight * -1 -
        (this._getContainerSelectorFocusOffsetTop() - this._getContainerOffsetTop())
    );
  };

  _handleLong = () => {
    const { scrollY } = window;
    if (this._prevScrollY > scrollY) {
      this._handleLongScrollUp(scrollY);
    } else {
      this._handleLongScrollDown(scrollY);
    }
    this._prevScrollY = scrollY;
  };

  _getInnerTop = () => {
    const innerMeasure = this._inner.getBoundingClientRect();
    const innerTop = innerMeasure.top || -1;
    return innerTop;
  };

  _getInnerOffsetTop = () => {
    return offset(this._inner).top;
  };

  _getContainerOffsetTop = () => {
    return offset(this._container).top;
  };

  _getContainerSelectorFocusOffsetTop = () => {
    const $containerSelectorFocus = this._getContainerSelectorFocus();
    return $containerSelectorFocus ? offset($containerSelectorFocus).top : 0;
  };

  _getContainerSelectorFocusOffsetBottom = () => {
    const $containerSelectorFocus = this._getContainerSelectorFocus();
    return $containerSelectorFocus
      ? Math.trunc(offset($containerSelectorFocus).top + $containerSelectorFocus.clientHeight)
      : 0;
  };

  _getInnerPositionTop = () => {
    if (this._container && this._inner) {
      return this._getInnerOffsetTop() - this._getContainerOffsetTop();
    }
    return 0;
  };

  _handleLongScrollUp = async (scrollY: number) => {
    const { offsetTop } = this.props;
    const { containerMeasure, innerPosition } = this.state;
    const isTop = containerMeasure.top > offsetTop;
    const innerTop = this._getInnerTop();
    if (isTop) {
      this.setState({
        innerPosition: 'static',
      });
    } else {
      if (
        containerMeasure.top <= innerTop &&
        (innerPosition === 'fixedBottom' ||
          (innerPosition === 'absoluteBottom' &&
            scrollY + window.innerHeight <= this._getContainerSelectorFocusOffsetBottom()))
      ) {
        await this.setState({
          innerPosition: 'absoluteCenter',
        });
      }
      this._setInnerPositionFixedTop();
    }
  };

  _setInnerPositionFixedTop = () => {
    const { offsetTop } = this.props;
    const { innerPosition } = this.state;
    const innerTop = this._getInnerTop();
    this.setState({
      innerTop: this._getInnerPositionTop(),
    });
    if (innerTop >= offsetTop && innerPosition === 'absoluteCenter') {
      this.setState({
        innerPosition: 'fixedTop',
      });
    }
  };

  _handleLongScrollDown = (scrollY: number) => {
    const { containerMeasure, innerPosition } = this.state;
    const isBottom =
      Math.trunc(scrollY + window.innerHeight) >=
      Math.trunc(this._getInnerOffsetTop() + containerMeasure.height);
    const isWrapBottom = this._checkWrapBottom();
    if (innerPosition === 'fixedTop') {
      this.setState({
        innerPosition: 'absoluteCenter',
      });
    }
    if (isWrapBottom) {
      this.setState({
        innerPosition: 'absoluteBottom',
      });
    } else if (isBottom) {
      this.setState({
        innerPosition: 'fixedBottom',
        innerTop: this._getInnerPositionTop(),
      });
    }
  };

  _getShortPosition = (containerMeasure: StickyState['containerMeasure']) => {
    const { offsetTop } = this.props;
    if (containerMeasure.top <= offsetTop) {
      if (this._checkWrapBottom()) {
        return 'absoluteBottom';
      }
      return 'fixedTop';
    }
    return 'static';
  };

  _handleShort = () => {
    const { containerMeasure } = this.state;
    this.setState({
      innerPosition: this._getShortPosition(containerMeasure),
    });
  };

  _getInnerStyle = (): CSSProperties => {
    const { offsetTop, zIndex } = this.props;
    const { targetHeight, innerPosition, containerMeasure, isLong, innerTop } = this.state;
    const topForAbsoluteBottom =
      targetHeight -
      containerMeasure.height +
      (this._getContainerSelectorFocusOffsetTop() - this._getContainerOffsetTop());
    if (isLong) {
      switch (innerPosition) {
        case 'static':
          return {};
        case 'fixedTop':
          return {
            position: 'fixed',
            top: offsetTop,
            width: containerMeasure.width,
            zIndex,
          };
        case 'absoluteCenter':
          return {
            position: 'absolute',
            top: innerTop,
            width: containerMeasure.width,
            zIndex,
          };
        case 'absoluteBottom':
          return {
            position: 'absolute',
            top: topForAbsoluteBottom,
            width: containerMeasure.width,
            zIndex,
          };
        case 'fixedBottom':
          return {
            position: 'fixed',
            bottom: 0,
            width: containerMeasure.width,
            zIndex,
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
          zIndex,
        };
      case 'fixedTop':
        return {
          position: 'fixed',
          top: offsetTop,
          width: containerMeasure.width,
          zIndex,
        };
      default:
        return {};
    }
  };

  _getContainerStyle = (): CSSProperties => {
    const { innerPosition, containerMeasure } = this.state;
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

  _checkSticky = () => {
    const { innerPosition } = this.state;
    return innerPosition.search(/fixedTop|fixedBottom/g) !== -1;
  };

  _setContainerRef = (c: HTMLElement) => {
    this._container = c;
  };

  _setInnerRef = (c: HTMLElement) => {
    this._inner = c;
  };

  _renderHackGetHeightWhenInnerContentMargin = () => {
    return <div style={{ fontSize: 0, visibility: 'hidden' }}>.</div>;
  };

  _renderChildren = () => {
    const { children } = this.props;
    const isSticky = this._checkSticky();
    return typeof children === 'function' ? children(isSticky) : children;
  };

  render() {
    const { isEnableSticky } = this.state;
    const containerStyle = isEnableSticky ? this._getContainerStyle() : {};
    const innerStyle = isEnableSticky ? this._getInnerStyle() : {};
    return (
      <div ref={this._setContainerRef} style={containerStyle}>
        <div ref={this._setInnerRef} style={innerStyle}>
          {this._renderHackGetHeightWhenInnerContentMargin()}
          {this._renderChildren()}
          {this._renderHackGetHeightWhenInnerContentMargin()}
        </div>
      </div>
    );
  }
}
