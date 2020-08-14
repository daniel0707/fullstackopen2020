const listHelper = require('../utils/list_helper');
const constants = require('./constants');

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(constants.listWithOneBlog);
    expect(result).toBe(12);
  });
  test('when list is empty should equal 0', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(constants.manyBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('should be an empty object when no an empty list was provided', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });
  test('should be the one with most likes, and specific format', () => {
    const result = listHelper.favoriteBlog(constants.manyBlogs);
    expect(result).toEqual(constants.favBlog);
  });
  test('should be the same one if list contains one blog', () => {
    const result = listHelper.favoriteBlog(constants.listWithOneBlog);
    expect(result).toEqual(constants.favBlog);
  });
});

describe('author with most blogs', () => {
  test('should be the author with most blogs', () => {
    const result = listHelper.mostBlogs(constants.manyBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
  test('should be empty object if no blogs provided', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });
  test('should be the one provided if only one provided', () => {
    const result = listHelper.mostBlogs(constants.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
});

describe('author with most likes', () => {
  test('should be the author with most likes', () => {
    const result = listHelper.mostLikes(constants.manyBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
  test('should be the one provided if only one element in list', () => {
    const result = listHelper.mostLikes(constants.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: expect.any(Number),
    });
  });
  test('shoul be empty object if no blogs provided in list', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });
});
