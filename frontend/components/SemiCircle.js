import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

const SemiCircle = ({ size, strokeWidth, segments, gap }) => {
  const radius = size / 2 - strokeWidth / 2;

  const createArc = (startAngle, endAngle, color) => {
    const startX = radius * Math.cos(startAngle) + size / 2;
    const startY = radius * Math.sin(startAngle) + size / 2;
    const endX = radius * Math.cos(endAngle) + size / 2;
    const endY = radius * Math.sin(endAngle) + size / 2;
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    return (
      <Path
        d={`M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  const percentageToRadians = (percentage) => (percentage / 100) * Math.PI;
  let startAngle = Math.PI; // Starting from leftmost point of the semi-circle

  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
        <G>
          {segments.map((segment, index) => {
            const endAngle = startAngle + percentageToRadians(segment.percentage);
            const arc = createArc(startAngle + gap, endAngle - gap, segment.color);
            startAngle = endAngle;
            return <React.Fragment key={index}>{arc}</React.Fragment>;
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SemiCircle;
