import { Filter, repository } from '@loopback/repository';
import { TodoListRepository } from '../repositories';
import { get, post, param, requestBody } from '@loopback/rest';
import { Todo } from '../models';


export class TodoListTodoController {
  constructor(
    @repository(TodoListRepository) protected todoListRepo: TodoListRepository,
  ) { }

  @post('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Todo } } },
      },
    },
  })
  async create(@param.path.number('id') id: number, @requestBody() todo: Todo) {
    return await this.todoListRepo.todos(id).create(todo);
  }

  @get('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: "Array of Todo's belonging to TodoList",
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Todo } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return await this.todoListRepo.todos(id).find(filter);
  }
}
