declare module "wil-react-sticky" {
  export interface Props {
    children: React.ReactNode | ((isSticky: boolean) => React.ReactNode);
    offsetTop: number;
    containerSelectorFocus: string;
    zIndex: number;
    stickyEnableRange: number[];
    onChange(isSticky: boolean): void;
  }

  export interface State {
    targetHeight: number;
    innerPosition: string;
    containerMeasure: Object;
    isLong: boolean;
    innerTop: number;
  }

  export default class Sticky<State extends object> {
    state: State;
    props: Props;
  }
}
