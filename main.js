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
var buttonContainer = document.querySelector('.nav__buttons');
var toDos = []



checkStorage();
appendLists();
// enableCreateList();



addTaskButton.addEventListener("click", createTask);
navBar.addEventListener("click", deleteFromList);
makeListButton.addEventListener("click", listHandler);
buttonContainer.addEventListener("mouseover", enableCreateList)
// taskInput.addEventListener("keyup", enableCreateList)
// titleInput.addEventListener("keyup", enableCreateList)
mainDisplay.addEventListener("click", cardHandler);
// makeListButton.addEventListener("mouseover", enableCreateList)




function listHandler(event) {
	event.preventDefault();
	// enableCreateList();
	createList(event);
	clearNavBar(event);
	disableButton();

}

function cardHandler(event) {
	if (event.target.classList[0] === 'main--checkbox-empty'){
		console.log("moo")
		// checkOffTask(event);
		findTaskIndex(event);
		markTaskComplete(event);
	}
	if (event.target.classList[0] === 'card__img--urgent'){
		updateUrgent(event);
	}
}

function findId(event) {
	var toDo = event.target.closest('.card');
	var toDoId = parseInt(toDo.dataset.id);
	console.log(toDoId)
	return toDoId;
}

function getIndex(event) {
	var list = event.target.closest('.card');
	var listId = parseInt(list.dataset.id);
	var listIndex = toDos.findIndex(function(toDo) {
		return toDo.id === listId;
	})
	return listIndex;
}

function findTaskIndex(event) {
		var listIndex = getIndex(event);
		var listedTask = event.target.closest('.card__list-item').innerText
		var tasksList = toDos[listIndex].tasks;
		var taskIndex = tasksList.findIndex(task => task.task === listedTask)
		taskIndex = parseInt(taskIndex);
	return taskIndex;
}

function markTaskComplete(event) {
	var listIndex = getIndex(event);
	var taskIndex = findTaskIndex(event);
	var card = toDos[listIndex]
	card.markComplete(card.tasks[taskIndex])
	var checkImg = event.target;
	var unchecked = 'images/checkbox.svg';
	var checked = 'images/checkbox-active.svg'
	toDos[listIndex].tasks[taskIndex].complete === true ? checkImg.src = checked : checkImg.src = unchecked;
	toDos[listIndex].saveToStorage(toDos);
}

function updateUrgent(event) {
	var index = getIndex(event);
	toDos[index].urgent = !toDos[index].urgent;
	var urgentImg = event.target;
	var notUrgent = 'images/urgent.svg';
	var urgent = 'images/urgent-active.svg';
	toDos[index].urgent === false ? urgentImg.src = notUrgent : urgentImg.src = urgent
	toDos[index].saveToStorage(toDos);
}

function enableCreateList() {
	var listAreaItem = document.querySelector('.nav__tasklist').firstChild;
	var listAreaItemText = listAreaItem ? listAreaItem.textContent : "";
	if (titleInput.value !== "" && listAreaItemText !== "") {
		makeListButton.removeAttribute('disabled');
	} else {
		makeListButton.setAttribute('disabled', null);
	}
}

function disableButton() {
	makeListButton.setAttribute('disabled', null);
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
	// enableCreateList();
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
	mainDisplay.insertAdjacentHTML('afterbegin', `<article class="card masonry-item" data-id=${toDo.id}>
				<header class="card__header">
					<h3 class="card__title">${toDo.title}</h3>
				</header>
			<section class="card__main">
				<ul>
					${toDo.tasks.map(function(task){
						return `<li class="card__list-item"><img src=${task.complete ? 'images/checkbox-active.svg' : 'images/checkbox.svg'} class="main--checkbox-empty">${task.task}</li>`
					}).join("")}
				</ul>
			</section>
			<footer class="card__footer">
				<img src=${toDo.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'} class="card__img--urgent" alt="urgent lightning bolt">
				<figcaption class="urgent__tag">Urgent</figcaption>
				<img src="images/delete.svg" class="card__img--delete" alt="delete icon">
				<p class="delete__tag">Delete</p>
			</footer>
		</article>`)

}