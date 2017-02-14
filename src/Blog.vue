<template>
  <div class="blog">
    <div class="title">{{title}}</div>
    <div class="body markdown-body" v-html="body"></div>
    <div class="loader" v-show="loading">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script>
import { getDetail } from './api';

export default {
  name: 'blog',
  created: function() {
    let articleId = this.$route.params.id;

    getDetail(articleId)
      .then(res => {
        this.loading = false;
        this.title = res.data.title;
        this.body = res.data.body;
      })
  },
  data () {
    return {
      title: '',
      body: '',
      loading: true
    }
  }
}
</script>

<style>
.blog .title {
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
}

.blog .loader {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>
