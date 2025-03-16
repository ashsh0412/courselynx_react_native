import { HapticContext } from '@/contexts/HapticContext';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewProps, StyleProp } from 'react-native';
import * as Haptics from 'expo-haptics';

interface TabSelectorProps {
  options: string[];
  selected: number;
  onSelect: (selectedOption: number) => void;
  style?: StyleProp<ViewProps>
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
    overflow: "hidden",
    padding: 2,
    marginHorizontal: 6,
  },
  tab: {
    flex: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
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
