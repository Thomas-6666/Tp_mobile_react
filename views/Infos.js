import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function Infos({route, navigation}) {
  const ville = route.params.ville;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo de {ville}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
  },
  btnback: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
    backgroundColor: 'gold',
    margin: 30,
  },
  textbtn: {
    fontSize: 16,
    color: 'black',
  },
});