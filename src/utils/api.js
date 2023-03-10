import axios from 'axios'

export const api = axios.create({
    baseURL: "https://news-query-service.onrender.com/api",
  });

export const getArticles = (topic, sort_by, order) => {
      return api.get('/articles', {params: {topic, sort_by, order}})
      .then(({data}) => {
          return data.articles
      })
  }

export const getArticle = (article_id) => {
    return api.get(`/articles/${article_id}`)
    .then(({data}) => {
        return data.article
    })
}

export const getComments = (article_id) => {
    return api.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
        return data.comments
    })
}

export const updateArticleVotes = (vote, article_id) => {
        return api.patch(`/articles/${article_id}`, {inc_votes: vote})
}

export const postComment = (article_id, body, username) => {
    const request = { body, username }
    return api.post(`/articles/${article_id}/comments`, request)
}

export const getTopics = () => {
    return api.get('/topics')
    .then(({data}) => {
        return data.topics
    })
}

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}