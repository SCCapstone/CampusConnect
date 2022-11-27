import React, {useReducer} from 'react';

const initialState = {
  user: {},
  isLoggedIn: false,
  error: null,
};

const CometChatAuthContext = React.createContext();

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'COMETCHAT_LOGIN':
      return {
        ...prevState,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        loading: false,
      };

    case 'COMETCHAT_REGISTER':
      return {
        ...prevState,
        user: action.user,
        loading: false,
      };

    case 'COMETCHAT_LOGOUT':
      return {
        ...prevState,
        user: {},
        isLoggedIn: false,
        error: null,
        loading: false,
      };

    case 'COMETCHAT_RETRIEVE_USER':
      return {
        ...prevState,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        error: null,
        loading: false,
      };

    case 'COMETCHAT_AUTH_FAILED':
      return {
        ...prevState,
        error: action.error,
        isLoggedIn: action.isLoggedIn,
        loading: false,
      };
  }
};

export const CometChatAuthContextProvider = ({children}) => {
  const [cometAuth, dispatchCometAction] = useReducer(reducer, initialState);

  return (
    <CometChatAuthContext.Provider value={{cometAuth, dispatchCometAction}}>
      {children}
    </CometChatAuthContext.Provider>
  );
};