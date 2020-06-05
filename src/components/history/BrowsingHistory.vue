<template>
  <div class="browsing-history">
    <h3>Score records</h3>
    <div class="table-wrapper">
      <table class="table-normal">
        <thead>
          <tr>
            <td width="34%">
              Title
            </td>
            <td width="66%">
              Score
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in movies" v-bind:key="item.id">
            <td>{{item.Title}}</td>
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
    </div>
    <el-pagination
            v-if=movies
            layout="total, prev, pager, next, jumper"
            style="float: left;margin-left: 150px;margin-top: 20px;margin-bottom: 20px"
            :total="total"
            :page-size=10
            :current-page="page"
            @current-change="fetchData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userApi from '../../api/userApi'
export default {
  name: 'BrowsingHistory',
  data() {
    return {
      movies: '',
      page: 1,
      total: null
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  mounted() {
    this.fetchData(this.page)
  },
  methods: {
    fetchData(page) {
      this.page = page
      this.movies = ''
      userApi.getRecord(this.user_id, this.page).then(res => {
        this.total = res.data.Count
        res.data.Data.map(item => {
          item.Score = parseFloat(item.Score)
        })
        this.movies = res.data.Data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.browsing-history
  .table-wrapper
    margin-top 10px
    margin-bottom 20px
    border 1px solid #ddd
    border-radius 2px
    .table-normal
      width 100%
      height 100%
      border-collapse collapse
      border-spacing 2px
      border-color grey
      vertical-align middle
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
</style>
