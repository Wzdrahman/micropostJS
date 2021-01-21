import { http } from './http';
import { ui } from './ui';

// Get post on Dom Load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', addPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }


if (title == '' || body === '') {
  ui.showAlert('Please fill in all fields', 'alert alert-danger');
}else {
  // check for id
  if (id === '') {
      // Create Post
      http.post('http://localhost:3000/post', data)
      .then(data => {
    
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
    
        getPosts();
      })
      .catch(err => console.log(err));
  } else {
    // update post
    http.put(`http://localhost:3000/post/${id}`, data)
    .then(data => {
  
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormState('add');
  
      getPosts();
    })
    .catch(err => console.log(err));
    
  }
   
    
  

}

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

// Enable Edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    // Fill form with current post
    ui.fillForm(data);

  }



  e.preventDefault();
}

// cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }


  e.preventDefault();
}