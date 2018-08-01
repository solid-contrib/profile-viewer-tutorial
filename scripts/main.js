$(async () => {
  $('#login button').click(login);
  $('#logout button').click(logout);
  await displayLoginStatus();
});

async function login() {
  await SolidAuthClient.popupLogin({ popupUri: 'scripts/login.html' });
  displayLoginStatus();
}

async function logout() {
  await SolidAuthClient.logout();
  displayLoginStatus();
}

async function displayLoginStatus() {
  const session = await SolidAuthClient.currentSession();
  // The user is not logged in
  if (!session) {
    $('#login').show();
    $('#logout').hide();
  }
  // The user is logged in
  else {
    $('#login').hide();
    $('#logout').show();
    $('#user').text(session.webId);
  }
}
