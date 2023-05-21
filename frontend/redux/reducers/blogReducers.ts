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
    //
    EXPLORE_BLOGS_REQUEST,
    EXPLORE_BLOGS_SUCCESS,
    EXPLORE_BLOGS_FAIL,
    //
    TAGS_REQUEST,
    TAGS_SUCCESS,
    TAGS_FAIL,
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
                total_views: action.payload.total_views,
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
                tags: action.payload.tags,
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

export const addBlogViewsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ADD_BLOG_VIEWS_REQUEST:
            return {
                loading: true,
            };

        case ADD_BLOG_VIEWS_SUCCESS:
            return {
                loading: false,
                success: true,
            };

        case ADD_BLOG_VIEWS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const blogRandomReducer = (state = {}, action: any) => {
    switch (action.type) {
        case BLOG_RANDOM_REQUEST:
            return {
                loading: true,
            };

        case BLOG_RANDOM_SUCCESS:
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
                tags: action.payload.tags,
            };

        case BLOG_RANDOM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const blogsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case BLOGS_REQUEST:
            return {
                loading: true,
            };

        case BLOGS_SUCCESS:
            return {
                loading: false,
                latest_posts: action.payload.latest_posts,
                trending_posts: action.payload.trending_posts,
            };

        case BLOGS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const exploreBlogsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case EXPLORE_BLOGS_REQUEST:
            return {
                loading: true,
            };

        case EXPLORE_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload.blogs,
                page: action.payload.page,
                pages: action.payload.pages,
            };

        case EXPLORE_BLOGS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const getTagsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case TAGS_REQUEST:
            return {
                loading: true,
            };

        case TAGS_SUCCESS:
            return {
                loading: false,
                tags: action.payload,
            };

        case TAGS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
