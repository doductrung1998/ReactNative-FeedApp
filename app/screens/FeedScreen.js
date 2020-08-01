import React, { useState, useRef, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  Button,
  StatusBar,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { data } from "../data/data";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const Category = [
  {
    id: "0",
    name: "All",
  },
  {
    id: "1",
    name: "Picture",
  },
  {
    id: "2",
    name: "Camera",
  },
  {
    id: "3",
    name: "Vehicle",
  },
  {
    id: "4",
    name: "Clothes",
  },
];

const FeedScreen = (props) => {
  const AnimationRefAdd = useRef(null);
  const AnimationRefFeed = useRef(null);
  const AnimationRefAccount = useRef(null);

  const [selectedId, setSelectedId] = React.useState(null);
  const [selectedFeed, setSelectedFeed] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const route = useRoute();
  const navigation = useNavigation();
  const dataList = data;

  class ButtonCategory extends React.Component {
    render() {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedId(this.props.item.id);
            setFilterCategory(this.props.item.name);
          }}
          style={[styles.viewTopTab]}
        >
          <Animatable.View
            style={buttonTopTab}
            backgroundColor={this.props.backgroundColor}
          >
            <Text style={styles.textButtonTopTab}>{this.props.item.name}</Text>
          </Animatable.View>
        </TouchableOpacity>
      );
    }
  }
  class PictureFlatList extends React.Component {
    render() {
      return (
        <View style={styles.viewCenteredFlatList}>
          <View style={styles.viewFlatList}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FeedDetail", {
                  feedDetail: this.props.item,
                });
              }}
            >
              <Image
                source={{ uri: `${this.props.item.uri}` }}
                style={styles.imageFlatList}
              />
              <Text style={styles.textName}>{this.props.item.pictureName}</Text>
            </TouchableOpacity>
            <Text style={styles.textPrice}>{this.props.item.price} $</Text>
          </View>
        </View>
      );
    }
  }

  const _onPressAdd = () => {
    if (AnimationRefAdd) {
      AnimationRefAdd.current?.bounceIn();
    }
  };
  const _onPressFeed = () => {
    console.log(selectedFeed);
    if (AnimationRefFeed) {
      AnimationRefFeed.current?.bounceIn();
    }
    setFilterCategory("All");
    setSelectedId(0);
    setSelectedFeed(true);
  };
  const _onPressAccount = () => {
    if (AnimationRefAccount) {
      AnimationRefAccount.current?.bounceIn();
    }
    navigation.navigate("Account", { account: route.params.account });
    setSelectedFeed(false);
  };

  const filterData = (dataList, category) => {
    if (category === "All") {
      return dataList;
    } else {
      const data = dataList.filter(
        (data) => data.category === category.toLowerCase()
      );
      return data;
    }
  };

  const buttonTopTab = {
    flex: 1,
    width: (width * 1) / 4,
    height: "60%",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animatable.View animation="fadeInUpBig" style={styles.viewTopTab}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          horizontal={true}
          data={Category}
          renderItem={({ item, index }) => {
            const backgroundColor = item.id === selectedId ? "#40D0D0" : "#fff";
            console.log("FF" + item.id);
            return (
              <ButtonCategory
                item={item}
                index={index}
                backgroundColor={backgroundColor}
              />
            );
          }}
        ></FlatList>
      </Animatable.View>
      <Animatable.View
        animation="bounceInLeft"
        style={{ height: (height * 9) / 11 }}
      >
        <FlatList
          data={filterData(dataList, filterCategory)}
          renderItem={({ item, index }) => {
            return <PictureFlatList item={item} index={index} />;
          }}
        ></FlatList>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.viewBottomTab}>
        <View>
          <TouchableOpacity onPress={_onPressFeed} style={styles.buttonAdd}>
            <Animatable.View ref={AnimationRefFeed}>
              <MaterialIcons
                name="home"
                size={30}
                color={selectedFeed ? "red" : "black"}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={_onPressAdd} style={styles.buttonAdd}>
            <Animatable.View ref={AnimationRefAdd}>
              <MaterialIcons name="add-circle" size={50} color="#E01B3D" />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={_onPressAccount} style={styles.buttonAdd}>
            <Animatable.View ref={AnimationRefAccount}>
              <MaterialCommunityIcons name="account" size={30} color="black" />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#E3E6E5",
  },
  viewCenteredFlatList: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E6E5",
  },
  viewFlatList: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 15,
    marginVertical: 15,
    flexDirection: "column",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
  },
  imageFlatList: {
    height: (height * 2) / 5,
    width: (width * 8) / 9,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textName: {
    fontSize: 15,
    fontFamily: "Lobster-Regular",
    padding: 10,
  },
  textPrice: {
    bottom: 10,
    fontSize: 15,
    padding: 10,
    color: "#3E91E2",
  },
  viewBottomTab: {
    height: (height * 1.3) / 11,
    width: width,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.15,
  },
  viewTopTab: {
    paddingLeft: 7,
    height: (height * 0.7) / 11,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonTopTab: {
    fontFamily: "Lobster-Regular",
  },
  buttonAdd: {
    alignSelf: "center",
  },
});

export default FeedScreen;
