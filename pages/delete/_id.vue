<template>
  <div class="container">
    <p class="subtitle">
      Post: {{ $route.params.id }} has been deleted
    </p>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.delete(
      'https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id
    )
  }
}
</script>

<style>
p {
  text-align: center;
}
</style>
