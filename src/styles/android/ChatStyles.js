import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  chatContain: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  chatInput: {
    borderColor: 'black',
    color:'black',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 12,
  },
  searchActionContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    margin: 8,
    height:36,
    justifyContent:'center'
    
  },
  searchActionButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    flex: 1,
    fontSize: 16,
    width:190,
    padding: 8,
  },
  searchLeftActionButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 0,
  },
  searchRightActionButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 0,
  },
  searchActionButtonActive: {
    backgroundColor: '#73000a',
  },
  searchActionLabel: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  searchActionLabelActive: {
    color: 'white',
  },
  chatList: {
    flex: 1,
  },
  chatListItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  chatListItemImage: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  chatListItemLabel: {
    fontSize: 24,
    marginLeft:'10%',
    color: 'black',
  },
  groupContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
  },
  groupInput: {
    borderColor: 'black',
    color:'black',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 12,
  },
  textGroupStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 32,
    padding: 30,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 30,
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
  createGroup: {
    backgroundColor: '#73000a',
    borderRadius: 8,
    fontSize: 32,
    marginHorizontal: 32,
    marginVertical: 32,
    padding: 16,
  },
  createGroupLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 0,
    marginLeft: '5%',
    height: 50,
    width: 50,
  },

  backButtonImage: {
    resizeMode: 'stretch',
    width: 50,
    height: 40,
  },
  placeholderText: 
    {fontSize:30, alignSelf:'center',color:'black',marginBottom:250},
  placeholderView:{justifyContent:'center'},

  leftSwipeableButton: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 20,
  },
  rightSwipeableButton: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 20,
  },
  swipeableContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  

});
