# React-Native Horizontal Switcher

> A pretty, customizable React Native component for switching between tabs or e.g. selecting an item from a list.

## Features
1. `Switcher` component

## Installation
Install from NPM using `npm install --save rn-horizontal-switcher` or, `yarn add rn-horizontal-switcher` if you prefer.

## Usage

```
import { Switcher } from rn-horizontal-switcher';

...

const switcherOptions = {
    first: 'First Option',
    second: 'Second Option',
    another: 'Another Option',
};

<Switcher
    scrollable={true}
    barColor={'#2795fc'}
    onSelect={option => this.setState({selectedSwitcherOption: option}}
    options={switcherOptions}
    selected={this.state.selectedSwitcherOption}
    optionStyle={{ color: 'gray'}}
    optionSelectedStyle={{ color: 'black', fontWeight: '700'}}
/>

...
```
