import React, { PureComponent } from 'react';
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
declare type StickyDefaultProps = Pick<StickyProps, 'offsetTop' | 'containerSelectorFocus' | 'zIndex' | 'stickyEnableRange' | 'onChange'>;
export default class Sticky extends PureComponent<StickyProps, StickyState> {
    static defaultProps: StickyDefaultProps;
    state: StickyState;
    _container: HTMLElement;
    _inner: HTMLElement;
    _prevScrollY: number;
    _isPrevSticky: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    _getContainerSelectorFocus: () => Element;
    _handleWindowResize: () => void;
    _handleWindowScroll: () => Promise<void>;
    _checkWrapBottom: () => boolean;
    _handleLong: () => void;
    _getInnerTop: () => number;
    _getInnerOffsetTop: () => number;
    _getContainerOffsetTop: () => number;
    _getContainerSelectorFocusOffsetTop: () => number;
    _getContainerSelectorFocusOffsetBottom: () => number;
    _getInnerPositionTop: () => number;
    _handleLongScrollUp: (scrollY: number) => Promise<void>;
    _setInnerPositionFixedTop: () => void;
    _handleLongScrollDown: (scrollY: number) => void;
    _getShortPosition: (containerMeasure: Partial<DOMRect>) => "static" | "absoluteBottom" | "fixedTop";
    _handleShort: () => void;
    _getInnerStyle: () => React.CSSProperties;
    _getContainerStyle: () => React.CSSProperties;
    _checkSticky: () => boolean;
    _setContainerRef: (c: HTMLElement) => void;
    _setInnerRef: (c: HTMLElement) => void;
    _renderHackGetHeightWhenInnerContentMargin: () => JSX.Element;
    _renderChildren: () => JSX.Element | (((isSticky: boolean) => JSX.Element) & string) | (((isSticky: boolean) => JSX.Element) & number) | (((isSticky: boolean) => JSX.Element) & false) | (((isSticky: boolean) => JSX.Element) & true) | (((isSticky: boolean) => JSX.Element) & React.ReactNodeArray);
    render(): JSX.Element;
}
export {};
