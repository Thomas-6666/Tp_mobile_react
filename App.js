import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <TextInput style={styles.input} placeholder="Ville"/>
      <Pressable style={styles.btnvalidate}>
        <Text style={styles.textbtn}>Voir météo</Text>
      </Pressable>
      <Pressable style={styles.btncoords}>
        <Text style={styles.textbtn}>Détecter coordonnées GPS</Text>
      </Pressable>
      <StatusBar style="auto" />
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
    width: '60%',
    textAlign: 'center',
    fontSize: 32,
    margin: '5%',
  },
  btnvalidate : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lime',
  },
  btncoords: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
  },
  textbtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
