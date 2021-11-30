<template>
  <div>
    <div>
      <NavBar />
      <h1 class="title">
        Compose
      </h1>
    </div>
    <div class="container">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="blogTitle"
            class="input"
            type="text"
            placeholder="Text input"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Post</label>
        <div class="control">
          <textarea id="" v-model="blogBody" />

          <div>
            <button class="button" type="submit">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: {},
      blogTitle: '',
      blogBody: '',
      isActive: false
    }
  },
  methods: {
    submitPost () {
      this.$axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: this.blogTitle,
            body: this.blogBody,
            userId: 1
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => response.data)
        .then((data) => {
          this.blogs = data
          console.log(this.blogs.title, this.blog.body)
        })
      alert('submitted')
      this.blogBody = ''
      this.blogTitle = ''
      this.isActive = true
    },
    onUpdate () {
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(json => console.log(json))
    }
  }
}
</script>

<style>
h1 {
  text-align: center;
  padding-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
