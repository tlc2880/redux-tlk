import reactionsType from './reactions.Type'

export default interface postType {
    id: string,
    title: string,
    content: string,
    userId: string,
    date: string,
    body: string,
    reactions: reactionsType
  }