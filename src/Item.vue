<template>
  <li class="item">
    <router-link :to="link">blog title{{id}}</router-link>
  </li>
</template>

<script>

export default {
  name: 'item',
  props: ['id'],
  computed: {
    link: function() {
      return `/blog/${this.id}`
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
.item {
  border-bottom: 1px solid #efefef;
}

.item a {
  display: block;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
}
</style>
