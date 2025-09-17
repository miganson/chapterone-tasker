import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "./components/modals/ConfirmModal";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { Task, TaskId } from "./types/task";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");
  const [pendingDeleteId, setPendingDeleteId] = useState<TaskId | null>(null);
  const [showDeleteAll, setShowDeleteAll] = useState<boolean>(false);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed)
        return Number(a.completed) - Number(b.completed);
      return b.createdAt - a.createdAt;
    });
  }, [tasks]);

  const addTask = () => {
    const value = text.trim();
    if (!value) return;
    const id = uuidv4();
    setTasks((prev) => [
      { id, text: value, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    setText("");
    Keyboard.dismiss();
  };

  const toggleTask = (id: TaskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: TaskId) => {
    if (Platform.OS === "ios") {
      const performDelete = () =>
        setTasks((prev) => prev.filter((t) => t.id !== id));
      Alert.alert("Delete task", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: performDelete },
      ]);
    } else {
      setPendingDeleteId(id);
    }
  };

  const confirmDelete = () => {
    if (pendingDeleteId)
      setTasks((prev) => prev.filter((t) => t.id !== pendingDeleteId));
    setPendingDeleteId(null);
  };

  const cancelDelete = () => setPendingDeleteId(null);

  const deleteAllTasks = () => {
    if (tasks.length === 0) return;
    if (Platform.OS === "ios") {
      Alert.alert("Delete all tasks", "This cannot be undone.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => setTasks([]),
        },
      ]);
    } else {
      setShowDeleteAll(true);
    }
  };

  const confirmDeleteAll = () => {
    setTasks([]);
    setShowDeleteAll(false);
  };

  const cancelDeleteAll = () => setShowDeleteAll(false);

  const activeCount = tasks.filter((t) => !t.completed).length;
  const doneCount = tasks.length - activeCount;
  const taskText = tasks.find((t) => t.id === pendingDeleteId)?.text;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Tasks</Text>
            <Text style={styles.subtitle}>
              {activeCount} active · {doneCount} completed
            </Text>
          </View>

          <Pressable
            onPress={deleteAllTasks}
            disabled={tasks.length === 0}
            android_ripple={{ color: "rgba(0,0,0,0.08)" }}
            style={({ pressed }) => [
              styles.deleteAllBtn,
              pressed ? styles.deleteAllBtnPressed : undefined,
              tasks.length === 0 ? styles.deleteAllBtnDisabled : undefined,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Delete all tasks"
          >
            <Ionicons
              name="trash-bin-outline"
              size={16}
              color={tasks.length === 0 ? "#bdbdbd" : "#e53935"}
            />
            <Text
              style={[
                styles.deleteAllText,
                tasks.length === 0 ? styles.deleteAllTextDisabled : undefined,
              ]}
            >
              Delete All
            </Text>
          </Pressable>
        </View>

        <TaskInput
          value={text}
          onChangeText={setText}
          onSubmit={addTask}
          disabled={!text.trim()}
        />

        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.empty}>No tasks yet. Add your first one!</Text>
          }
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      </View>
      <ConfirmModal
        visible={!!pendingDeleteId}
        title={taskText ? `Delete "${taskText}" task?` : "Delete task?"}
        message="This action can’t be undone."
        danger
        confirmText="Delete"
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
      <ConfirmModal
        visible={showDeleteAll}
        title="Delete all tasks?"
        message="This will remove every task. This can’t be undone."
        danger
        confirmText="Delete All"
        onCancel={cancelDeleteAll}
        onConfirm={confirmDeleteAll}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: { flexShrink: 1 },

  title: { fontSize: 28, fontWeight: "700", color: "#202124" },
  subtitle: { marginTop: 2, color: "#5f6368" },

  separator: { height: 10 },
  empty: { textAlign: "center", color: "#9aa0a6" },

  deleteAllBtn: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f1b5b2",
    backgroundColor: "#fff5f5",
  },
  deleteAllBtnPressed: { opacity: 0.85 },
  deleteAllBtnDisabled: {
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },
  deleteAllText: { marginLeft: 6, color: "#e53935", fontWeight: "600" },
  deleteAllTextDisabled: { color: "#bdbdbd" },
});
