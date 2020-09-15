import axios from 'axios';

const todoService = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getAllTodos = async () => {
    const { data } = await todoService.get('/todos');
    return arrayToObj(data);
}

export const updateTodo = async (todo) => {
    const { status } = await todoService.put(`/todos/${todo.id}`, { ...todo });
    return status;
}

export const createTodo = async (todo) => {
    const { status } = await todoService.post('/todos', { ...todo });
    return status;
}

const arrayToObj = array => Object.assign({}, ...array.map(item => ({ [item["id"]]: item })));