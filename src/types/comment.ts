export interface SanityComment {
  _id: string
  _type: 'comment'
  name: string
  email: string
  content: string
  approved: boolean
  post: {
    _type: 'reference'
    _ref: string
  }
  createdAt: string
}