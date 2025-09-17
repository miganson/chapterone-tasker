import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "./../types/task";

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.itemRow}>
      <Pressable
        onPress={onToggle}
        android_ripple={{ color: "rgba(0,0,0,0.08)" }}
        style={styles.checkBtn}
      >
        <Ionicons
          name={task.completed ? "checkbox" : "square-outline"}
          size={22}
          color={task.completed ? "#1e88e5" : "#9aa0a6"}
        />
      </Pressable>

      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.textWrap,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Text style={[styles.itemText, task.completed && styles.itemTextDone]}>
          {task.text}
        </Text>
      </Pressable>

      <Pressable
        onPress={onDelete}
        android_ripple={{ color: "rgba(255,0,0,0.1)" }}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={20} color="#e53935" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    minHeight: 48,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: { flex: 1, paddingRight: 8 },
  itemText: { fontSize: 16, color: "#202124" },
  itemTextDone: { color: "#5f6368", textDecorationLine: "line-through" },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.8 },
});
