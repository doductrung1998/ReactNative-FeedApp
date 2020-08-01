import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Modal,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { TextInput } from "react-native-gesture-handler";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Account } from "../data/account";

const { height, width } = Dimensions.get("window");

const getFonts = () =>
  Font.loadAsync({
    "Rowdies-Regular": require("../assets/fonts/Rowdies-Regular.ttf"),
    "IndieFlower-Regular": require("../assets/fonts/IndieFlower-Regular.ttf"),
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
    "Lobster-Regular": require("../assets/fonts/Lobster-Regular.ttf"),
  });

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      openModal: false,
      email: "",
      password: "",
      AccountData: [],
    };
  }

  componentDidMount() {
    this.Image = (
      <Animatable.Image
        animation="zoomIn"
        source={require("../assets/logo_IC.png")}
      ></Animatable.Image>
    );
    this.setState({
      AccountData: Account,
    });
    // if (this.props.route.params) {
    // this.setState({
    //   AccountData: this.state.AccountData.push(
    //     this.props.route.params.newAccount
    //   ),
    // });
    //   console.log(this.props.route.params.newAccount);
    // }
  }

  _onPressRegister = () => {
    this.props.navigation.navigate("Register");
  };

  handleCheckAccount = () => {
    const email = this.state.email;
    const password = this.state.password;
    const Account = this.state.AccountData;
    console.log("Email " + email);
    const isEmailTrue = Account.findIndex((account) => account.email === email);
    if (isEmailTrue > 0 || isEmailTrue === 0) {
      console.log(JSON.stringify(Account[isEmailTrue].password));
      console.log("PP" + JSON.stringify(password));
      if (
        JSON.stringify(Account[isEmailTrue].password) ===
        JSON.stringify(password)
      ) {
        this.setState({ openModal: false });
        const AccountNowLogin = Account[isEmailTrue];
        this.props.navigation.navigate("Feed", { account: AccountNowLogin });
      } else {
        this.setState({ openModal: true });
      }
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => this.setState({ fontsLoaded: true })}
        />
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.viewHeader}>
            <StatusBar barStyle="dark-content" />
            {this.Image}
            <Animatable.Text animation="bounceIn" style={styles.textLogo}>
              Welcome to our IC
            </Animatable.Text>
            <Animatable.Text
              animation="bounceInDown"
              style={styles.textDescription}
            >
              This app is in development
            </Animatable.Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.viewFooter}>
            <View
              style={{
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (this.props.route.params.key === "1") {
                    console.log(
                      "A show :" + JSON.stringify(this.props.route.params.key)
                    );
                  } else {
                    console.log(
                      "Account show :" +
                        JSON.stringify(this.props.route.params.key)
                    );
                    console.log(
                      "New Account show :" +
                        JSON.stringify(this.props.route.params.newAccount)
                    );
                    console.log(this.state.AccountData);
                    this.setState({
                      AccountData: [
                        this.state.AccountData,
                        this.props.route.params.newAccount,
                      ],
                    });
                    console.log(this.state.AccountData);
                  }
                  this.setState({ openModal: true });
                }}
                style={styles.buttonSignIn}
              >
                <Text style={{ alignSelf: "center", color: "#fff" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._onPressRegister}
                style={styles.buttonRegister}
              >
                <Text style={{ alignSelf: "center", color: "#1A69E4" }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.openModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.viewCenteredModal}>
              <View style={styles.viewModal}>
                <Text style={styles.textLogo}>Sign In</Text>
                <Text style={styles.modalText}>Email :</Text>
                <View style={styles.viewModalTextInput}>
                  <TextInput
                    keyboardType="email-address"
                    placeholder="Enter your email here"
                    style={styles.textInput}
                    onChangeText={(text) => {
                      this.setState({
                        email: text,
                      });
                    }}
                  ></TextInput>
                </View>
                <Text style={styles.modalText}>Password :</Text>
                <View style={styles.viewModalTextInput}>
                  <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    placeholder="Enter your password here"
                    style={styles.textInput}
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={this.handleCheckAccount}
                  >
                    <Text style={styles.buttonCancel}>Sing In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={() => {
                      this.setState({ openModal: false });
                    }}
                  >
                    <Text style={styles.buttonCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  registerView: {
    width: "100%",
    height: 60,
    backgroundColor: "#86D6AE",
  },
  buttonSignIn: {
    borderColor: "grey",
    marginVertical: 5,
    width: (width * 3) / 4,
    backgroundColor: "#1A69E4",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "IndieFlower-Regular",
    borderRadius: 20,
    marginHorizontal: 30,
  },
  buttonRegister: {
    borderColor: "#1A69E4",
    borderWidth: 2,
    marginVertical: 5,
    width: (width * 3) / 4,
    backgroundColor: "#fff",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "IndieFlower-Regular",
    borderRadius: 20,
    marginHorizontal: 30,
  },
  textLogo: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Pacifico-Regular",
  },
  textDescription: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "IndieFlower-Regular",
  },
  viewHeader: {
    justifyContent: "center",
    alignItems: "center",
    height: (height * 3.5) / 5,
  },
  viewFooter: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: (height * 1.5) / 5,
  },
  viewCenteredModal: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  viewModal: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
    height: "70%",
    borderRadius: 20,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  modalText: {
    marginHorizontal: 20,
    alignSelf: "flex-start",
    margin: 10,
    fontFamily: "Pacifico-Regular",
    color: "#000",
    fontSize: 15,
  },
  textInput: {
    width: "85%",
    marginHorizontal: 20,
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "#f5f3f3",
    height: 35,
    padding: 10,
  },
  viewModalTextInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonModal: {
    width: 80,
    backgroundColor: "#1A69E4",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  buttonCancel: {
    color: "#fff",
  },
});
