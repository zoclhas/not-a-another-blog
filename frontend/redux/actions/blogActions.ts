import {
    MY_BLOGS_REQUEST,
    MY_BLOGS_SUCCESS,
    MY_BLOGS_FAIL,
} from "@/redux/types/blogTypes";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getMyBlogs =
    (page: number = 1) =>
    async (dispatch: any, getState: any) => {
        try {
            dispatch({ type: MY_BLOGS_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.access}`,
                },
            };

            const { data } = await axios.get(
                `${url}/api/my-blogs/?page=${page}`,
                config
            );
            dispatch({
                type: MY_BLOGS_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: MY_BLOGS_FAIL,
                payload: error.response.data.detail
                    ? error.response.data.detail
                    : error,
            });
        }
    };
