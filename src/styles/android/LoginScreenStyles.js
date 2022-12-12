import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73000a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
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
  },

  forgot_button: {
    height: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 48,
    paddingBottom: 25,
    fontWeight: 'bold',
    color: 'black',
  },

  button: {
    backgroundColor: 'white',
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
    backgroundColor: 'black',
  },
  loginText: {
    placeholderTextColor: '000000',
    color: 'white',
  },
  helpBtn: {
    width: '40%',
    borderRadius: 4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    backgroundColor: '#73000a',
  },
  loginText: {
    placeholderTextColor: '000000',
    color: 'white',
  },

  loginSuccess: {
    margin: 0,
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
