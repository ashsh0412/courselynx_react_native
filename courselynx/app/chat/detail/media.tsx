import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
export default function MediaScreen() {
  const { title, color } = useLocalSearchParams();
  const [showDocuments, setShowDocuments] = useState(false);
  const [chatFile, setChatFile] = useState<
    DocumentPicker.DocumentPickerSuccessResult | undefined
  >(undefined);

  // Mock Images
  const imageUrls = [
    "https://s3-alpha-sig.figma.com/img/5976/07a8/95b9e917345f26fb6445fe08b509f151?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VrPJ42pkRAxNIg8Vs244RfAIXATipNSPTcjB7TGrhW02KFHM3CpnUHJEcCh7fpTI6O8bc9wPD6Q~TO-GHusO1HLzgA-b6Qb1uISJMoIYZe2HP9N4FCp~sPgXrBXhONz5HmJBpbO2gW5yzwObjc5WZimxWaTqugv4NGZ0IDrbHaPBrgHcpvSKzrLzcVPMfKdHMq7U36ExSxH0abHu-cvAttpWapPhfkkVOqjMHnWyXdNI2~ElM4LUwrl2vUfAXnAco5Pexlc7q-82bHVAIYjxz3txlOqVPsE0GevLu9lx5rHW18lQhvR8GhHrmo5PIwpczVr2Kluhg2ysM3GMXPWo8g__",
    "https://s3-alpha-sig.figma.com/img/8b0c/4d46/9a61a3452a2d360d014028c0091f2d64?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Mt-WX7mebZHlMUNUVv~xHtoPgGeM2Y5BRRSSKKwpSU5VcDwitvJiXgq0x-DBFsBdPrPv7xS8YOxnA72YdCNrhvadL8xNLoUe4GojhxBBOzy6zxs7-LNgXc27sVlNWWrrrsf1Wgop5ZcyHM7PSQDBurRmR-KmkvojDXp3rVpp3aPPjRmXYxDD17Fie3g-Rlz1iKFGBYxpMqe0cnMHKOGhFcXtcYnzvkTcI0vJXzqTF-lgVomcSE4zd29Vhlo7VrDq3IWqLqXmfc9MmWmM8fHbDxKKesVUt97xoa-KPQBqn04ojxwbaY7qdMVlDyumRv7MUyAcOPwuMHeIqfSrQWvPow__",
    "https://s3-alpha-sig.figma.com/img/82f7/ce37/b338d46be69476bb4cebf4849ec75576?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fFTPbLftUF2u-QrvyFiq6Di~-IEV9j4cd68qM1V0bmtDGAwIlod6NPyKbBDaJNgQrFYGDPSenZuSKTr1VLKxcmoIaouWrq1c0F1n6dDRGmEByLOvGQ3-1pylSWuUu79pkhVoe5mDydQlC55p~jN7oW70r9DXjw3lSy~lWtI7rWU84R0TilE0NSTXo37vM6mcDZmWmHQcjl7jL-auZFyDCAlcdDB0eHyPEXHzDkomhQ34~1mRzY2UYHf4TBKP8aFDEHZtKbFassQodEObqt6QSnRW0VOcd-N6JUrePSN-P1sSGJcX694qJn5~kxTErGlfrIFUf62I-LiYwxoVbMAUHA__",
    "https://s3-alpha-sig.figma.com/img/2a91/de15/496709d0bbb80438b72594d894b6a150?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LIzFS59KF6wUiHQL1g5CXbcd6g4vOnWQL3mVaIjN63SyohV5T9azJBHqEIahPpgJuBHNCheXbO4F8gbTNDwhIIm3oxRMEY8VGI4qjh11qNezdmvbsLUm~w3-47aM9bCz~LQpoAAtsPK4PPAK5zav0bNL7laNzrkcsD9NhHSX-PazBqRMUirt6Fm4yJkHEBy73iBW-wiseSX5WHQ09xq9t0SKEPTkD5Utigrf9003jwlIOb-N2iBCywSrXtwISzugby6HksYS91uMva8oLN5jb9SUFoQMSzHPLeRu298mo3oa6kuyE26zmrpHXmrehmoi9OD0M-v~oDcY8JlQFhojHQ__",
    "https://s3-alpha-sig.figma.com/img/3230/d5d7/b76e1d232415eddcc7598db6c4052f6b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RLIcQMwuXDzrDLP1Qj3rrmW64T8-26Q377rs8aLyXxDaX9M-JYoZqICo4dlblHPVfzJurqhRdmKs3jQrMhy8OsTwW7WrfkWSE3utKxvI84WYrUc3O1gRnwuKry~rx7GmxCoLGXJpgbW0jOUeuFsdnqoz25Sg~1DgR92TF7IVTWmiZRGp8DmfSjoQ2XsW-mPvA0OdJNqlUBBOdcbrO4LoH5z1OUDFHgWId0r62~fza3qrE~3uyoVlOcxyVbghI6qit8DOmd4x8OiJJWo2bkIGeYesjwVDM--3lIT7Bsiro6RXz9mkw76oAnAaqALqM3vEcukiI71Km1QRYwMkRHadPw__",
    "https://s3-alpha-sig.figma.com/img/cc86/d4b7/26047e9076673bef0e5c80d32653c594?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UWZ8iiDVuj8xTENXvAcQyruB9ZkM~SR6me9-9-Wpj1D0WT3V-ItKmqQCjByK2ySjH-EWE65BFXW96QlStxOS-02rh3hIEyKvTto8uSDNpmdagSTG-UbrAEDsYoI61Q~tVXS719PlRwj7JIQ7gz0lCypCfuu1D8pcvaRMvVHQ8skMS5I2BLIj60eOt7kB6wPPdKVGtuUS0K9YEhabhSr3uUlcPpPsmHgUZCaveTlzESVqyYpyKqdJmD~cW9LcjsxbuyE-1T0~qwRMa6XtB-pZ1bXt4vwaCPlGmqyIvLC78uyPduu6i19BQ1qmqdUosf09VcQVpJtCipy9nTn2tB1qUg__",
    "https://s3-alpha-sig.figma.com/img/5976/07a8/95b9e917345f26fb6445fe08b509f151?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VrPJ42pkRAxNIg8Vs244RfAIXATipNSPTcjB7TGrhW02KFHM3CpnUHJEcCh7fpTI6O8bc9wPD6Q~TO-GHusO1HLzgA-b6Qb1uISJMoIYZe2HP9N4FCp~sPgXrBXhONz5HmJBpbO2gW5yzwObjc5WZimxWaTqugv4NGZ0IDrbHaPBrgHcpvSKzrLzcVPMfKdHMq7U36ExSxH0abHu-cvAttpWapPhfkkVOqjMHnWyXdNI2~ElM4LUwrl2vUfAXnAco5Pexlc7q-82bHVAIYjxz3txlOqVPsE0GevLu9lx5rHW18lQhvR8GhHrmo5PIwpczVr2Kluhg2ysM3GMXPWo8g__",
    "https://s3-alpha-sig.figma.com/img/8b0c/4d46/9a61a3452a2d360d014028c0091f2d64?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Mt-WX7mebZHlMUNUVv~xHtoPgGeM2Y5BRRSSKKwpSU5VcDwitvJiXgq0x-DBFsBdPrPv7xS8YOxnA72YdCNrhvadL8xNLoUe4GojhxBBOzy6zxs7-LNgXc27sVlNWWrrrsf1Wgop5ZcyHM7PSQDBurRmR-KmkvojDXp3rVpp3aPPjRmXYxDD17Fie3g-Rlz1iKFGBYxpMqe0cnMHKOGhFcXtcYnzvkTcI0vJXzqTF-lgVomcSE4zd29Vhlo7VrDq3IWqLqXmfc9MmWmM8fHbDxKKesVUt97xoa-KPQBqn04ojxwbaY7qdMVlDyumRv7MUyAcOPwuMHeIqfSrQWvPow__",
    "https://s3-alpha-sig.figma.com/img/82f7/ce37/b338d46be69476bb4cebf4849ec75576?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fFTPbLftUF2u-QrvyFiq6Di~-IEV9j4cd68qM1V0bmtDGAwIlod6NPyKbBDaJNgQrFYGDPSenZuSKTr1VLKxcmoIaouWrq1c0F1n6dDRGmEByLOvGQ3-1pylSWuUu79pkhVoe5mDydQlC55p~jN7oW70r9DXjw3lSy~lWtI7rWU84R0TilE0NSTXo37vM6mcDZmWmHQcjl7jL-auZFyDCAlcdDB0eHyPEXHzDkomhQ34~1mRzY2UYHf4TBKP8aFDEHZtKbFassQodEObqt6QSnRW0VOcd-N6JUrePSN-P1sSGJcX694qJn5~kxTErGlfrIFUf62I-LiYwxoVbMAUHA__",
    "https://s3-alpha-sig.figma.com/img/2a91/de15/496709d0bbb80438b72594d894b6a150?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LIzFS59KF6wUiHQL1g5CXbcd6g4vOnWQL3mVaIjN63SyohV5T9azJBHqEIahPpgJuBHNCheXbO4F8gbTNDwhIIm3oxRMEY8VGI4qjh11qNezdmvbsLUm~w3-47aM9bCz~LQpoAAtsPK4PPAK5zav0bNL7laNzrkcsD9NhHSX-PazBqRMUirt6Fm4yJkHEBy73iBW-wiseSX5WHQ09xq9t0SKEPTkD5Utigrf9003jwlIOb-N2iBCywSrXtwISzugby6HksYS91uMva8oLN5jb9SUFoQMSzHPLeRu298mo3oa6kuyE26zmrpHXmrehmoi9OD0M-v~oDcY8JlQFhojHQ__",
    "https://s3-alpha-sig.figma.com/img/3230/d5d7/b76e1d232415eddcc7598db6c4052f6b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RLIcQMwuXDzrDLP1Qj3rrmW64T8-26Q377rs8aLyXxDaX9M-JYoZqICo4dlblHPVfzJurqhRdmKs3jQrMhy8OsTwW7WrfkWSE3utKxvI84WYrUc3O1gRnwuKry~rx7GmxCoLGXJpgbW0jOUeuFsdnqoz25Sg~1DgR92TF7IVTWmiZRGp8DmfSjoQ2XsW-mPvA0OdJNqlUBBOdcbrO4LoH5z1OUDFHgWId0r62~fza3qrE~3uyoVlOcxyVbghI6qit8DOmd4x8OiJJWo2bkIGeYesjwVDM--3lIT7Bsiro6RXz9mkw76oAnAaqALqM3vEcukiI71Km1QRYwMkRHadPw__",
    "https://s3-alpha-sig.figma.com/img/cc86/d4b7/26047e9076673bef0e5c80d32653c594?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UWZ8iiDVuj8xTENXvAcQyruB9ZkM~SR6me9-9-Wpj1D0WT3V-ItKmqQCjByK2ySjH-EWE65BFXW96QlStxOS-02rh3hIEyKvTto8uSDNpmdagSTG-UbrAEDsYoI61Q~tVXS719PlRwj7JIQ7gz0lCypCfuu1D8pcvaRMvVHQ8skMS5I2BLIj60eOt7kB6wPPdKVGtuUS0K9YEhabhSr3uUlcPpPsmHgUZCaveTlzESVqyYpyKqdJmD~cW9LcjsxbuyE-1T0~qwRMa6XtB-pZ1bXt4vwaCPlGmqyIvLC78uyPduu6i19BQ1qmqdUosf09VcQVpJtCipy9nTn2tB1qUg__",
  ];

  const openDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        Alert.alert("File Selection", "No file was selected.");
        return;
      }

      setChatFile(result); // Store the selected file
      console.log("Selected File:", result.assets[0]); // Log file details
    } catch (error) {
      console.error("Error selecting file:", error);
      Alert.alert("Error", "Something went wrong while selecting the file.");
    }
  };

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

        {/* <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          {!showDocuments ? (
            <View style={styles.imageGrid}>
              {[...Array(12)].map((_, index) => (
                <Image
                  key={index}
                  style={styles.image}
                  source={{ uri: imageUrls[index % imageUrls.length] }}
                />
              ))}
            </View>
          ) : (
            <View style={styles.documentContainer}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={openDocument}
              >
                <Text style={styles.uploadButtonText}>Upload Document</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView> */}

        {!showDocuments ? (
          <FlatList
            data={imageUrls}
            renderItem={({ item, index }) => {
              return (
                <Image
                  key={index}
                  style={styles.image}
                  source={{ uri: item }}
                />
              );
            }}
            contentContainerStyle={{
              paddingBottom: 19,
              flexDirection: "column",
              paddingHorizontal: 13,
            }}
            numColumns={3}
            indicatorStyle="black"
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
          />
        ) : (
          <View style={styles.documentContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={openDocument}
            >
              <Text style={styles.uploadButtonText}>Upload Document</Text>
            </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 19,
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
    margin: 0.5,
  },
  documentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -400,
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
