import { http } from './http';
import { ui } from './ui';

// Get post on Dom Load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', addPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Get Posts
function getPosts () {
  http.get('http://localhost:3000/post')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Add Post
function addPost () {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  // Create Post
  http.post('http://localhost:3000/post', data)
    .then(data => {

      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearFields();

      getPosts();
    })
    .catch(err => console.log(err));
}

function deletePost(e) {
  http.delete();

  e.preventDefault();

  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you Sure?')) {
      http.delete(`http://localhost:3000/post/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success')
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

