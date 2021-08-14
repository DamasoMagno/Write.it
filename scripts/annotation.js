import { database } from "./firebase.js";
import { Utils } from "./utils.js";

const idAnnotation = Utils.getParamsURL("id");
const ref = database.ref(`annotations/${idAnnotation}`);

let anottation = {};
let title = document.querySelector("#title");
let description = document.querySelector("#description");

title.addEventListener("keyup", editAnottation);
description.addEventListener("keyup", editAnottation);

function editAnottation(e){
  anottation = {
    ...anottation,
    [e.target.id]: e.target.innerText
  }
 
  changeContentAnnotation(anottation);
}

function changeContentAnnotation(anottation){
  if(idAnnotation){
    ref.set({
      ...anottation,
      authorId: JSON.parse(localStorage.getItem("@Notesharp:credentials"))
    });
  }
} 

const App = {
  init(){
    ref.once("value", snapshot => {
      const annotation = snapshot.val();
      if(annotation.title && annotation.description){
        title.innerHTML = annotation.title;
        description.innerHTML = annotation.description;
      }
    });
  }
}

export { App }