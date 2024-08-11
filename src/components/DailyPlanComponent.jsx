import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createDailyPlanAPI, getDailyPlanAPI, updateDailyPlanAPI } from '../services/DailyPlanService';
import { handlingError } from '../Exception/HandlingError'

/**
 * DailyPlanComponent
 * 
 * Daily Plan을 Add 또는 Update 할 수 있는 Component 입니다.
 * Add, Update는 같은 component를 쓰고 있으며 URL 파라미터 Key 값을 통해 구분합니다.
 * 
 * URL 파라미터의 key 값이 “dailyIdFromParamsWhenUpdate” 이면 Update를 진행합니다. (http://localhost:3000/daily-plan/update/{dailyIdFromParamsWhenUpdate})
 * Update 연산은 특정 daily plan에 대해 진행하기 때문에 URL 파라미터로 dailyId를 전달합니다.
 * 
 * URL 파라미터의 key 값이  “planIdFromParamsWhenAdd” 이면 Add를 진행합니다. (http://localhost:3000/daily-plan/add/{planIdFromParamsWhenAdd})
 * Add 연산은 특정 plan에 대해 진행하기 때문에 URL 파라미터로 planId를 전달합니다.
 */

const DailyPlanComponent = () => {

    const params = useParams(); //  모든 URL 파라미터를 객체로 가져옴
    const navigator = useNavigate()

    const [dailyName, setDailyName] = useState('')
    const [planId, setPlanId] = useState()

    // 이름 유효성 검사에 사용
    const [errors, setErrors] = useState({
        dailyName: ''
    })


    // URL 파라미터에 값이 설정되어 변동이 생길 때 실행 
    useEffect(() => { 
        console.log(params)

        if (!params)
            return

        if (params.dailyIdFromParamsWhenUpdate) // update 일 때 (params key 값으로 판단)
        {
            setDailyPlanState(params.dailyIdFromParamsWhenUpdate)    
            return
        }

        // add 일 때
        setPlanId(params.planIdFromParamsWhenAdd)

    }, [params]) 

    // dailyId를 통해 daily plan 정보 GET 후 daily Name, plan Id를 상태변수에 저장
    async function setDailyPlanState(dailyIdFromParams){
        const response = await getDailyPlanAPI(dailyIdFromParams).catch(error => handlingError(error, navigator))
        console.log(response)
        setPlanId(response.data.planId)
        setDailyName(response.data.dailyName)
    }

    // form 데이터의 유효성 검사
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} // "..." 복사 연산

        // dailyName : 비워져있으면 안됨

        errorsCopy.dailyName = dailyName.trim() ? '' : 'dailyName is required';

        // 하나라도 유효성 검사에 어긋나 error 메세지가 기록된 경우 valid = false 처리
        valid = errorsCopy.dailyName ? false : true; 

        setErrors(errorsCopy);

        return valid;
    }

    // params 객체에 할당된 값에 따라 동적으로 title 변경
    function pageTitle(){
        if (params.dailyIdFromParamsWhenUpdate){ // update 인 경우
            return <h2 className='text-center'>Update Daily Plan</h2>
        }
        else{ // add 인 경우
            return <h2 className='text-center'>Add Daily Plan</h2>
        }
    }


    

    // submit 버튼 눌릴 때 ADD or UPDATE 진행
    async function saveOrupdateDailyPlan(e){
        e.preventDefault(); // submit form 하기 전 default activity 방지 

        if (!validateForm()) // 입력된 input값이 유효하지 않을 때 바로 return 처리
            return;

        const dailyPlan = {dailyName, planId} // dailyPlan은 JSON 형태로 서버에 전달된다
        console.log(dailyPlan)
        
        if (params.dailyIdFromParamsWhenUpdate){ // Update 연산
            const response = await updateDailyPlanAPI(params.dailyIdFromParamsWhenUpdate, dailyPlan).catch(error => handlingError(error, navigator))
            console.log(response.data)
            navigator(`/daily-plans/${response.data.planId}`) // plan component로 돌아가기

            return
        }

        // Add 연산
        const response = await createDailyPlanAPI(dailyPlan).catch(error => handlingError(error, navigator))
        console.log(response.data);
        navigator(`/daily-plans/${response.data.planId}`) // plan component로 돌아가기
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
                                <label className='form-label'>Daily Plan Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Daily Plan Name'
                                    name='dailyName'
                                    value={dailyName}
                                    className={`form-control ${errors.dailyName ? 'is-invalid': ''}`} // 유효성 검사
                                    // input에 값이 바뀔때마다 setFirstName 호출 후 state 갱신
                                    onChange={(e) => setDailyName(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                >          
                                </input>
                                {errors.dailyName && <div className='invalid-feedback'>{errors.dailyName}</div>} {/*dailyName에 error 문구가 저장된 경우 실행*/}
                            </div>

                            <button className='btn btn-success' onClick={saveOrupdateDailyPlan}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyPlanComponent