import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Search from "../assets/svg/searchChat.svg";
import Share from "../assets/svg/shareChat.svg";
import { Link, useRouter } from "expo-router";
import { LinkProps, Href } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export type Props = {
  title?: string;
  colorSquare?: string;
  hasSearch?: boolean;
  hasShare?: boolean;
  toDetail?: boolean;
};

const Header: React.FC<Props> = ({
  title = "",
  colorSquare = "",
  hasSearch = false,
  hasShare = false,
  toDetail = false,
}) => {
  const router = useRouter();
  console.log(toDetail);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <FontAwesome6 name="chevron-left" size={24} color="#02102E" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (toDetail) {
                router.push("/chat/detail");
              }
            }}
          >
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
          </TouchableOpacity>
        </View>
        {(hasSearch || hasShare) && (
          <View style={styles.headerIcons}>
            <Link href={"/chat/detail/search"} asChild>
              <TouchableOpacity>
                {hasSearch && <Search width={24} height={24} />}
              </TouchableOpacity>
            </Link>
            {hasShare && <Share width={24} height={24} />}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 41,
    paddingBottom: 9,
    width: "100%",
    textAlign: "left",
    fontFamily: "SF Pro Display",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  back: {
    marginRight: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  detailButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
    width: "auto",
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
});

export default Header;
