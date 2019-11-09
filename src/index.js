// @flow
import React, { PureComponent } from "react";
import offset from "./offset";
import "./closest";

type Props = {
  children: React$Node | ((isSticky: boolean) => React$Node),
  offsetTop: number,
  containerSelectorFocus: string,
  zIndex: number,
  stickyEnableRange: Array<number>,
  onChange: (isSticky: boolean) => void
};

type State = {
  isEnableSticky: boolean,
  targetHeight: number,
  innerPosition: string,
  containerMeasure: Object,
  isLong: boolean,
  innerTop: number
};

export default class Sticky extends PureComponent<Props, State> {
  static defaultProps = {
    offsetTop: 0,
    containerSelectorFocus: "body",
    zIndex: 10,
    stickyEnableRange: [0, Infinity],
    onChange: (isSticky: boolean): void => {}
  };

  state = {
    isEnableSticky: false,
    targetHeight: Infinity,
    innerPosition: "static",
    containerMeasure: {},
    isLong: false,
    innerTop: 0
  };

  _container: ?HTMLElement;

  _inner: ?HTMLElement;

  _prevScrollY: number;

  _isPrevSticky: boolean;

  componentDidMount(): void {
    window.addEventListener("scroll", this._handleWindowScroll);
    this._handleWindowResize();
    window.addEventListener("resize", this._handleWindowResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this._handleWindowScroll);
    window.removeEventListener("resize", this._handleWindowResize);
  }

  _getContainerSelectorFocus = (): ?Element => {
    const { containerSelectorFocus }: Props = this.props;
    return this._container
      ? this._container.closest(containerSelectorFocus)
      : null;
  };

  _handleWindowResize = (): void => {
    const { stickyEnableRange }: Props = this.props;
    const [min, max]: Array<number> = stickyEnableRange;
    this.setState({
      isEnableSticky: window.innerWidth >= min && window.innerWidth <= max
    });
  };

  _handleWindowScroll = async (): Promise<void> => {
    const { onChange }: Props = this.props;
    const { isEnableSticky }: State = this.state;
    const isSticky: boolean = this._isSticky();
    const $containerSelectorFocus: ?Element = this._getContainerSelectorFocus();
    const { innerHeight: windowHeight }: { innerHeight: number } = window;
    if (this._container && this._inner && isEnableSticky) {
      const {
        clientHeight: innerHeight
      }: { clientHeight: number } = this._inner;
      const containerMeasure: Object = this._container.getBoundingClientRect();
      const targetHeight: number = $containerSelectorFocus
        ? $containerSelectorFocus.clientHeight
        : Infinity;
      await this.setState({
        containerMeasure: {
          top: containerMeasure.top,
          left: containerMeasure.left,
          width: containerMeasure.width,
          height: innerHeight
        },
        targetHeight,
        isLong: innerHeight > windowHeight
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

  _checkWrapBottom = (): boolean => {
    const { offsetTop }: Props = this.props;
    const $containerSelectorFocus: ?Element = this._getContainerSelectorFocus();
    const { containerMeasure, isLong }: State = this.state;
    const targetHeight: number = $containerSelectorFocus
      ? $containerSelectorFocus.clientHeight
      : Infinity;
    return (
      containerMeasure.top -
        containerMeasure.height +
        (isLong
          ? containerMeasure.height - window.innerHeight + offsetTop
          : 0) -
        offsetTop <
      targetHeight * -1 -
        (this._getContainerSelectorFocusOffsetTop() -
          this._getContainerOffsetTop())
    );
  };

  _handleLong = (): void => {
    const { scrollY }: { scrollY: number } = window;
    if (this._prevScrollY > scrollY) {
      this._handleLongScrollUp(scrollY);
    } else {
      this._handleLongScrollDown(scrollY);
    }
    this._prevScrollY = scrollY;
  };

  _getInnerTop = (): number => {
    const innerMeasure: Object = this._inner
      ? this._inner.getBoundingClientRect()
      : {};
    const innerTop: number = innerMeasure.top || -1;
    return innerTop;
  };

  _getInnerOffsetTop = (): number => {
    return this._inner ? offset(this._inner).top : 0;
  };

  _getContainerOffsetTop = (): number => {
    return this._container ? offset(this._container).top : 0;
  };

  _getContainerSelectorFocusOffsetTop = (): number => {
    const $containerSelectorFocus: ?Element = this._getContainerSelectorFocus();
    return $containerSelectorFocus ? offset($containerSelectorFocus).top : 0;
  };

  _getContainerSelectorFocusOffsetBottom = (): number => {
    const $containerSelectorFocus: ?Element = this._getContainerSelectorFocus();
    return $containerSelectorFocus
      ? Math.trunc(
          offset($containerSelectorFocus).top +
            $containerSelectorFocus.clientHeight
        )
      : 0;
  };

  _getInnerPositionTop = (): number => {
    if (this._container && this._inner) {
      return this._getInnerOffsetTop() - this._getContainerOffsetTop();
    }
    return 0;
  };

  _handleLongScrollUp = async (scrollY: number): Promise<void> => {
    const { offsetTop }: Props = this.props;
    const { containerMeasure, innerPosition }: State = this.state;
    const isTop: boolean = containerMeasure.top > offsetTop;
    const innerTop: number = this._getInnerTop();
    if (isTop) {
      this.setState({
        innerPosition: "static"
      });
    } else {
      if (
        containerMeasure.top <= innerTop &&
        (innerPosition === "fixedBottom" ||
          (innerPosition === "absoluteBottom" &&
            scrollY + window.innerHeight <=
              this._getContainerSelectorFocusOffsetBottom()))
      ) {
        await this.setState({
          innerPosition: "absoluteCenter"
        });
      }
      this._setInnerPositionFixedTop();
    }
  };

  _setInnerPositionFixedTop = (): void => {
    const { offsetTop }: Props = this.props;
    const { innerPosition }: State = this.state;
    const innerTop: number = this._getInnerTop();
    this.setState({
      innerTop: this._getInnerPositionTop()
    });
    if (innerTop >= offsetTop && innerPosition === "absoluteCenter") {
      this.setState({
        innerPosition: "fixedTop"
      });
    }
  };

  _handleLongScrollDown = (scrollY: number): void => {
    const { containerMeasure, innerPosition }: State = this.state;
    const isBottom: boolean =
      Math.trunc(scrollY + window.innerHeight) >=
      Math.trunc(this._getInnerOffsetTop() + containerMeasure.height);
    const isWrapBottom: boolean = this._checkWrapBottom();
    if (innerPosition === "fixedTop") {
      this.setState({
        innerPosition: "absoluteCenter"
      });
    }
    if (isWrapBottom) {
      this.setState({
        innerPosition: "absoluteBottom"
      });
    } else if (isBottom) {
      this.setState({
        innerPosition: "fixedBottom",
        innerTop: this._getInnerPositionTop()
      });
    }
  };

  _getShortPosition = (containerMeasure: Object): string => {
    const { offsetTop }: Props = this.props;
    if (containerMeasure.top <= offsetTop) {
      if (this._checkWrapBottom()) {
        return "absoluteBottom";
      }
      return "fixedTop";
    }
    return "static";
  };

  _handleShort = (): void => {
    const { containerMeasure }: State = this.state;
    this.setState({
      innerPosition: this._getShortPosition(containerMeasure)
    });
  };

  _getInnerStyle = (): Object => {
    const { offsetTop, zIndex }: Props = this.props;
    const {
      targetHeight,
      innerPosition,
      containerMeasure,
      isLong,
      innerTop
    }: State = this.state;
    const topForAbsoluteBottom: number =
      targetHeight -
      containerMeasure.height +
      (this._getContainerSelectorFocusOffsetTop() -
        this._getContainerOffsetTop());
    if (isLong) {
      switch (innerPosition) {
        case "static":
          return {};
        case "fixedTop":
          return {
            position: "fixed",
            top: offsetTop,
            width: containerMeasure.width,
            zIndex
          };
        case "absoluteCenter":
          return {
            position: "absolute",
            top: innerTop,
            width: containerMeasure.width,
            zIndex
          };
        case "absoluteBottom":
          return {
            position: "absolute",
            top: topForAbsoluteBottom,
            width: containerMeasure.width,
            zIndex
          };
        case "fixedBottom":
          return {
            position: "fixed",
            bottom: 0,
            width: containerMeasure.width,
            zIndex
          };
        default:
          return {};
      }
    }
    switch (innerPosition) {
      case "static":
        return {};
      case "absoluteBottom":
        return {
          position: "absolute",
          top: topForAbsoluteBottom,
          width: containerMeasure.width,
          zIndex
        };
      case "fixedTop":
        return {
          position: "fixed",
          top: offsetTop,
          width: containerMeasure.width,
          zIndex
        };
      default:
        return {};
    }
  };

  _getContainerStyle = (): Object => {
    const { innerPosition, containerMeasure }: State = this.state;
    if (innerPosition === "static") {
      return {
        minHeight: containerMeasure.height
      };
    }
    return {
      position: "relative",
      minHeight: containerMeasure.height
    };
  };

  _isSticky = (): boolean => {
    const { innerPosition }: State = this.state;
    return innerPosition.search(/fixedTop|fixedBottom/g) !== -1;
  };

  _setContainerRef = (c: ?HTMLElement): void => {
    this._container = c;
  };

  _setInnerRef = (c: ?HTMLElement): void => {
    this._inner = c;
  };

  _renderHackGetHeightWhenInnerContentMargin = (): React$Node => {
    return <div style={{ fontSize: 0, visibility: "hidden" }}>.</div>;
  };

  render(): React$Node {
    const { children }: Props = this.props;
    const { isEnableSticky }: State = this.state;
    const isSticky: boolean = this._isSticky();
    return (
      <div
        ref={this._setContainerRef}
        style={isEnableSticky ? this._getContainerStyle() : {}}
      >
        <div
          ref={this._setInnerRef}
          style={isEnableSticky ? this._getInnerStyle() : {}}
        >
          {this._renderHackGetHeightWhenInnerContentMargin()}
          {typeof children === "function" ? children(isSticky) : children}
          {this._renderHackGetHeightWhenInnerContentMargin()}
        </div>
      </div>
    );
  }
}
