import Post from "../../../models/Post";
import User from "../../../models/User";

export default {
    Post: {
        author: async (post) => await User.findById(post.author)
    },

    Query: {
        posts: async () => await Post.find(),
        post: async (_, { id }) => await Post.findById(id),
    },

    Mutation: {
        createPost: (_, { data }) => Post.create(data),
        updatePost: async (_, { id, data}) => await Post.findOneAndUpdate(id, data, { new: true }),
        deletePost: async (_, { id }) => !!(await Post.findOneAndDelete(id))
    }
};