import { Share } from "react-native";
import * as FileSystem from "expo-file-system";

/**
 * Function to share an URI/URL (local or remote).
 *
 * @param {Object} options
 * @param {string} options.message - The message to share.
 * @param {string} options.uri - The local file URI or remote URL.
 */
export const onShare = async ({
  message,
  uri,
}: {
  message: string;
  uri: string;
}) => {
  try {
    let shareableUri = uri;

    // If the URI is local (file://), copy it to a shareable location
    if (uri.startsWith("file://")) {
      const filename = uri.split("/").pop();
      const localUri = `${FileSystem.cacheDirectory}${filename}`;

      if (!FileSystem.cacheDirectory) {
        throw new Error("Cache Not Found");
      }

      const fileInfo = await FileSystem.getInfoAsync(localUri);

      if (!fileInfo.exists) {
        await FileSystem.copyAsync({ from: uri, to: localUri });
      }

      shareableUri = localUri;
    }

    await Share.share({
      message,
      url: shareableUri,
    });
  } catch (error: any) {
    console.error("Error sharing media:", error);
    alert(error.message);
  }
};
