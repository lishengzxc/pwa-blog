<template>
  <div class="blog">
    <div class="title">{{title}}</div>
    <div class="body" v-html="body"></div>
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
        this.title = res.data.title;
        this.body = res.data.body;
      })
  },
  data () {
    return {
      title: '',
      body: ''
    }
  }
}
</script>

<style>

</style>
