const initialState = {
  isLoading: false,
  errorMessage:null,
  categoryLoader: false,
  categoryError: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading:true,
        errorMessage:null,
      };
    case "IS_SUCCESS":
      return {
        ...state,
        isLoading:false,
        errorMessage:null,
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading:false,
        errorMessage:action.payload, // we know from index.js that action has payload, which has the error message 
      };
      case "CATEGORY_LOADER":
        return {
          ...state,
          categoryLoader:true,
          categoryError:null,
        };
      case "FETCH_CATEGORIES":
        return {
          ...state,
          categoryLoader:false,
          categoryError: null,
        };
      case "CATEGORY_ERROR":
        return {
          ...state,
          categoryLoader: false,
          categoryError: action.payload,
  }
    default:
      return state;
  }
};