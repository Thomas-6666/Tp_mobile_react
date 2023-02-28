import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function Index({navigation}) {
    navigueVille = () => {
        console.log("test ville");
        navigation.navigate("Infos");
    }
    navigueGPS = () => {
        console.log("test gps");
        navigation.navigate("Infos");
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <TextInput multiline style={styles.input} placeholder="Ville"/>
      <Pressable onPress={this.navigueVille} style={styles.btnvalidate}>
        <Text style={styles.textbtn}>Voir météo</Text>
      </Pressable>
      <Pressable onPress={this.navigueGPS} style={styles.btncoords}>
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