import { AppState } from "./appContext";

export interface AppAction {
    type: string;
    payload: any;
}

export const appReducer = (state:AppState, action:AppAction) => {
    switch (action.type) {
        case "SET_BLURRED":
            typeof window !== "undefined"
                ? localStorage.setItem("IS_BLURRED", action.payload)
                : null;
            return { ...state, blurredBg: action.payload };

        default:
            return state;
    }
};
