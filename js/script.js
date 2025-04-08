"use strict"

let skillsDiv, btnGenerateTask, taskDiv, doneTaskDiv;
let removedTask = 0;

window.addEventListener("load", initialize);

function initialize(){
    bindElements();

    addEventListeners();

    createSkillBoxes();
}