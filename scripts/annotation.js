import { database } from "./firebase.js"
import { Utils } from "./utils.js"

const idAnnotation = Utils.getParamsURL("id")
const ref = database.ref(`annotations/${idAnnotation}`)

let anottation = {};
let title = document.querySelector("#title")
let description = document.querySelector("#description")

title.addEventListener("keyup", editAnottation)
description.addEventListener("keyup", editAnottation)

function getContentElement(element){
  const text = document.querySelector(`#${element}`).innerText
  return text || ""
}

function editAnottation(){
  anottation = {
    title: getContentElement("title"),
    description: getContentElement("description")
  }
 
  changeContentAnnotation(anottation)
}

function changeContentAnnotation(anottation){
  if(!idAnnotation) return
  if(!anottation.title && !anottation.description) return

  ref.set({
    ...anottation,
    authorId: JSON.parse(localStorage.getItem("@Notesharp:credentials"))
  });
} 

const App = {
  init(){
    ref.once("value", snapshot => {
      const annotation = snapshot.val();
      if(!annotation) return

      title.innerText = annotation.title
      description.innerText = annotation.description
    });
  }
}

export { App }