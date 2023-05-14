// store.ts

import { createStore, AnyAction, Store, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

export interface State {
    tick: string;
}

// create your reducer
const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload };
        case "TICK":
            return { ...state, tick: action.payload };
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = (context: Context) =>
    createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
