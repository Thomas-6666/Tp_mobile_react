import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, View, Pressable, Platform } from 'react-native';
import * as Location from 'expo-location';

export default function Index({navigation}) {
  const [ville, setVille] = useState('');
  const [coords, setCoords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  var btnPressGps = false;
  const [isVille, setIsVille] = useState(false);
  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'HbvoXiccBTmXK7OSLMWROg==cfhMwXKDyOIhxAFl'
    }
};


const navigueVille = async () => {
  if (ville == ""){
    if (Platform.OS === 'android') {
      ToastAndroid.show('Veuillez entrer un nom de ville ou pays', ToastAndroid.SHORT);
    } else {
      alert('Veuillez entrer un nom de ville ou pays');
    }
  } else {
    try {
      geocodeCity(ville);
      setIsVille(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
}

function geocodeCity(city) {
  const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
  setIsLoading(true);
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => { 
      if (result[0] != null) {
        let latitude = result[0].latitude;
        let longitude = result[0].longitude;
        setCoords(`${latitude},${longitude}`);
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Nom de ville incorrect', ToastAndroid.SHORT);
        } else {
          alert('Nom de ville incorrect');
        }
        throw new Error('Failed to geocode city');
      }
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      throw error;
    });
};



  const navigueGPS = async () => {
    btnPressGps == true;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Accès impossible à la position car autorisation refusée");
      return null;
    } else {
      setIsLoading(true);
      let location = await Location.getCurrentPositionAsync();
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;
      setCoords(`${latitude},${longitude}`);
      setIsLoading(false);
      setIsVille(false);
    }
  }
  
  useEffect(() => {
    setVille('');
    setCoords('');
    if (coords !== '') {
      btnPressGps = false;
      navigation.navigate("Infos", { data: coords, ville: ville, isVille: isVille });
    } else if (!isLoading && btnPressGps) {
      btnPressGps = false;
      if (Platform.OS === 'android') {
        ToastAndroid.show('Impossible de détecter vos coordonnées', ToastAndroid.SHORT);
      } else {
        alert('Impossible de détecter vos coordonnées');
      }
    }
  }, [coords, isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <TextInput style={styles.input} placeholder="Recherchez une ville ou pays" value={ville} onChangeText={text => setVille(text)}/>
      <Pressable onPress={navigueVille} style={styles.btnvalidate}>
        <Text style={styles.textbtn}>Météo de la ville recherchée</Text>
      </Pressable>
      <Pressable onPress={navigueGPS} style={styles.btncoords}>
        <Text style={styles.textbtn}>Météo de votre position actuelle</Text>
      </Pressable>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
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
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  btnvalidate : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
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
    borderRadius: 5,
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
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});