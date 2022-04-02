import { apiV1User } from '../utils/apiUtils'
import { profileActions } from '../store/profile'
import { UserType } from '../types/user'
import { ApiResponseType } from '../types/api'

export const userFollowing = async (user: UserType, dispatch: (actions: any) => void) => {
  if (user?.followInfo?.isFollowing) {
    await apiV1User.delete(`${user?.id}/unFollowing`)
      .then(value => {
        if (value.ok) {
          dispatch(profileActions.setIsFollow(false))
        }
      });
  } else {
    await apiV1User.post(`${user?.id}/following`)
      .then(value => {
        if (value.ok) {
          dispatch(profileActions.setIsFollow(true))
        }
      });
  }
}

export const searchUser = (keyword?: string, lastId: number = Number.MAX_SAFE_INTEGER) => {
  return apiV1User.get<ApiResponseType<UserType[]>>(`/search?keyword=${keyword}&lastId=${lastId}`)
    .then(value => value.data)
    .then(value => {
      return value?.data || []
    })
}
