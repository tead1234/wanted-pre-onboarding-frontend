import { useState, useRef } from "react";

export default function Todo() {
  let [todoList, setTodoList] = useState([]);
  let [checkComplete, setCheckComplete] = useState([]);
  // id 값을 주기 위한 state
  let [id , setId] = useState(0);
  let inputRef = useRef(null);

  const todo_make = (e) => {
    e.preventDefault();
    const newTodo = {id : id, value : inputRef.current.value};
    setId(id += 1);
    console.log(id);
    console.log(todoList);
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const checkbox_clicked = (e) => {
    // TODO: 체크박스 클릭 이벤트 핸들러 함수 구현
    // 바로 체크박스로 구현하는건 힘들고 별도의 state를 활용해서 개발해야될거같음
    // checkbox를 클릭할때마다 index값을 complete에 저장하고 
    // 저장된 인덱스들은 취소선 css 값 주기
    alert(e.target.value);
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
        {/* input의 onChange가 과연 언제 발생할까?? */}
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              name={`todo-item-${todo.id}`}
              onClick={checkbox_clicked}
              
            />
            <label htmlFor={`todo-item-${todo.id}`}>{todo.value}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
