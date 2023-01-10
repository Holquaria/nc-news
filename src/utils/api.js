import axios from 'axios'

export const api = axios.create({
    baseURL: "https://news-query-service.onrender.com/api",
  });

export const getArticles = (setArticles) => {
      return api.get('/articles')
      .then(({data}) => {
          setArticles(data.articles)
      }).catch((err) => {
      })
  }

export const getArticle = (setArticle, article_id) => {
    return api.get(`/articles/${article_id}`)
    .then(({data}) => {
        setArticle(data.article)
    }).catch((err) => {
    })
}

export const getComments = (setComments, article_id) => {
    return api.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
        setComments(data.comments)
    }).catch((err) => {
    })
}