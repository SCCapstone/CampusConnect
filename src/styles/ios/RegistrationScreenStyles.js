import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73000a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContainer: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 46,
    margin: 10,
  },
  groupContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  groupInput: {
    borderColor: '#00000',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 12,
  },
  createGroup: {
    backgroundColor: '#73000a',
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  createGroupLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonStyle: {
    backgroundColor: 'black',
    color: '#FFFFFF',
    borderColor: 'black',
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
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
    borderRadius: 5,
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
  textGroupStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    padding: 30,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    alignItems:'flex-end'
  },

  copyWrightText: {
    marginTop:20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bioStyle: {
    backgroundColor: 'white',
    flex: 1,
    color: 'black',
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#a9a9a9',
    marginBottom: 10,
  },
  bioSectionStyle: {
    height: 85,
    marginTop: 15,
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
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
    justifyContent: 'center',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginLeft: '4%',
    marginTop: '8%',
    height: '6%',
    width: '10%',
  },
  backButtonImage: {
    resizeMode: 'stretch',
    marginTop: '15%',
    width: '100%',
    height: '80%',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emailText: {
    marginTop:15,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '',
  },
  linkText: {
    marginTop:30,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpBtn: {
    width: '40%',
    borderRadius: 4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#73000a',
  },
  loginText: {
    placeholderTextColor: '000000',
    color: 'white',
    fontWeight:'bold'
  },
  imageBackgroungView: {
    alignItems:'center',
    justifyContent:'center'

  },
  blankImageBackgroundStyle: {
    height: 100,
    width: 100,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  },
  blankImageStyle: {
    borderRadius:50,
    marginTop:0,
    height: 100,
    width: 100,
  },
  imageTextStyle: {
    textAlign:'center',
    color:'black',
    fontWeight:'bold',
    fontSize:12
  }
});