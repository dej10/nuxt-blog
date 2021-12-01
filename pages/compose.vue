<template>
  <div>
    <div>
      <NavBar />
      <h1 class="title">
        Compose
      </h1>
    </div>
    <div class="container">
      <form method="post" autocomplete="off" @submit.prevent="submit">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="blogTitle"
              required
              class="input"
              type="text"
              placeholder="Text input"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">Post</label>
          <div class="control">
            <textarea id="" v-model="blogBody" cols="80" rows="10" required />

            <div>
              <button class="button" type="submit">
                {{ changeText }}
              </button>
            </div>
          </div>
        </div>
      </form>
      <button class="button" type="submit" @click="clearForm">
        <img width="20px" src="~/assets/img/cross.png" alt="">
      </button>

      <div class="container">
        <h1 class="title is-2">
          POSTS
        </h1>
        <div v-for="post in postDetails" :key="post.title" class="posts">
          <span>
            <h3>
              {{ post.title }}
            </h3>
            <p>{{ post.body }}...</p>
            <router-link :to="'/posts/' + post.id">
              <button class="">Read More</button></router-link>
            <br>
            <button type="button" @click="deletePost(post.id)">
              <img width="20px" src="~/assets/img/delete.png" alt="">
            </button>
            <button @click="editPost(post.id)">
              <img width="20px" src="~/assets/img/edit.png" alt="">
            </button>
          </span>
        </div>
      </div>
      <!-- <h2 v-if="IsActive">
        User Posts
      </h2>
      <div>
        <h5>{{ blogs.title }}</h5>
        <p>
          <em>{{ blogs.body }}</em>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: {},
      post: {},
      blogTitle: '',
      blogBody: '',
      // isActive: false,
      isPosted: 'POST',
      changeText: 'Publish',
      postDetails: []
    }
  },
  mounted () {
    this.$axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.postDetails = response.data
      })
      .catch(err => console.log(err))
  },
  methods: {
    submit () {
      if (this.changeText !== 'Publish') {
        return this.updatePost(this.post.id)
      }
      return this.addPost()
    },

    addPost () {
      this.$axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          title: this.blogTitle,
          body: this.blogBody,
          userId: 1
        })
        .then((response) => {
          this.postDetails.push(response.data)
          this.clearForm()
          this.$toast.success('Submitted')
        })
        .catch(err => console.log(err))
    },

    updatePost (postId) {
      this.$axios
        .put('https://jsonplaceholder.typicode.com/posts/' + postId, {
          id: this.post.id,
          title: this.post.title,
          body: this.post.body,
          userId: 1
        })
        .then((response) => {
          const editedPost = this.postDetails.find(post => post.id === postId)
          console.log(editedPost)
          console.log(this.postDetails[postId])
        })
    },

    clearForm () {
      this.blogBody = ''
      this.blogTitle = ''
      this.changeText = 'Publish'
    },
    deletePost (postId) {
      this.$axios
        .delete('https://jsonplaceholder.typicode.com/posts/' + postId)
        .then(() => {
          this.postDetails = this.postDetails.filter(post => post.id !== postId)
          this.clearForm()
        })
    },

    editPost (postId) {
      this.post = this.postDetails.find(post => post.id === postId)
      this.changeText = 'Edit'
      // const { body, title, id } = this.postDetails[post - 1]
      this.blogBody = this.post.body
      this.blogTitle = this.post.title
      this.blogId = this.post.id
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
