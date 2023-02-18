import { FindAllArgs } from './dto/findAll.args';
import { TodosMongoService } from './todos-mongo.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import GetTodosArgs from './dto/get-todos.args';
import { ResponseTodo, RemoveResponse } from './dto/responses.dto';

@Resolver(() => ResponseTodo)
export class TodosResolver {
  constructor(private readonly todosMongoService: TodosMongoService) {}

  @Mutation(() => ResponseTodo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosMongoService.create(createTodoInput);
  }

  @Query(() => [ResponseTodo], { name: 'todos' })
  findAll(@Args() args: FindAllArgs) {
    return this.todosMongoService.findAll(args);
  }

  @Query(() => ResponseTodo, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todosMongoService.findOne(id);
  }

  @Mutation(() => ResponseTodo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosMongoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => RemoveResponse)
  removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todosMongoService.remove(id);
  }

  @Query(() => [ResponseTodo])
  async getTodosByArgs(
    // TODO: @ArgsType() is not working with code first and schema first approach
    // @Args() args: GetTodosArgs,
    @Args('tag', { defaultValue: '' }) tag: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    const args: GetTodosArgs = { name, tag };
    return this.todosMongoService.getTodosByArgs(args);
  }
}
