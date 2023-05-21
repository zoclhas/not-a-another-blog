// store.ts

import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
} from "./reducers/userReducers";
import {
    myBlogsReducer,
    blogDetailsReducer,
    blogRandomReducer,
    blogsReducer,
    exploreBlogsReducer,
} from "./reducers/blogReducers";
import { useMemo } from "react";

// create your reducer
const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    //
    myBlogs: myBlogsReducer,
    blogDetails: blogDetailsReducer,
    blogRandom: blogRandomReducer,
    blogs: blogsReducer,
    exploreBlogs: exploreBlogsReducer,
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

// Not using next-redux-wrapper
// let store;

// function initStore(initialState) {
//     return createStore(
//         reducers,
//         initState as any,
//         composeWithDevTools(applyMiddleware(thunkMiddleware))
//     );
// }

// export const initializeStore = (preloadedState: any) => {
//     let _store = store ?? initStore(preloadedState);

//     // After navigating to a page with an initial Redux state, merge that state
//     // with the current state in the store, and create a new store
//     if (preloadedState && store) {
//         _store = initStore({
//             ...store.getState(),
//             ...preloadedState,
//         });
//         // Reset the current store
//         store = undefined;
//     }

//     // For SSG and SSR always create a new store
//     if (typeof window === "undefined") return _store;
//     // Create the store once in the client
//     if (!store) store = _store;

//     return _store;
// };

// export function useStore(initialState: any) {
//     const store = useMemo(() => initializeStore(initialState), [initialState]);
//     return store;
// }
