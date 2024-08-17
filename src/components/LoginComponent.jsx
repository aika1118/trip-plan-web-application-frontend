import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { handlingError } from '../Exception/HandlingError'

/**
 * LoginComponent
 * 
 * 로그인 화면을 구성하는 Component
 * 
 */

const LoginComponent = () => {

    const [usernameOrEmail, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate()

    async function handleLoginForm(e){ // 비동기 함수 (await 중 쓰레드가 다른 일을 처리할 수 있도록 함)
        e.preventDefault();

        // then()과 기대결과는 동일할 것
        // async/await 사용을 코드가 더 간결해짐 (더 권장하는 방식)
        // 비동기 함수지만 마치 동기적으로 동작하는 느낌 (코드 이해가 더 쉬움)
        // await 동작을 기다린 후 이후 로직이 실행됨
        const response = await loginAPICall(usernameOrEmail, password).catch(error => handlingError(error, navigator)) // {console.error(error)} 와 기능적 차이 X
        console.log(response.data);

        // JWT 토큰 -> HTTP Authorization Header에 포함 (Authorization : bearer type)
        // JWT 형식 : "Bearer {token}"
        const token = 'Bearer ' + response.data.accessToken;

        const role = response.data.role;

        // localStorage에 토큰 저장 (차후 서버 요청에 해당 토큰이 전달되어 인증 수행)
        storeToken(token);

        // 로그인 성공 후 username을 sessionStorage에 저장하기
        saveLoggedInUser(usernameOrEmail, role);

        // 메인 페이지로 이동
        navigator("/plans");

        // 페이지 새로고침
        window.location.reload(false);
    }

    return (
        <div className = 'container'>
            <br/><br/>
            <div className='row'> {/*row : column 12칸 grid 시스템*/}
                <div className='col-md-6 offset-md-3'> {/*전체 12 그리드 중 6개의 그리드를 차지하여 화면의 절반을 차지 + 오른쪽으로 3개의 그리드 밀어 중앙배치*/}
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login Form</h2>
                        </div>

                        <div className='card-body'>
                            <form> {/*사용자 입력을 수집하고 서버로 제출하는데 사용*/}
                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Username or Email</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='text'
                                            name='usernameOrEmail'
                                            className='form-control'
                                            placeholder='Enter username or email'
                                            value={usernameOrEmail}
                                            onChange={(e) => setUsername(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                    </div>
                                </div>
                          
                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Password</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent