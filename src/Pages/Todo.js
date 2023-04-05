import { useState, useRef } from "react";

export default function Todo() {
  const [todoList, setTodoList] = useState([]);

  const inputRef = useRef(null);

  const todo_make = (e) => {
    e.preventDefault();
    const newTodo = inputRef.current.value;
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const checkbox_clicked = (e) => {
    // TODO: 체크박스 클릭 이벤트 핸들러 함수 구현
    // 바로 체크박스로 구현하는건 힘들고 별도의 state를 활용해서 개발해야될거같음
  };

  return (
    <div>
      <div className="Title-box">
        <h1>오늘은 뭘 해야할까??</h1>
      </div>
      <div className="make-todo">
        <input type="text" ref={inputRef} />
        <button onClick={todo_make}>등록</button>
      </div>
      <ul>
        {/* 여기서 인덱스를 쓰면 나중에 꼬일 수 있음 */}
        {/* 고유값을 부여해서 만드는게 나을거같음 */}
        {todoList.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              name={`todo-item-${index}`}
              onClick={checkbox_clicked}
            />
            <label htmlFor={`todo-item-${index}`}>{todo}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
