<style lang="sass">
  td
    white-space: pre-wrap
</style>

<template lang="pug">
  div#card-list
    loading-modal(v-if="loading")
    div.mdl-color--white.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col.mdl-grid
      div.mdl-cell.mdl-cell--12-col
        button.mdl-button.mdl-js-button.mdl-button--raised(:disabled="isFirstPage()" @click="prevPage") prev
        button.mdl-button.mdl-js-button.mdl-button--raised(:disabled="isLastPage()" @click="nextPage") next
      div.mdl-cell.mdl-cell--12-col
        table.mdl-data-table.mdl-js-data-table
          thead
            tr
              th.mdl-data-table__cell--non-numeric(v-for="column in columns" :key="column.key")
                | {{ column.key }}
          tbody
            tr(v-for="card in cards")
              td.mdl-data-table__cell--non-numeric(v-for="column in columns" :key="card[column.key]" v-html="column.html(card[column.key])")
</template>

<script>
  import LoadingModal from './LoadingModal.vue'
  import { Cards } from '../stores/mtgsdk.js'

  export default {
    name: 'CardList',
    data() {
      return {
        columns: [
          {key: 'imageUrl', html: v => `<img src="${v}">`},
          {key: 'name', html: v => v},
          {key: 'text', html: v => v},
        ],
        cards: [],
        query: {
          page: 1,
          pageSize: 25
        },
        totalCount: 0,
        loading: false
      }
    },
    methods: {
      getCards() {
        this.loading = true
        Cards.where(this.query).findAll().then(data => {
          console.log(data.cards)
          this.cards = data.cards
          this.totalCount = data.totalCount
          this.loading = false
        })
      },
      nextPage() {
        this.query.page++
        this.getCards()
      },
      prevPage() {
        this.query.page--
        this.getCards()
      },
      isFirstPage() {
        return this.query.page <= 1
      },
      isLastPage() {
        return this.query.page >= Math.ceil(this.totalCount / this.query.pageSize)
      },
    },
    created() {
      this.getCards()
    },
    components: {
      'loading-modal': LoadingModal
    }
  }
</script>

