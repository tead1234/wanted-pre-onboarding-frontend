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
    console.log(todoList);
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const checkbox_clicked = (id) => {
    // TODO: 체크박스 클릭 이벤트 핸들러 함수 구현
    // 바로 체크박스로 구현하는건 힘들고 별도의 state를 활용해서 개발해야될거같음
    // checkbox를 클릭할때마다 index값을 complete에 저장하고 
    // 저장된 인덱스들은 취소선 css 값 주기
    // state에서 id값을 가진애를 삭제
    // undone도 가능하도록 구현
    if(checkComplete.includes(id)){
        let renew = checkComplete.filter(ch => ch !== id);
        setCheckComplete(renew);
    }else{
        setCheckComplete([...checkComplete, id]);
    }

    
  };
  // 삭제 버튼을 누르면 해당 li의 아이디를 state에서 지우면 됨
const check = (id) => {
    let renew = [];
    todoList.map((todo) => {
        if(todo.id !== id){
            renew.push(todo);
        }
    });
    setTodoList(renew);
}
// 수정 버튼
const modifyCheck = (id) =>{
    // 수정창을 띄우고
    // 내용을 입력후 확인 버튼을 누르면 
    // checkC todolist를 수정하면 ok 
    // checkbox 클릭 유무는 어차피 id로 관리 되고 있어서 상관없음
    
}

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
              onClick={() => checkbox_clicked(todo.id)}
              
            />
            {
                checkComplete.includes(todo.id)? 
                <label style={{textDecoration : "line-through"}} htmlFor={`todo-item-${todo.id}`}>{todo.value}</label> :
                <label htmlFor={`todo-item-${todo.id}`}>{todo.value}</label>

            }
            <button onClick={() => check(todo.id)}>삭제</button>
            <button onClick={() => check(todo.id)}>수정</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
