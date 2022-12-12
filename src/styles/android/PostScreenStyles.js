import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rippleConfig: {color: '#877d84'},
  postUserImageAndInfoBox: {flexDirection: 'row', flex: 1},
  dateAndReplyBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  replyCountBox: {flexDirection: 'row', flex: 1, justifyContent: 'flex-end'},
  postUserInfo: {flexDirection: 'column', flex: 1},
  postImageView: {flexDirection: 'column', flex: 1},
  anonymousAuthorText: {
    textAlignVertical: 'center',
    fontSize: 24,
    marginLeft: 20,
    color: 'black',
  },
  postImage: {
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    height: 200,
    width: 290,
    overlayColor: '#a8a1a6',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },
  postButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent: 'flex-end',
    color: 'black',
  },
  majorText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'auto',
    marginTop: '4%',
    marginLeft: '5%',
    color: 'black',
  },
  postPfp: {height: 60, width: 60, borderRadius: 40},

  postContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  postView: {
    height: '50%',
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: '50%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  postTextView: {
    flex: 0.82,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: '5%',
    marginHorizontal: '10%',
    backgroundColor: '#f2f2f2',
  },
  postInput: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    color: 'black',
    marginHorizontal: '2%',
    marginVertical: '2%',
    borderRadius: 20,
  },
  postButton: {
    marginLeft: '57%',
    marginBottom: '1%',
  },
  cancelButton: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: '1%',
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
  post: {
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
    fontSize: 10,
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
    fontSize: 23,
    marginLeft: 20,
    color: 'black',
  },
  voteButtons: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: '110%',
    width: '90%',
  },
  checkBoxBox : {
    justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start'
  },
  bottomPostButtonsContainer : {
    flexDirection:'row',
    alignSelf:'center',
    width:'100%'
  },
  postImageAddButtonContainer : {
    alignSelf:'flex-end',
    justifyContent:'center',
    flex:1,
    height:50,
    backgroundColor:'#73000a',
    borderRadius:20,
    marginTop:12,
    marginHorizontal:20

  },
  postImageButton : {
    width:120,
    height:120,
    flex:1,
    backgroundColor:'#73000a',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    alignContent:'center',
    

  }
});