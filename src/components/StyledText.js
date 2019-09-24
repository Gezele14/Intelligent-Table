import React from 'react';
import { Text } from 'react-native';

export function MoonText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Moonbright' }]} />
  );
}
