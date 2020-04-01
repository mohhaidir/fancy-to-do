var $loginForm = $('#loginForm')
var $registerForm = $('#registerForm')
var $navLogin = $('#nav-login')
var $navRegister = $('#nav-register')
var $navLogout = $('#nav-logout')
var $todosForm = $('#todosForm')
var $getTodos = $('#getTodos')

var url = 'http://localhost:3000'

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
      $todosForm.show()
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
      localStorage.setItem('token', response.token)
      $.ajax({
        method: 'GET',
        url: `${url}/todos`
      })
        .done(i => {
          $('#tableTodos').append(`
          <tr id="${i.id}">
            <td>${i.title}</td>
            <td>${i.description}</td>
            <td>${i.status}</td>
            <td>${i.due_date}</td>
          </tr>
        `)
        })
      $loginForm.hide()
      $navLogin.hide()
      $navRegister.hide()
      $navLogout.show()
      $todosForm.show()
    })
    .fail(err => {

    })
})

function mainbody() {

}

function showLoginForm() {
  $loginForm.show()
  $registerForm.hide()
}

function showRegisterForm() {
  $registerForm.show()
  $loginForm.hide()
}

function showTodosForm() {
  $navLogin.hide()
  $navRegister.hide()
  $navLogout.show()
}

function logout() {
  localStorage.clear()
  $navLogin.show()
  $navRegister.show()
  $navLogout.hide()
  $todosForm.hide()
}
