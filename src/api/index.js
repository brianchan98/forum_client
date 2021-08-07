import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const registerUser = payload => api.post(`/user`, payload);
export const getAllUsers = () => api.get(`/users`);
export const userLogin = (email, password) => api.get(`/user/${email}/${password}`);

export const postQuestion = payload => api.post(`/question`, payload);
export const getAllQuestions = () => api.get(`/questions`);
export const upvote = (qid, payload) => api.post(`/vote/${qid}`, payload);
export const getQuestion = qid => api.get(`/question/${qid}`)
export const answered = (qid, payload) => api.post(`/questionAnswered/${qid}`, payload);
export const deleteQuestion = qid => api.delete(`/question/${qid}`)
export const updateQuestion = (qid, payload) => api.post(`/questionupdate/${qid}`, payload);

export const getAllAnswers = () => api.get(`/answers`);
export const postAnswer = payload => api.post(`/answer`, payload);
export const getAnswer = aid => api.get(`/answer/${aid}`)
export const deleteAnswer = aid => api.delete(`/answer/${aid}`)

const apis = {
    registerUser,
    getAllUsers,
    userLogin,
    getAllQuestions,
    upvote,
    answered,
    postQuestion,
    getQuestion,
    deleteQuestion,
    updateQuestion,
    getAllAnswers,
    postAnswer,
    getAnswer,
    deleteAnswer,
}

export default apis