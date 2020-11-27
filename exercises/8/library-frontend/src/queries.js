import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    books
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    id
    title
    author{
      name
      }
    published
    genres
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
  addBook(title: $title, published: $published, author: $author, genres: $genres){
    title
    author{
      name
      }
    published
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo){
    id
    name
    born
    books
  }
}
`