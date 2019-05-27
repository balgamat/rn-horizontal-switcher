import React, { PureComponent, RefObject } from 'react';
import { Animated, LayoutChangeEvent, ScrollView, Text } from 'react-native';
import { pathOr } from 'ramda';
import { Motion } from 'rn-motion';
import { windowWidth } from './windowSize';
import { Item, Spacer, Wrapper } from './Switcher.styles';
import { SelectorProps } from '../index';

class Switcher extends PureComponent<SelectorProps> {
  state = {
    measurements: {},
  };

  scrollRef: RefObject<ScrollView> = React.createRef();

  scrollableItemWidth = windowWidth;
  barX = 0;
  barWidth = 0;

  saveMeasurement = ({
    item,
    width,
    x,
  }: {
    item: string;
    width: number;
    x: number;
  }) => {
    this.setState({
      measurements: {
        ...this.state.measurements,
        [item]: {
          x,
          width,
        },
      },
    });
  };

  componentDidUpdate() {
    if (this.props.scrollable && this.scrollRef.current) {
      this.scrollRef.current!.scrollTo({
        x: this.barX - this.scrollableItemWidth,
      });
    }
  }

  render() {
    const {
      barColor,
      onSelect,
      options,
      optionStyle,
      optionSelectedStyle,
      scrollable = false,
      selected,
    } = this.props;

    this.scrollableItemWidth =
      pathOr(windowWidth, ['container', 'width'])(this.state.measurements) / 3;
    this.barX = pathOr(0, [this.props.selected, 'x'])(this.state.measurements);
    this.barWidth = pathOr(0, [this.props.selected, 'width'])(
      this.state.measurements,
    );

    return (
      <Motion
        animatedValues={{
          xPosition: {
            method: Animated.spring,
            defaultValue: 0,
            toValue: this.barX + this.barWidth / 2,
          },
          barWidth: {
            method: Animated.spring,
            defaultValue: 1,
            toValue: this.barWidth,
          },
        }}
      >
        {values => (
          <Wrapper
            ref={this.scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              scrollable
                ? {}
                : { width: '100%', justifyContent: 'space-around' }
            }
            onLayout={({
              nativeEvent: {
                layout: { x, width },
              },
            }: LayoutChangeEvent) =>
              this.saveMeasurement({
                item: 'container',
                width,
                x,
              })
            }
          >
            {scrollable && <Spacer width={this.scrollableItemWidth} />}
            {Object.keys(options).map(option => (
              <Item
                scrollable={scrollable}
                key={option}
                onPress={() => {
                  onSelect(option);
                }}
                onLayout={({
                  nativeEvent: {
                    layout: { x, width },
                  },
                }: LayoutChangeEvent) =>
                  this.saveMeasurement({
                    item: option,
                    width,
                    x,
                  })
                }
                scrollableWidth={this.scrollableItemWidth}
              >
                <Text
                  style={{
                    ...(selected === option
                      ? optionSelectedStyle
                      : optionStyle),
                    overflow: 'visible',
                    flexWrap: 'nowrap',
                  }}
                >
                  {options[option]}
                </Text>
              </Item>
            ))}
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 2,
                left: 0,
                height: 2,
                width: 1,
                backgroundColor: barColor,
                transform: [
                  { translateX: values.xPosition },
                  { scaleX: values.barWidth },
                ],
              }}
            />
            {scrollable && <Spacer width={this.scrollableItemWidth} />}
          </Wrapper>
        )}
      </Motion>
    );
  }
}

export default Switcher;
