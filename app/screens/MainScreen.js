const { Surface, View } = require("react-native");
import React from "react";

import {
  Image,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableHighlightBase,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import FeedScreen from "./FeedScreen";
import AccountScreen from "./AccountScreen";
import FeedDetailScreen from "./FeedDetailScreen";

const { height, width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  createHomeStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={{
          title: "IC",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleAlign: "center",
          headerTintColor: "#000",
        }}
        name="Home"
        component={HomeScreen}
        initialParams={{ key: "1" }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="FeedDetail" component={FeedDetailScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
  // createFeedStack = () => (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Stack.Screen name="FeedScreen" component={FeedScreen} />
  //   </Stack.Navigator>
  // );

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle={{ backgroundColor: "#fff", width: width / 2 }}
        >
          <Drawer.Screen name="Home" children={this.createHomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    margin: 20,
  },
  buttonLogin: {
    width: "90%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  buttonRegister: {
    marginHorizontal: 20,
    width: "90%",
    height: 40,
    backgroundColor: "#C7C2C2",
    borderRadius: 20,
    marginVertical: 5,
  },
});
