const baseUrl = 'http://localhost:3000/'

function auth () {
  if (!localStorage.access_token) {
    $("#login-page").show()
    $("#main-page").hide()
  } else {
    $("#login-page").hide()
    $("#main-page").show()
    getData()
  }
}

$(document).ready(() => {
  auth()
})

function getData () {
  $.ajax({
    url: baseUrl + 'photos',
    method: 'get',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done((data) => {
      console.log(data)

    })
    .fail(err => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('getData is running')
    })
}

function login () {
  const email = $("#email").val()
  const password = $("#password").val()

  $.ajax({
    url: baseUrl + 'login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done((data) => {
      console.log(data.access_token)
      localStorage.setItem('access_token', data.access_token)
    })
    .fail(err => {
      console.log(err.responseText)
    })
    .always(() => {
      console.log('login running')
    })
}

$("#loginForm").on('submit', (event) => {
  event.preventDefault();
  login()
  auth()
})