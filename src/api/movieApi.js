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
  similarityMovieByID(id) {
    return http({
      method: 'get',
      url: '/api/movie/similarity?movie=' + id
    })
  },
  recommendationByUser(id) {
    return http({
      method: 'get',
      url: '/api/movie/recommendation?user=' + id
    })
  }
}
