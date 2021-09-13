import { auth, database } from "./firebase.js"

const databaseRef = database.ref("/annotations")

const formatData = {
  formatData(data, maxLength,limit){
    let dataFormatted = data.length >= maxLength ? data.slice(0, limit) + "..." : data
    return dataFormatted
  },
}

let userInformations

const DOM = {
  container: document.querySelector("#cards"),

  generateAnnotationsHTML(annotation, key){  
    const content = 
    `<a href="pages/annotation.html?id=${key}">
      <div class="card-Annotation">
        <section class="header-card">
          <h3>${formatData.formatData(annotation.title, 50, 30)}</h3>
        </section>

        <section class="content">
          <p>${formatData.formatData(annotation.description, 100, 150)}</p>
          <button id="delete">
            <img src="../assets/garbageImage.png">
          </button>
        </section>
      </div>
    </a>`

    return content
  },

  renderAnnontationsLoading(){
    const html = `
    <div class="card-Loading">
      <section class="header-card">
        <h3></h3>
      </section>
  
      <section class="content">
        <p></p>
      </section>
    </div>
    `

    return html
  },

  renderAllAnottations(annotations, key){
    this.container.innerHTML += this.generateAnnotationsHTML(annotations, key)

    document.querySelector("#delete")
      .addEventListener("click", (e) => {
        e.preventDefault()
        Annotation.removeAnnotation(key)
      })
  },

  clearContainer(){
    this.container.innerHTML = ""
  }
}

const Annotation = {
  createAnnotation(){
    const anottation = {}

    const { key } = databaseRef.push(anottation)
    location.href = `pages/annotation.html?id=${key}`
  },

  removeAnnotation(id){
    database.ref(`/annotations/${id}`).remove()
    App.getUserAnnotations()
  }
}

const App = {
  init(){
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return
      } 

      userInformations = user
      DOM.container.innerHTML = DOM.renderAnnontationsLoading()
      this.getUserAnnotations()
    })
  },

  getUserAnnotations(){
    const userAnnotations = databaseRef
      .orderByChild("authorId")
      .equalTo(userInformations.uid)
    
    userAnnotations.once('value', snapshot => {
      const annotationData = snapshot.val()
      
      if(!annotationData){
        setTimeout(() => {
          DOM.clearContainer()
        }, 1000)
        return;
      }

      DOM.clearContainer()

      Object.keys(annotationData)
        .forEach(key => {
          const annotation = annotationData[key]
          if(!annotation.title || !annotation.description) return
          DOM.renderAllAnottations(annotation, key)
        }) 
    })
  }
}

export { App, Annotation }