import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createPlanAPI, getPlanAPI, updatePlanAPI } from '../services/PlanService';
import { getUserIdAPI } from '../services/UserService';
import { getLoggedInUser } from '../services/AuthService';
import { handlingError } from '../Exception/HandlingError'

/**
 * PlanComponent
 * 
 * Plan을 Create 또는 Update 할 수 있는 Component 입니다.
 * Path Parameter로 id가 존재하면 Update를 진행합니다. (http://localhost:3000/edit-plan/planIdFromParamsWhenUpdate)
 * 그렇지 않으면 Create를 진행합니다. (http://localhost:3000/edit-plan)
 */

const PlanComponent = () => {
    // 상태변수, 상태변수 변화시키는 함수
    const [planName, setPlanName] = useState('')
    
    const {planIdFromParamsWhenUpdate} = useParams(); //  현재 URL 경로의 매개변수(params)에 접근

    // 이름 유효성 검사에 사용
    const [errors, setErrors] = useState({
        planName: ''
    })

    const navigator = useNavigate();

    // sessionStorage에서 현재 로그인한 유저 가져오기
    // user : 로그인 유저의 username 또는 email이 저장되어 있음 (로그인 당시 입력한 ID)
    const user = getLoggedInUser()

    const [userId, setUserId] = useState()

    useEffect(() => {
        if (!user){ // 인증 정보가 없어 username을 sessionStorage에서 가져오지 못한 경우 로그아웃 처리 후 LoginComponent로 이동
            logout()
            navigator('/login')
        }
        getUserId(user)

    }, []) // component 렌더링 때 실행하여 userId를 상태변수에 저장

    // username을 통해 userId 가져오기 (using REST API)
    async function getUserId(user){
        const response = await getUserIdAPI(user).catch(error => handlingError(error, navigator))
        setUserId(response.data)
    }

    
    useEffect(() => { 

        if (!planIdFromParamsWhenUpdate) // 현재 URL에 planIdFromParamsWhenUpdate params가 없는 경우는 return (Update가 아닌 경우)
            return;

        setPlanState(planIdFromParamsWhenUpdate) // 상태변수에 plan 정보 set

    }, [planIdFromParamsWhenUpdate]) // id가 변경될 때마다 useEffect()의 내부함수가 실행됨 (planIdFromParamsWhenUpdate params가 포함된 URL이 불릴 때 id가 변경되었을지 체크 후 값 update)
    // "/edit-plan/planIdFromParamsWhenUpdate" 접근 시 form input에 state variable이 입력된 상태로 노출됨 (사용자가 값을 update하기 편하도록)

    async function setPlanState(planIdFromParamsWhenUpdate){
        const response = await getPlanAPI(planIdFromParamsWhenUpdate).catch(error => handlingError(error, navigator))
        console.log(response)
        setPlanName(response.data.planName)
    }

    // submit 버튼 눌릴 때 ADD or UPDATE 진행
    async function saveOrupdatePlan(e){
        e.preventDefault(); // submit form 하기 전 default activity 방지 

        if (!validateForm()) // 입력된 input값이 유효하지 않을 때 바로 return 처리
            return;

        const plan = {planName, userId} // plan은 JSON 형태로 서버에 전달된다
        console.log(plan)
        
        // planIdFromParamsWhenUpdate(planId)는 기본키로 plan을 고유하게 식별할 수 있는 값
        if (planIdFromParamsWhenUpdate){ // 현재 URL에 params id가 있음 = Update 연산
            const response = await updatePlanAPI(planIdFromParamsWhenUpdate, plan).catch(error => handlingError(error, navigator))
            console.log(response.data)
            navigator('/plans')

            return
        }

        // Add 연산
        const response = await createPlanAPI(plan).catch(error => handlingError(error, navigator))
        console.log(response.data);
        navigator('/plans')
    }
    
    // form 데이터의 유효성 검사
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} // "..." 복사 연산

        // planName : 비워져있으면 안됨

        errorsCopy.planName = planName.trim() ? '' : 'planName is required';

        // 하나라도 유효성 검사에 어긋나 error 메세지가 기록된 경우 valid = false 처리
        valid = errorsCopy.planName ? false : true; 

        setErrors(errorsCopy);

        return valid;
    }

    // params 유무에 따라 동적으로 title 변경
    // add, update 버튼 누를 떄 모두 현재 component가 렌더링되지만  planIdFromParamsWhenUpdate 등 params 유무에 따라 title은 다르게 표시함
    function pageTitle(){
        if (planIdFromParamsWhenUpdate){
            return <h2 className='text-center'>Update Plan</h2>
        }
        else{
            return <h2 className='text-center'>Add Plan</h2>
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>  {/*사용자 입력을 수집*/}
                            <div className='form-group mb-2'>
                                <label className='form-label'>Plan Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Plan Name'
                                    name='planName'
                                    value={planName}
                                    className={`form-control ${errors.planName ? 'is-invalid': ''}`} // planName 유효성 검사
                                    // input에 값이 바뀔때마다 setFirstName 호출 후 state 갱신
                                    onChange={(e) => setPlanName(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                >          
                                </input>
                                {errors.planName && <div className='invalid-feedback'>{errors.planName}</div>} {/*planName에 error 문구가 저장된 경우 실행*/}
                            </div>

                            <button className='btn btn-success' onClick={saveOrupdatePlan}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanComponent