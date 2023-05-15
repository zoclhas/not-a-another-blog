import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    //
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
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
                payload:
                    error.response.data.detail ||
                    error.response.data.non_field_errors[0] ||
                    error,
            });
        }
    };

export const logout = () => (dispatch: any) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const register =
    (name: string, email: string, password: string) =>
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
                { name: name, email: email, password: password },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                paylod: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: any) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response.data && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
