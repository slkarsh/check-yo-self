class ToDoList {
	constructor(obj) {
		this.title = obj.title;
		this.id = obj.id || Date.now()
		this.urgent = obj.urgent || false;
		this.tasks = obj.tasks || [];

	}


	saveToStorage(todos) {
		localStorage.setItem("listKey", JSON.stringify(todos));

	}

	deleteFromStorage() {

	}

	updateToDo () {

	}

	updateTask () {

	}
}