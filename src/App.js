import { useRef, useState } from 'react';
import { useStore, actions } from './store';
import './App.css';

function App() {

  const [state, dispatch] = useStore()
  const { todos, todoInput } = state
  const inputRef = useRef()
  const itemDrop = useRef()
  const indexChange = useRef()
  const [update, setUpdate] = useState(false);
  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput))
    dispatch(actions.setTodoInput(''))
    inputRef.current.focus()
  }

  const handleChange = (index) => {
    dispatch(actions.setTodoInput(todos[index].work))
    indexChange.current = index
    setUpdate(true)
  }

  const handleUpdate = () => {
    dispatch(actions.updateTodo({ indexChange, todoInput }))
    dispatch(actions.setTodoInput(''))
    setUpdate(false)
  }

  // Drag item
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    console.log(e.dataTransfer);
    
  }

  const handleDragOver = (e, index) => {
    itemDrop.current = {
      index,
      data: e.target.getBoundingClientRect(),
      mouseDrop: e.clientY
    };
  }

  const handleDragEnd = (startIndex) => {
    let dropIndex = itemDrop.current.index;
    if (startIndex === dropIndex) {
      return;
    }
    let avgItem = (itemDrop.current.data.top + itemDrop.current.data.bottom) / 2;
    dropIndex = itemDrop.current.mouseDrop > avgItem ? (dropIndex + 1) : dropIndex;

    dispatch(actions.updateData({ startIndex, dropIndex }))
  }

  return (
    <div className="group">
      <h1>To Do List App</h1>

      {/* Input form */}
      <div className="head">
        <form
          onClick={e => {
            e.preventDefault()
          }}>
          <input
            ref={inputRef}
            value={todoInput}
            placeholder='Enter todo...'
            onChange={e => {
              dispatch(actions.setTodoInput(e.target.value))
            }}
          />

          <input
            type="submit"
            onClick={update ? handleUpdate : handleAdd}
            value={update ? 'Update' : 'Add'}
          />
        </form>
      </div>

      {/* List item */}
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="item-box"
            onDragOver={(e) => {
              handleDragOver(e, index)
            }}
          >
            <div className="item"
              id={index}>

              <input
                className='status'
                checked={todo.status
                }
                type="checkbox"
                onChange={(e) => {
                  dispatch(actions.updateCheckbox({ index, status: e.target.checked }))
                }}
              />
              <span
                draggable
                onDragStart={e => {
                  handleDragStart(e, index)
                }}
                onDragEnd={e => {
                  handleDragEnd(index)
                }}
              ></span>
              {todo.work}
              <i className="fa fa-times"
                aria-hidden="true"
                id="delete"
                onClick={() => {
                  dispatch(actions.deleteTodo(index))
                }}
              ></i>
              <button id='change'
                onClick={() => {
                  handleChange(index)
                }}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;