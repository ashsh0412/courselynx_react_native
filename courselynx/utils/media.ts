import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Audio as AudioPlayer } from "expo-av";
import { Alert } from "react-native";

export const openPhotos = async (
  setChatMedia: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setChatMediaType: React.Dispatch<
    React.SetStateAction<("image" | "livePhoto" | "video" | "none")[]>
  >
) => {
  const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (result.granted === false) {
    alert("You've refused to allow this app to access your photos!");
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      videoMaxDuration: 60,
      selectionLimit: 10,
    });

    if (!result.canceled) {
      setChatMedia(result.assets.map((asset) => asset.uri));
      setChatMediaType(
        result.assets.map((asset) => {
          switch (asset.type) {
            case "image":
            case "livePhoto":
            case "video":
              return asset.type;
            default:
              return "none";
          }
        })
      );
    }

    console.log(result);

    return result;
  }
};

export const openDocument = async (
  setChatFile: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerSuccessResult | undefined>
  >
) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Allows picking any file type
      copyToCacheDirectory: true, // Saves a copy to cache
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

export const startRecording = async (
  setRecording: React.Dispatch<
    React.SetStateAction<AudioPlayer.Recording | null | undefined>
  >
) => {
  try {
    const { status } = await AudioPlayer.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Microphone access is required to record audio."
      );
      return;
    }

    await AudioPlayer.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await AudioPlayer.Recording.createAsync(
      AudioPlayer.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  } catch (error) {
    console.error("Error starting recording:", error);
  }
};

export const stopRecording = async (
  recording: AudioPlayer.Recording | null | undefined,
  setAudioUri: React.Dispatch<React.SetStateAction<string | null>>,
  setRecording: React.Dispatch<
    React.SetStateAction<AudioPlayer.Recording | null | undefined>
  >
) => {
  try {
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setAudioUri(uri as string);
    console.log("Recorded audio:", uri);
    setRecording(null);
  } catch (error) {
    console.error("Error stopping recording:", error);
  }
};

export const playAudio = async (
  setSound: React.Dispatch<
    React.SetStateAction<AudioPlayer.Sound | null | undefined>
  >,
  audioUri: string | null
) => {
  if (!audioUri) return;

  try {
    const { sound } = await AudioPlayer.Sound.createAsync({ uri: audioUri });
    setSound(sound);
    await sound.playAsync();
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};
