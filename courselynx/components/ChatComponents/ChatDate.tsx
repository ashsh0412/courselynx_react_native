import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Props = {
  date: string;
};

const ChatDate: React.FC<Props> = ({ date = "" }) => {
  const formattedDate = formatTimestamp(date);

  return (
    <>
      <View style={styles.dateWrapper}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dateWrapper: { width: "100%" },
  dateText: { paddingVertical: 8, textAlign: "center" },
});

const formatTimestamp = (dateString: string): string => {
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) return "Invalid Date";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const inputDay = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );

  if (inputDay.getTime() === today.getTime()) {
    return `Today at ${formatTime(inputDate)}`;
  } else if (inputDay.getTime() === yesterday.getTime()) {
    return `Yesterday at ${formatTime(inputDate)}`;
  } else if (
    (today.getTime() - inputDay.getTime()) / (1000 * 60 * 60 * 24) <=
    6
  ) {
    return `${getWeekday(inputDate)} at ${formatTime(inputDate)}`;
  } else {
    return `${getMonthAbbreviation(
      inputDate
    )} ${inputDate.getDate()} at ${formatTime(inputDate)}`;
  }
};

const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

const getWeekday = (date: Date) => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
};

const getMonthAbbreviation = (date: Date) => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][date.getMonth()];
};

export default ChatDate;
