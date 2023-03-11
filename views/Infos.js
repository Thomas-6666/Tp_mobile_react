import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Infos({route, navigation}) {
  const [data, setData] = useState(null);
  var coords = "";
  var meteoDe = "";

  coords = route.params.data;

  if (route.params.isVille == true) {
    meteoDe = route.params.ville;
  } else {
    meteoDe = coords;
  }

  useEffect(() => {
    const fetchData = async () => {
      var api ='https://api.open-meteo.com/v1/forecast?latitude=' + coords.split(',')[0] + '&longitude=' + coords.split(',')[1]
      + '&hourly=precipitation_probability&hourly=visibility&current_weather=true';
      const response = await fetch(api);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [coords]);

  if (!data) {
    return <Text style={styles.title}>Chargement...</Text>;
  }

  const goBackAndResetData = () => {
    navigation.goBack();
  }

  const searchImage = (data) => {
    var code = data["current_weather"]["weathercode"];
    if (code >= 95 ) {
      return 'orage.png'
    } else if (code >= 81 && code <= 86) {
      return 'averse.png'
    } else if (code >= 71 && code <= 77) {
      return 'neige.png'
    } else if (code >= 61 && code <= 67) {
      return 'pluie.png'
    } else if (code >= 51 && code <= 57) {
      return 'bruine.png'
    } else if (code >= 45 && code <= 48) {
      return 'brouillard.png'
    } else if (code >= 1 && code <= 3) {
      return 'nuage.png'
    } else if (code == 0) {
      if (new Date().getHours() >= 7 || new Date().getHours() <= 19) {
        return 'soleil.png';
      } else {
        return 'lune.png'
      }
    } else {
      return 'noimage.png'
    }
  }
  
  const getInfoHourly = (data, type) => {
    var date = data["current_weather"]["time"];
    for (var i = 0; i < data["hourly"]["time"].length; i++){
      if (date == data["hourly"]["time"][i]){
        return data["hourly"][type][i] + " " + data["hourly_units"][type];
      }
    }
    return "Donnée indisponible";
  }

  const ItemTemp = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="thermometer"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Temperature : {data["current_weather"]["temperature"]} °C</Text>
        </View>
      </View>
    );
  };

  const ItemVent = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="wind"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Vitesse du vent : {data["current_weather"]["windspeed"]} km/h</Text>
        </View>
      </View>
    );
  };

  const ItemDir = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="flag"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Direction du vent : {data["current_weather"]["winddirection"]} °</Text>
        </View>
      </View>
    );
  };

  const ItemPrec = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="cloud"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Précipitations : {getInfoHourly(data, "precipitation_probability")}</Text>
        </View>
      </View>
    );
  };

  const ItemVisi = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="eye"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Visibilité : {getInfoHourly(data, "visibility")}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo de {meteoDe}</Text>
      <View style={styles.listContainer}>
      <Image resizeMode='cover' source={require('../assets/images/' + searchImage(data))} style={styles.image}/>
      <FlatList
        data={[{type: 'temp'}, {type: 'vent'}, {type: 'dir'}, {type: 'prec'}, {type: 'visi'}]}
        renderItem={({ item }) =>
          item.type === 'temp' ? <ItemTemp data={data} />
          : item.type === 'vent' ? <ItemVent data={data} />
          : item.type === 'dir' ? <ItemDir data={data} />
          : item.type === 'prec' ? <ItemPrec data={data} />
          : <ItemVisi data={data} />
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <Pressable onPress={goBackAndResetData} style={styles.btnback}>
        <Text style={styles.textbtn}>Retour</Text>
      </Pressable>
        <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    margin: 'auto',
    marginBottom: 10,
    width: 100,
    height: 100,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'azure',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    color: 'black',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  btnback: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'chocolate',
    shadowColor: 'black',
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