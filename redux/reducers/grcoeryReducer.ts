import { ReduxState } from "redux/types/stateTypes";

const initialState: ReduxState = {
  data: [{

  }],
  loading: false,
  error: null
}

export const grcoeryReducer = (
  state = initialState,
  action: any
): ReduxState => {
  switch ( action.type ) {
    
    default:
      return state
  }
}