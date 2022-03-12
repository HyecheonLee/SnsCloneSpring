export type ApiResponseType<T> = {
  code: number
  data: T,
  message: string
}

export type ErrorType = {
  error: string,
  message: string,
  path: string,
  status: number
  timestamp: string
}

export type EventType<T> = {
  type: string,
  data: T
}
