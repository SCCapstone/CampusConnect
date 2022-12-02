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
        marginLeft: 35,
        marginVertical: 8,
        marginHorizontal: 20,
        flex: 1,
        borderRadius: 15,
      },
    canvas: {
        position: 'absolute',
        top: -20,
        left: -20,
        bottom: -40,
        right: -20,
        borderRadius: 15,
      },  
    voteButtons: {
        resizeMode:'contain',
        alignSelf:'center',
        height:'100%',
        width:'80%'
      },
      upvoteBox: {
        flexDirection: 'row',
        flex: 1,
        height:25,
        width:32,
        flexDirection:'column',
        backgroundColor: '#73000a',
        justifyContent: 'center',
       // alignItems: 'center',
      },
      upvote: {
        fontSize: 15,
        margin:0,
        alignSelf:'center',
        fontWeight:'bold',
        textAlignVertical:'center',
        textAlign:'center',
        color: 'white',
      },
  });