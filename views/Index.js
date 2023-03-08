import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, View, Pressable, Platform } from 'react-native';
import * as Location from 'expo-location';

export default function Index({navigation}) {
  const [ville, setVille] = useState('');
  const [coords, setCoords] = useState('');

  const localiseCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    setCoords(`${latitude},${longitude}`);
  }

  const navigueVille = async () => {
    if (ville == ""){
      if (Platform.OS === 'android') {
        ToastAndroid.show('Veuillez entrer un nom de ville', ToastAndroid.SHORT);
      } else {
        alert('Veuillez entrer un nom de ville');
      }
    } else {
      /*const villeToCoords = () => {
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => {
            const firstData = data[0];
          })
          .catch(error => {
            console.error(error);
          });
      }*/
      navigation.navigate("Infos", { data: ville, isVille: true });
      // let localisation = await Location.geocodeAsync(ville, LocationGeocodingOptions(false));
      // console.log(localisation);
    }
  }

  const navigueGPS = () => {
    localiseCoords();
    if (coords) {
      navigation.navigate("Infos", { data: coords, isVille: false });
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <TextInput style={styles.input} placeholder="Ville" value={ville} onChangeText={text => setVille(text)}/>
      <Pressable onPress={navigueVille} style={styles.btnvalidate}>
        <Text style={styles.textbtn}>Voir météo</Text>
      </Pressable>
      <Pressable onPress={navigueGPS} style={styles.btncoords}>
        <Text style={styles.textbtn}>Météo de la location actuelle</Text>
      </Pressable>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
  },
  coords: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: '70%',
    textAlign: 'center',
    fontSize: 32,
    margin: 20,
  },
  btnvalidate : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'limegreen',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btncoords: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'dodgerblue',
    margin: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textbtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});