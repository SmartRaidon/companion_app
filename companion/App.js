import * as React from 'react';
import {useState} from 'react';
import { 
  Button, 
  View,
  Text, 
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ShopItem from './components/ShopItem';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Shopping List" component={ShoppingListScreen} />
        <Drawer.Screen name="Where Am I?" component={MapScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./ws.jpg')} style={styles.container} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./logo.jpg')}  style={styles.logo}/>
      </View>
    </ImageBackground>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.about}>Creator:</Text>
      <Text style={{fontSize: 25, color: 'red'}}>Balog Sándor Levente</Text>
      <Text style={styles.about}>Version:</Text>
      <Text style={styles.about}>1.0</Text>
      <Button color='grey' position='absolute' onPress={() => navigation.goBack()} title="Back to welcome screen" />
    </View>
  );
}

function MapScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.about}>Powered by Google Maps</Text>
      <Image source={require('./map.jpg')}  style={styles.map}/>
      <Button color='grey' position='absolute' onPress={() => Alert.alert('Alert!','Function is not available! Sry')} title="Find me again!" />
    </View>
  );
}

function ShoppingListScreen({ navigation }) {
  const [item, setItem] = useState();
  
  const [shopItems, setShopItems] = useState([])  ;
  
  const handleAddItem = () => { //Item hozzáadása a listához
    Keyboard.dismiss();
    setShopItems([...shopItems, item]);
    setItem(null);
  }

  const deleteItem = (index) => { //Item törlése a listából
    let itemsCopy = [...shopItems];
    itemsCopy.splice(index, 1);
    setShopItems(itemsCopy);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.shopping}>
        <View style={styles.items}>
          {
            shopItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                  <ShopItem text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
        <KeyboardAvoidingView
          behaviour={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeItemWrapper}
          >
            <TextInput style={styles.input} placeholder={'Write here'} placeholderTextColor={'white'} value={item} onChangeText={text => setItem(text)} />
            <TouchableOpacity onPress={() => handleAddItem()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 40,
    position: 'absolute',
    top: 100,
  },
  map: {
    width: 300,
    height: 500,
  },
  about: {
    color: 'black',
    fontSize: 20,
  },
  shopping: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  items: {
    marginTop: 30,
  },
  writeItemWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#a3a3a3',
    borderRadius: 60,
    borderColor: 'blue',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#a3a3a3",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  addText: {
    color: 'white',
    fontSize: 40,
  },
});
