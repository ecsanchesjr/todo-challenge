import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import './style.scss';

export default () => {
    return(
        <ListItem style={{flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center'}}>
            <h3 className={"empty-title"}>Não foram encontradas tarefas cadastradas.</h3>

            <h5 className={"empty-title"}>
                Isso quer dizer que você realizou todas as tarefas que deveria.
                Parabéns!
            </h5>

            <img src="ok-pana.svg" alt="Não possui outras tarefas para executar - Designed by Freepik"/>
            <a href="http://www.freepik.com">Designed by Freepik</a>
        </ListItem>
    );
}