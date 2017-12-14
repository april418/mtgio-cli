<style lang="sass">
  td
    white-space: pre-wrap
</style>

<template lang="pug">
  div#card-list
    loading-modal(v-if="loading")
    div.mdl-color--white.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col.mdl-grid
      div.mdl-cell.mdl-cell--12-col
        select(v-model="query.cmc")
          option(v-for="cost in costs" :value="cost") {{ cost }}
        button.mdl-button.mdl-js-button.mdl-button--raised(@click="getCard") Put a token
      div.mdl-cell.mdl-cell--12-col
        img(:src="card.imageUrl")
</template>

<script>
  import LoadingModal from './LoadingModal.vue'
  import { Cards } from '../stores/mtgsdk.js'

  export default {
    name: 'MomirBasic',
    data() {
      return {
        columns: [
          {key: 'imageUrl', html: v => `<img src="${v}">`},
          {key: 'name', html: v => v},
          {key: 'text', html: v => v},
          {key: 'power', html: v => v},
          {key: 'toughness', html: v => v},
        ],
        card: {},
        costs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        query: {
          page: 1,
          pageSize: 1,
          type: 'Creature',
          cmc: 1,
          random: true
        },
        loading: false
      }
    },
    methods: {
      getCard() {
        this.loading = true
        Cards.where(this.query).findAll().then(data => {
          console.log(data.cards[0])
          this.card = data.cards[0] || {}
          this.loading = false
        })
      },
    },
    created() {
      this.getCard()
    },
    components: {
      'loading-modal': LoadingModal
    }
  }
</script>

