const firebaseConfig = {
  apiKey: "AIzaSyB3MNsqQ7X6RX--X96M6zu0i6mjRJqTUGg",
  authDomain: "notesharp-57c65.firebaseapp.com",
  databaseURL: "https://notesharp-57c65-default-rtdb.firebaseio.com",
  projectId: "notesharp-57c65",
  storageBucket: "notesharp-57c65.appspot.com",
  messagingSenderId: "244613409847",
  appId: "1:244613409847:web:e2b1ca5756ea975592a3b2"
}
firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const auth = firebase.auth()
const provider =  new firebase.auth.GoogleAuthProvider()

export { database, auth, provider }