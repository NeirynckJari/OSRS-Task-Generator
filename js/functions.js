function bindElements() {
    skillsDiv = document.getElementById("skills-div");
    btnGenerateTask = document.getElementById("generate-task");
    taskDiv = document.querySelector("#tasks-div");
    doneTaskDiv = document.querySelector("#done-tasks");
}

function addEventListeners() {
    btnGenerateTask.addEventListener("click", generateTask);
}

function createSkillBoxes() {
    skills.forEach((skill, i) => {
        const newImg = document.createElement("img");
        newImg.src = `${skills[i].img}`;
        const activateSkillHandler = function () {
            activateSkill(i, this);
        };
        newImg.addEventListener("click", activateSkillHandler);
        skillsDiv.append(newImg);
    });
}

function activateSkill(i, btn) {
    skills[i].generateTask = true;
    btn.classList.add("active");
    const deactivateSkillHandler = function () {
        deactivateSkill(i, this);
    };
    btn.addEventListener("click", deactivateSkillHandler);
}

function deactivateSkill(i, btn) {
    skills[i].generateTask = false;
    btn.classList.remove("active");
    const activateSkillHandler = function () {
        activateSkill(i, this);
    };
    btn.addEventListener("click", activateSkillHandler);
}

function generateTask() {
    const activatedTasks = skills.filter(
        (skill) => skill.generateTask === true
    );
    if (activatedTasks.length > 0) {
        const randomLength = activatedTasks.length;
        const randomNum = Math.floor(Math.random() * randomLength);
        const taskLength = activatedTasks[randomNum].tasks.length;
        const randomTask =
            activatedTasks[randomNum].tasks[
                Math.floor(Math.random() * taskLength)
            ];
        const newDiv = document.createElement("div");
        newDiv.textContent = `${activatedTasks[randomNum].name}:  ${randomTask}`;
        const newDoneButton = document.createElement("button");
        newDoneButton.classList.add("done-btn");
        newDoneButton.textContent = "✔";
        newDoneButton.addEventListener("click", function () {
            taskDone(this);
        });
        const newDeclineButton = document.createElement("button");
        newDeclineButton.classList.add("delete-btn");
        newDeclineButton.textContent = "✖";
        newDeclineButton.addEventListener("click", function () {
            removeTask(this);
        });
        newDiv.append(newDoneButton);
        newDiv.append(newDeclineButton);
        taskDiv.append(newDiv);
    } else {
        alert("You need to select a skill to generate tasks!");
        return;
    }
}

function taskDone(btn) {
    const newDiv = btn.parentElement;
    const text = newDiv.textContent;
    const newDivForDone = document.createElement("div");
    newDivForDone.textContent = text.substring(0, text.length - 2);
    doneTaskDiv.append(newDivForDone);
    newDiv.remove();
}

function removeTask(btn) {
    const newDiv = btn.parentElement;
    removedTask++;
    const removeTaskText = document.querySelector("h2");
    removeTaskText.textContent = `TASKS DECLINED: ${removedTask}`;
    newDiv.remove();
}
