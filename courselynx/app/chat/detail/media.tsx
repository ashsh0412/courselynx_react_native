import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import CLIcon from "@/assets/images/icon_campus.png";
import ChatFile from "@/components/ChatComponents/ChatFile";
import { onShare } from "@/utils/share";
import LongPressable from "@/components/LongPressable";
import TabSelector from "@/components/TabSelector";

const imageUrls = Array(18).fill(CLIcon);

export default function MediaScreen() {
  const { title, color } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Array.isArray(color) ? color[0] : color },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.titleText}>{title}</Text>

        <TabSelector
          options={["Photos & Videos", "Documents"]}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />

        {!selectedTab ? (
          <FlatList
            data={imageUrls}
            renderItem={({ item, index }) => {
              return (
                <LongPressable
                  onLongPress={() => onShare({ message: "", uri: "Test Campus Logo URI" })}
                >
                  <Image key={index} style={styles.image} source={item} />
                </LongPressable>
              );
            }}
            contentContainerStyle={{
              paddingBottom: 19,
              paddingHorizontal: 13,
            }}
            style={{ overflowX: "hidden" }}
            numColumns={3}
            indicatorStyle="black"
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={styles.documentContainer}>
            <FlatList
              data={Array(10).fill(1)}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ height: 72 }}>
                    <ChatFile
                      name="Test File"
                      size={1500}
                      id={index}
                      uri="Test URI"
                      onDetail={true}
                    />
                  </View>
                );
              }}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 19,
                paddingHorizontal: 13,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 154,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleText: {
    fontFamily: "SF Pro Display",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    textAlign: "center",
    color: "#02102E",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 3,
    margin: 1,
  },
  documentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#2D8AFB",
    padding: 15,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
