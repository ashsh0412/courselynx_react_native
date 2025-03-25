import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import PDF from "@/assets/svg/filePdf.svg";
import Check from "@/assets/svg/fileCheck.svg";
import { useEffect, useState } from "react";
import { Bar as ProgressBar } from "react-native-progress";
import { Interaction } from "./ChatMessage";
import { onShare } from "@/utils/share";
import LongPressable from "../LongPressable";

export type Props = {
  name: string;
  size: number;
  id: number;
  uri: string;
  onDetail?: boolean;
};

const ChatFile: React.FC<Props> = ({ name, size, uri, id, onDetail }) => {
  const [loadVisible, setLoadVisible] = useState(true);
  const [loadAmount, setLoadAmount] = useState(0);
  const [sizeAmount, setSizeAmount] = useState(0);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    else return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const startLoadingBar = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      setLoadAmount(progress);
      setSizeAmount(size * (progress < 1 ? progress : 1));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => setLoadVisible(false), 500);
      }
    }, 50);
  };

  useEffect(() => {
    startLoadingBar();
  }, []);

  return (
    <LongPressable onLongPress={() => onShare({ message: "", uri: uri })}>
      <View style={styles.fileContent}>
        <View style={styles.fileRow}>
          <PDF width={onDetail ? 37 : 30} height={onDetail ? 37 : 30} />
          <View style={styles.fileTextCol}>
            <Text style={[styles.fileName, onDetail && { fontSize: 13 }]}>
              {name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.fileSize, onDetail && { fontSize: 11 }]}>
                {formatFileSize(sizeAmount)}
                {" of "}
                {formatFileSize(size)}
                {!onDetail && " •  "}
              </Text>
              {!onDetail && (
                <>
                  {loadVisible ? (
                    <ActivityIndicator
                      animating
                      color={"#2D8AFB"}
                      size={8}
                      style={{ transform: [{ scale: 0.5 }] }}
                    />
                  ) : (
                    <Check
                      width={9}
                      height={9}
                      style={{ alignSelf: "center" }}
                    />
                  )}
                  <Text style={styles.fileLoadText}>
                    {loadVisible ? "  Uploading..." : "  Sent"}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        <View
          style={[
            styles.progressBarContainer,
            onDetail && { width: 336 },
            { display: loadVisible ? "flex" : "none" },
          ]}
        >
          <ProgressBar
            progress={loadAmount}
            width={onDetail ? 336 : 276}
            height={4}
            color="#2D8AFB"
            borderWidth={0}
          />
        </View>
      </View>
    </LongPressable>
  );
};

const styles = StyleSheet.create({
  fileContent: {
    backgroundColor: "#EEF1F7",
    flexDirection: "column",
    width: 300,
    borderRadius: 14,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  fileRow: {
    flexDirection: "row",
  },
  fileTextCol: {
    marginLeft: 12,
    flexDirection: "column",
    gap: 5,
  },
  fileName: {
    fontFamily: "Inter",
    fontSize: 10.5,
    fontWeight: 500,
    color: "#292D32",
  },
  fileSize: {
    color: "#A9ACB4",
    fontFamily: "Inter",
    fontSize: 9,
  },
  fileLoadText: {
    color: "#292D32",
    fontFamily: "Inter",
    fontSize: 9,
    fontWeight: 400,
  },
  progressBarContainer: {
    backgroundColor: "#CBD0DC",
    width: 276,
    height: 4,
    borderRadius: 4,
    marginTop: 14,
  },
});

export default ChatFile;
