import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/screens/Login'
import SignIn from './App/screens/Sign'
import Booking from './App/screens/Booking'
import Successful from './App/components/successful'

export default function App() {
  return (
    <View style={styles.container}>
      <Successful/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C181C',
    alignItems: 'center',
    justifyContent:'center'


  },
});
