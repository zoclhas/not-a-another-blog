import {
    MY_BLOGS_REQUEST,
    MY_BLOGS_SUCCESS,
    MY_BLOGS_FAIL,
} from "@/redux/types/blogTypes";

export const myBlogsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case MY_BLOGS_REQUEST:
            return {
                loading: true,
            };

        case MY_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload.blogs,
                total_blogs: action.payload.total_blogs,
                drafts: action.payload.drafts,
                total_drafts: action.payload.total_drafts,
                page: action.payload.page,
                pages: action.payload.pages,
            };

        case MY_BLOGS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
