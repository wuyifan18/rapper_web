import http from '../utils/http'

export default {
  getMovieByType(type, page) {
    return http({
      method: 'post',
      url: '/api/movie/query/genre?genre=' + type + '&per_page=9&page=' + page
    })
  },
  searchMovieByTitle(title, page, showLoading) {
    return http({
      method: 'post',
      headers: { 'showLoading': showLoading },
      url: '/api/movie/query/keyword?keyword=' + title + '&per_page=9&kind=title&page=' + page
    })
  },
  searchMovieByID(id) {
    return http({
      method: 'post',
      url: '/api/movie/query/id?movie_id=' + id
    })
  },
  getMovieRatings(id, page) {
    return http({
      method: 'post',
      url: '/api/rating/display/movie?movie_id=' + id + '&per_page=15&page=' + page
    })
  },
  insertMovieRating(user_id, movie_id, score) {
    return http({
      method: 'post',
      url: '/api/rating/new?user_id=' + user_id + '&movie_id=' + movie_id + '&score=' + score
    })
  },
  similarityMovieByID(id) {
    return http({
      method: 'post',
      url: '/api/movie/query/sims?movie_id=' + id
    })
  },
  recommendationByUser(id) {
    return http({
      method: 'post',
      url: '/api/movie/query/recs?user_id=' + id
    })
  }
}
