<template>
  <div class="movie-view">
    <div id="content">
      <div id="header">
        <section id="header-left">
          <h1>
            <span id="name" v-text="movie.title" />
            <span id="year" v-text="'(' + movie.year +')'" />
          </h1>
          <div class="article">
            <div class="movie-img" style="float: left; width: 250px">
              <img slot="left" :src="movie.poster" style="width: 200px">
            </div>
            <div slot="right">
              <span v-show="movie.director">
                <span class="pl">Directors：</span>
                <span class="attrs">{{ movie.director }}</span>
                <br>
              </span>
              <span v-show="movie.writer">
                <span class="pl">Writers：</span>
                <span class="attrs">{{ movie.writer }}</span>
                <br>
              </span>
              <span v-show="movie.actors" class="actor">
                <span class="pl">Actors：</span>
                <span class="attrs">
                  <span>{{ movie.actors }}</span>
                </span>
                <br>
              </span>
              <span v-show="movie.genre">
                <span class="pl">Genre：</span>
                <span class="attrs">{{ movie.genre }}</span>
                <br>
              </span>
              <span v-show="movie.country">
                <span class="pl">Country：</span>
                {{ movie.country }}
                <br>
              </span>
              <span v-show="movie.language">
                <span class="pl">Language：</span>
                {{ movie.language }}
                <br>
              </span>
              <span v-show="movie.released">
                <span class="pl">Released：</span>
                <span>{{ movie.released }}</span>
                <br>
              </span>
              <span v-show="movie.runtime">
                <span class="pl">Runtime：</span>
                <span>{{ movie.runtime }}</span>
                <br>
              </span>
              <span v-show="movie.imdb_id">
                <span class="pl">ImdbID：</span>
                <a :href="'https://www.imdb.com/title/' + movie.imdb_id">{{ movie.imdb_id }}</a>
                <br>
              </span>
              <span v-show="imdbRating">
                <div id="ratingPlace">
                  <span id="ratingLeft" class="pl">ImdbRating：</span>
                  <el-rate id="ratingRight" v-model="imdbRating" :max="10" disabled show-score :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
                </div>
                <br><br><br>
              </span>
                <span style="float: left" class="pl">Your rating：</span>
              <el-rate
                      ref="rate"
                      v-model="score"
                      show-score
                      allow-half
                      :disabled=disabled
                      text-color="#ff9900"
                      score-template="{value}"
                      @click.native=insertScore()>
              </el-rate>
            </div>
          </div>
        </section>
        <section id="header-right">
          <table class="table-normal">
            <thead>
            <tr>
              <td width="50%">
                Name
              </td>
              <td width="50%">
                Score
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ratings" v-bind:key="item.id">
              <td>{{item.Name}}</td>
              <td>
                <el-rate
                      v-model="item.Score"
                      show-score
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
              </el-rate>
              </td>
            </tr>
            </tbody>
          </table>
          <el-pagination
                  small
                  v-if=ratings
                  layout="total, prev, pager, next, jumper"
                  style="margin-top: 20px;text-align: center"
                  :total="total"
                  :page-size=15
                  :pager-count="5"
                  :current-page="page"
                  @current-change="getScore"
          />
        </section>
      </div>
      <section id="synopsis" class="section-same">
        <h2>Plots</h2>
        {{ movie.plot }}
      </section>
      <br><br><br><br><br><br>
      <br>
      <section v-if="movie.awards" id="award" class="section-same">
        <h2>Awards</h2>
        {{ movie.awards }}
      </section>
      <section class="like-movies">
        <h2>People who like this movie also like</h2>
        <div class="border-movie" v-for="similarityMovie in movie.similarityMovies" :key="similarityMovie.id">
          <div class="single-movie" @click="goTo(similarityMovie.id)">
            <img width="100%" height="85%" :src="similarityMovie.poster" >
            <div class="movie-title">
              <label>{{similarityMovie.title}}<span> {{similarityMovie.imdb_rating}}</span></label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import movieApi from '../api/movieApi'
import { mapGetters } from 'vuex'
export default {
  name: 'MovieView',
  data() {
    return {
      movie: '',
      ratings: '',
      page: 1,
      total: null,
      score: null,
      disabled: false
    }
  },
  computed: {
    ...mapGetters([
      'login',
      'user_id'
    ]),
    imdbRating: {
      get: function() {
        return parseFloat(this.movie.imdb_rating)
      },
      set: function() {
      }
    }
  },
  mounted() {
    this.get_one_movie()
    this.getScore(this.page)
  },
  methods: {
    insertScore() {
      if (this.disabled === true) return
      let s = this.score
      if (this.score.toString().length === 1) { s = this.score.toString() + '.0' }
      movieApi.insertMovieRating(this.user_id, this.$route.params.id, s).then(() => {
        this.$message({ message: 'success！', type: 'info', duration: 600, center: true })
        this.getScore(this.page)
        this.disabled = true
      })
    },
    get_one_movie() {
      const id = this.$route.params.id
      movieApi.searchMovieByID(id).then((res) => {
        this.movie = res.data.Data
        movieApi.similarityMovieByID(id).then((res) => {
          this.$set(this.movie, 'similarityMovies', res.data.Data)
        })
      })
    },
    getScore(page) {
      this.page = page
      this.ratings = ''
      movieApi.getMovieRatings(this.$route.params.id, this.page).then(res => {
        this.total = res.data.Count
        if (this.total !== 0) {
          res.data.Data.map(item => {
            item.Score = parseFloat(item.Score)
          })
          this.ratings = res.data.Data
        }
      })
    },
    goTo(id) {
      this.$router.replace('/movie/' + id)
      this.get_one_movie()
      this.getScore(this.page)
    }
  }
}

</script>

<style lang="stylus" scoped>
  .movie-img
  float left
  width 150px
  height 100px
  margin-left 150px
  img
    width 120px
h2
  color:#7e57c2;

h1
  font-size:25px;
  font-weight:bold;
  color:#494949;
  line-height:1.1;
a
  color:#0085DD;
.section-same
  width:800px;
  float:left;
  margin-left:10%;
  margin-right:10%;
#header
  width:1000px;
  margin-left:10%;
  margin-right:10%;
  margin-top: 20px;
#cover
  .nbgnbg
    img
      width:70%;
#header-left
  float:left;
  width: 800px;
#header-right
  padding-top:30px;
  margin-left:800px;
  width: 380px;
  position: absolute;
  .table-normal
    height 100%
    border-collapse collapse
    border-spacing 2px
    border-color grey
    vertical-align middle
    margin-left 40px
    thead
      display table-header-group
      vertical-align middle
      border-color inherit
      tr
        td
          text-align center
          background #f5f5f5
          height 42px
          border-bottom 1px solid #ddd
          border-left 1px solid #ddd
          font-weight bold
    tbody
      tr
        td
          text-align center
          height 40px
          border-left 1px solid #ddd
          border-bottom 1px solid #ddd
#comment-btn
  width:80px;
  color:#ca6445;
  background:#fae9da;
#rating-btn
  margin-left: 50%;
  width:80px;
  color:#ca6445;
  background:#fae9da;
.comment-author
  color:#0085DD;

#photo
  ul
    float:left;
    li
      float:left;
      img
        height:100px;
#also-like-movie-content
  float:left;
  dl
    float:left;
    img
      height:250px;
#ratingPlace
  float:left;
#ratingLeft
  float:left;
#ratingRight
  float:left;
.alsoLikeID
  margin: 10px 10px 10px 10px
.like-movies
  width:1000px;
  margin-left:10%;
  margin-right:10%;
  float: left;
  height 550px
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
  width: 20%
  height 42%
  float left
.single-movie
  height 100%
  width 80%
  margin-top 10%
  margin-left 2%
.movie-title
    text-align center
    padding 0px
    font-size 12px
    margin-bottom 10px
.movie-title span
    color #FFA042
</style>
