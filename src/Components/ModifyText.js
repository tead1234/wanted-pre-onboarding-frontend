import { useObserver } from 'mobx-react';
import {useRef} from "react";
import axios from "axios";
import ModifyModeStore from '../Stores/ModifyModeStore';
import ModifyIdStore from '../Stores/ModifyIdStore';
export default function ModifyText(){
    let inputRef = useRef(null);
    const token = localStorage.getItem('jwt');
    let id = ModifyIdStore.id;
    const clear = () => {
        ModifyModeStore.deactiveAction();
    }
    const modifyReq = () => {
        const header = {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
      
      axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
          {
            // 수정창에서 가져온 string
              todo: inputRef.current.value,
              isCompleted: false
          },{
            headers : header
          }
          )
        .then((response) => {
            
            ModifyModeStore.deactiveAction();
        })
        .catch((Error) => {
          console.log(Error);
        })
    }
    return useObserver(() => (
        // backgrpund
        <div className="w-screen h-screen bg-gradient-to-t from-sky-500 to-indigo-500 z-40">
            {/* 알림창 */}
            <div className="z-99">
                <h1>알림창입니다.</h1>
                <input ref= {inputRef}></input>
            </div>
            <button onClick={() => modifyReq(inputRef.current.value)}>완료</button>
            <button onClick={() => clear()}>취소</button>
        </div>
    ));
}