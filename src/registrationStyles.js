import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#73000a",
        alignItems: "center",
        justifyContent: "center",
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 46,
        margin: 10,
    },

    buttonStyle: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        borderColor: 'black',
        height: 50,
        alignItems: 'center',
        borderRadius: 0,
        marginLeft: 55,
        marginRight: 55,
        marginTop: 30,
    },

    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,

    },

    inputStyle: {
        backgroundColor: 'white',
        flex: 1,
        color: 'black',
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: '#a9a9a9',
    },
    
    errorStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        padding: 5,
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    copyWrightText: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 12
    },
    bioStyle: {
        backgroundColor: 'white',
        flex: 1,
        color: 'black',
        paddingLeft: 12,
        paddingRight: 12,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: '#a9a9a9',
        marginBottom: 10
    },
    bioSectionStyle: {
        height: 85,
        marginTop: 15,
        margin: 0,
        marginLeft:10,
        marginRight:10,
    },
    scrollView: {
        backgroundColor: 'red',
      },
    
      body: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
      },
      ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
      },
      images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
      },
      btnParentSection: {
        alignItems: 'center',
        marginTop:10
      },
      btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom:10
      },
      btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
      }
});