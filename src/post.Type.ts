import reactionsType from './reactions.Type'

export default interface postType {
    id: any,
    title: string,
    content: string,
    userId: string,
    date: string,
    body: string,
    reactions: reactionsType
  }