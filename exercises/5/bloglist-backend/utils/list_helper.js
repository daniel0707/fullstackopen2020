const _ = require('lodash');

const dummy = (blogs) => {
  if (blogs != null) return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    if (item.likes > max.likes) {
      max = item;
    }
    return max;
  };
  let fav = {};
  if (blogs.length > 0) {
    fav = blogs.reduce(reducer, { likes: -1 });
    delete fav.__v;
    delete fav._id;
    delete fav.url;
  }
  return fav;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  return _.chain(blogs)
    .groupBy((b) => b.author)
    .map((group, author) => ({ author, blogs: group.length }))
    .sortBy('blogs')
    .last()
    .value();
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  return _.chain(blogs)
    .groupBy((b) => b.author)
    .map((group, author) => ({
      author,
      likes: group.reduce((sumLikes, blog) => sumLikes + blog.likes, 0),
    }))
    .sortBy('likes')
    .last()
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
