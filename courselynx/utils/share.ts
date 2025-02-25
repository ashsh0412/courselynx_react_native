import { Share } from "react-native";

{
  /* Function to bring up share menu */
}
export const onShare = async ({
  message,
  url,
}: {
  message: string;
  url: string;
}) => {
  try {
    const result = await Share.share({ message: message, url: url });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        `Shared via activity type: ${result.activityType}`;
      } else {
        console.log("Content Shared Successfully!");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share Dialog Dismissed");
    }
  } catch (error: any) {
    alert(error.message);
  }
};
