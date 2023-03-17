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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
    margin: 0,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
  },
  date: {
    fontSize: 13,
    marginTop: 20,
    color: 'black',
    fontStyle: 'italic',
  },
  replies: {
    fontSize: 10,
    marginTop: 20,
    color: 'black',
    fontStyle: 'italic',
  },
  name: {
    justifyContent: 'center',
    fontSize: 24,
    marginLeft: 20,
    color: 'black',
  },
  voteButtons: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: '110%',
    width: '90%',
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
