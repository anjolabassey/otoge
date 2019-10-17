import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: ""
      // user: this.props.user
    };
    this.donate = this.donate.bind(this);
    this.sos = this.sos.bind(this);
  }
  donate() {
    this.props.navigation.navigate("Record");
  }
  sos() {
    console.log("setting up sos");
    this.props.navigation.navigate("ContactSelect");
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
        marginTop: 72,
        marginBottom: 159
      },
      donate: {
        borderRadius: "50%",
        backgroundColor: "#665EFF",
        shadowOffset: { width: 2, height: 20 },
        shadowColor: '#000000',
        shadowOpacity: 0.5
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack}>
          <View style={styles.nav}>
            <TouchableOpacity>
              <Image source={require("../assets/img/settings.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/img/swipe1.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
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
          Welcome, {this.props.username}
        </Text>

        <Text
          style={{
            fontSize: 18,
            lineHeight: 28,
            marginBottom: 165,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          You have made <Text style={{ fontWeight: "bold" }}>0</Text> reports
          today
        </Text>

        <View style={[styles.post, { alignItems: "center" }]}>
          <Text>Yesterday, 4:00pm</Text>
          <Text>
            Help! I’ve been accosted by SARS officials at Eric Moore, Bode
            Thomas, Surulere. @segalink @policeng #ENDSARS #StopRobbingUs.
          </Text>
        </View>

        <TouchableOpacity style={styles.donate} onPress={this.donate}>
          <Image
            style={{ marginTop: 29.23 }}
            source={require("../assets/img/donate.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
