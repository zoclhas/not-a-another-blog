import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    //
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    //
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
} from "@/redux/types/userTypes";

export const userLoginReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                success: true,
            };

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            };

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };

        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const userDetailReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                loading: true,
            };

        case USER_DETAIL_SUCCESS:
            return {
                loading: false,
                username: action.payload.username,
                created_at: action.payload.created_at,
                blog_count: action.payload.blog_count,
                blogs: action.payload.blogs,
                page: action.payload.page,
                pages: action.payload.pages,
            };

        case USER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
