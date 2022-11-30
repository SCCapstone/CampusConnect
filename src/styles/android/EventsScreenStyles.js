import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#73000a'
    },
    item: {
      backgroundColor: '#808080',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    date: {
      fontSize: 10,
      marginTop:20,
      color: 'black',
      fontStyle: 'italic'
    },
    event: {
      fontSize: 18,
      color: 'black',
      marginTop: 10,
      justifyContent: 'center'
    },
    box: {
        backgroundColor: '#cecece',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 20,
        flex: 1
      },
    canvas: {
        position: 'absolute',
        top: -20,
        left: -20,
        bottom: -40,
        right: -20,
      },  
  });