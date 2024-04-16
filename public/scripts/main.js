const quotes = document.getElementById('quotes');
const error = document.getElementById('error');

const firebaseConfig = {
    apiKey: "AIzaSyDillDODE8ryEW0xLQMPz_4_LSnvx3I7q0",
    authDomain: "basic-ecommerce-647b5.firebaseapp.com",
    projectId: "basic-ecommerce-647b5",
    storageBucket: "basic-ecommerce-647b5.appspot.com",
    messagingSenderId: "528712988913",
    appId: "1:528712988913:web:4278fd39d1d4632063d150",
    measurementId: "G-E8WSZF7X96"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const displayQuotes = (allQuotes) => {
  let html = '';
  for (const quote of allQuotes) {
    html += `<blockquote class="wp-block-quote">
                <p>${quote.quote}. </p><cite>${quote.character}</cite>
            </blockquote>`;
  }
  return html;
};