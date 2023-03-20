import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  
  eventContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#73000a',
  },
  modal: {
    flex: 1,
    backgroundColor: '#73000a',
  },
  event: {
    height: 150,
    backgroundColor: '#a8a1a6',
    shadowColor: 'black',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginRight: '3%',
    alignSelf: 'flex-end',
    flex: 1,
  },
  body: {
    fontSize: 18,
    color: 'black',
    marginTop: '5%',
    justifyContent: 'center',
  },
  date: {
    fontSize: 13,
    marginTop: 20,
    color: 'black',
    fontStyle: 'italic',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius:10,
  },
});