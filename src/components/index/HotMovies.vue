<template>
  <div class="hot-movies">
    <h3> {{msg}} </h3>
    <slider>
      <slider-item>
        <div>
          <img width="70%" height="300" :src="jpg1">
          <div class="hot_movie_context">
            <label>War&nbsp;<span>2019</span></label>
            <el-rate v-model="value5" disabled show-score text-color="#ff9900">
            </el-rate>
            <div class="hot_movie_introduce">
              <label>Director:&nbsp;&nbsp;Siddharth Anand</label><br>
              <label>Actors:&nbsp;&nbsp; Hrithik Roshan, Tiger Shroff, Vaani Kapoor</label>
            </div>
            <div class="hot_movie_comment">
              <label>Plots</label><br>
              <p>An Indian soldier chases after his mentor who has gone rogue following an unexpected kill.</p>
            </div>
          </div>
        </div>
      </slider-item>
      <slider-item>
        <div>
          <img width="70%" height="300" :src="jpg2">
          <div class="hot_movie_context">
            <label>Black Panther&nbsp;<span>2018</span></label>
            <el-rate v-model="value5" disabled show-score text-color="#ff9900">
            </el-rate>
            <div class="hot_movie_introduce">
              <label>Director:&nbsp;&nbsp;Ryan Coogler</label><br>
              <label>Actors:&nbsp;&nbsp; Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o</label>
            </div>
            <div class="hot_movie_comment">
              <label>Plots</label><br>
              <p>T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.</p>
            </div>
          </div>
        </div>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'
import jpg1 from 'src/assets/1.jpg'
import jpg2 from 'src/assets/2.jpg'
export default {
  name: 'HotMovies',
  data() {
    return {
      jpg1,
      jpg2,
      msg: 'New movies',
      value5: 4.7
    }
  },
  components: {
    Slider,
    SliderItem
  }
}
</script>

<style lang="stylus" scoped>
.hot-movies
  height 350px
  margin 0px auto
@media screen and (min-width: 1201px) {
  .hot-movies {width: 1200px}
}
@media screen and (max-width: 1200px) {
  .hot-movies {width: 900px}
}
@media screen and (max-width: 900px) {
  .hot-movies {width: 200px;}
}
@media screen and (max-width: 500px) {
  .hot-movies {width: 100px;}
}
.hot-movies h3
  border-bottom 1px solid #d0d0d0
  padding-bottom 15px
.hot_movie_context
  background #F0F0F0
  height 300px
  width 360px
  padding-top 30px
  padding-left 25px
  padding-right 20px
  margin-top -305px
  margin-left 70%
.hot_movie_context label
  font-size 20px
  color #004B97
.hot_movie_context label span
  font-size 16px
  color #000000
.hot_movie_context .hot_movie_introduce
  margin-top 20px
.hot_movie_context .hot_movie_introduce label
  font-size 16px
  color #000000
.hot_movie_context .hot_movie_comment
  margin-top 10px
.hot_movie_context .hot_movie_comment label
  font-size 18px
  color #0066CC
.hot_movie_context .hot_movie_comment p
  font-size 12px
  color #626262
</style>
