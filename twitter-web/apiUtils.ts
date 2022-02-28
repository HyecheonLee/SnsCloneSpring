import { create } from "apisauce";

const headers = {
  Accept: 'application/json'
}
export const apiV1 = create({
  baseURL: 'http://localhost:8080/api/v1',
  headers,
  withCredentials: true
});
export const apiV1User = create({
  baseURL: 'http://localhost:8080/api/v1/users',
  headers,
  withCredentials: true
});
export const apiV1Post = create({
  baseURL: 'http://localhost:8080/api/v1/posts',
  headers,
  withCredentials: true
});
