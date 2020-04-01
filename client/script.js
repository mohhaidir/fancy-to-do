var $loginForm = $('#loginForm')
var $registerForm = $('#registerForm')
var $navLogin = $('#nav-login')
var $navRegister = $('#nav-register')
var $navLogout = $('#nav-logout')

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
    })
    .fail(err => {
      // console.log(err)
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

function logout() {
  localStorage.clear()
  $navLogin.show()
  $navRegister.show()
  $navLogout.hide()
  showLoginForm()
}