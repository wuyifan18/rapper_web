<template>
    <div class="today-movies" v-if="user_id">
        <h3> {{msg}} </h3>
        <div class="border-movie" v-bind:key="movie.id" v-for="movie in movies">
            <div class="single-movie" @click="goToMovie(movie.id)" @mouseenter="change_class(movie)" @mouseleave="re_class()">
                <img width="100%" height="85%" :src="movie.poster"  alt="">
                <div class="movie-title">
                    <label>{{movie.title}}<span> {{movie.imdb_rating}}</span></label>
                </div>
            </div>
            <div v-if="current_movie === movie" class="movie_context_active">
                <div class="movie_context">
                    <label>{{movie.title}}<span> {{movie.year}}</span></label>
                    <div class="movie_rate">
                        <el-rate :max=10 v-model="rating" disabled show-text text-color="#ff9900">
                        </el-rate>
                    </div>
                    <div class="movie_type">
                        <label>{{movie.runtime}}&nbsp;&nbsp;&nbsp;&nbsp;<label>{{movie.country}}</label></label>
                    </div>
                    <div class="movie_members">
                        <label>Directors:&nbsp;&nbsp;&nbsp;&nbsp;{{movie.director}}</label><br>
                        <label>Actors:&nbsp;&nbsp;&nbsp;&nbsp;{{movie.actors}}</label>
                    </div>
                </div>
                <div class="movie_comment">
                    {{movie.plot.substring(0,100)}}...
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import movieApi from '../../api/movieApi'
import { mapGetters } from 'vuex'
export default {
  name: 'UserMovies',
  data() {
    return {
      msg: 'Guess you like',
      current_movie: '',
      movies: []
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ]),
    rating() {
      return parseFloat(this.current_movie.imdb_rating)
    }
  },
  mounted() {
    this.get_today_movies()
  },
  methods: {
    change_class: function(arg) {
      this.current_movie = arg
    },
    re_class: function() {
      this.current_movie = ''
    },
    get_today_movies() {
      if (this.user_id !== null) {
        movieApi.recommendationByUser(this.user_id).then((res) => {
          if (res.data['Response'] === 'False') {
            this.$message({ message: res.data['Error'], type: 'warning', duration: 1000, center: true })
          } else {
            this.movies = res.data.Data.slice(0, 5)
          }
        })
      }
    },
    goToMovie(id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style>
    .today-movies{height: 720px;margin:0 auto;}
</style>
<style lang="stylus" scoped>
    .today-movies
        height 350px
        margin 0 auto
        h3
            border-bottom 1px solid #d0d0d0
            padding-bottom 15px
    @media screen and (min-width: 1201px) {
        .today-movies {width: 1200px}
    }
    @media screen and (max-width: 1200px) {
        .today-movies {width: 900px}
    }
    @media screen and (max-width: 900px) {
        .today-movies {width: 200px;}
    }
    @media screen and (max-width: 500px) {
        .today-movies {width: 100px;}
    }
    .border-movie
        width 20%
        height 80%
        float left
    /*margin-left 10%*/
    .single-movie
        height 100%
        width 80%
        margin-top 10%
        margin-left 2%
    .single-movie:hover
        cursor pointer
    .movie_context_active
        border 1px solid #C0C0C0
        background rgb(255,255,255)
        height 300px
        width 300px
        margin-top -325px
        margin-left 80%
        float left
        position relative
        z-index 1999
        display block
    .movie_context
        width 100%
        height 80%
        text-align left
        font-size 16px
        color #4682B4
        padding 10px 10px 10px 20px
        border-bottom 1px solid #DCDCDC
    .movie_context label span
        color #7B7B7B
        font-size 12px
    .movie_context .movie_rate
        margin-top 5px
    .movie_context .movie_type
        margin-top 10px
        color #4F4F4F
        font-size 14px
    .movie_context .movie_members
        margin-top 15px
        color #4F4F4F
        font-size 14px
    .movie_context .movie_members label
        padding-bottom 10px
    .movie_comment
        width 100%
        height 30%
        background #F5F5F5
        padding 10px 10px 10px 10px
    .movie-title
        text-align center
        padding 0
        font-size 12px
        margin-bottom 10px
    .movie-title span
        color #FFA042
</style>
