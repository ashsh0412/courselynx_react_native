import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Audio as AudioPlayer } from "expo-av";
import { Alert } from "react-native";

export const openCamera = async (
  setChatMedia: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setChatMediaType: React.Dispatch<
    React.SetStateAction<("image" | "livePhoto" | "video" | "none")[]>
  >,
  setChatMediaSizes: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }[]>
  >
) => {
  const result = await ImagePicker.requestCameraPermissionsAsync();

  console.log(result);

  if (result.granted === false) {
    alert("You've refused to allow this app to access your photos!");
  } else {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 30,
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
      setChatMediaSizes(
        result.assets.map((asset) => ({
          width: asset.width,
          height: asset.height,
        }))
      );
    }

    console.log(result);

    return result;
  }
};

export const openPhotos = async (
  setChatMedia: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setChatMediaType: React.Dispatch<
    React.SetStateAction<("image" | "livePhoto" | "video" | "none")[]>
  >,
  setChatMediaSizes: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }[]>
  >
) => {
  const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (result.granted === false) {
    alert("You've refused to allow this app to access your photos!");
  } else {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      quality: 1,
      allowsMultipleSelection: true,
      videoMaxDuration: 60,
      selectionLimit: 10,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
      preferredAssetRepresentationMode:
        ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Current,
    }).then((result) => {
      console.log(result);
      if (!result.assets) {
        console.log("No Assets");
      } else {
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
        setChatMediaSizes(
          result.assets.map((asset) => ({
            width: asset.width,
            height: asset.height,
          }))
        );
      }
    });
    console.log("Media Incoming");
  }
};

export const openDocument = async (
  setChatFile: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>
  >
) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Allows picking any file type
      multiple: true,
    });

    if (result.canceled) {
      Alert.alert("File Selection", "No file was selected.");
      return;
    }

    setChatFile(result.assets); // Store the selected file
    console.log("Selected File:", result); // Log file details
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
