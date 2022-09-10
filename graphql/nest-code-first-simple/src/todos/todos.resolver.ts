import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import GetTodosArgs from './dto/get-todos.args';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todosService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.remove(id);
  }

  @Query(() => [Todo])
  async getTodosByArgs(
    // TODO: @ArgsType() is not working with code first and schema first approach
    // @Args() args: GetTodosArgs,
    @Args('tag', { defaultValue: '' }) tag: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    const args: GetTodosArgs = { name, tag };
    return this.todosService.getTodosByArgs(args);
  }
}
