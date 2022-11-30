import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    pfpStyle: {height: 80, width: 80, borderRadius:40},
    imageBackgroundView: {padding: 30},
    pressableImageView: {height:80,width:80,borderRadius:40,overflow: 'hidden'},
    drawerScrollView: {backgroundColor: '#73000a'},
    userNameText: {fontSize: 20, color: 'black',fontWeight:'bold', textAlign: 'center'},
    welcomeText: {fontSize: 20, fontWeight: 'bold', color: 'black',textAlign:'center'},
    userWelcomeBox: {marginHorizontal:20,justifyContent:'center',alignContent:'center',alignSelf:'center',backgroundColor:'#ebebeb',borderRadius:10},
    userClassText:{fontSize: 15, fontWeight:'bold',color: 'black', textAlign: 'center'},
    classText:{fontSize: 15,fontWeight:'bold', color: 'black'},
    userMajorText:{fontSize: 13, color: 'black', fontWeight:'bold',textAlign:'center'},
    majorText: {fontSize: 15,fontWeight:'bold',color: 'black',textAlign:'center', marginVertical:1},
    classBox:{flexDirection: 'row', marginTop:1,alignSelf:'center'},
    majorTextBox:{flexDirection: 'column',alignSelf:'center'},
    userInfoBox: {marginTop:15,alignSelf:'center',backgroundColor:'#e2e2e2',borderRadius:10},
    drawerItemsList: {flex: 1, backgroundColor: '#73000a', paddingTop: 10,color:'white'},
    touchableSignout:{paddingVertical: 15},
    signOutText: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight:'bold',
        color: 'white'
    },
    backButtonContainer: {
      backgroundColor: "white",
      marginLeft: 50,
      marginTop: 70,
      height: 50,
      width: 175,
    },
    drawerUserView:
        {flexDirection: 'row',alignSelf:'center'},
});