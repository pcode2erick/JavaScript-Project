const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//add EventListener
document.addEventListener("DOMContentLoaded",loadfromLS);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteTask);
filterOption.addEventListener("change",filterTodo);

function addTodo(event){
	event.preventDefault();
	
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	
	const completeButton = document.createElement("button");
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("complete-btn");
	todoDiv.appendChild(completeButton);
	
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	
	todoList.appendChild(todoDiv);
	
	todoInput.value="";
	
	updateLS();
}

function deleteTask(e){
	const item = e.target;
	
	if(item.classList[0] === "trash-btn"){
		const todo = item.parentElement;
		todo.classList.add("fall");
		todo.remove();
	}
	if(item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
	updateLS();
}

function filterTodo(e){
	const todos = todoList.childNodes;
	console.log(todos);
	todos.forEach(function(todo){
	if(todo.nodeType!=3){ //ignore the node which is text, in the index 0 
		switch(e.target.value){
			case "all":
			todo.style.display ="flex";
				break;
			case "completed":
			if(todo.classList.contains("completed")){
				todo.style.display="flex";
			}else{
				todo.style.display="none";
			}
			break;
			case "uncompleted":
			if(!todo.classList.contains("completed")){
				todo.style.display="flex";
			}else{
				todo.style.display="none";
			}
			break;
		}
	}
	});
}

function updateLS(){
	const todoEl = document.querySelectorAll("li.todo-item");
	
	let todos = [];
	
	todoEl.forEach(function(todo){
		todos.push({
		text:todo.innerText,
		completed:todo.parentElement.classList.contains("completed")
		});
	});
	
	localStorage.setItem("todos",JSON.stringify(todos));
	
}

function loadfromLS(){
	if(localStorage.getItem("todos")===null){
		return;
	}else{
		const todos = JSON.parse(localStorage.getItem("todos"));
		
		todos.forEach(function(todo){
			const todoDiv = document.createElement("div");
			todoDiv.classList.add("todo");
			if(todo.completed){
				todoDiv.classList.add("completed");
			}
			
			const newTodo = document.createElement("li");
			newTodo.innerText = todo.text;
			newTodo.classList.add("todo-item");
			todoDiv.appendChild(newTodo);
			
			const completeButton = document.createElement("button");
			completeButton.innerHTML = '<i class="fas fa-check"></i>';
			completeButton.classList.add("complete-btn");
			todoDiv.appendChild(completeButton);
			
			const trashButton = document.createElement("button");
			trashButton.innerHTML = '<i class="fas fa-trash"></i>';
			trashButton.classList.add("trash-btn");
			todoDiv.appendChild(trashButton);
			
			todoList.appendChild(todoDiv);
			
		});
	}
}