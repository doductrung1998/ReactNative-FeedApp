import React, { useRef, useState } from "react";
import {
  View,
  Dimensions,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Account } from "../data/account";
import { Entypo } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const FeedDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const isEmailTrue = Account.findIndex(
    (account) => account.email === route.params.feedDetail.seller
  );
  const AccountData = Account[isEmailTrue];
  const AnimationRefContact = useRef(null);

  const _onPressContact = () => {
    AnimationRefContact.current?.bounceIn();
    setOpenModal(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#E3E6E5",
      }}
    >
      <View style={styles.viewCentered}>
        <Image
          style={{ height: (height * 3) / 10, width: "100%" }}
          source={{ uri: route.params.feedDetail.uri }}
        />
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 10,
            height: (height * 1) / 10,
            justifyContent: "center",
          }}
        >
          <Text style={styles.nameFeed}>
            {route.params.feedDetail.pictureName}
          </Text>
          <Text style={styles.textPrice}>{route.params.feedDetail.price}</Text>
        </View>
        <View style={styles.viewProfile}>
          <View style={styles.viewImage}>
            <Image
              style={styles.ImageProfile}
              source={{ uri: AccountData.picture }}
            />
          </View>
          <View style={styles.viewInformation}>
            <Text style={styles.accountName}>{AccountData.name}</Text>
            <Text style={styles.accountEmail}>{AccountData.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewContact}>
        <TouchableOpacity
          style={{
            backgroundColor: "#dd474f",
            width: (width * 2) / 5,
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 10,
          }}
          onPress={_onPressContact}
        >
          <Animatable.View
            style={{
              flexDirection: "row",
              padding: 10,
            }}
            ref={AnimationRefContact}
          >
            <Entypo name="megaphone" size={24} color="black" />
            <Text
              style={{ paddingLeft: 5, fontWeight: "bold", color: "white" }}
            >
              Contact
            </Text>
          </Animatable.View>
        </TouchableOpacity>
        <View style={{ alignSelf: "center" }}>
          <Modal transparent={true} animationType="slide" visible={openModal}>
            <View style={styles.viewCenteredModal}>
              <View style={styles.viewModal}>
                <Text style={styles.nameFeed}>Phone :</Text>
                <View style={styles.viewModalTextInput}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Leave contact"
                    style={styles.textInput}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenModal(false);
                    }}
                    style={styles.buttonModal}
                  >
                    <Text style={styles.buttonCancel}>Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={() => {
                      setOpenModal(false);
                    }}
                  >
                    <Text style={styles.buttonCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <Animatable.View animation="bounceInLeft" style={styles.viewWillHaveSoon}>
        <Text style={styles.nameFeed}> Will have soon!!</Text>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameFeed: {
    fontFamily: "Lobster-Regular",
    fontSize: 20,
  },
  viewCentered: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
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
  textPrice: {
    bottom: 10,
    fontSize: 15,
    padding: 10,
    color: "#3E91E2",
  },
  viewContact: {
    height: (height * 1) / 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonModal: {
    width: 80,
    backgroundColor: "#1A69E4",
    height: "50%",
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
  textInput: {
    width: "85%",
    marginHorizontal: 20,
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "#f5f3f3",
    height: 35,
    padding: 10,
  },
  viewCenteredModal: {
    height: height,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  viewModal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: (height * 1) / 4,
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
  viewModalTextInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  viewWillHaveSoon: {
    borderRadius: 20,
    marginVertical: 30,
    height: (height * 1) / 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
export default FeedDetailScreen;
