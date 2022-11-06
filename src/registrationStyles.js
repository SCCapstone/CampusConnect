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
        height: 40,
        marginTop: 20,
        margin: 0,
    },

    buttonStyle: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        borderColor: 'black',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 70,
    },

    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },

    inputStyle: {
        backgroundColor: 'white',
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
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
        padding: 10,
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
    }
    

});