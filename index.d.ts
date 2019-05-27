import { PureComponent } from 'react';

export type SelectorOptions = {
  [key: string]: string;
};
export type SelectorProps = {
  barColor: string;
  scrollable?: boolean;
  onSelect: (option: string) => void;
  options: SelectorOptions;
  optionStyle: object;
  optionSelectedStyle: object;
  selected: string;
};

declare class Switcher extends PureComponent<SelectorProps> {}

declare module 'rn-horizontal-switcher' {}

export default Switcher;
