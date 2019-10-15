import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  WebView
} from "react-native";


export default class Onboarding2 extends Component {
  constructor() {
    this.onPressButton = this.onPressButton.bind(this);
  }
  _onPressButton() {
    alert("You tapped the button!");
  }
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
            color: "#ffffff"
          }}
        >
          Send SOS messages to emergency contacts
        </Text>

        <Image
          style={{ marginTop: 93, marginBottom: 92 }}
          source={require("../assets/img/twitter.png")}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#665EFF" }]}
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
        <TouchableOpacity
          onPress={this.onPressButton}
          style={[styles.button, { backgroundColor: "#D2F1FC", marginTop: 26 }]}
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
        </TouchableOpacity>
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
