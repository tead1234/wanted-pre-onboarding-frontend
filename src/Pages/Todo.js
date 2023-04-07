import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import ModifyText from "../Components/ModifyText";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";

export default function Todo() {
  let [todoList, setTodoList] = useState([]);
  let [checkComplete, setCheckComplete] = useState([]);
  const movePage = useNavigate();
  const token = localStorage.getItem('jwt');
  // id 값을 주기 위한 state
  let [id , setId] = useState(0);
  let inputRef = useRef(null);
  let [modify, setModify] = useState(false);


  // 생성 todo
  const todo_make = async (e) => {
  
      e.preventDefault();
      
      
        const header = {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
        
          await axios.post(
            "https://www.pre-onboarding-selection-task.shop/todos",
            {
                todo : inputRef.current.value
            },{
              headers : header
            }
            )
          .then((response) => {
            // 성공시 jwt 토큰을 저장하고 
            // todo로 이동
              if (response.status === 201) {
                console.log(response.data);
                getTodo();
                // console.log(response.data.body);
              }
          })
          .catch((Error) => {
            console.log(Error);
          })
    }
const getTodo = () => {
  const headers = {
    'Authorization' : `Bearer ${token}`
  }
  axios.get("https://www.pre-onboarding-selection-task.shop/todos",
    {
      headers : headers
    }
  )
  .then((response) => {
    setTodoList(response.data);
    console.log(todoList);
  })
  .catch((err) => {
    console.log(err);
  });
}
// 단순히 체크박스를 클릭하는 것과 아예 수정하는 것을 분리해야함
const modifyCheck = async (id) => {
    // id 로 todo를 가져오고 
// 전역으로 쓸수있는 state를 만들어서 공유되도록하는게 좋으려나?
    // setModify(true);
    // const header = {
    //       'Content-Type' : 'application/json',
    //       'Authorization' : `Bearer ${token}`
    //     }
        
    //       await axios.put(
    //         `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
    //         {
    //           // 수정창에서 가져온 string
    //             todo: string,
    //             isCompleted: boolean
    //         },{
    //           headers : header
    //         }
    //         )
    //       .then((response) => {
    //         // 성공시 jwt 토큰을 저장하고 
    //         // todo로 이동
    //           if (response.status === 201) {
    //             console.log(response.data);
    //             getTodo();
    //             // console.log(response.data.body);
    //           }
    //       })
    //       .catch((Error) => {
    //         console.log(Error);
    //       })
}
const checkbox_clicked =  async (id) => {
    // todoList에서 string만 가져오기
    const content = JSON.stringify(todoList.filter(todo => todo.id === id).pop());
    console.log("content", content, typeof content);
    let clicked = false;
    todoList.map((todo) => {
      if(todo.id === id){
        clicked = !todo.isCompleted;
        console.log(clicked);
      }
    })
  
    const header = {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
        
          await axios.put(
            `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
            {
              // 수정창에서 가져온 string
                todo: content.todo,
                isCompleted: clicked
            },{
              headers : header
            }
            )
          .then((response) => {
            // 성공시 jwt 토큰을 저장하고 
            // todo로 이동
              if (response.status === 201) {
                console.log(response.data);
                getTodo();
              }
          })
          .catch((Error) => {
            console.log(Error);
          })
}
const deleteTodo = (id) => {
  const header = {
    'Authorization' : `Bearer ${token}`
  };
  axios.delete(
    `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
    {
      headers : header
    }
    )
    .then((response) => {
      getTodo();
    })
    .catch((err) => {
      console.log(err);
    })
}


// token이 ㅇ벗다면 리다이렉트
useEffect(() => {
  if (!localStorage.getItem("jwt")){
    movePage("/signin");
  }
},[])

  return (
    <div className="z-30">
      {/* 여기에 수정창을 넣어놓고 state에 따라 나타나거나 나타나지 않도록 구현 */}
      {
        modify ? 
        <ModifyText></ModifyText> :
        null
      }
      <div className="Title-box">
        <h1>오늘은 뭘 해야할까??</h1>
      </div>
      <div className="make-todo">
        <input type="text" ref={inputRef} data-testid="new-todo-input" />
        <button onClick={(e) => todo_make(e)} data-testid="new-todo-add-button">등록</button>
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
                todo.idCompleted ? 
                <label style={{textDecoration : "line-through"}} htmlFor={`todo-item-${todo.id}`}>{todo.todo}</label> :
                <label htmlFor={`todo-item-${todo.id}`}>{todo.todo}</label>

            }
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
            <button onClick={() => modifyCheck(todo.id)}>수정</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
