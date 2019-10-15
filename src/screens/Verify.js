import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
// import OtpInputs from "../components/OtpInputs";

export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: ""
    };

    this.onFocus = this.onFocus.bind(this);
    this.success = this.success.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 5000)
    );
  };
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate("Dashboard");
    }
  }

  getOtp(otp) {
    console.log(otp);
    this.setState({ otp });
  }

  onFocus() {
    this.setState({
      border: "#665EFF"
    });
  }
  success() {
    this.props.navigation.navigate("Success");
  }
  goBack() {
    this.props.navigation.navigate("Landing");
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12,
        marginTop: 63
      },
      inputWrapper: {
        paddingHorizontal: 17,
        paddingVertical: 17,
        marginBottom: 24,
        backgroundColor: "#454F63",
        color: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: this.state.border,
        borderStyle: "solid",
        width: "80%"
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack}>
          <Image
            style={{ marginTop: 29.23, marginLeft: 43 }}
            source={require("../assets/img/back.png")}
          />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 26,
              lineHeight: 34,
              marginBottom: 52,
              marginTop: 57.26,
              color: "#ffffff",
              textAlign: "center"
            }}
          >
            Enter 4-digit pin sent to your device
          </Text>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 34,
              marginBottom: 52,
              marginTop: 20,
              color: "#ffffff",
              textAlign: "center"
            }}
          >
            Didnt receive your pin? Resend again
          </Text>

          <TouchableOpacity
            onPress={this.success}
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
              VERIFY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
