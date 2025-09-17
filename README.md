# ChapterOne Tasker (React Native + Expo)

## Setup

1. Install Node 18+ and npm.
2. Install deps: `npm install`
3. Start: `npx expo start`
4. Run on device: scan QR with Expo Go (Android/iOS)

## Features

- Add tasks
- Mark tasks complete (checkbox + line-through)
- Delete one task (iOS Alert, Android modal)
- Delete all tasks (iOS Alert, Android modal)
- Local state only (no backend)

## Tech / Libraries

- Expo (managed workflow) – dev/build tooling
- React Native core components – UI
- `@expo/vector-icons` (Ionicons) – icons
- `react-native-safe-area-context` – safe area padding
- `uuid` + `react-native-get-random-values` – unique IDs