import { FETCH_FAILURE, FETCH_START, FETCH_SUCCESS, FetchActionTypes } from "redux/types/actionTypes";

export const fetchStart = (): FetchActionTypes => ({
  type: FETCH_START
})

export const fetchSuccess = ( data: any[] ): FetchActionTypes => ({
  type: FETCH_SUCCESS,
  payload: data
})

export const fetchFailure = ( err: string ): FetchActionTypes => ({
  type: FETCH_FAILURE,
  payload: err
})