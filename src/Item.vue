<template>
  <li class="item">
    <router-link :to="link">{{title}}</router-link>
  </li>
</template>

<script>
export default {
  name: 'item',
  props: ['id', 'title'],
  computed: {
    link: function() {
      return `/blog/${this.id}`
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}
</style>
