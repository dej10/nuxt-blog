<template>
  <div class="container">
    <h1>comments</h1>
    <h2>comments for post {{ $route.params.id }}</h2>
    <div v-for="comment in comments" :key="comment.body" class="comments">
      <span>{{ comment.email }} says...</span>
      <ul>
        <li>{{ comment.body }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: {}
    }
  },
  mounted () {
    this.$axios
      .get(
        'https://jsonplaceholder.typicode.com/posts/' +
          this.$route.params.id +
          '/comments'
      )

      .then(response => response.data)
      .then(data => (this.comments = data))
  }
}
</script>

<style>
.comments {
  text-align: justify;
  padding-bottom: 30px;
}
</style>
