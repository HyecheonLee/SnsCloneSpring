import { apiV1 } from '../utils/apiUtils'
import { ApiResponseType } from '../types/api'
import { notifyActions } from '../store/notify'
import { NotifyType } from '../types/event'


export const updateNotifyCount = (dispatch: any) => {
  apiV1.get<ApiResponseType<number>>(`/notify/count`).then(value => value.data)
    .then(value => value?.data)
    .then(value => {
      if (typeof value === "number") {
        dispatch(notifyActions.updateCount(value))
      }
    })
}

export const checkNotify = (id: number) => {
  return apiV1.put<ApiResponseType<boolean>>(`/notify/${id}`)
    .then(value => value.data)
    .then(value => value?.data || false)
}

export const fetchNotify = (lastId: number = Number.MAX_SAFE_INTEGER) => {
  return apiV1.get<ApiResponseType<NotifyType[]>>(`/notify?lastId=${lastId}`).then(value => value.data)
    .then(value => value?.data)
    .then(value => {
      return value || []
    })
}
