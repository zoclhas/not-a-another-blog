import {
    MY_BLOGS_REQUEST,
    MY_BLOGS_SUCCESS,
    MY_BLOGS_FAIL,
    //
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
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

export const blogDetailsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case BLOG_DETAIL_REQUEST:
            return {
                loading: true,
            };

        case BLOG_DETAIL_SUCCESS:
            return {
                loading: false,
                id: action.payload.id,
                images: action.payload.images,
                view_count: action.payload.view_count,
                username: action.payload.username,
                title: action.payload.title,
                draft: action.payload.draft,
                published: action.payload.published,
                cover_image: action.payload.cover_image,
                content: action.payload.content,
            };

        case BLOG_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
