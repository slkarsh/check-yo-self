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

	deleteFromStorage(listIndex, toDos) {
		toDos.splice(listIndex, 1);
		this.saveToStorage(toDos);	

	}

	updateToDo(index) {
		toDos[index].urgent = !toDos[index].urgent;


	}

	updateTask(task) {
		task.complete = !task.complete;
	}

	// markComplete(task) {
	// 	task.complete = !task.complete;

	// }

	
}

