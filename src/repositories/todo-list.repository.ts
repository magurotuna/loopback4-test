import { DefaultCrudRepository, HasManyRepositoryFactory, repository, Filter, Options } from '@loopback/repository';
import { TodoList, TodoListRelations, Todo, TodoListWithRelations } from '../models';
import { DbDataSource } from '../datasources';
import { Getter, inject } from '@loopback/core';
import { TodoRepository } from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
  > {
  public readonly todos: HasManyRepositoryFactory<
    Todo,
    typeof TodoList.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TodoRepository')
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
    );
  }

  // async find(
  //   filter?: Filter<TodoList>,
  //   options?: Options,
  // ): Promise<TodoListWithRelations[]> {
  //   const include = filter && filter.include;
  //   filter = { ...filter, include: undefined };
  //   const result = await super.find(filter, options);

  //   if (include && include.length && include[0].relation === 'todos') {
  //     await Promise.all(
  //       result.map(async r => {
  //         r.todos = await this.todos(r.id).find();
  //       })
  //     )
  //   }
  //   return result;
  // }

  // async findById(
  //   id: typeof TodoList.prototype.id,
  //   filter?: Filter<TodoList>,
  //   options?: Options,
  // ): Promise<TodoListWithRelations> {
  //   filter = {
  //     ...filter,
  //     include: [{
  //       relation: 'todos'
  //     }],
  //   }
  //   console.log(filter);
  //   const include = filter && filter.include;
  //   filter = { ...filter, include: undefined };
  //   const result = await super.findById(id, filter, options);

  //   if (include && include.length && include[0].relation === 'todos') {
  //     console.log('piyo');
  //     result.todos = await this.todos(result.id).find();
  //   }
  //   return result;
  // }
}
