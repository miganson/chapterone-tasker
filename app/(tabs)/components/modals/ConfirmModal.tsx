import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
  position?: "center" | "bottom";
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
  position = "center",
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onCancel}
    >
      <View
        style={[s.backdrop, position === "bottom" ? s.backdropBottom : null]}
      >
        <View style={[s.card, position === "bottom" ? s.cardBottom : null]}>
          <Text style={s.title}>{title}</Text>
          {!!message && <Text style={s.body}>{message}</Text>}

          <View style={s.row}>
            <Pressable onPress={onCancel} style={[s.btn, s.btnGhost]}>
              <Text style={s.btnGhostText}>{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={[s.btn, danger ? s.btnDanger : s.btnPrimary]}
            >
              <Text style={danger ? s.btnDangerText : s.btnPrimaryText}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  backdropBottom: { justifyContent: "flex-end" },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardBottom: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  title: { fontSize: 18, fontWeight: "700", color: "#202124", marginBottom: 6 },
  body: { color: "#5f6368", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
  btn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btnGhost: { borderColor: "#cfd8dc", backgroundColor: "#fff" },
  btnGhostText: { color: "#202124", fontWeight: "600" },
  btnPrimary: { borderColor: "#1976d2", backgroundColor: "#e3f2fd" },
  btnPrimaryText: { color: "#1976d2", fontWeight: "700" },
  btnDanger: { borderColor: "#e53935", backgroundColor: "#ffecec" },
  btnDangerText: { color: "#e53935", fontWeight: "700" },
});
