import { auth, database } from "./firebase.js";

const formatData = {
  formatData(data, limit){
    let dataFormatted = data.length >= 25 ? data.slice(0, limit) + "..." : data;
    return dataFormatted;
  },
}

const DOM = {
  userDisplayName: document.querySelector("#login"),
  buttonLogout: document.querySelector("#logout"),
  container: document.querySelector("#cards"),

  showNameUser(displayName){
    this.userDisplayName.removeAttribute("href");
    this.userDisplayName.innerHTML = displayName;
    
    this.userDisplayName.addEventListener("click", () => {
      this.buttonLogout.classList.toggle("active");
    });
  },

  generateAnnotationsHTML(annotation, key){  
    const content = 
    `<a href=/pages/annotation.html?id=${key}>
      <div class="card-Annotation">
        <section class="header-card">
          <h3>${formatData.formatData(annotation.title, 10)}</h3>
        </section>

        <section class="content">
          <p>${formatData.formatData(annotation.description, 100)}</p>
        </section>
      </div>
    </a>`;

    return content;
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
    `;

    return html;
  },

  renderAllAnottations(annotations, key){
    this.container.innerHTML += this.generateAnnotationsHTML(annotations, key);
  }
}

const Annotation = {
  async createAnnotation(){
    const anottation = {}

    const { key } = database.ref('annotations').push(anottation);
    location.href = `pages/annotation.html?id=${key}`;
  }
}

const App = {
  init(){
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      } 


      DOM.showNameUser(user.displayName);
      DOM.container.innerHTML = DOM.renderAnnontationsLoading();
      this.getUserAnnotations(user);
    });
  },

  getUserAnnotations(user){
    const ref = firebase.database().ref("annotations")
    .orderByChild("authorId").equalTo(user.uid);
    
    ref.once('value', (snapshot) => {
      const annotationData = snapshot.val();
      if(annotationData) {
        DOM.container.innerHTML = "";

        const keyAnottations = Object.keys(annotationData);
        keyAnottations.forEach(key => {
          const annotation = annotationData[key];
          console.log(annotation.title, annotation.description);
          if(!annotation.title || !annotation.description) return;
          DOM.renderAllAnottations(annotation, key);
        }); 
  
        return;
      }
    });
  }
}

export { App, Annotation };