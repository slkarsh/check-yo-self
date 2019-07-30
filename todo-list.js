class ToDoList {
	constructor(obj) {
		this.title = obj.title;
		this.id = obj.id || Date.now()
		this.urgent = obj.urgent || false;
		this.tasks = obj.tasks || [];

	}


	saveToStorage(toDos) {
		localStorage.setItem("listKey", JSON.stringify(toDos));

	}

	deleteFromStorage() {

	}

	updateToDo() {


	}

	updateTask() {

	}

	markComplete(task) {
		task.complete = !task.complete;

	}

	
}

