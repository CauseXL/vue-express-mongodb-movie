<template>
  <div class="list">
    <mu-table :fixedHeader="true" :showCheckbox="false">
      <mu-thead>
          <mu-tr>
            <mu-th>电影海报</mu-th>
            <mu-th>电影名称</mu-th>
            <mu-th>简介</mu-th>
            <mu-th>评分</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="movie of movies">
            <mu-td><img class="movie-poster" :src="movie.image"></mu-td>
            <mu-td><h3>{{ movie.title }}</h3></mu-td>
            <mu-td>
              <p class="movie-introduction">{{ movie.introduction }}</p>
            </mu-td>
            <mu-td class="movie-rating">{{ movie.rating }}</mu-td>
            <mu-td>
              <mu-raised-button @click="showDetail(movie.title)" label="详细" primary/>
              <mu-raised-button @click="openEditMovieModal(movie)" label="修改" primary/>
              <mu-raised-button @click="removeMovie(movie)" label="删除" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
    </mu-table>

    <mu-float-button icon="add" backgroundColor class="add-movie-button" @click="openAddMovieModal"/>

    <vodal :show="addMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
        <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
        <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
        <mu-text-field v-model="introduction"
        multiLine :rows="2" :rowsMax="6"
        fullWidth icon="description" label="简介" labelFloat/><br/>
        <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
        <mu-raised-button @click="closeModal" label="取消" icon="undo"/>
        <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
    </vodal>

    <vodal :show="editMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
        <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
        <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
        <mu-text-field v-model="introduction"
        multiLine :rows="2" :rowsMax="6"
        fullWidth icon="description" label="简介" labelFloat/><br/>
        <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
        <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
        <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
    </vodal>
  </div>
</template>

<script>
  export default {
    created() {
      this.getMovies()
      document.title = this.$route.name
    },
    data() {
      return {
        title: '',
        poster: '',
        rating: null,
        introduction: '',
        movie_id: '',
        movies: [],
        addMovieModal: false,
        editMovieModal: false
      }
    },
    methods: {
      getMovies() {
        this.$http.get('/api/movie')
                  .then(res => {
                    console.dir(res.data)
                    this.movies = res.data
                  })
                  .catch(err => {
                    console.log(err)
                    this.toastr.error(`${err.message}`, 'ERROR!')
                  })
      },
      openAddMovieModal() {
        this.addMovieModal = true
      },
      openEditMovieModal(movie) {
        this.editMovieModal = true
        this.title = movie.title
        this.rating = movie.rating
        this.introduction = movie.introduction
        this.poster = movie.image
        this.movie_id = movie._id
      },
      closeModal() {
        this.addMovieModal = false
        this.editMovieModal = false
        this.title = ''
        this.rating = null
        this.poster = ''
        this.introduction = ''
        this.movie_id = ''
      },
      addMovie() {
        this.$http.post('/api/movie', {
            title: this.title,
            poster: this.poster,
            introduction: this.introduction,
            rating: this.rating
          })
          .then(res => {
            this.toastr.success('添加电影成功')
            console.log(res.data)
            this.addMovieModal = false
            this.title = ''
            this.rating = null
            this.poster = ''
            this.introduction = ''
            this.movie_id = ''
            this.getMovies()
          })
          .catch(e => {
            this.toastr.warn('保存失败!')
            console.log(e)
          })
      },
      cancelAddMovie() {
        this.addMovieModal = false
        this.title = ''
        this.rating = 0
        this.poster = ''
        this.introduction = ''
      },
      editMovie() {
        let id = this.movie_id
        this.$http.put(`/api/movie/${id}`, {
            title: this.title,
            poster: this.poster,
            introduction: this.introduction,
            rating: this.rating,
          })
          .then(res => {
            this.toastr.success("更新电影成功!")
            this.closeModal()
            this.getMovies()
            this.title = ''
            this.rating = null
            this.poster = ''
            this.introduction = ''
            this.movie_id = ''
          })
          .catch(err => console.log(err))
      },
      removeMovie(movie) {
        let id = movie._id
        this.$http.delete(`/api/movie/${id}`)
          .then(res => {
            this.toastr.success("删除成功.")
            console.log(res.data)
            this.getMovies()
          })
          .catch(e => console.log(e))
      },
      // 跳转到电影详情页的方法
      showDetail(title) {
        this.$router.push(`/movie/${title}`)
      }
    }
  }
</script>

<style>
.mu-th{
  text-align: center !important;
}
.mu-td{
  text-align: center !important;
}
.movie-poster{
  width: 80px;
  padding: 4px 0;
}
.movie-introduction{
  white-space: normal;
  padding:4px 4px;
  letter-spacing: 1px;
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
}
</style>