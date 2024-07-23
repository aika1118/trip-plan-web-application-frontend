import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createPlanAPI, getPlanAPI, updatePlanAPI } from '../services/PlanService';

const PlanComponent = () => {
    // 상태변수, 상태변수 변화시키는 함수
    const [planName, setPlanName] = useState('')
    const [userId, setUserId] = useState(2)

    const {id} = useParams(); //  현재 URL 경로의 매개변수(params)에 접근

    const [errors, setErrors] = useState({
        planName: ''
    })

    const navigator = useNavigate();
    
    useEffect(() => { 

        if (!id) // 현재 URL에 id params가 없는 경우는 return (Update가 아닌 경우)
            return;

        setPlanState(id) // 상태변수에 plan 정보 set

    }, [id]) // id가 변경될 때마다 useEffect()의 내부함수가 실행됨 (id params가 포함된 URL이 불릴 때 id가 변경되었을지 체크 후 값 update)
    // "/edit-plan/id" 접근 시 form input에 state variable이 입력된 상태로 노출됨 (사용자가 값을 update하기 편하도록)

    async function setPlanState(id){
        const response = await getPlanAPI(id).catch(error => console.error(error))
        console.log(response)
        setPlanName(response.data.planName)
    }

    // submit 버튼 눌릴 때 ADD or UPDATE 진행
    async function saveOrupdatePlan(e){
        e.preventDefault(); // submit form 하기 전 default activity 방지 

        if (!validateForm()) // 입력된 input값이 유효하지 않을 때 바로 return 처리
            return;

        const plan = {planName} // plan에서 update 필요한 정보 (planId, userId는 고정)
        console.log(plan)
        
        // id(planId)는 기본키로 plan을 고유하게 식별할 수 있는 값
        if (id){ // 현재 URL에 params id가 있음 = Update 연산
            const response = await updatePlanAPI(id, plan).catch(error => console.error(error))
            console.log(response.data)
            navigator('/plans')

            return
        }

        // Add 연산
        const response = await createPlanAPI(plan).catch(error => console.error(error))
        console.log(response.data);
        navigator('/plans')
    }
    
    // form 데이터의 유효성 검사
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} // "..." 복사 연산

        if (planName.trim()){
            errorsCopy.planName = '';
        }
        else{
            errorsCopy.planName = 'Plan name is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    // params 유무에 따라 동적으로 title 변경
    // add, update 버튼 누를 떄 모두 현재 component가 렌더링되지만  id 등 params 유무에 따라 title은 다르게 표시함
    function pageTitle(){
        if (id){
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
                                {errors.planName && <div className='invalid-feedback'>{errors.planName}</div>} {/*firstName에 error 문구가 저장된 경우 실행*/}
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