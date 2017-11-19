/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const TAKE_PICTURE = 'TAKE_PICTURE';
export const RETRIEVE_PICTURE = 'RETRIEVE_PICTURE';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const takePicture = (picture) => (dispatch) => {
  dispatch({type: TAKE_PICTURE, payload: picture})
}

export const retrievePicture = (picture) => (dispatch) => {
  dispatch({type: RETRIEVE_PICTURE, payload: picture})
}

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  currentPicture: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAKE_PICTURE:
      return { currentPicture: action.payload };
    case RETRIEVE_PICTURE:
      return { currentPicture: action.payload };
    default:
      return state;
  }
};

export default reducer;
