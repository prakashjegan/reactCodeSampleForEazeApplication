import urls from "../config/urls"
import responseParser from "../utils/parser"
import request from "../xhr"

const fetchQueryById = (payload, isPublic) => {
   return request({
      method: "get",
      url: isPublic ? `${urls({ event: payload.id }).queryByIdPublic}` : `${urls({ event: payload.id }).queryByIdPrivate}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const askQuery = (payload) => {
   return request({
      method: "post",
      url: `${urls().createOrUpdate}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}

const queryAskedByYou = (payload) => {
   return request({
      method: "post",
      url: `${urls().queyPostedByCurrentUser}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}

const fetchqueryBasedOnCatagorySearch = (payload, isPublic) => {
   return request({
      method: "post",
      url: isPublic ? `${urls().queryBasedOnSearchPublic}` : `${urls().queryBasedOnSearchPrivate}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}

const fetchQueryRepliedByYou = (payload) => {
   return request({
      method: "post",
      url: `${urls().queryRepliedByYou}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const addCommentToQuery = (payload) => {
   return request({
      method: "post",
      url: `${urls().commentForQueryAndAnswer}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const addCommentToQueryAndAnswer = (payload) => {
   return request({
      method: "post",
      url: `${urls().commentForQueryAndAnswer}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const addAnswerToQuery = (payload) => {
   return request({
      method: "post",
      url: `${urls().answerForQuery}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const upAndDownVoteForQuestion = (payload) => {
   return request({
      method: "post",
      url: `${urls({ event: payload.upvote , code:payload.id }).upAndDownVoteForQuestion}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const upAndDownVoteForAnswer = (payload) => {
   return request({
      method: "post",
      url: `${urls({ event: payload.upvote , code:payload.id }).upAndDownVoteForAnswer}`,
      secure: true,
      transformResponse: [responseParser],
      data: payload
   })
}
const queryServices = {
   fetchQueryById,
   askQuery,
   queryAskedByYou,
   fetchqueryBasedOnCatagorySearch,
   fetchQueryRepliedByYou,
   addCommentToQueryAndAnswer,
   addCommentToQuery,
   addAnswerToQuery,
   upAndDownVoteForQuestion,
   upAndDownVoteForAnswer
}

export default queryServices
