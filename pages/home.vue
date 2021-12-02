<template>
  <div id="full">
    <div class="container form-top">
      <h1 class="heading">
        deji's blog
      </h1>

      <div class="">
        <form method="post" autocomplete="off" @submit.prevent="submit">
          <div
            class="field"
            :class="{ error: validation.hasError('blogTitle') }"
          >
            <label class="label">Title:</label>
            <div class="control form-input">
              <input
                v-model="blogTitle"
                class="input"
                type="text"
                placeholder="Blog Title"
              >
              <div class="message">
                {{ validation.firstError('blogTitle') }}
              </div>
            </div>
          </div>

          <div
            class="field"
            :class="{ error: validation.hasError('blogBody') }"
          >
            <label class="label">Post:</label>
            <div class="control form-input">
              <textarea
                id=""
                v-model="blogBody"
                class="textarea"
                placeholder="Blog Body"
              />
              <div class="message">
                {{ validation.firstError('blogTitle') }}
              </div>

              <div>
                <button class="button" type="submit" @click="submit">
                  {{ changeText }}
                </button>
                <button class="button" type="submit" @click="clearForm">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <p class="title left-post">
        all posts...
      </p>

      <div
        v-for="post in postDetails"
        :key="post.title"
        class="card card-container pb-10"
      >
        <header class="card-header">
          <p class="card-header-title">
            {{ post.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ post.body.substring(0, 100) }}...
            <br>
            <br>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            <nuxt-link :to="'/posts/' + post.id">Read More</nuxt-link>
          </a>
          <a class="card-footer-item" @click="editPost(post.id)">Edit</a>
          <a class="card-footer-item" @click="deletePost(post.id)">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from 'simple-vue-validator'

export default {
  data () {
    return {
      blogs: {},
      post: {},
      blogTitle: '',
      blogBody: '',
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
    submit (event) {
      // if (this.changeText !== 'Publish') {
      //   return this.updatePost(this.post.id)
      // }
      // return this.addPost()
      event.preventDefault()
      this.$validate().then(function (success) {
        if (success) {
          console.log('Validation succeeded!')
        }
      })
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
      this.$validate().reset()
    },
    deletePost (postId) {
      this.$axios
        .delete('https://jsonplaceholder.typicode.com/posts/' + postId)
        .then(() => {
          this.postDetails = this.postDetails.filter(post => post.id !== postId)
          this.clearForm()
          this.$toast.success('Deleted')
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
  },
  validators: {
    blogBody (value) {
      return Validator.value(value).required()
    },
    blogTitle (value) {
      return Validator.value(value).required()
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
  margin-right: 10px;
  margin-left: 10px;
}
label,
textarea {
  padding-left: 30px;
  text-align: left;
}
.left-post {
  margin-top: 100px;
  margin-left: 30px;
  text-align: left;
}
.heading {
  font-size: 40px;
  font-weight: bolder;
}
.form-top {
  background-color: white;
}
.form-input {
  margin-left: 60px;
  margin-right: 60px;
}

#full {
  background-color: #faedf0;
}
.card-container {
  margin-top: 70px;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
}
</style>
