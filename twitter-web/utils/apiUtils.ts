import { create } from "apisauce";

export const domain = 'http://localhost:8080'

const headers = {
  Accept: 'application/json'
}

export const apiV1 = create({
  baseURL: domain + '/api/v1',
  headers,
  withCredentials: true
});

export const apiV1User = create({
  baseURL: domain + '/api/v1/users',
  headers,
  withCredentials: true
});
export const apiV1PostUrl = '/api/v1/posts'

export const apiV1Post = create({
  baseURL: domain + apiV1PostUrl,
  headers,
  withCredentials: true
});

export const apiV1ReplyUrl = '/api/v1/reply'

export const apiV1Reply = create({
  baseURL: domain + apiV1ReplyUrl,
  headers,
  withCredentials: true
})

export const apiV1File = create({
  baseURL: domain + '/api/v1/file',
  headers,
  withCredentials: true
})

export const apiV1Chat = create({
  baseURL: domain + '/api/v1/chat',
  headers,
  withCredentials: true
})
