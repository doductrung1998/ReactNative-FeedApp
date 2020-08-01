import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
    };
  }
  _onPresRegister = () => {
    const newAccount = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      picture:
        "https://i.pinimg.com/564x/e1/20/0d/e1200d599f5b565fd30d0ebebca18959.jpg",
    };
    this.props.navigation.navigate("Home", {
      newAccount: newAccount,
      key: "2",
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textTitle}>Register Now!!</Text>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your name here"
          keyboardType="default"
          onChangeText={(text) => this.setState({ name: text })}
        ></TextInput>
        <Text style={styles.text}>Phone</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your phone here"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ phone: text })}
        ></TextInput>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email here"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
        ></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password here"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            onPress={this._onPresRegister}
            style={styles.button_cancel_register}
          >
            <Text style={{ alignSelf: "center" }}> Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.button_cancel_register}
          >
            <Text style={{ alignSelf: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DBDEE4",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
  textInput: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderColor: "#000",
    borderRadius: 18,
    backgroundColor: "#f5f3f3",
    height: 40,
    padding: 10,
  },
  text: {
    marginHorizontal: 25,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Pacifico-Regular",
  },
  button_cancel_register: {
    marginVertical: 5,
    width: width / 3,
    backgroundColor: "#fff",
    borderColor: "#A2C1C3",
    borderWidth: 2,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "IndieFlower-Regular",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  textTitle: {
    bottom: 50,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Pacifico-Regular",
  },
});
