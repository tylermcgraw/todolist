/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns a copy of the todos array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first returns first item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last returns last item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns first item', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns last item', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true iff all items are done', () => {
    expect(list.isDone()).toEqual(false);
    list.toArray().forEach(todo => todo.markDone());
    expect(list.isDone()).toEqual(true);
  });

  test('add throws a TypeError when adding a non-Todo item', () => {
    expect(() => list.add(3)).toThrow(TypeError);
    expect(() => list.add("3")).toThrow(TypeError);
  });

  test('itemAt returns item at index or throws a ReferenceError', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(-1)).toThrow(ReferenceError);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('markDoneAt marks item at index as done or throws a ReferenceError', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toEqual(true);
    expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
  });

  test('markUndoneAt marks item at index as undone or throws a ReferenceError', () => {
    list.toArray().forEach(todo => todo.markDone());
    list.markUndoneAt(0);
    expect(todo1.isDone()).toEqual(false);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
    expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
  });

  test('markAllDone marks all items as done', () => {
    list.markAllDone();
    expect(list.isDone()).toEqual(true);
  });

  test('removeAt removes item at index or throws a ReferenceError', () => {
    expect(list.removeAt(0)).toEqual([todo1]);
    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(() => list.removeAt(-1)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    todo1.markDone();
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all items in list', () => {
    expect(list.isDone()).toBe(false);
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter returns a new TodoList based on callback', () => {
    let emptyList = list.filter((todo) => todo.isDone());
    expect(emptyList).toBeInstanceOf(TodoList);
    expect(emptyList.size()).toBe(0);
  });
});