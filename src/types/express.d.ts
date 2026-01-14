export {}

declare global {
  namespace Express {
    interface User {
      id: number
      email?: string
      // add any other fields you attach to req.user
    }
  }
}