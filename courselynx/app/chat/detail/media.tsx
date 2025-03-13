import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import CLIcon from "@/assets/images/icon_campus.png";
import ChatFile from "@/components/ChatComponents/ChatFile";
import { onShare } from "@/utils/share";
import { longPressAnimation, releaseAnimation } from "@/utils/longPress";

const imageUrls = Array(18).fill(CLIcon);

export default function MediaScreen() {
  const { title, color } = useLocalSearchParams();
  const [showDocuments, setShowDocuments] = useState(false);
  const scales = useRef<Animated.Value[]>(
    Array.from({ length: 18 }, () => new Animated.Value(1))
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Array.isArray(color) ? color[0] : color },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.titleText}>{title}</Text>

        <View style={styles.boxContainer}>
          <TouchableOpacity
            style={[styles.box, !showDocuments && styles.activeBox]}
            onPress={() => setShowDocuments(false)}
          >
            <Text style={styles.boxText}>Photos & Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.box, showDocuments && styles.activeBox]}
            onPress={() => setShowDocuments(true)}
          >
            <Text style={styles.boxText}>Documents</Text>
          </TouchableOpacity>
        </View>

        {!showDocuments ? (
          <FlatList
            data={imageUrls}
            renderItem={({ item, index }) => {
              return (
                <Animated.View
                  style={[{ transform: [{ scale: scales.current[index] }] }]}
                >
                  <Pressable
                    onLongPress={() => {
                      onShare({ message: "", uri: "Test Campus Logo URI" });
                      longPressAnimation(index, scales, 1.05, 200, true);
                    }}
                    onPressOut={() => releaseAnimation(index, scales, 200)}
                  >
                    <Image key={index} style={styles.image} source={item} />
                  </Pressable>
                </Animated.View>
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
  boxContainer: {
    flexDirection: "row",
    marginTop: 19,
    borderRadius: 6,
    overflow: "hidden",
    paddingBottom: 19,
  },
  box: {
    width: 161,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D8AFB0D",
  },
  activeBox: {
    backgroundColor: "#2D8AFB1A",
  },
  boxText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
    lineHeight: 21,
    letterSpacing: -0.02,
    color: "#000",
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
