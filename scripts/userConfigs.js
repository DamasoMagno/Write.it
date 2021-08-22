import { auth } from "./firebase.js"

const userConfigs = {
  displayNameElement: document.querySelector("#login"),
  logoutUserElement: document.querySelector("#logout"),

  showDisplayName(){
    auth.onAuthStateChanged((user) => {
      if(!user?.displayName) return
      
      this.displayNameElement.removeAttribute("href")
      this.displayNameElement.innerHTML = user?.displayName

      this.displayNameElement.addEventListener("click", () => {
        this.logoutUserElement.classList.toggle("active")
      })
    })
  },
}

export { userConfigs }