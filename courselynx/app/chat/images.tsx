import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import Header from "@/components/Header";
import ChatVisualMedia from "@/components/ChatComponents/ChatVisualMedia";

export default function ImagesScreen() {
  const navigation = useNavigation();
  const { color, name, photoCount, videoCount, uris, types } =
    useLocalSearchParams();
  const photos = parseInt(photoCount as string);
  const videos = parseInt(videoCount as string);
  const mediaUris = JSON.parse(uris as string);
  const mediaTypes = JSON.parse(types as string);
  const [mediaSizes, setMediaSizes] = useState<
    {
      width: number;
      height: number;
    }[]
  >([]);

  useEffect(() => {
    const getMediaSizes = async () => {
      const sizePromises = mediaUris.map((uri: string, index: number) =>
        mediaTypes[index] === "video"
          ? new Promise((resolve, reject) => {
              Image.getSize(
                uri,
                (width, height) => resolve({ width, height }),
                (error: any) => reject(error)
              );
            })
          : new Promise((resolve, reject) => {
              Image.getSize(
                uri,
                (width, height) => resolve({ width, height }),
                (error: any) => reject(error)
              );
            })
      );
      try {
        const sizes: { width: number; height: number }[] =
          await Promise.all(sizePromises);
        console.log(sizes);
        setMediaSizes(sizes);
        return sizes;
      } catch (error: any) {
        console.log(error);
        return;
      }
    };

    getMediaSizes();
  }, []);

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
          hasShare={true}
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
      {mediaSizes.length > 0 && (
        <FlatList
          data={mediaUris}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height:
                    (mediaSizes[index].height / mediaSizes[index].width) * 345,
                  width: 345,
                }}
              >
                <ChatVisualMedia
                  mediaUri={item}
                  type={mediaTypes[index]}
                  sizing="images"
                  onImages={true}
                />
              </View>
            );
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 14,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
});
