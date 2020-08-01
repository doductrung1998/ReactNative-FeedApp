import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  StatusBar,
} from "react-native";

import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
import MainScreen from "./app/screens/MainScreen.js";
import { AppLoading } from "expo";
export default function App() {
  console.log("App executed");
  return <MainScreen></MainScreen>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
