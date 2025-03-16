import { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, StyleSheet, FlatList } from "react-native";
import Header from "@/components/Header";
import ChatVisualMedia from "@/components/ChatComponents/ChatVisualMedia";
import { onShare } from "@/utils/share";
import LongPressable from "@/components/LongPressable";

export default function ImagesScreen() {
  const navigation = useNavigation();
  const { color, name, photoCount, videoCount, uris, types, sizes } =
    useLocalSearchParams();
  console.log(sizes);
  const photos = parseInt(photoCount as string);
  const videos = parseInt(videoCount as string);
  const mediaUris = JSON.parse(uris as string);
  const mediaTypes = JSON.parse(types as string);
  const mediaSizes = JSON.parse(sizes as string);

  const getMediaCountText = () => {
    if (photos && videos) {
      return `${photos} photo${photos > 1 ? "s" : ""} and ${videos} video${videos > 1 ? "s" : ""}`;
    } else if (photos) {
      return `${photos} photo${photos > 1 ? "s" : ""}`;
    } else if (videos) {
      return `${videos} video${videos > 1 ? "s" : ""}`;
    } else {
      return "Not Sure How We Got Here";
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={name as string}
          subTitle={getMediaCountText()}
          colorSquare={color as string}
          colorIsCircle={true}
          withBorder={true}
        />
      ),
    });
  }, []);

  console.log("Images Screen");

  return (
    <View style={styles.imagesContainer}>
      <FlatList
        data={mediaUris}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <LongPressable
            onLongPress={() => onShare({ message: "", uri: item })}
            style={{ marginBottom: 14 }}
          >
            <ChatVisualMedia
              mediaUri={item}
              type={mediaTypes[index]}
              sizing="images"
              onImages={true}
              aspect={mediaSizes[index].width / mediaSizes[index].height}
            />
          </LongPressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
});
