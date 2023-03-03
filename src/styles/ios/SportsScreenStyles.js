import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#73000a',
      },
      loadingContainer: {
        flex: 1,
        backgroundColor: '#73000a',
        alignItems:'center',
        justifyContent:'center',
        marginTop: -50,
      },
      loadingSymbol: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        color: 'white',
        top: 0
      },
      loadingText: {
        flex: 1,
        alignSelf: 'center',

      },
      flexboxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //alignItems: 'center',
        marginVertical: 5,
        borderRadius: 8,
        marginHorizontal: 16,
        height: 175,
        backgroundColor: '#a8a1a6',
        elevation: 30,
        shadowColor: '#171717',
      },
      gcSide: {
        flex: 1,
        flexDirection: 'column',
      },
      gcLogo: { // Gamecock Logo
        flex: 2,
        marginHorizontal: 'auto',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 25,
        width: 60,
        height: 60,
      },
      sportText: { // Sport Text
        flex: 2,
        marginTop: 10,
        marginHorizontal: 'auto',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        flexWrap: 'wrap',
      },
      innerStack: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        marginTop: 35,
      },
      dateText: { // Date Text
        textAlign: 'center',
        color: 'black',
        fontWeight: "bold",
        fontSize: 20,
      },
      timeText: { // Time Text
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
      },
      locationText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
      },
      homeStatusText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
        textTransform: 'capitalize',
      },
      opponentSide: {
        flex: 1,
        flexDirection: 'column',
      },
      opponentLogo: { // Opponent Logo
        flex: 2,
        marginHorizontal: 'auto',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 25,
        width: 60,
        height: 60,
      },
      opponentText: { // Opponent Text
        flex: 2,
        marginTop: 5,
        paddingBottom: 5,
        marginHorizontal: 'auto',
        textAlign: 'center', 
        fontSize: 20,
        color: 'black',
        flexWrap: 'wrap',
        flexShrink: 1,
      },
});