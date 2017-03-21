/* jshint esversion: 6 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService'


class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: React.PropTypes.string
  }

componentDidMount() {
  loadTodos()
    .then(todos => this.setState({todos}))
}


  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
    deleteTodo(id)
  }



  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updateTodos = getUpdatedTodos(updated);
    this.setState({todos: updateTodos});
    saveTodo(updated)
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
    createTodo(newTodo)
      .then(() => console.log('dodano nowe zadanie'))
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Pole nie może byc puste!'
    });
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    });
  }
  
  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo App</h2>
        </div>
          <div className="Todo-App">
            {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
            <TodoForm handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={submitHandler} />
            <TodoList handleToggle={this.handleToggle}
              todos={displayTodos}
              handleRemove={this.handleRemove} />

              <Footer />
          </div>

      </div>
    );
  }
}

export default App;
