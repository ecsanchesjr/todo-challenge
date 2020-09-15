import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import TodoList from './components/todo-list'
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto/300.css'
import 'fontsource-roboto/400.css'
import 'fontsource-roboto/500.css'
import 'fontsource-roboto/700.css'

ReactDOM.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
