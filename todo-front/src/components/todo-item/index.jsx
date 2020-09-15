import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { updateTodo } from '../../services/todoService';
import './style.scss';

export default class TodoItem extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.todo,
            isEditing: false,
            textPreEditing: props.todo.task
        }
    }

    render() {
        return (
            <ListItem
                dense button={!this.state.isEditing} divider
                onClick={() => this.toggleIsDone()}
                className={this.state.isDone ? "task-is-done" : ""}>
                <Checkbox
                    checked={this.state.isDone}
                    disableTouchRipple
                    disableRipple
                    disableFocusRipple
                    disabled={this.state.isEditing}
                    color={"primary"}
                    inputProps={{ 'aria-labelledby': this.state.task }} />

                {
                    this.state.isEditing ?
                        <TextField
                            placeholder={"Informe a Tarefa"}
                            fullWidth
                            className={!this.state.isEditing ? "disabled-text-field" : ""}
                            value={this.state.task}
                            disabled={!this.state.isEditing}
                            label={"Tarefa"}
                            onChange={event => this.setState({ task: event.target.value })}
                            autoFocus
                            inputProps={{ maxLength: 255 }}
                            helperText={"É necessário que exista uma descrição para a Tarefa"} />
                        :
                        <ListItemText
                            primary={this.state.task}
                            secondary={`${this.state.isDone ? 'Concluída' : 'Pendente'} - Criada em ${new Date(this.state.createdAt).toLocaleString('pt-BR')}.`} />
                }

                <IconButton
                    color={"default"}
                    onClick={(e) => this.toggleEditFields(e)}
                    disabled={this.state.isDone || !this.state.task}>
                    {
                        this.state.isEditing ? <SaveIcon /> : <EditIcon />
                    }
                </IconButton>

                <IconButton
                    color={'secondary'}
                    onClick={(e) => this.onClickRemove(e)}>
                    {
                        this.state.isEditing ? <CloseIcon /> : <DeleteIcon />
                    }
                </IconButton>

            </ListItem>
        );
    }

    toggleIsDone() {
        if (!this.state.isEditing) {
            this.setState({
                isDone: !this.state.isDone
            }, () => {
                this.props.updateIsDone(this.state.isDone);
                updateTodo({
                    id: this.state.id,
                    task: this.state.task,
                    isDone: this.state.isDone,
                    isActive: this.state.isActive
                });
            });
        }
    }

    toggleEditFields(e) {
        e.stopPropagation();

        // if the user are editing, the button will save the changes
        if (this.state.isEditing) {
            this.setState({
                isEditing: false,
                textPreEditing: this.state.task
            }, () => {
                updateTodo({
                    id: this.state.id,
                    task: this.state.task,
                    isDone: this.state.isDone,
                    isActive: this.state.isActive
                });
            });
            // if the user aren't editing, the action will open the text field to user edit
        } else {
            this.setState({
                isEditing: true
            });
        }
    }

    onClickRemove(e) {
        e.stopPropagation();

        // if the user are editing, the button have to be clicked to cancel operation without save
        if (this.state.isEditing) {
            this.setState({
                isEditing: false,
                task: this.state.textPreEditing
            });
            // if the user aren't editing, the button have to be clicked to remove a item of list
        } else {
            this.props.removeFromList();
        }
    }
}
