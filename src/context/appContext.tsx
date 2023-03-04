import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { AppAction, appReducer } from "./appReducer";

export interface AppState {
  blurredBg: boolean;
}

interface AppContextType extends AppState {
  setBlurred: (value: boolean) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState: AppState = {
  blurredBg: false,
};

const AppContext = createContext<AppContextType>({
  ...initialState,
  setBlurred: () => {},
});

const appActions = (dispatch: React.Dispatch<AppAction>) => {
  return {
    setBlurred: (value: boolean) =>
      dispatch({ type: "SET_BLURRED", payload: value }),
  };
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const actions = appActions(dispatch);
  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useAppContext };
