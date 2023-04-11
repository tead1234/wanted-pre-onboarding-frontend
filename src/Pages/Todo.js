import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import ModifyText from "../Components/ModifyText";
import axios from "axios";
import ModifyModeStore from "../Stores/ModifyModeStore";
import ModifyIdStore from "../Stores/ModifyIdStore";
import logo from "../Assets/imgs/logo.png"
import bg1 from "../bg1.jpg"
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Todo() {
  let [todoList, setTodoList] = useState([]);
  let [checkComplete, setCheckComplete] = useState([]);
  const movePage = useNavigate();
  const token = localStorage.getItem('jwt');
  // id 값을 주기 위한 state
  let [id , setId] = useState(0);
  let inputRef = useRef(null);


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
    
  })
  .catch((err) => {
    console.log(err);
  });
}
// 단순히 체크박스를 클릭하는 것과 아예 수정하는 것을 분리해야함
const modifyCheck = (id) => {
  // 수정모드로 변경후 
  ModifyModeStore.activeAction();
  ModifyIdStore.modifyAction(id);
}
const checkbox_clicked =  async (id) => {
    // todoList에서 string만 가져오기
    const todoItem = todoList.find(todo => todo.id === id);
    console.log(todoItem.todo);
    let clicked = false;
    // map 과 forEach의 차이를 고민해보자 
    todoList.forEach(todo => {
      if (todo.id === id) {
        let clicked = !todo.isCompleted;
        console.log(clicked);
      }
    });
  
    const header = {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
        
          await axios.put(
            `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
            {
              // 수정창에서 가져온 string
                todo: todoItem.todo,
                isCompleted: clicked
            },{
              headers : header
            }
            )
          .then((response) => {
            // 성공시 jwt 토큰을 저장하고 
            // todo로 이동
             
                getTodo();
              
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
useEffect(() => {
  getTodo();
})

  return useObserver(() => (
    <div className="z-30 h-screen">
      {
        ModifyModeStore.modify ? 
        <ModifyText></ModifyText> :
        null
      }
      
      {/* 여기에 수정창을 넣어놓고 state에 따라 나타나거나 나타나지 않도록 구현 */}
      
      {/* 아래것을 감싸는 컨테이너 */}
      <div className="h-auto min-h-full">
      <Header></Header>
      <div className="Title-box">
          <img src= {logo} style={{display: "block",  margin: "0px auto"}}></img>
      </div>
      <div className="h-40px w-full">
        <input className="border-solid border-2 rounded-2xl border-sky-500" type="text" ref={inputRef} data-testid="new-todo-input" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => todo_make(e)} data-testid="new-todo-add-button">등록</button>
      </div>
      <ul className="h-30">
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
            <Footer></Footer>
    </div>
  ));
}
