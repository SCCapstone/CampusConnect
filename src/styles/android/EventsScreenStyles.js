import {StyleSheet} from 'react-native';

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
      textAlign:'center',
    },
    box: {
      marginHorizontal:'1%',
      backgroundColor:'white',
      flex:4,
      borderRadius:10,
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
        height: 50,
        width: 40,
        marginHorizontal: '1.5%',
        flexDirection: 'column',
        backgroundColor: '#73000a',
        justifyContent: 'center',
        alignSelf: 'center',
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
