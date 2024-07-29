import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const RegisterComponent = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')

    const navigator = useNavigate();

    async function handleRegistrationForm(e){
        e.preventDefault()

        const register = {username, email, password}

        console.log(register)

        const response = await registerAPICall(register).catch(error => console.error(error))
        console.log(response.data)

        navigator('/login')
    }

    return (
        <div className = 'container'>
            <br/><br/>
            <div className='row'> {/*row : column 12칸 grid 시스템*/}
                <div className='col-md-6 offset-md-3'> {/*전체 12 그리드 중 6개의 그리드를 차지하여 화면의 절반을 차지 + 오른쪽으로 3개의 그리드 밀어 중앙배치*/}
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>User Registration Form</h2>
                        </div>

                        <div className='card-body'>
                            <form> {/*사용자 입력을 수집하고 서버로 제출하는데 사용*/}

                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Username</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='text'
                                            name='username'
                                            className='form-control'
                                            placeholder='Enter username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Email</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='text'
                                            name='email'
                                            className='form-control'
                                            placeholder='Enter email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
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
                                    <button className='btn btn-primary' onClick={(e) => handleRegistrationForm(e)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent