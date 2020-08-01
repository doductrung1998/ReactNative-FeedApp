import React, { useRef } from "react";

import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const { height, width } = Dimensions.get("window");

const AccountScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const AnimationRefLogOut = useRef(null);

  const _onPressLogOut = () => {
    AnimationRefLogOut.current?.bounceIn();
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewProfile}>
        <View style={styles.viewImage}>
          <Image
            style={styles.ImageProfile}
            source={{ uri: route.params.account.picture }}
          />
        </View>
        <View style={styles.viewInformation}>
          <Text style={styles.accountName}>{route.params.account.name}</Text>
          <Text style={styles.accountEmail}>{route.params.account.email}</Text>
        </View>
      </View>
      <View style={styles.viewLogOut}>
        <TouchableOpacity onPress={_onPressLogOut}>
          <Animatable.View
            style={{
              flexDirection: "row",
              padding: 10,
            }}
            ref={AnimationRefLogOut}
          >
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color="black"
            ></MaterialCommunityIcons>
            <Text style={{ paddingLeft: 5, fontWeight: "bold" }}>Log Out</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ImageProfile: {
    height: "100%",
    width: "100%",
    borderRadius: 70 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#E3E6E5",
  },
  viewImage: {
    padding: 10,
    width: 80,
    height: 80,
  },
  viewProfile: {
    height: (height * 1) / 8,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 15,
  },
  accountName: {
    fontFamily: "Pacifico-Regular",
    fontSize: 20,
  },
  accountEmail: {
    fontFamily: "IndieFlower-Regular",
    fontSize: 14,
  },
  viewInformation: {
    paddingLeft: 10,
    flexDirection: "column",
  },
  viewLogOut: {
    height: (height * 1) / 8,
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default AccountScreen;
