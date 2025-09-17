import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function TaskInput({
  value,
  onChangeText,
  onSubmit,
  disabled,
}: Props) {
  const isDisabled = !!disabled;

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Add a new task"
        placeholderTextColor="#9aa0a6"
        style={styles.input}
      />

      <Pressable
        onPress={onSubmit}
        disabled={isDisabled}
        android_ripple={{ color: "rgba(0,0,0,0.1)" }}
        style={[styles.addBtn, isDisabled ? styles.addBtnDisabled : undefined]}
      >
        <Ionicons
          name="add-circle"
          size={24}
          color={isDisabled ? "#c6c6c6" : "#1e88e5"}
        />
        <Text
          style={[styles.addText, isDisabled ? { color: "#c6c6c6" } : null]}
        >
          Add
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    color: "#202124",
  },
  addBtn: {
    marginLeft: 8,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addBtnDisabled: { opacity: 0.6 },
  addText: { fontWeight: "600", color: "#1e88e5", marginLeft: 6 },
  pressed: { opacity: 0.8 },
});
