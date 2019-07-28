var navBar = document.querySelector('.nav');
var titleInput = document.querySelector('.title__input');
var taskInput = document.querySelector('.task__input');
var mainDisplay = document.querySelector('.main__section');
var searchInput = document.querySelector('.header__search--input');
var addTaskButton = document.querySelector('.task__add--button');
var navBar = document.querySelector('.nav');
var addTaskButton = document.querySelector('.task__add--button');
var makeListButton = document.querySelector('.top__create--button');


var toDos = []



addTaskButton.addEventListener("click", createTask);
navBar.addEventListener("click", deleteFromList);
makeListButton.addEventListener("click", listHandler);



function listHandler(event) {
	event.preventDefault();
	createTaskArray();
	createList();
	generateToDoCard();
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
	console.log(taskItems);
	var taskItemsArray = Array.from(taskItems);
	console.log(taskItemsArray)
	taskItemsArray.map(function(task) {
		return task.innerText;
	});
	console.log(taskItemsArray);
	var taskObjs = taskItemsArray.map(function(task){
		return {task: `${task}`, complete: false, id: Date.now()}
	});
	return taskObjs;
}

function createList() {
	var toDo = new ToDoList ({
		title: titleInput.value, 
		tasks: taskObjs,
		id: Date.now()
	});
	toDos.push(toDo);
	generateToDoCard(toDo);
}

function generateToDoCard(toDo) {
	mainDisplay.insertAdjacentHTML('afterbegin', `<article class="card" data-id=${toDo.id}>
				<header class="card__header">
					<h3 class="card__title">${toDo.title}</h3>
				</header>
			<section class="card__main">
				<ul>
					${tasks}
				</ul>
			</section>
			<footer class="card__footer">
				<img src="images/urgent.svg" class="card__img--urgent" alt="urgent lightning bolt">
				<img src="images/delete.svg" class="card__img--delete" alt="delete icon">
			</footer>
		</article>`)

}