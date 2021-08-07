import { 
    USER_LOGIN,
    USER_LOGOUT,
    SET_USER_DETAIL,
    SET_SEARCH,
    SORT_BY_VOTE,
    SET_FILTER,
    SET_ANSWER_PAGE,
    SET_ANSWERS,
} from "../constants";

const intialState = {
    loginStatus: false,
    id: '',
    name: '',
    searchText: '',
    sortByVote: false,
    filter: '',
    qid: '',
    answers: [],
};

export const loginUser = (state=intialState, action) => {
    switch(action.type) {
        case USER_LOGIN:
            return {... state, loginStatus: action.payload};
        
        case  USER_LOGOUT:
            return {... state, loginStatus: action.payload, id: '', name: ''};
        
        case SET_USER_DETAIL:
            return {... state, id: action.payload.id, name: action.payload.name};

        case SET_SEARCH:
            return {... state, searchText: action.payload};

        case SORT_BY_VOTE:
            return {... state, sortByVote: action.payload};

        case SET_FILTER:
            return {... state, filter: action.payload}

        case SET_ANSWER_PAGE:
            return {... state, qid: action.payload}

        case SET_ANSWERS:
            return {... state, answers: action.payload}

        default:
            return state
    }
};