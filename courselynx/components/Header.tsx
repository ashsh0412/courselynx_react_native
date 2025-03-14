import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Search from "../assets/svg/searchChat.svg";
import Share from "../assets/svg/shareChat.svg";
import Settings from "../assets/svg/settings.svg";
import { Link, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { onShare } from "@/utils/share";

interface HeaderProps {
  title?: string;
  subTitle?: string;
  colorSquare?: string;
  colorIsCircle?: boolean;
  hasSearch?: boolean;
  hasShare?: boolean;
  hasSettings?: boolean;
  toDetail?: boolean;
  withBorder?: boolean;
  shareParams?: { message: string; uri: string };
  onChat?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title = "",
  subTitle = "",
  colorSquare = "",
  colorIsCircle = false,
  hasSearch = false,
  hasShare = false,
  hasSettings = false,
  toDetail = false,
  withBorder = false,
  shareParams = {
    message: "Default Message",
    uri: "https://courselynx/Default",
  },
  onChat = false,
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
          <View style={styles.detailButton}>
            {toDetail ? (
              <Link
                href={{
                  pathname: "/chat/detail",
                  params: { title: title, color: colorSquare },
                }}
                asChild
              >
                <TouchableOpacity>
                  <View style={styles.detailButton}>
                    {colorSquare && (
                      <View
                        style={[
                          styles.square,
                          { backgroundColor: colorSquare },
                          { borderRadius: colorIsCircle ? 30 : 10 },
                        ]}
                      ></View>
                    )}

                    <View>
                      {title && <Text style={styles.headerTitle}>{title}</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ) : (
              <>
                {colorSquare && (
                  <View
                    style={[
                      styles.square,
                      { backgroundColor: colorSquare },
                      { borderRadius: colorIsCircle ? 30 : 10 },
                    ]}
                  ></View>
                )}

                <View>
                  {title && <Text style={styles.headerTitle}>{title}</Text>}
                  {subTitle && (
                    <Text
                      style={{
                        fontFamily: "Inter",
                        fontSize: 10,
                        color: "#4F4F4F",
                      }}
                    >
                      {subTitle}
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
        {(hasSearch || hasShare || hasSettings) && (
          // Margin for search icon on chat page is further over than others
          <View style={[styles.headerIcons, { marginRight: onChat ? 10 : 0 }]}>
            {/* Links to desired header icon pages */}
            {hasSearch && (
              <Link href={"/chat/detail/search"} asChild>
                <TouchableOpacity>
                  <Search width={24} height={24} />
                </TouchableOpacity>
              </Link>
            )}
            {hasShare && (
              <TouchableOpacity onPress={() => onShare(shareParams)}>
                <Share width={24} height={24} />
              </TouchableOpacity>
            )}
            {hasSettings && (
              <Link href={"/settings"} asChild>
                <TouchableOpacity>
                  <Settings width={26} height={26} />
                </TouchableOpacity>
              </Link>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 55,
    paddingBottom: 9,
    width: "100%",
    fontFamily: "SF Pro Display",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  back: {
    marginRight: 20,
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
  },
  headerTitle: {
    color: "#02102E",
    fontSize: 20,
    width: "auto",
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
});

export default Header;
