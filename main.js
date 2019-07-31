var navBar = document.querySelector(".nav");
var titleInput = document.querySelector(".title__input");
var taskInput = document.querySelector(".task__input");
var mainDisplay = document.querySelector(".main__section");
var searchInput = document.querySelector(".header__search--input");
var addTaskButton = document.querySelector(".task__add--button");
var navBar = document.querySelector(".nav");
var addTaskButton = document.querySelector(".task__add--button");
var makeListButton = document.querySelector(".top__create--button");
var clearButton = document.querySelector(".top__clear--button");
var buttonContainer = document.querySelector(".nav__buttons");
var urgentFilterButton = document.querySelector(".bottom__filter--button");
var toDos = []


checkStorage();
appendLists();
insertWelcomePrompt();

addTaskButton.addEventListener("click", createTask);
navBar.addEventListener("click", deleteFromList);
makeListButton.addEventListener("click", listHandler);
buttonContainer.addEventListener("mouseover", enableCreateList)
mainDisplay.addEventListener("click", cardHandler);
searchInput.addEventListener("keyup", searchCardTitles);

function listHandler(event) {
	event.preventDefault();
	createList(event);
	clearNavBar(event);
	disableButton();
}

function cardHandler(event) {
	if (event.target.classList[0] === "main--checkbox-empty" || event.target.classList[0] === "main--checkbox-complete"){
		findTaskIndex(event);
		markTaskComplete(event);
	}
	if (event.target.classList[0] === "card__img--urgent"){
		updateUrgent(event);
	}
	if (event.target.classList[0] === "card__img--delete") {
		deleteFromDom(event);
	}
}

function insertWelcomePrompt() {
	if (mainDisplay.innerText === "" || mainDisplay.innerText === " ") {
		mainDisplay.insertAdjacentHTML("afterbegin", `<article class="card__prompt">
				<p class="prompt__message">Get yourself organized! Start making your to-do list to the left!</p>
			</article>`)
	}
}

function removePrompt() {
  var prompt = document.querySelector(".card__prompt");
  if (prompt) {
    prompt.parentNode.removeChild(prompt)
  }
}

function appendLists() {
	for (var i = 0; i < toDos.length; i++) {
		generateToDoCard(toDos[i]);
	}
}

function findId(event) {
	var toDo = event.target.closest(".card");
	var toDoId = parseInt(toDo.dataset.id);
	return toDoId;
}

function getIndex(event) {
	var list = event.target.closest(".card") || event.target.closest(".urgent");
	var listId = parseInt(list.dataset.id);
	var listIndex = toDos.findIndex(function(toDo) {
		return toDo.id === listId;
	})
	return listIndex;
}

function enableCreateList() {
	var listAreaItem = document.querySelector(".nav__tasklist").firstChild;
	var listAreaItemText = listAreaItem ? listAreaItem.textContent : "";
	if (titleInput.value !== "" && listAreaItemText !== "") {
		makeListButton.removeAttribute("disabled");
	} else {
		makeListButton.setAttribute("disabled", null);
	}
}

function checkStorage() {
	if (JSON.parse(localStorage.getItem("listKey")) === null) {
		toDos = []
	} else {
		toDos = JSON.parse(localStorage.getItem("listKey")).map(function(element) {
			return new ToDoList(element)
		});
	}
}
function disableButton() {
	makeListButton.setAttribute("disabled", null);
}

function findTaskIndex(event) {
		var listIndex = getIndex(event);
		var listedTask = event.target.closest('.card__list-item').innerText
		var tasksList = toDos[listIndex].tasks;
		var taskIndex = tasksList.findIndex(task => task.task === listedTask)
		taskIndex = parseInt(taskIndex);
	return taskIndex;
}

function clearNav(event) {
	var navTaskList = document.querySelector(".nav__tasklist")
	if (titleInput.length !== 0 || navTaskList.innerText !== null ) {
		deleteFromList();
		titleInput = ""
	}
}

function markTaskComplete(event) {
	var listIndex = getIndex(event);
	var taskIndex = findTaskIndex(event);
	var card = toDos[listIndex]
	card.updateTask(card.tasks[taskIndex])
	var checkImg = event.target;
	var unchecked = "images/checkbox.svg";
	var checked = "images/checkbox-active.svg"
	toDos[listIndex].tasks[taskIndex].complete === true ? checkImg.src = checked : checkImg.src = unchecked;
	toDos[listIndex].tasks[taskIndex].complete === true ? checkImg.className = "main--checkbox-complete" : checkImg.className = "main--checkbox-empty";
	toDos[listIndex].saveToStorage(toDos);
	addCheckStyling(event);
}

function addCheckStyling(event) {
	if (event.target.classList[0] === "main--checkbox-complete"){
	event.target.closest(".card__list-item").classList.add("check-styling");
	}
	else {
		event.target.closest(".card__list-item").classList.remove("check-styling")
	}
}


function updateUrgent(event) {
	var index = getIndex(event);
	toDos[index].urgent = !toDos[index].urgent;
	var urgentImg = event.target;
	var notUrgent = "images/urgent.svg";
	var urgent = "images/urgent-active.svg";
	toDos[index].urgent === false ? urgentImg.src = notUrgent : urgentImg.src = urgent
	addUrgentStyling(event);
	toDos[index].saveToStorage(toDos);
}

function addUrgentStyling(event) {
	var card = event.target.closest(".card");
	var index = getIndex(event);
	if (toDos[index].urgent === true) {
		card.classList.add("urgent")
	} else {		
		card.classList.remove("urgent");
	}
}


function deleteFromDom(event) {
	var card = event.target.closest(".card");
	var listIndex = getIndex(event);
	var emptyCheckBoxes = card.querySelectorAll(".main--checkbox-empty").length;
	if (emptyCheckBoxes === 0) {
		card.remove();
		toDos[listIndex].deleteFromStorage(listIndex, toDos)
	}
}

function searchCardTitles() {
  var searchInput = document.querySelector(".header__search--input").value;
  searchInput = searchInput.toLowerCase();
  var cardContent = document.querySelectorAll(".card__title");
  var card = document.querySelectorAll(".card");
  for (var i = 0; i < cardContent.length; i++) {
    if (!cardContent[i].innerText.toLowerCase().includes(searchInput)) {
      card[i].classList.add("hidden");
    } else if (searchInput.length === 0) {
      card[i].classList.remove("hidden");
    }
  }
}


function clearNavBar() {
	var listItems = Array.from(document.querySelector(".nav__tasklist").childNodes);
	listItems.forEach(item => {
		item.remove()
	})
}

function deleteFromList(event) {
	if (event.target.classList[0] === "task__delete--button") {
		console.log("hellooooo")
		var task = event.target.closest(".nav__list-item")
		task.remove();
	}
}

function createTask(event) {
		if (taskInput.value !== "") {
			var listArea = document.querySelector(".nav__tasklist");
			var addedTask = taskInput.value;
			listArea.insertAdjacentHTML("beforeend", `<li class="nav__list-item"> <img src="images/delete.svg" class="task__delete--button">
							<p class="li__text">${addedTask}</p></li>`)
			taskInput.value = "";
	}
}
function createTaskArray() {
	var taskItems = document.querySelectorAll(".nav__list-item");
	var taskItemsArray = Array.from(taskItems);
	var taskText = taskItemsArray.map(function(task) {
		return task.innerText;
	});
	var taskObjs = taskText.map(function(task){
		return {task: `${task.trim()}`, complete: false, id: Date.now()}
	});
	return taskObjs;
}

function createList(taskObjs) {
	var taskObjs = createTaskArray();
	var toDo = new ToDoList ({
		title: titleInput.value, 
		tasks: taskObjs,
		id: Date.now()
	});
	toDos.push(toDo);
	toDo.saveToStorage(toDos);
	generateToDoCard(toDo);
	titleInput.value = "";
	taskInput.value = "";
}

function generateToDoCard(toDo) {
	var cardClass = toDo.urgent ? 'urgent' : null
	console.log(cardClass)
	mainDisplay.insertAdjacentHTML('afterbegin', `<article class="card ${cardClass}" data-id=${toDo.id}>
				<header class="card__header">
					<h3 class="card__title">${toDo.title}</h3>
				</header>
			<section class="card__main">
				<ul>
					${toDo.tasks.map(function(task){
						var imagePath = task.complete ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
						var imageClass = task.complete ? 'main--checkbox-complete' : 'main--checkbox-empty'
						return `<li class="card__list-item"><img src=${imagePath} class=${imageClass}>${task.task}</li>`
					}).join("")}
				</ul>
			</section>
			<footer class="card__footer">
				<div class= "card__footer-urgentimg">
					<img src=${toDo.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'} class="card__img--urgent" alt="urgent lightning bolt">
					<figcaption class="urgent__tag">Urgent</figcaption>
				</div>
				<div class="card__footer-deleteimg">
					<img src="images/delete.svg" class="card__img--delete" alt="delete icon">
					<p class="delete__tag">Delete</p>
				</div>
			</footer>
		</article>`)
	removePrompt()
}