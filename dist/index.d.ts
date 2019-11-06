declare module "wil-react-sticky" {
  export interface Props {
    children: React.ReactNode;
    offsetTop: number;
    containerSelectorFocus: string;
    zIndex: number;
    stickyEnableRange: number[];
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
