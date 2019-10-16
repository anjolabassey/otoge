import React,  {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { object } from 'prop-types';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContact: "",
      isLoading: false,
      contacts: [],
      
    };

    this.SelectContact = this.SelectContact.bind(this)
  }

  // getPermissionsAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // };

  loadContacts = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    let data2 = []

   data.forEach((one)=>{
        if(one.hasOwnProperty("phoneNumbers")){
            data2.push(one)
        }
   })

   data2 = data2.map(item => {
    item.isSelect = false;
    item.selectedClass = styles.list;
});

    this.setState({ contacts: data2, inMemoryContacts: data2, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
    // console.log(this.state.contacts)
  }

  SelectContact = (item) => {
    let mobileNumber = item.phoneNumbers[0].number || item.phoneNumbers[1].number 

    let TruncMobile = mobileNumber.replace(/ +/g, "")

    this.setState({
        selectedContact: TruncMobile,
    }, () => {
        console.log("Refined " + this.state.selectedContact)
    })
    

    this.props.navigation.navigate("Emergency")
  }

  renderItem = ({ item }) => (
    <TouchableOpacity 
    onPress = {() => {
      this.SelectContact(item)
    }}
    >   
       <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 20 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      
    
           <Text style={{ color: 'white', fontWeight: 'bold' }}>
           {item.phoneNumbers[0].number}
         </Text>
    </View>
    </TouchableOpacity>

  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1,  backgroundColor: '#2A2E43',  marginTop: 20  }}>
        <SafeAreaView style={{ backgroundColor: '#2A2E43' }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: '#2f363c',
            height: 40,
            fontSize: 20,
            padding: 10,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#2A2E43' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
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
   backgroundColor: "#2A2E43",
    alignItems: 'center',
    justifyContent: 'center'
  }
});