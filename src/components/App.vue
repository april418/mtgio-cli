<style lang="sass">
  #app
    background-color: #eee
</style>

<template lang="pug">
  div#app.mdl-layout.mdl-js-layout.mdl-layout--fixed-header
    header.mdl-layout__header
      div.mdl-layout-icon
      div.mdl-layout__header-row
        span.mdl-layout-title {{ title }}
        div.mdl-layout-spacer

    div.mdl-layout__drawer
      span.mdl-layout-title {{ shortTitle }}
      nav.mdl-navigation
        router-link.mdl-navigation__link(v-for="child in children" :key="'/' + child.path" :to="'/' + child.path")
          | {{ child.component.name }}

    main.mdl-layout__content
      div.page-content(slot="content")
        router-view
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: 'Magic: the Gathering.IO',
        shortTitle: 'M:tG.IO',
        children: []
      }
    },
    methods: {
      getCurrentRouteChildren() {
        const route = this.$router.options.routes.find(route => route.path === '/')
        this.children = route ? route.children : []
      }
    },
    created() {
      this.getCurrentRouteChildren()
    }
  }
</script>

