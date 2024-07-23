export const FETCH_START = "FETCH_START"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_FAILURE = "FETCH_FAILURE"

interface FetchStartAction {
  type: typeof FETCH_START
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS,
  payload: any[]
}

interface FetchFailureAction {
  type: typeof FETCH_FAILURE,
  payload: string
}

export type FetchActionTypes = FetchStartAction | FetchSuccessAction | FetchFailureAction