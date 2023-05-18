// store.ts

import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { myBlogsReducer, blogDetailsReducer } from "./reducers/blogReducers";

// create your reducer
const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    myBlogs: myBlogsReducer,
    blogDetails: blogDetailsReducer,
});

// create a makeStore function
const makeStore = (context: Context) =>
    createStore(
        reducers,
        initState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );

const userInfoFromStorage = () => {
    if (typeof localStorage !== "undefined") {
        return JSON.parse(localStorage.getItem("userInfo")!);
    }
    return null;
};
const userInfo = userInfoFromStorage();

const initState = {
    userLogin: { userInfo: userInfo },
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: true });
