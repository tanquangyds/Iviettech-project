/* eslint-disable import/order */
/* eslint-disable object-shorthand */
import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import axios from "axios";

const initialAuthState = {
  isAuthenticated: false,
  isInitialize: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialize: true,
        user,
      };
    }
    case "LOGIN": {
      const { user, isAuthenticated } = action.payload;

      return {
        ...state,
        isAuthenticated,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {},
  changePassword: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const history = useHistory();

  const login = async (username, password) => {
    try {
      // To do something.
      dispatch({
        type: "LOGIN",
        payload: {
          user: {}, // TODO: pass user data from login function above
          isAuthenticated: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      //
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      //  TODO: change password
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const User = await localStorage.getItem("UserInfo");
        console.log(User);
        if (User) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              user: {},
              isAuthenticated: true,
            },
          })
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              user: null,
              isAuthenticated: false,
            },
          })
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user: null,
            isAuthenticated: false,
          },
        });
      }
    };

    initialize();
  }, []);

  if (!state.isInitialize) {
    // TODO: return Splash screen here
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        changePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
