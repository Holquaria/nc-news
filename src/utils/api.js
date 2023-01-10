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

export const updateVotes = (vote, article_id) => {
    if (vote === 'up') {
        return api.patch(`/articles/${article_id}`, {inc_votes: 1})
        .then(() => {
            console.log('vote +1')
        })
    } else if (vote === 'down') {
        return api.patch(`/articles/${article_id}`, {inc_votes: -1})
        .then(() => {
            console.log('vote -1')
        })
    }
}