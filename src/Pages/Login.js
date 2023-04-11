import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Header from '../Components/Header';
// state 하나 만들어서 정규식을 패스하면 true로 바꿔서 disabled 컨트롤하면됨

export default function Login() {
  // state
  // let [emailCheck, setEmailCheck] = useState(false);
  const inputRef = useRef();
  const movePage = useNavigate();
  let [emailInfo, setEmailInfo] = useState("");
  let [passwordInfo, setPasswordInfo] = useState("");
  // method
  const checkEmail = (e) => {
    //값이 숫자인지 검사하는 정규식
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])/
    if (regExp.test(e.target.value)) {
      inputRef.current.disabled = false;
      setEmailInfo(e.target.value);

    }else {
      inputRef.current.disabled = true;
    }
  };
  const checkPassword = (e) => {
    const length = e.target.value.length;
    if (length >= 8) {
      inputRef.current.disabled = false;
      setPasswordInfo(e.target.value);
    }else {
      inputRef.current.disabled = true;
    }

  }
  // 페이지 이동 함수
  

  // login api 연동
  // 여기다가 link to 를 넣어야 컨트롤이 될거같은데
  const sendLoginInfo = async(e) => {
    // 새로고침 방지
    e.preventDefault();
    
    const header = {
      'Content-Type' : 'application/json'
    }
    // api 통신
      await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
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
        // 저장확인
          localStorage.setItem("jwt", response.data.access_token);
          movePage('/todo');
      })
      .catch((Error) => {
        console.log(Error);
        movePage('/signin');
      })
    
  }
  // 로그인시 jwt를 받았다면 바로 todo로 이동하도록 구현
  // 고민 1 > 따로 state를 활용해서 저장해놓는게 좋을까 아니면 매번 로그인시마다 체크하도록 할까? 일단은 후자로?
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
              Sign in to your account
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
                  name="email"
                  type="text"
                  data-testid="email-input"
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

           

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                data-testid="signin-button"
                ref={inputRef}
                onClick={sendLoginInfo}
                >
                
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                </span>
                Log in
                
              </button>

            <div>
            {/* 페이지 오픈후 바로 회원가입을 누르면 발생하는 에러 */}
            </div>
              <button
                type="submit"
                data-testid="signup-button"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => movePage('/signup')}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                  회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}