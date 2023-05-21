import {
    MY_BLOGS_REQUEST,
    MY_BLOGS_SUCCESS,
    MY_BLOGS_FAIL,
    //
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
    //
    ADD_BLOG_VIEWS_REQUEST,
    ADD_BLOG_VIEWS_SUCCESS,
    ADD_BLOG_VIEWS_FAIL,
    //
    BLOG_RANDOM_REQUEST,
    BLOG_RANDOM_SUCCESS,
    BLOG_RANDOM_FAIL,
    //
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAIL,
} from "@/redux/types/blogTypes";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getMyBlogs = (page) => async (dispatch: any, getState: any) => {
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

export const getBlogDetails =
    (blogId: number) => async (dispatch: any, getState: any) => {
        try {
            dispatch({ type: BLOG_DETAIL_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: userInfo ? `Bearer ${userInfo.access}` : "",
                },
            };

            const { data } = await axios.get(
                `${url}/api/blog/${blogId}/`,
                config
            );
            dispatch({
                type: BLOG_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: BLOG_DETAIL_FAIL,
                payload: error.response.data.detail
                    ? error.response.data.detail
                    : error,
            });
        }
    };

export const addBlogViews =
    (blogId: number) => async (dispatch: any, getState: any) => {
        try {
            dispatch({ type: ADD_BLOG_VIEWS_REQUEST });

            await axios.post(`${url}/api/update-blog-views/${blogId}/`);
            dispatch({
                type: ADD_BLOG_VIEWS_SUCCESS,
            });
        } catch (error: any) {
            dispatch({
                type: ADD_BLOG_VIEWS_FAIL,
                payload: error.response.data.detail
                    ? error.response.data.detail
                    : error,
            });
        }
    };

export const getRandomBlog = () => async (dispatch: any) => {
    try {
        dispatch({ type: BLOG_RANDOM_REQUEST });

        const { data } = await axios.get(`${url}/api/blog/random/`);
        dispatch({
            type: BLOG_RANDOM_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: BLOG_RANDOM_FAIL,
            payload: error.response.data.detail
                ? error.response.data.detail
                : error,
        });
    }
};

export const getBlogs = () => async (dispatch: any) => {
    try {
        dispatch({ type: BLOGS_REQUEST });

        const { data } = await axios.get(`${url}/api/blogs/`);
        dispatch({
            type: BLOGS_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: BLOGS_FAIL,
            payload: error.response.data.detail
                ? error.response.data.detail
                : error,
        });
    }
};
