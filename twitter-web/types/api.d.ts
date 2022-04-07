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
  type: string,
  data: T
}
