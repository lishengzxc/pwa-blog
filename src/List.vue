<template>
  <ul>
    <item v-for="item in list" :id="item.id" :title="item.title"></item>
    <li class="loader" v-show="loading">
      <div class="loading"></div>
    </li>
  </ul>
</template>

<script>
import Item from './Item.vue'
import { getList } from './api';

function onScroll() {
  let bottom = getScrollTop() + getVisibleHeight()
  let height = getListHeight.apply(this)

  if (bottom >= height && this.loading) {
    fetchData.apply(this)
  }
}

let getScrollTop = function () {
  return document.documentElement.scrollTop;
}

let getVisibleHeight = function () {
  return document.documentElement.clientHeight;
}

let getListHeight = function () {
  return this.listContainer.getBoundingClientRect().height
}

let fetchData = function () {
  if (this.fetching) return

  this.fetching = true

  getList(this.page)
    .then(res => {
      this.fetching = false
      this.page++;

      if (res.data.length < 25) this.loading = false 

      this.list = this.list.concat(res.data.map(item => {
        let { title, id } = item
        return { title, id }
      }))
    })
}

export default {
  name: 'list',
  created: function () {
    fetchData.apply(this)
  },
  mounted: function () {
    this.listContainer = document.querySelector('ul')
    this.onScroll = onScroll.bind(this)
    
    window.addEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      list: [],
      page: 1,
      loading: true,
      fetching: false
    }
  },
  components: {
    Item
  }
}
</script>

<style>
@keyframes loading {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.loading {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-width: 2px;
  border-color: #999 transparent #999 #999;
  border-style: solid;
  animation: loading 1s infinite;
}
</style>
