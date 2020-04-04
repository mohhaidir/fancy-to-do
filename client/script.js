var $loginForm = $('#loginForm')
var $registerForm = $('#registerForm')
var $navLogin = $('#nav-login')
var $navRegister = $('#nav-register')
var $navLogout = $('#nav-logout')
var $todosForm = $('#todosForm')
var $getTodos = $('#getTodos')

var url = 'http://localhost:3000'

$(document).ready(function () {
  let token = localStorage.getItem('token')
  if (token) {
    $todosForm.show()
    $loginForm.hide()
    $navLogin.hide()
    $navRegister.hide()
    $navLogout.show()
    $getTodos.show()
    getTodos()
  } else {
    $loginForm.show()
    $navLogin.show()
    $navRegister.show()
    $navLogout.hide()
    $todosForm.hide()
    $getTodos.hide()
  }
})

$loginForm.on('submit', (e) => {
  e.preventDefault()
  var $emailLogin = $('#email-login').val()
  var $passwordLogin = $('#password-login').val()

  $.ajax({
    method: 'POST',
    url: `${url}/users/login`,
    data: {
      email: $emailLogin,
      password: $passwordLogin
    }
  })
    .done(response => {
      localStorage.setItem('token', response.token)
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      getTodos()
      $todosForm.show()
    })
    .fail(err => {
      // console.log(err)
    })
})

$registerForm.on('submit', (e) => {
  e.preventDefault()
  var $usernameRegister = $('#username-register').val()
  var $emailRegister = $('#email-register').val()
  var $passwordRegister = $('#password-register').val()
  $.ajax({
    method: 'POST',
    url: `${url}/users/register`,
    data: {
      username: $usernameRegister,
      email: $emailRegister,
      password: $passwordRegister
    }
  })
    .done(response => {
      localStorage.setItem('token', response.token)
      $registerForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      $todosForm.hide()
    })
    .fail(err => {
      // console.log(err)
    })
})

$todosForm.on('submit', (e) => {
  e.preventDefault()
  var $titleTodos = $('#title-todos').val()
  var $descriptionTodos = $('#description-todos').val()
  var $statusTodos = $('#status-todos').val()
  var $dueDateTodos = $('#due-date-todos').val()

  $.ajax({
    method: 'POST',
    url: `${url}/todos`,
    data: {
      title: $titleTodos,
      description: $descriptionTodos,
      status: $statusTodos,
      due_date: $dueDateTodos
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      $('#tableTodos').show()
      getTodos()
    })
    .fail(err => {

    })
})

function getTodos() {
  $.ajax({
    method: 'GET',
    url: `${url}/todos`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('#tableTodos tbody').empty()
      data.result.forEach(el => {
        $('#tableTodos tbody').append(`
        <tr id="${el.id}">
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>${el.status}</td>
          <td>${el.due_date}</td>
          <td>
            <button onclick=edit(${el.id})>Edit</button>
            <button onclick=hapus(${el.id})>Delete</button>
          </td>
        </tr>
        `)
      })
    })
}

function hapus(id) {
  $.ajax({
    method: 'DELETE',
    url: `${url}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $('#tableTodos tbody').empty()
      getTodos()
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      $todosForm.show()
    })
    .fail(err => {

    })
}

function edit(id) {
  $.ajax({
    method: 'GET',
    url: `${url}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('#edit-form-todos').show()
      $todosForm.hide()
      $getTodos.hide()
      $('#edit-form-todos').append(`
        <form id="edit-form">
          <div class="form-group">
            <input type="hidden" value="${data.result.id}" id="id-todos"><br>
          </div>
          <div class="form-group">
            <label>Title:</label><br>
            <input type="text" value="${data.result.title}" id="title-todos"><br>
          </div>
          <div class="form-group">
            <label>Description:</label><br>
            <input type="text" value="${data.result.description}" id="description-todos"><br>
          </div>
          <div class="form-group">
            <label>Status:</label><br>
            <input type="text" value="${data.result.status}" id="status-todos"><br>
          </div>
          <div class="form-group">
            <label>Due Date:</label><br>
            <input type="date" value="${data.result.due_date}" id="due-date-todos"><br>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      `)
    })
}

$('#edit-form').submit(function (e) {
  e.preventDefault()
  var $titleTodos = $('#title-todos').val()
  var $descriptionTodos = $('#description-todos').val()
  var $statusTodos = $('#status-todos').val()
  var $dueDateTodos = $('#due-date-todos').val()
  var id = $('#id-todos').val()
  $.ajax({
    method: 'PUT',
    url: `${url}/todos/${id}`,
    data: {
      title: $titleTodos,
      description: $descriptionTodos,
      status: $statusTodos,
      due_date: $dueDateTodos
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      $('#tableTodos').show()
      getTodos()
    })
    .fail(err => {

    })
})

function showLoginForm() {
  $loginForm.show()
  $registerForm.hide()
  $todosForm.hide()
}

function showRegisterForm() {
  $loginForm.hide()
  $registerForm.show()
  $todosForm.hide()
}

function showTodosForm() {
  $navLogin.hide()
  $navRegister.hide()
  $todosForm.hide()
  getTodos()
  $navLogout.show()
}

function logout() {
  localStorage.clear()
  $navLogin.show()
  $navRegister.show()
  $navLogout.hide()
  $todosForm.hide()
  $loginForm.show()
  $('#tableTodos').empty()
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  $.ajax({
    type: "POST",
    url: `${url}/users/googleLogin`,
    data: {
      id_token
    },
    success: (response) => {
      localStorage.setItem('token', response.token)
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      getTodos()
      $todosForm.show()
    },
    fail: (err) => {

    }
  })
}