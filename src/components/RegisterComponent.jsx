import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handlingError } from '../Exception/HandlingError'

const RegisterComponent = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')

    const navigator = useNavigate();

    // 입력값 유효성 검사에 사용
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    })

    // form 데이터의 유효성 검사
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} // "..." 복사 연산

        // username : 비워져 있거나 '@'가 들어가 있으면 안됨
        // email : '@'가 반드시 포함되어야함
        // password : 비워져있으면 안됨

        errorsCopy.username = username.trim() ? '' : 'Username is required';
        errorsCopy.username = username.includes('@') ? 'Username cannot contain a "@"' : errorsCopy.username;   
        errorsCopy.email = email.includes('@') ? '' : 'Email should contain a "@"';
        errorsCopy.password = password.trim() ? '' : 'Password is required';

        // 하나라도 유효성 검사에 어긋나 error 메세지가 기록된 경우 valid = false 처리
        valid = errorsCopy.username || 
                errorsCopy.email ||
                errorsCopy.password ? false : true; 

        setErrors(errorsCopy);

        return valid;
    }

    async function handleRegistrationForm(e){
        e.preventDefault()

        if (!validateForm()) // 입력된 input값이 유효하지 않을 때 바로 return 처리
            return;

        const register = {username, email, password}

        console.log(register)

        const response = await registerAPICall(register).catch(error => handlingError(error, navigator))

        console.log(response.data)

        toast.success('회원가입 성공')

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
                                            className={`form-control ${errors.username ? 'is-invalid': ''}`} // 유효성 검사
                                            placeholder='Enter username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                        {errors.username && <div className='invalid-feedback'>{errors.username}</div>} {/*error 문구가 저장된 경우 실행*/}
                                    </div>
                                </div>

                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Email</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='text'
                                            name='email'
                                            className={`form-control ${errors.email ? 'is-invalid': ''}`} // 유효성 검사
                                            placeholder='Enter email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>} {/*error 문구가 저장된 경우 실행*/}
                                    </div>
                                </div>

                                <div className='row mb-3'> {/*row : column 12칸 grid 시스템*/}
                                    <label className='col-md-3 control-label'>Password</label> {/*텍스트 영역 : column 3칸*/}
                                    <div className='col-md-9'> {/*입력 영역 : column 9칸*/}
                                        <input
                                            type='password'
                                            name='password'
                                            className={`form-control ${errors.password ? 'is-invalid': ''}`} // 유효성 검사
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} //input box에 text 입력할 때마다 state variable에 text 저장
                                        >
                                        </input>
                                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>} {/*error 문구가 저장된 경우 실행*/}
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