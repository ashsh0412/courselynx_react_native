import { Href, Link, LinkProps, RelativePathString } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import ChevronRight from "../../../assets/svg/chevronRight.svg";

export type Props = {
  title: string;
  color: string;
  path?: Href;
  text: string;
  SVG: React.FC<SvgProps>;
};

const Detail: React.FC<Props> = ({ title, color, path, text, SVG }) => {
  {
    return (
      <Link
        href={{
          // @ts-expect-error
          pathname: path as Href,
          params: { title: title, color: color },
        }}
        style={{
          marginBottom: 4,
        }}
        asChild
      >
        <TouchableOpacity style={styles.detailButton}>
          <View style={styles.detailContent}>
            <SVG height={22} width={22} style={{ margin: 16 }} />
            <Text style={styles.detailText}>{text}</Text>
          </View>
          <ChevronRight
            width={24}
            height={24}
            color={"#02102E"}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      </Link>
    );
  }
};

const styles = StyleSheet.create({
  detailButton: {
    flexDirection: "row",
    backgroundColor: "rgba(45, 138, 251, 0.1)",
    width: 360,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailText: {
    fontFamily: "SF Pro Display",
    fontSize: 16,
    color: "#001E2F",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  detailContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Detail;
