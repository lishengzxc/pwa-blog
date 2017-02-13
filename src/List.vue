<template>
  <ul>
    <item v-for="item in list" :id="item.id" :title="item.title"></item>
    
  </ul>
</template>

<script>
import Item from './Item.vue'
import { getList } from './api';

export default {
  name: 'list',
  created: function () {
    getList()
    .then(res => {
      this.list = res.data.map(item => {
        let { title, id } = item
        return { title, id }
      })
    })
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    Item
  }
}
</script>

<style>

</style>
