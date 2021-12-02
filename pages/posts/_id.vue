<template>
  <div id="full">
    <div id="form-top" class="container">
      <h1 class="title is-3">
        <em> .. the rest of the post</em>
      </h1>
      <div class="post">
        <h2 class="title is-4">
          {{ post.title }}
        </h2>
        <p class="subtitle">
          {{ post.body }}
        </p>
      </div>
      <button class="button" @click="showComments">
        Show Comments
      </button>

      <div
        v-for="comment in comments"
        :key="comment.body"
        class="comments"
        :v-if="isActive"
      >
        <span>
          <a href="">{{ comment.email }}</a> says...</span>
        <ul>
          <li>{{ comment.body }}</li>
        </ul>
      </div>
      <button class="button" @click="hideComments">
        Hide Comments
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {},
      comments: {},
      isActive: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$isLoading(true)
      setTimeout(() => {
        this.$axios
          .get(
            'https://jsonplaceholder.typicode.com/posts/' +
              this.$route.params.id
          )
          .then(response => response.data)
          .then(data => (this.post = data))
          .finally(() => {
            this.$isLoading(false)
          })
      }, 1000)
    },
    showComments () {
      this.isActive = true

      this.$axios
        .get(
          'https://jsonplaceholder.typicode.com/posts/' +
            this.$route.params.id +
            '/comments'
        )

        .then(response => response.data)
        .then(data => (this.comments = data))
    },
    hideComments () {
      this.isActive = false
      this.comments = {}
    }
  }
}
</script>

<style scoped>
.comments {
  text-align: left;
  padding-top: 20px;
  padding-left: 10%;
  padding-right: 10%;
}
button {
  text-align: justify;
  margin-bottom: 20px;
  margin-top: 20px;
}
h2 {
  padding-bottom: 20px;
}
#full {
  width: 100%;
  background-color: #faedf0;
}
</style>
