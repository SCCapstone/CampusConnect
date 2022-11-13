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
        margin: 15,
    },

    buttonStyle: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        borderColor: 'black',
        height: 50,
        alignItems: 'center',
        borderRadius: 0,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 40,
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
        fontFamily: "notoserif",
        fontWeight: 'bold',
        fontSize: 12
    },
    bioStyle: {
        backgroundColor: 'white',
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: '#a9a9a9',
    },
    bioSectionStyle: {
        flexDirection: 'row',
        height: 85,
        marginTop: 15,
        margin: 0,
        marginLeft:14,
        marginRight:14
    }
    

});