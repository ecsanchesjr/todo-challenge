## Lista de tarefas - Spring + ReactJS

#### Tecnologias
- Java 14 + SpringBoot
- H2 Database 
- ReactJS

#### Funcionalidades
- Adicionar tarefas a lista
- Alteração da descrição da tarefa
- Marcação de tarefas como concluídas
- Remoção de tarefas da lista

#### Executar
Para executar o projeto basta utilizar na pasta `todo-backend` o comando `mvn clean package`.
Será feita a criação da versão final do servidor e os arquivos relacionados ao front-end serão passados para o servidor.
Por padrão, o servidor está sendo executado na porta `8080`.

Para acessar: `http://localhost:8080`

#### Observações
Por padrão, o projeto está sendo iniciado com cinco tarefas adicionadas no arquivo `data.sql` na pasta `resources`.
Caso deseje adicionar mais tarefas pode utilizar o INSERT abaixo.

`INSERT INTO TODOS(ID, TASK, IS_DONE, IS_ACTIVE, CREATED_AT) VALUES (TODO_SEQ_ID.NEXTVAL, '######', 0, 1, SYSDATE);`