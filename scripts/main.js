const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

$(async () => {
  $('#login button').click(login);
  $('#logout button').click(logout);
  $('#view').click(() => loadProfile($('#profile').val()));
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
    // Use the user's WebID as default profile
    if (!$('#profile').val())
      $('#profile').val(session.webId);
  }
}

async function loadProfile(person) {
  // Set up a local data store and associated data fetcher
  const store = $rdf.graph();
  const fetcher = new $rdf.Fetcher(store);

  // Load the person's data into the store
  await fetcher.load(person);
  const fullName = store.any($rdf.sym(person), VCARD('fn'));
  $('#viewer').show();
  $('#fullName').text(fullName && fullName.value);
}
