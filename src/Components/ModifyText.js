import { useObserver } from 'mobx-react';
import {useRef} from "react";
import axios from "axios";
import ModifyModeStore from '../Stores/ModifyModeStore';
import ModifyIdStore from '../Stores/ModifyIdStore';
export default function ModifyText(){
    let inputRef = useRef(null);
    const token = localStorage.getItem('jwt');
    let id = ModifyIdStore.id;
    let check = ModifyIdStore.isChecked;
    const clear = () => {
        ModifyIdStore.clearAction();
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
              isCompleted: check
          },{
            headers : header
          }
          )
        .then((response) => {
            ModifyIdStore.clearAction();
            ModifyModeStore.deactiveAction();
        })
        .catch((Error) => {
          console.log(Error);
        })
    }
    return useObserver(() => (
        // backgrpund
        <div className="w-screen h-screen  bg-black bg-opacity-60 z-50 fixed">
            {/* 알림창 */}
            <div className="z-99 bg-white rounded-lg shadow-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1>수정창입니다.</h1>
                <input className='border-solid border-2 rounded-2xl border-sky-400' ref= {inputRef} data-testid="modify-input"></input>
            <button data-testid="submit-button" onClick={() => modifyReq(inputRef.current.value)}>완료</button>
            <button data-testid="cancel-button" onClick={() => clear()}>취소</button>
            </div>
        </div>
    ));
}