import React, { Component } from "react";
/* import twitter */
import twitter, {
  TWLoginButton,
  decodeHTMLEntities,
  getRelativeTime
} from "react-native-simple-twitter";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

export default class Onboarding1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      tokenSecret: null
    };
  }
  async componentDidMount() {

    /* check AsyncStorage */
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData !== null) {
        const user = JSON.parse(userData);

        twitter.setAccessToken(user.token, user.tokenSecret);

        try {
          const user = await twitter.get("account/verify_credentials.json", {
            include_entities: false,
            skip_status: true,
            include_email: true
          });

          this.props.navigation.replace("Home", { user });
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  onGetAccessToken = ({
    oauth_token: token,
    oauth_token_secret: tokenSecret
  }) => {
    this.setState({
      token,
      tokenSecret
    });
  };

  onSuccess = async user => {
    console.log(user)
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          token: this.state.token,
          tokenSecret: this.state.tokenSecret
        })
      );
    } catch (err) {
      console.log(err);
    }

    Alert.alert("Success", [
      {
        text: "Go HomeScreen",
        onPress: () => {
          this.props.navigation.replace("Home", { Landing });
        }
      }
    ]);
  };
  onPress = e => {
    console.log("button pressed");
  };

  onClose = e => {
    console.log("press close button");
  };

  onError = err => {
    console.log(err);
  };
  
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12
      }
    });

    return (
      <View style={styles.container}>
        <Image
          style={{ marginTop: 45, marginBottom: 44 }}
          source={require("../assets/img/swipe1.png")}
        />
        <Text
          style={{
            fontSize: 22,
            lineHeight: 34,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          Automatic tweets via voice activation
        </Text>

        <Image
          style={{ marginTop: 93, marginBottom: 92 }}
          source={require("../assets/img/twitter.png")}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#665EFF" }]}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: "#ffffff"
            }}
          >
            SIGN UP WITH PHONE NUMBER
          </Text>
        </TouchableOpacity>

        <TWLoginButton
          style={[styles.button, { backgroundColor: "#D2F1FC", marginTop: 26 }]}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: "#07074F"
            }}
          >
            CONNECT WITH TWITTER
          </Text>
        </TWLoginButton>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 26,
            color: "#ffffff",
            marginTop: 20
          }}
        >
          Already have an account? Log in
        </Text>
      </View>
    );
  }
}
