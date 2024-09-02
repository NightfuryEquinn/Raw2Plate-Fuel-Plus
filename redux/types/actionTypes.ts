export const USER_REGISTER_LOADING = "USER_REGISTER_LOADING"
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS"
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE"

interface UserRegisterLoading {
  type: typeof USER_REGISTER_LOADING
}

interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS,
  payload: any[]
}

interface UserRegisterFailure {
  type: typeof USER_REGISTER_FAILURE,
  payload: string
}

export type UserRegisterAction = UserRegisterLoading | UserRegisterSuccess | UserRegisterFailure