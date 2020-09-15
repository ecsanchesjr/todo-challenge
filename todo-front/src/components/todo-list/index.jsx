import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, List, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { createTodo, getAllTodos, updateTodo } from '../../services/todoService';
import TodoItem from '../todo-item';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ListEmpty from '../list-empty';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            list: {},
            confirmRemoveDialog: false,
            addTaskDialog: false,
            removeAllDialog: false,
            newTask: ""
        }
        this.taskToRemove = "";
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        return (
            <Grid container spacing={2} justify={"center"}>
                <Grid item lg={8} xs={12}>
                    <h1 className={"main-title"}>
                        Lista de Tarefas
                    </h1>
                    <Grid container justify={"space-between"}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            onClick={() => this.setState({ addTaskDialog: true })}>
                            ADICIONAR TAREFA
                            </Button>
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            onClick={() => this.setState({ removeAllDialog: true })}>
                            REMOVER CONCLUÍDAS
                            </Button>
                    </Grid>
                </Grid>
                <Grid item lg={8} xs={12}>

                    <List style={{ width: '100%' }}>
                        {
                            !!this.state.list &&
                            Object.entries(this.state.list).map(([id, todo]) =>
                                <TodoItem
                                    key={id}
                                    todo={todo}
                                    updateIsDone={this.updateIsDone.bind(this, id)}
                                    removeFromList={this.removeFromList.bind(this, id)}
                                />
                            )
                        }
                        {
                            Object.keys(this.state.list).length === 0 &&
                            <ListEmpty />
                        }
                    </List>
                </Grid>
                <Dialog
                    open={this.state.confirmRemoveDialog}
                    onClose={() => this.setState({ confirmRemoveDialog: false })} >
                    <DialogTitle> {`Deseja remover a Tarefa "${this.taskToRemove.task}" da lista?`} </DialogTitle>

                    <DialogActions>
                        <IconButton color={"primary"} onClick={() => this.removeFromListConfirm(this.taskToRemove.id)}>
                            <CheckIcon /> Confirmar
                        </IconButton>
                        <IconButton color={"secondary"} onClick={() => this.setState({ confirmRemoveDialog: false })}>
                            <CloseIcon /> Cancelar
                        </IconButton>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.addTaskDialog}
                    onClose={() => this.setState({ addTaskDialog: false })} >

                    <DialogTitle>Adicionar nova tarefa</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Escreva com até 255 caracteres uma breve descrição da sua atividade que deverá ser realizada.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tarefa"
                            fullWidth
                            onChange={event => this.setState({ newTask: event.target.value })}
                            value={this.state.newTask}
                            helperText={"É necessário que exista uma descrição para a Tarefa"}
                            inputProps={{ maxLength: 255 }} />
                    </DialogContent>

                    <DialogActions>
                        <IconButton
                            color={"primary"}
                            onClick={() => this.confirmAddTask()}
                            disabled={!this.state.newTask}>
                            <CheckIcon /> Confirmar
                        </IconButton>
                        <IconButton color={"secondary"} onClick={() => { this.setState({ addTaskDialog: false }); this.newTask = ""; }}>
                            <CloseIcon /> Cancelar
                        </IconButton>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.removeAllDialog}
                    onClose={() => this.setState({ removeAllDialog: false })} >
                    <DialogTitle> {'Deseja realmente remover todas as tarefas concluídas da Lista?'} </DialogTitle>

                    <DialogActions>
                        <IconButton color={"primary"} onClick={() => this.confirmRemoveAllDone()}>
                            <CheckIcon /> Confirmar
                        </IconButton>
                        <IconButton color={"secondary"} onClick={() => this.setState({ removeAllDialog: false })}>
                            <CloseIcon /> Cancelar
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }

    async loadList() {
        const data = await getAllTodos();
        this.setState({
            list: data
        });
    }

    // maintain the state updated in both parent-child object.
    // The state and your changes will be controlled just in the child component to prevent unnecessary renders of whole list.
    updateIsDone(id, isDone) {
        this.state.list[id].isDone = isDone;
    }

    removeFromList(id) {
        this.taskToRemove = this.state.list[id];
        this.setState({
            confirmRemoveDialog: true
        });
    }

    async removeFromListConfirm(id) {
        const status = await updateTodo({
            id: this.state.list[id].id,
            task: this.state.list[id].task,
            isDone: this.state.list[id].isDone,
            isActive: false
        });

        if (status < 500) {
            this.state.confirmRemoveDialog = false;
            this.loadList();
        }
    }

    async confirmAddTask() {
        const status = await createTodo({
            task: this.state.newTask,
            isActive: true,
            isDone: false
        });

        if (status < 500) {
            this.state.addTaskDialog = false;
            this.state.newTask = "";
            this.loadList();
        }
    }

    confirmRemoveAllDone() {
        if (Object.keys(this.state.list).length !== 0) {
            const allDones = Object.entries(this.state.list).map(([id, todo]) => todo).filter(todo => todo.isDone);
            Promise.all(allDones.map(todo => updateTodo({
                id: todo.id,
                task: todo.task,
                isDone: todo.isDone,
                isActive: false
            }))).then(() => {
                this.state.removeAllDialog = false;
                this.loadList();
            });
        } else {
            this.setState({
                removeAllDialog: false
            });
        }
    }
}