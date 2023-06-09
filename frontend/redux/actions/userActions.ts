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
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export const login =
    (username: string, password: string) => async (dispatch: any) => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST });

            const loginData = { username: username, password: password };

            const { data } = await axios.post(
                `${url}/dj-rest-auth/login/`,
                loginData
            );

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: any) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response.data.non_field_errors[0]
                    ? error.response.data.non_field_errors[0]
                    : error.response.data.detail
                    ? error.response.data.detail
                    : error,
            });
        }
    };

export const logout = () => (dispatch: any) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register =
    (username: string, email: string, password: string, password2: string) =>
    async (dispatch: any) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${url}/dj-rest-auth/register/`,
                {
                    username: username,
                    email: email,
                    password1: password,
                    password2: password2,
                },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: any) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response.data.detail
                    ? error.response.data.detail
                    : error.response.data.username
                    ? error.response.data.username
                    : error.response.data.email
                    ? error.response.data.email
                    : error.response.data.password1
                    ? error.response.data.password1
                    : error.response.data.password1
                    ? error.response.data.password2
                    : error.response.data.non_field_errors[0]
                    ? error.response.data.non_field_errors[0]
                    : error,
            });
        }
    };

export const getUserDetail =
    (username: string, page: string | number, sort: string, query: string) =>
    async (dispatch: any) => {
        try {
            dispatch({ type: USER_DETAIL_REQUEST });

            const { data } = await axios.get(
                `${url}/api/u/${username}/?page=${page}&sort=${sort}&q=${query}`
            );

            dispatch({
                type: USER_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_DETAIL_FAIL,
                payload: error.response.data.detail || error,
            });
        }
    };
