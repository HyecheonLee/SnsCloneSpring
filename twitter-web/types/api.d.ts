export type ApiResponseType<T> = {
  code: number
  data: T,
  message: string
}

export type ErrorType<T> = {
  error: string,
  message: string,
  path: string,
  status: number
  timestamp: string,
  data: T
}

export type EventType<T> = {
  kind: EventKindType,
  data: T,
  key: string,
  id: String,
  lastEventId: number
}

export type EventKindType =
  | "updatedPost"
  | "followStatus"
  | "user"
  | "newPost"
  | "deletePost"
  | "updatedPostStatus"
  | "chatMessage"
  | "chatStatus"
