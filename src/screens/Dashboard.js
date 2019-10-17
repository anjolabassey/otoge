import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  WebView,
  Alert
} from "react-native";

import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: "",
      user: "wert",
      username: this.props.navigation.state.params.username,
      id: this.props.navigation.state.params.id,
      modalVisible: false,
      donateVisible: false,
      location: ""
    };

    this.donate = this.donate.bind(this);
    this.sos = this.sos.bind(this);
    this.sendTweet = this.sendTweet.bind(this);
    this.sendUssd = this.sendUssd.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal() {
  this.setState({
    donateVisible: false
  });
}
  sendTweet() {
    let url = "http://68.169.59.171:9800/otogenow/api/v1/sendtweet";

    console.log("sdf");

    let platform = Device.osName;

    navigator.geolocation.getCurrentPosition(
      position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        position = JSON.stringify(position);
        this.setState({
          location: position
        });
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            longitude: longitude,
            latitude: latitude,
            userId: this.state.id,
            platform: platform
          })
        })
          .then(data => {
            return data.json();
          })
          .then(res => {
            return console.log(res);
           Alert.alert("You have successfully sent out your SOS");
          })
          .catch(err => console.log(err));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  sendUssd() {
    navigator.geolocation.getCurrentPosition(
      position => {
        latitude = position.coords.latitude.toFixed(6);
        longitude = position.coords.longitude.toFixed(6);
        position = JSON.stringify(position);

        let newLat = latitude.replace("-", "00").replace(".", "*");
        let newLong = longitude.replace("-", "00").replace(".", "*");
        let code = `*566*911*${this.state.id}*${newLong}*${newLat}#`;

        let url = "tel:" + code;

        Linking.openURL(url);

        this.setState({ modalVisible: false });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  sos() {
    NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      // state.isConnected = false;

      if (state.isConnected === true) {
        return this.sendTweet();
        // return this.setState({ modalVisible: true });
      }
      

      this.setState({ modalVisible: true });
    });
  }

  donate() {
    console.log("setting up donate");
    this.setState({
      donateVisible: true
    });
  }

  goBack() {
    console.log("go back");
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      nav: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingVertical: 30,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      },
      post: {
        backgroundColor: "#404876",
        borderRadius: 12,
        marginBottom: 119,
        marginHorizontal: 35,
        paddingVertical: 12,
        paddingHorizontal: 15
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12,
        marginTop: 31
      },
      donate: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        backgroundColor: "#665EFF",
        shadowOffset: { width: 2, height: 5 },
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        alignSelf: "flex-end",
        paddingLeft: 15,
        paddingTop: 15,
        marginRight: 45
      },
      modal: {
        height: 250,
        paddingVertical: 26,
        paddingHorizontal: 15,
        marginTop: 170,
        marginHorizontal: 20,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        textAlign: "center"
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.nav}>
            <TouchableOpacity>
              <Image source={require("../assets/img/settings.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/img/swipe1.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sos}>
              <Image source={require("../assets/img/sos.png")} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 26,
            lineHeight: 34,
            marginBottom: 20,
            marginTop: 56,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          Welcome, {this.props.navigation.state.params.username}
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View style={styles.modal}>
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 20,
                  lineHeight: 28,
                  marginBottom: 13,
                  textAlign: "center"
                }}
              >
                You are offline!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  marginBottom: 13,
                  textAlign: "center"
                }}
              >
                Your device is offline. Please tap the button below to send
                tweet and SOS message to your emergency contacts
              </Text>

              <TouchableOpacity
                onPress={this.sendUssd}
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
                  SEND SOS MESSAGE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text
          style={{
            fontSize: 18,
            lineHeight: 28,
            marginBottom: 72,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          You have made <Text style={{ fontWeight: "bold" }}>0</Text> reports
          today
        </Text>
        <View
          style={{
            paddingLeft: 45,
            marginBottom: 12,
            flexDirection: "row-reverse"
          }}
        >
          <Text style={{ color: "#7673B3" }}>Hide</Text>
        </View>

        <View style={styles.post}>
          <Text
            style={{
              alignItems: "center",
              color: "#7C78CD",
              marginBottom: 13,
              fontSize: 20,
              lineHeight: 28
            }}
          >
            Yesterday, 4:00pm
          </Text>
          <Text style={{ color: "#ffffff", fontSize: 18, lineHeight: 28 }}>
            Help! I’ve been accosted by SARS officials at Eric Moore, Bode
            Thomas, Surulere. @segalink @policeng #ENDSARS #StopRobbingUs.
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity style={styles.donate} onPress={this.donate}>
            <Image source={require("../assets/img/donate.png")} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.donateVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View>
            <TouchableOpacity
              style={{ justifyCntent: "center", alignItems: "center" }}
              onPress={this.closeModal}
            >
              <Text style={{ paddingVertical: 20 }}>close modal</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{
              uri: "https://ravesandbox.flutterwave.com/pay/ijr1l0yuycdl"
            }}
            scalesPageToFit={true}
            style={{ marginTop: 10, padding: 20 }}
            javaScriptEnabled={true}
          />
        </Modal>
      </View>
    );
  }
}
