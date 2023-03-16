import { useState, useRef } from 'react';

function App() {

  const [newTodoValue, setNewTodoValue] = useState('');
  const [todoList, setTodoList] = useState<Array<string>>([]);
  const [todoValueFeedback, setTodoValueFeedback] = useState<string | undefined>(undefined);
  const [todoValueOperation, setTodoValueOperation] = useState<'added' | 'removed' | undefined>();

  const myRef = useRef<HTMLHeadingElement | null>(null);

  return (
    <div className="App">
      <div>
        <h1 
          ref={myRef}
          tabIndex={-1} 
          id="heading">
            To do list
        </h1>
        <form onSubmit={(e) => {
          e.preventDefault();

          setTodoList(todoList.concat([newTodoValue]));
          setTodoValueFeedback(newTodoValue)
          setTodoValueOperation('added')
          setNewTodoValue('');
        }}>
          <label htmlFor="todo">
            Add a new task to your list (required)
          </label>
          <div>
            <input 
              value={newTodoValue}
              onChange={(e) => setNewTodoValue(e.target.value)}
              id="todo" 
              aria-describedby="example" 
              required/>
            <input type="submit" value="Add"/>
          </div>
          <p id="example">Example: Feed the chicken</p>
        </form>
        <ul id="list">
          {todoList.map(todo => 
            <li key={todo} id={todo}>
              <input type="checkbox" id={todo}/>
              <label htmlFor={todo}>{todo}</label>
              <button onClick={() => {
                const remainingTasks = todoList.filter(todoOriginal => todoOriginal !== todo)

                setTodoList(remainingTasks);
                setTodoValueFeedback(todo)
                setTodoValueOperation('removed')

                if(myRef.current !== null) {
                  myRef.current.focus();
                }
              }}>Delete task</button>
            </li>)
          }
        </ul>
        <div 
          role="status" 
          aria-live="polite" 
          id="sc_feedback">
            {todoValueFeedback ? `${todoValueFeedback} ${todoValueOperation}` : null} 
        </div>
      </div>
    </div>
  );
}

export default App;
