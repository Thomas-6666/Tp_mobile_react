import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, View, Pressable } from 'react-native';
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

  const navigueVille = () => {
    if (ville == ""){
      ToastAndroid.show('Veuillez entrer un nom de ville valide', ToastAndroid.SHORT);
    } else {
      navigation.navigate("Infos", { ville: ville });
    }
  }

  const navigueGPS = () => {
    localiseCoords();
    console.log(coords);
    navigation.navigate("Infos");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <TextInput multiline style={styles.input} placeholder="Ville" value={ville} onChangeText={text => setVille(text)}/>
      <Pressable onPress={navigueVille} style={styles.btnvalidate}>
        <Text style={styles.textbtn}>Voir météo</Text>
      </Pressable>
      <Pressable onPress={navigueGPS} style={styles.btncoords}>
        <Text style={styles.textbtn}>Détecter coordonnées GPS</Text>
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
    borderBottomWidth: 1,
    width: '70%',
    textAlign: 'center',
    fontSize: 32,
    margin: 10,
  },
  btnvalidate : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'limegreen',
  },
  btncoords: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'dodgerblue',
    margin: 30,
  },
  textbtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});