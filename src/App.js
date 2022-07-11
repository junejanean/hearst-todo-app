import React, { useState } from 'react';
import './App.css';

// Copy and pasted from:
// https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks

function Todo(props) {
	// you need to create a const with all the different props you are using within this function
	const { completeTodo, removeTodo, todo, index, value } = props; // ADDED
	return (
		<div
			// ADDED another class
			className={`todo ${props.todo.isCompleted ? 'complete' : ''}`}
			// style={{ textDecoration: props.todo.isCompleted ? 'line-through' : '' }} -- not best practice to use inline styling, would change to a class 'complete' for line-through
		>
			<input
				value={value} // ADDED
				onClick={() => completeTodo(index)}
				type='checkbox' // ADDED
			></input>
			{todo.text}
			<div>
				{/* <button onClick={() => props.completeTodo(props.index)}></button> -- I would replace with a checkbox and move before the text */}

				<button onClick={() => removeTodo(index)}>x</button>
			</div>
		</div>
	);
}

function TodoForm(props) {
	const [value, setValue] = React.useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addTodo(value);
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				className='input'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button className='add'>Add To Do</button>
		</form>
	);
}

function App() {
	const [todos, setTodos] = React.useState([
		{
			id: 1,
			text: 'Learn about React',
			isCompleted: false,
		},
		{
			id: 2,
			text: 'Meet friend for lunch',
			isCompleted: false,
		},
		{
			id: 3,
			text: 'Build really cool todo app',
			isCompleted: false,
		},
	]);

	const addTodo = (text) => {
		// The .push is redundant. By using hooks, it will add the new value to the array automagically.
		//Otherwise, it creates a duplicate of the todo
		// DELETED todos.push({ text });
		// you need to create a variable to grab the current todo list and will add the new to do to the array
		const newTodos = [
			...todos,
			{ text, id: todos.length + 1, isCompleted: false },
		]; // ADDED
		setTodos(newTodos);
	};

	const completeTodo = (index) => {
		// you need to create a variable to grab the current todo list in order to update a todo
		const newTodos = [...todos]; // ADDED
		if (todos[index].isCompleted) {
			todos[index].isCompleted = false;
		} else {
			todos[index].isCompleted = true;
		}

		// todos[index].isCompleted ? false : true

		setTodos(newTodos);
	};

	const removeTodo = (index) => {
		// same as above, you need to create a variable to grab the current todo list in order to delete a todo
		const newTodos = [...todos]; // ADDED
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div className='app'>
			<div className='todo-list'>
				{todos.map((todo, index) => (
					<Todo
						key={todo.id}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
						removeTodo={removeTodo}
					/>
				))}
				<TodoForm addTodo={addTodo} />
			</div>
		</div>
	);
}

export default App;
