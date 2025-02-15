import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Search from "../assets/svg/searchChat.svg";
import Share from "../assets/svg/shareChat.svg";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { LinkProps, Href } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export type Props = {
  title?: string;
  colorSquare?: string;
  hasSearch?: boolean;
  hasShare?: boolean;
  toDetail?: boolean;
  withBorder?: boolean;
};

const Header: React.FC<Props> = ({
  title = "",
  colorSquare = "",
  hasSearch = false,
  hasShare = false,
  toDetail = false,
  withBorder = false,
}) => {
  const router = useRouter();
  return (
    <>
      <View
        style={[styles.container, { borderBottomWidth: withBorder ? 1 : 0 }]}
      >
        <View style={styles.leftContainer}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <FontAwesome6 name="chevron-left" size={24} color="#02102E" />
          </TouchableOpacity>
          {/* Allows navigation to chat detail page if needed, otherwise displays title */}
          <TouchableOpacity disabled={!toDetail}>
            <View style={styles.detailButton}>
              {toDetail ? (
                <Link
                  href={{
                    pathname: "/chat/detail",
                    params: { title: title, color: colorSquare },
                  }}
                >
                  <View style={styles.detailButton}>
                    {colorSquare && (
                      <View
                        style={[
                          styles.square,
                          { backgroundColor: colorSquare },
                        ]}
                      ></View>
                    )}

                    {title && <Text style={styles.headerTitle}>{title}</Text>}
                  </View>
                </Link>
              ) : (
                <>
                  {colorSquare && (
                    <View
                      style={[styles.square, { backgroundColor: colorSquare }]}
                    ></View>
                  )}

                  {title && <Text style={styles.headerTitle}>{title}</Text>}
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {(hasSearch || hasShare) && (
          <View style={styles.headerIcons}>
            {/* Links to desired header icon pages */}
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
    paddingTop: 55,
    paddingBottom: 9,
    width: "100%",
    textAlign: "left",
    fontFamily: "SF Pro Display",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
