import { apiV1User } from '../utils/apiUtils'
import { profileActions } from '../store/profile'
import { UserType } from '../types/user'

export const userFollowing =async (user: UserType, dispatch: (actions: any) => void) => {
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
