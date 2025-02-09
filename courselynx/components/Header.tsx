import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Search from "../assets/svg/searchChat.svg";
import Share from "../assets/svg/shareChat.svg";
import { Link } from "expo-router";
import { LinkProps } from "expo-router";

export type Props = {
  title?: string;
  colorSquare?: string;
  hasSearch?: boolean;
  hasShare?: boolean;
  path: LinkProps["href"];
};

const Header: React.FC<Props> = ({
  title = "",
  colorSquare = "",
  hasSearch = false,
  hasShare = false,
  path,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Link href={path} asChild>
          <View style={styles.detailButton}>
            <>
              {colorSquare && (
                <View
                  style={[styles.square, { backgroundColor: colorSquare }]}
                ></View>
              )}
              {title && <Text style={styles.headerTitle}>{title}</Text>}
            </>
          </View>
        </Link>
      </TouchableOpacity>
      {(hasSearch || hasShare) && (
        <View style={styles.headerIcons}>
          {hasSearch && <Search width={24} height={24} />}
          {hasShare && <Share width={24} height={24} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: "left",
    fontFamily: "SF Pro Display",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  detailButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  square: {
    display: "flex",
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius: 10,
  },
  headerTitle: {
    color: "#02102E",
    fontSize: 20,
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 74,
  },
});

export default Header;
