import { HapticContext } from '@/contexts/HapticContext';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

interface TabSelectorProps {
  options: string[];
  selected: number;
  onSelect: (selected: number) => void;
  style?: StyleProp<ViewStyle>;
}

const TabSelector: React.FC<TabSelectorProps> = ({ options, selected, onSelect, style }) => {
  const { isHapticEnabled } = useContext(HapticContext);

  return (
    <View style={[styles.container, style]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selected == index && styles.selectedTab,
          ]}
          onPress={() => {
            isHapticEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onSelect(index);
          }}
          activeOpacity={0.7}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.tabText,
              selected == index && styles.selectedTabText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 7,
    backgroundColor: "rgba(45, 138, 251, 0.1)",
    padding: 2,
    marginHorizontal: 22,
    marginVertical: 16,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  selectedTab: {
    backgroundColor: "rgba(45, 138, 251, 0.2)",
  },
  tabText: {
    color: "#777",
    fontSize: 16,
    fontWeight: 500,
  },
  selectedTabText: {
    color: "black",
  },
});

export default TabSelector;
