import { auth, provider } from "./firebase.js"

function toast(error){
  Toastify({
    text: `${error}`,
    duration: 1500,
    close: true,
    gravity: "top", 
    position: "center",
    backgroundColor: "#9CA3AF",
  }).showToast()
}

function saveIdAndRedirect(credentials){
  localStorage.setItem("@Notesharp:credentials", JSON.stringify(credentials.uid))
  location.href = "/"
}

const authConfigs = {
  async signUp(email, password, displayName){
    const userEmail = email.value
    const userPassword = password.value
    const displayUser = displayName.value

    try {
      const { user: credentials } = await auth.createUserWithEmailAndPassword(userEmail, userPassword)
      credentials.updateProfile({
        displayName: displayUser
      })
      saveIdAndRedirect(credentials)
    } catch {
      toast("This user already exists")
    }    
  },

  async signIn(email, password){
    const userEmail = email.value
    const userPassword = password.value

    try {
      const { user: credentials } = await auth.signInWithEmailAndPassword(userEmail, userPassword)
      saveIdAndRedirect(credentials)
    } catch {
      toast("Email/Password incorrect")
    }
  },

  async logoutUser(){
    try {
      await auth.signOut()
      localStorage.removeItem("@Notesharp:credentials")
      location.href = "/"
    } catch {
      console.log(error.message)
      toast("You aren't logged in")
    }
  },

  async loginGoogle(){
    try {
      const { user: credentials }  = await auth.signInWithPopup(provider)
      saveIdAndRedirect(credentials)
    } catch (error) {
      toast(error.message);
    }
  }
}

export { authConfigs }