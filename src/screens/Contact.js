import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";
import { object } from "prop-types";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  // getPermissionsAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // };

  loadContacts = async () => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== "granted") {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    let data2 = [];

    data.forEach(one => {
      if (one.hasOwnProperty("phoneNumbers")) {
        data2.push(one);
      }
    });

    this.setState({
      contacts: data2,
      inMemoryContacts: data2,
      isLoading: false
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
    console.log(this.state.contacts);
  }

  SelectContact = (item) => {
    let mobileNumber = item.phoneNumbers[0].number || item.phoneNumbers[1].number
    let phonenumber = this.props.navigation.state.params.phonenumber;
    let name = this.props.navigation.state.params.name;

    let TruncMobile = mobileNumber.replace(/ +/g, "")

    let sosContact = []
    
    sosContact.push(TruncMobile)
    
    let url = "http://68.169.59.171:9800/otogenow/api/v1/addcontact";

    console.log(sosContact)

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        userId: this.props.navigation.state.params.phonenumber,
        sosContact: sosContact
      })
    })

      .then(res => {
        if (res.responseCode === "00") {
          Alert.alert("OTP does'nt match");

          this.props.navigation.navigate("Verify");
        } else {
          this.props.navigation.navigate("Emergency", {
            phonenumber: phonenumber,
            name: name
          });
        }

        return console.log(res);
      })
      .catch(err => console.log(err));
    
    

    this.props.navigation.navigate("EmergencySuccess", {
      phonenumber: phonenumber,
      name: name,

    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {this.SelectContact(item);}}>
      <View style={{ minHeight: 70, padding: 5 }}>
        <Text style={{ color: "#bada55", fontWeight: "bold", fontSize: 26 }}>
          {item.firstName + " "}
          {item.lastName}
        </Text>

        <Text style={{ color: "white", fontWeight: "bold" }}>
          {item.phoneNumbers[0].number}
        </Text>
      </View>
    </TouchableOpacity>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        " " +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#2A2E43", marginTop: 20 }}>
        <SafeAreaView style={{ backgroundColor: "#2A2E43" }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: "#2f363c",
            height: 40,
            fontSize: 20,
            padding: 10,
            color: "white",
            borderBottomWidth: 0.5,
            borderBottomColor: "#7d90a0"
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: "#2A2E43" }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50
                }}
              >
                <Text style={{ color: "#bad555" }}>No Contacts Found</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2E43',
    alignItems: "center",
    justifyContent: "center"

  }
});
