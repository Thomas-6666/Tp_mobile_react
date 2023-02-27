import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Application\nmétéo GPS"}</Text>
      <View style={styles.coords}>
          <TextInput style={styles.inputs} placeholder="Longitude" keyboardType="numeric"/>
          <TextInput style={styles.inputs} placeholder="Lattitude" keyboardType="numeric"/>
      </View>
      <Button title="Go !"/>
      <Button title="Coordoonés GPS"/>
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
  inputs: {
    borderColor: "grey",
    borderBottomWidth: 1,
    fontSize: 32,
    margin: '5%',
  },
  inputsedit: {

  },
  btn: {
    margin: "2%",
  }
});
