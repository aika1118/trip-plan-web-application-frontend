import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDailyPlanAPI, getAllDailyPlansAPI } from '../services/DailyPlanService';
import { getPlanAPI } from '../services/PlanService';

/**
 * ListDailyPlanComponent
 * 
 * 모든 DailyPlan을 테이블 형태로 보여주는 component 입니다.
 * Plan 클릭 시 해당하는 Plan에 속하는 DailyPlan만 모두 보여줍니다.
 * update 버튼을 눌러서 Plan을 update 할 수 있습니다.
 * delete 버튼을 눌러서 Plan을 delete 할 수 있습니다.
 */

const ListDailyPlanComponent = () => {

    // dailyPlan 저장
    const [dailyPlans, setDailyPlans] = useState([])

    // 현재 보고있는 Plan의 planIdFromParams 저장
    const [planId, setPlanId] = useState()

    // 현재 보고있는 plan 이름 저장
    const [planName, setPlanName] = useState()

    const {planIdFromParams} = useParams(); //  현재 URL 경로의 매개변수(params)에 접근
    const navigator = useNavigate(); // 다른 페이지로 이동시킬 때 사용

    // 특정 Plan id가 URL에 전달되면서 현재 component가 호출됐을 때 실행
    useEffect(() => { 

        if (!planIdFromParams) // 현재 URL에 planIdFromParams params가 없는 경우는 return
            return;

        setPlanId(planIdFromParams) // 상태변수에 plan 정보 set
    }, [planIdFromParams]) 

    // planId 상태변수가 set 되었을 때 실행
    useEffect(() => {

        if (!planId) // planId 상태 변수가 set 되지 않았다면 return 
             return;
        
        getPlanName(planId)
        getAllDailyPlans(planId)
    }, [planId])

    async function getPlanName(planId){
        const response = await getPlanAPI(planId).catch(error => console.error(error)) 

        // 상태 변수에 현재 plan 이름을 set
        setPlanName(response.data.planName)
    }

    // 모든 Daily Plan 정보를 서버에서 받아와서 state variable에 set
    async function getAllDailyPlans(planId){
        const response = await getAllDailyPlansAPI(planId).catch(error => console.error(error)) 

        // 정상적으로 response 받으면 reponse.data로 state 갱신
        setDailyPlans(response.data)
    }

    // 현재 plan에 daily plan 추가
    function addNewDailyPlans(planId){
        navigator(`/daily-plan/add/${planId}`)
    }

    function updateDailyPlan(dailyId){
        navigator(`/daily-plan/update/${dailyId}`)
    }
    
    async function deleteDailyPlan(dailyId){
        console.log(dailyId);

        // 차후 bootstrap으로 더 깔끔한 삭제 확인창을 띄워보자
        const confirmed = window.confirm("Are you sure you want to delete this daily plan?");
        if (!confirmed)
            return
        
        // delete REST API 호출 발생
        const response = await deleteDailyPlanAPI(dailyId).catch(error => console.error(error))

        // delete 성공 후 페이지 구성을 위해 DB 정보를 다시 받아와서 state variable 갱신
        getAllDailyPlans(planId);
    }



    return (
        <div className='container'>
            <h2 className='text-center'>{planName}</h2>
            <button className='btn btn-primary mb-2' onClick={() => addNewDailyPlans(planId)}>Add Daily Plans</button>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th style={{width: '80%'}}>Daily Plan Name</th>
                        <th style={{width: '10%'}}>Update</th>
                        <th style={{width: '10%'}}>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        dailyPlans.map(dailyPlan => // 모든 plan 순회
                            <tr key={dailyPlan.dailyId} >
                                <td
                                    // onClick={() => navigator('/daily-plan')}
                                    // style={{ cursor: 'pointer' }} 
                                >{dailyPlan.dailyName}</td>
                                <td>
                                    {/* 매개변수가 있기 때문에 화살표 함수 사용 */}
                                    <button className='btn btn-info' onClick={() => updateDailyPlan(dailyPlan.dailyId)}>Update</button>                                
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteDailyPlan(dailyPlan.dailyId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDailyPlanComponent