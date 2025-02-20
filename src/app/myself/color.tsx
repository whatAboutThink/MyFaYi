import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const GradientBackground = () => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  // 邻近色配置（蓝-青-绿）
  const colors = [
    ['#2196F3', '#00BCD4'], // 阶段1：蓝 -> 青
    ['#00BCD4', '#4CAF50'], // 阶段2：青 -> 绿
    ['#4CAF50', '#2196F3']  // 阶段3：绿 -> 蓝
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // 动态颜色插值
  const interpolatedColors = colorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      colors[0][0], // 起始颜色
      colors[1][1], // 中间颜色
      colors[2][0]  // 结束颜色
    ]
  });

  return (
    <View style={styles.container}>
      <AnimatedGradient
        colors={[interpolatedColors, '#FFFFFF']} // 渐变从动态色到白色
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%' // 必须明确尺寸
  }
});

export default GradientBackground;