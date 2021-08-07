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

export const loginUser = () => ({
    type: USER_LOGIN,
    payload: true
});

export const logoutUser = () => ({
    type: USER_LOGOUT,
    payload: false
});

export const setUserDetail = (id, name) => ({
    type: SET_USER_DETAIL,
    payload: {id, name}
})

export const setSearch = (search) => ({
    type: SET_SEARCH,
    payload: search
})

export const sortByVote = (on) => ({
    type: SORT_BY_VOTE,
    payload: on
})

export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter
})

export const setAnserPage = (id) => ({
    type: SET_ANSWER_PAGE,
    payload: id
})

export const setAnswers = (answers) => ({
    type: SET_ANSWERS,
    payload: answers
})