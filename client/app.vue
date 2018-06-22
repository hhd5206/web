<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <todo></todo> -->
    <p>{{fullName}}{{count}}</p>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <button @click="notify">click</button>
    <!-- <notification content="test notification"></notification> -->
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  metaInfo: {
    title: 'hhd\'s Todo App'
  },
  methods: {
    notify () {
      this.$notify({
        content: 'this is $notify',
        btn: 'close'
      })
    }
  },
  mounted () {

  },
  components: {
    Header,
    Footer
    // Todo
  },
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapGetters(['fullName'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


