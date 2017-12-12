<style lang="sass">
  .loading-modal-spinner
    $spinnerSide: 120px
    position: fixed
    z-index: 1
    left: calc(50% - #{$spinnerSide} / 2)
    top: calc(50% - #{$spinnerSide} / 2)
    height: $spinnerSide
    width: $spinnerSide
</style>

<template lang="pug">
  div.loading-modal
    modal
    spinner.loading-modal-spinner
</template>

<script>
  import Modal from './Modal.vue'
  import Spinner from './Spinner.vue'

  export default {
    name: 'LoadingModal',
    components: {
      modal: Modal,
      spinner: Spinner
    }
  }
</script>

