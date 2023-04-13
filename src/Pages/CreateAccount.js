import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Header from '../Components/Header';
// state 하나 만들어서 정규식을 패스하면 true로 바꿔서 disabled 컨트롤하면됨

export default function CreateAccount() {
  // state
  // let [emailCheck, setEmailCheck] = useState(false);
  const inputRef = useRef(false);
  const movePage = useNavigate();
  let [emailInfo, setEmailInfo] = useState("");
  let [passwordInfo, setPasswordInfo] = useState("");
  // 회원 가입 정보를 저장하는 state를 만들면
  // method
  const checkEmail = (e) => {
    //값이 숫자인지 검사하는 정규식
    const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regExp.test(e.target.value)) {
      inputRef.current.disabled = false;
      setEmailInfo(e.target.value);
    }else {
      inputRef.current.disabled = true;
      console.log("아이디를 다시 적어주세요");
    }
  };
  const checkPassword = (e) => {
    const length = e.target.value.length;
    if (length >= 8) {
      inputRef.current.disabled = false;
      setPasswordInfo(e.target.value);
    }else {
      inputRef.current.disabled = true;
      console.log("비밀번호가 너무 짧아");
    }

  }
  // login api 연동
  // 여기다가 link to 를 넣어야 컨트롤이 될거같은데
  const sendSignUpInfo = async(e) => {
    e.preventDefault();
    
    if(inputRef.current.disabled){
      alert("입력정보가 잘못됐습니다.");
    }else{
      const header = {
        'Content-Type' : 'application/json'
      }
      
      // api 통신
        await axios.post(
          "https://www.pre-onboarding-selection-task.shop/auth/signup",
          {
            email : emailInfo,
            password : passwordInfo
          },{
            headers : header
          }
          )
        .then((response) => {
          // 성공시 jwt 토큰을 저장하고 
          // todo로 이동
            console.log(response);
            if (response.status === 201) {
              movePage('/signin');
            }
        })
        .catch((Error) => {
          console.log(Error);
          movePage('/signup');
        })
      }  
  }
  useEffect(() => {
    if (localStorage.getItem("jwt")){
      movePage("/todo");
    }
  },[])

  
  
  
  return (
    <>
      <Header></Header>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
            
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                // 따로 유효성 검사를 위해 text로 설정
                  id="email-address"
                  data-testid="email-input" 
                  name="email"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={checkEmail}
                  
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="password-input"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={checkPassword}
                />
              </div>
            </div>

            {/* 발생한 문제 : lick to가 disable 상태일떄도 작동해버림 */}

            <div>
              <button
                type="submit"
                data-testid="signup-button"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                ref = {inputRef}
                onClick={sendSignUpInfo}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}