var navBar = document.querySelector('.nav');
var titleInput = document.querySelector('.title__input');
var taskInput = document.querySelector('.task__input');
var mainDisplay = document.querySelector('.main__section');
var searchInput = document.querySelector('.header__search--input');
var addTaskButton = document.querySelector('.task__add--button');
var navBar = document.querySelector('.nav');
var addTaskButton = document.querySelector('.task__add--button');
var makeListButton = document.querySelector('.top__create--button');
var clearButton = document.querySelector('.top__clear--button');
var toDos = []



checkStorage();
appendLists();



addTaskButton.addEventListener("click", createTask);
navBar.addEventListener("click", deleteFromList);
makeListButton.addEventListener("click", listHandler);
mainDisplay.addEventListener("click", cardHandler);




function listHandler(event) {
	event.preventDefault();
	enableCreateList();
	createList();
	clearNavBar();

}

function cardHandler(event) {
	findId(event);
	findIndex(event);

}

function findId(event) {
	var toDo = event.target.closest('.card');
	var toDoId = parseInt(toDo.dataset.id);
	console.log(toDoId)
	return toDoId;
}

function findIndex(event) {
	var list = event.target.closest('.card');
	var listId = parseInt(list.dataset.id);
	var listIndex = toDos.findIndex(function(toDo) {
		return toDo.id === listId;
	})
	console.log(listIndex)
	return listIndex;
}


function checkOffTask(event) {
	findId(event);
	findIndex(event);
	var checkBox = event.target;
	console.log(checkBox)
	if(event.target.innerHTML.includes('.main--checkbox-empty')){
		checkBox.setAttrbute("src", "images/checkbox-active.svg")
		checkBox.addClassList('main--checkbox-checked')
	}
}

function enableCreateList() {
	if (titleInput.value === "" || taskInput.value === "") {
		makeListButton.disabled = true;
	} else {
		makeListButton.disabled = false;
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

function appendLists() {
	for (var i = 0; i < toDos.length; i++) {
		console.log(toDos);
		generateToDoCard(toDos[i]);
	}
}

function clearNavBar() {
	var listItems = Array.from(document.querySelector('.nav__tasklist').childNodes);
	listItems.forEach(item => {
		item.remove()
	})
}



function createTask(event) {
		if (taskInput.value !== "") {
			var listArea = document.querySelector('.nav__tasklist');
			var addedTask = taskInput.value;
			listArea.insertAdjacentHTML("beforeend", `<li class="nav__list-item"> <img src="images/delete.svg" class="task__delete--button">
							<p class="li__text">${addedTask}</p></li>`)
			taskInput.value = "";
	}
}

function deleteFromList(event) {
	if (event.target.classList[0] === "task__delete--button") {
		console.log("hellooooo")
		var task = event.target.closest('.nav__list-item')
		task.remove();
	}
}

function createTaskArray() {
	var taskItems = document.querySelectorAll('.nav__list-item');
	var taskItemsArray = Array.from(taskItems);
	var taskText = taskItemsArray.map(function(task) {
		return task.innerText;
	});
	var taskObjs = taskText.map(function(task){
		return {task: `${task}`, complete: false, id: Date.now()}
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
	console.log(toDo);
	mainDisplay.insertAdjacentHTML('afterbegin', `<article class="card" data-id=${toDo.id}>
				<header class="card__header">
					<h3 class="card__title">${toDo.title}</h3>
				</header>
			<section class="card__main">
				<ul>
					${toDo.tasks.map(function(task){
						return `<li><img src="images/checkbox.svg" class="main--checkbox-empty">${task.task}</li>`
					}).join("")}
				</ul>
			</section>
			<footer class="card__footer">
				<img src="images/urgent.svg" class="card__img--urgent" alt="urgent lightning bolt">
				<img src="images/delete.svg" class="card__img--delete" alt="delete icon">
			</footer>
		</article>`)

}