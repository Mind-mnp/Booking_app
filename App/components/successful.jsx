// import styled from '@emotion/styled';
// import React, { useState, useRef } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   TouchableWithoutFeedback,
//   Text,
//   Dimensions,
//   Image,
// } from 'react-native';

// export default function Booking() {
//     return(
//         <TouchableWithoutFeedback
//             disabled={true}
//             style={styles.contain}>
//                 <View style={styles.modal}>Successful Booking</View>
            
//         </TouchableWithoutFeedback>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems:'center',
//       justifyContent:'center',
//     },
//     modal:{
//         fontSize:20,
//     },
// })
import { 
        Modal, TouchableOpacity, Text, View, StyleSheet, Image  } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const MyButton = ({ onPress, title }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.text}>Press bottom{title}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
            
          <View style={styles.modalView}>
            {/* Colse */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {/* <Text style={styles.textStyle}>Close Modal</Text> */}
              <AntDesign name="closecircleo" size={30} color="black" />
            </TouchableOpacity>

            <Image source={require("../../assets/checkmark.png")} 
            style={{ width: 70, height: 70 }}/>
            
            <Text style={styles.modalText}>Successful Booking</Text>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems:'end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyButton;
