import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rippleConfig: {color: '#877d84'},
  postUserImageAndInfoBox: {flexDirection: 'row', flex: .4},
  dateAndReplyBox: {
    flexDirection: 'row',
    flex:.5,
    alignSelf:'flex-end',
    alignItems:'flex-end'

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
  postReplyImage: {
    marginTop: 20,
    alignSelf: 'center',
    resizeMode:'contain',
    borderRadius: 10,
    height: '100%',
    width: '100%',
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

  postReplyContainer: {
    flex: 1,
    borderRadius:20,
    flexDirection:'row',
    marginHorizontal:'5%',
    backgroundColor:'#a8a1a6'

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
    position:'absolute',
    right:20,
    top:-15,
  },
  cancelButton: {
    position:'absolute',
    left:20,
    top:-15,
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
    flexGrow:1
  },
  postReply: {
    backgroundColor: '#a8a1a6',
    shadowColor: 'black',
    marginRight:'4.5%',
    borderRadius: 10,
    padding: 0,
    marginVertical: 8,

  },
  body: {
    fontSize: 18,
    color: 'black',
    marginTop: '5%',
    justifyContent: 'center',
    
  },
  replyBody: {
    fontSize: 18,
    color: 'black',

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
  replyUpvoteBox: {
  height: 50,
  width: 40,
  marginRight: '0%',
  flexDirection: 'column',
  backgroundColor: '#a8a1a6',
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
  replyUpvote: {
    fontSize: 15,
    margin: 0,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
  },
  date: {
    fontSize: 12,
    marginTop: 20,
    color: 'black',
    fontWeight:'bold',
    fontStyle: 'italic',
  },
  replies: {
    fontSize: 15,
    marginTop: 20,
    color: 'black',
    fontWeight:'bold',
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
    height:40,
    backgroundColor:'#73000a',
    borderRadius:20,
    marginTop:12,
    marginHorizontal:20

  },
  postImageButton : {
    width:120,
    height:120,
    backgroundColor:'#73000a',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    alignContent:'center',

  },
  postDropdownButton: {
    width:69,height:18,backgroundColor:'transparent',alignSelf:'flex-start',position:'absolute',right:-10,top:-7
  },
  editedAndOptionsBox: 
    {flexDirection:'row',flexGrow:1,height:25,backgroundColor:'transparent'},
  
});