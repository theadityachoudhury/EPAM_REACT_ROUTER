import { mockedAuthorsList } from "../constants"

export const getAuthorsname = (authors: string[]) => {
    //return a comma separated string of authors names
    return authors.map(authorId => mockedAuthorsList.find(author => author.id === authorId)?.name).join(', ')
}