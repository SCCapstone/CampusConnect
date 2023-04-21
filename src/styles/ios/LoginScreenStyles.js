import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: '10%',
    marginLeft: '5%',
    height: '6%',
    width: '10%',
  },
  backButtonImage: {
    resizeMode: 'stretch',
    marginTop: '15%',
    width: '100%',
    height: '86%',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLarge: {
    marginBottom: 0,
    marginTop: 0,
    width: '65%',
    height: '50%',
    resizeMode: 'contain',
  },

  imageSmall: {
    marginBottom: 30,
    marginTop: 0,
    width: '35%',
    height: '25%',
    borderRadius: 0,
    resizeMode: 'contain',
  },

  inputView: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextInput: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
  },

  forgot_button: {
    height: 20,
    marginTop:40,
    color: 'black',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 48,
    paddingBottom: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  button: {
    height: 40,
    width: '80%',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white',
  },
  loginText: {
    color: 'black',
  },

  helpBtn: {
    width: '40%',
    borderRadius: 4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    backgroundColor: 'black',
  },
  altText:{
    color: 'white',
  },
  loginSuccess: {
    margin: 0,
  },
  altBtn: {
    width: '70%',
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'black',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  copyWrightText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  },
});