import http from '../utils/http'

export default {
  getMovieByType(type, page) {
    const url = '/api/movie/query/genre?genre=' + type + '&per_page=9&page=' + page
    return http({
      method: 'post',
      url: url
    })
  },
  searchMovieByTitle(title, page, showLoading) {
    const url = '/api/movie/query/keyword?keyword=' + title + '&per_page=9&kind=title&page=' + page
    return http({
      method: 'post',
      headers: { 'showLoading': showLoading },
      url: url
    })
  },
  searchMovieByID(id) {
    const url = '/api/movie/query/id?movie_id=' + id
    return http({
      method: 'post',
      url: url
    })
  },
  similarityMovieByID(id) {
    const url = '/api/movie/similarity?movie=' + id
    return http({
      method: 'get',
      url: url
    })
  },
  recommendationByUser(id) {
    const url = '/api/movie/recommendation?user=' + id
    return http({
      method: 'get',
      url: url
    })
  }
}
