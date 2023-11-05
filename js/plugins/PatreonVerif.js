var patreonAccessToken = '_QrLeyU6Ec9VivuFIuKIVLJbARhq1xsttIjKjDoKdew'; // Replace with the actual access token
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.patreon.com/api/oauth2/v2/current_user/campaigns', true);
xhr.setRequestHeader('Authorization', 'Bearer ' + patreonAccessToken);

xhr.onload = function () {
  if (xhr.status === 200) {
    // Handle the response, which contains campaign information and subscription status
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
  } else {
    // Handle errors
    console.error('Error:', xhr.status);
  }
};

xhr.send();