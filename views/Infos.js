import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Infos({route, navigation}) {
  const [data, setData] = useState(null);
  var coords = "";
  
  if (! route.params.isVille){
    coords = route.params.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      var api ='https://api.open-meteo.com/v1/forecast?latitude=' + coords.split(',')[0] + '&longitude='
      + coords.split(',')[1] + '&hourly=temperature_2m';
      const response = await fetch(api);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <Text style={styles.title}>Chargement...</Text>;
  }

  const getTemp = (data) => {
    var date = new Date().toISOString().substring(0, 14) + "00";
    for (var i = 0; i < data["hourly"]["time"].length; i++){
      if (date == data["hourly"]["time"][i]){
        return data["hourly"]["temperature_2m"][i] + "°C";
      }
    }
    return "Donnée indisponible";
  }

  const Item = () => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Icon style={styles.Icon} name="thermometer"/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Temperature : {getTemp(data)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo de {route.params.data}</Text>
      <View style={styles.listContainer}>
      <FlatList
        data={Object.values(data.hourly)}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <Pressable onPress={navigation.goBack} style={styles.btnback}>
        <Text style={styles.textbtn}>Retour à la recherche</Text>
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
    marginVertical: 20,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'snow',
    borderRadius: 10,
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
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
    fontWeight: 'bold',
    color: 'white',
  },
});