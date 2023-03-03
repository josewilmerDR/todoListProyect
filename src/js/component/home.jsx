import React, { useState, useEffect } from "react";
import "../../styles/index.css"

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	//Se evalúa si inputValue está vació"
	const addTodo = () => {
		if (inputValue.trim() !== "") {
			setTodos([...todos, inputValue]); //copia todas las tareas existentes en el array todos y luego agregar la nueva tarea (inputValue) al final del nuevo array.
			setInputValue(""); //limpia el valor del campo de entrada
		}
	};

	//Se define una función que se ejecutará cuando el usuario de clic en el ícono de la papelera.
	const deleteTodo = (index) => {
		const newTodos = [...todos]; //Se crea el arreglo temporal "newTodos" y se iguala al contenido del arreglo "todos"
		newTodos.splice(index, 1); //elimina la tarea en la posicion index.
		setTodos(newTodos); //igualamos el arreglo setTodos al contenido de newTodos.
		//todos.splice(index, 1) //Esto no funconaría por que previamente a eliminar los elementos de "todos", estos deben ser extraidos
	};

	useEffect(() => { 
		console.log("se reenderizó el componente Home")
 }, [todos])
	return (
		<div className="container">
			<h1 className="text-center title-todo mt-5">todos</h1>
			<div className="container-todo">
				<div className="container-input" >	
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								addTodo(); //llama la función addTodo que agrega el string introducido por el usuario y además limpia el valor de la entrada.
							}
						}}
						placeholder="What needs to be done"
					/>
				</div>
				{todos && todos.length > 0 ?
					<ul className="list-group text-center">
						{todos.map((todo, index) => (
							<li className="list-group-item" key={index}>
								{todo}
								<i className="fa-solid fa-trash hiden-trash" onClick={() => deleteTodo(index)}></i>
							</li>
						))}
					</ul>
					:
					<div className="text-center thereAreNotTaks"><p>There are not tasks, add a new task</p></div>
				}
				<div className="numberOfTasks">{todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}</div> {/*El pimer todos.length muestra la cantidad de tareas, despues valida si es 1 coloca task de lo contrario coloca tasks */}
			</div>
			<div className="container-todo-shadow">
				<div className="container-todo-shadow1"></div>
				<div className="container-todo-shadow2"></div>
			</div>
		</div>
	);
};

export default Home;

//de haber aplicado un if en lugar de un operador ternario; debiese haber hecho un doble retur, uno en el if y otro en el else, para solventar el tema de que si no hay tareas mostrar x mensaje.