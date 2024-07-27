import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deletePlanAPI, getAllPlansAPI } from '../services/PlanService';
import { getUserIdAPI } from '../services/UserService';

/**
 * ListPlanComponent
 * 
 * 모든 Plan을 테이블 형태로 보여주는 component 입니다.
 * update 버튼을 눌러서 Plan을 update 할 수 있습니다.
 * delete 버튼을 눌러서 Plan을 delete 할 수 있습니다.
 */

const ListPlanComponent = () => {

    function addNewPlans(){
        navigator('/edit-plan') // 해당 경로로 이동시킴
        // 이후 app.jsx의 router에 따라 PlanComponent가 렌더링됨
        // 해당 component에서 새로운 plan 추가 작업 진행
    }

    // 초기상태 = 빈 배열 ([])
    // plans에 plan 정보를 배열에 담을 것임 (JSON 객체 형식으로)
    const [plans, setPlans] = useState([])

    // 테스트를 위해 임시로 로그인한 username 지정
    // 차후 로그인 후 sessionStorage에서 username 가져오도록 수정
    const USER_NAME_FOR_TEST = 'wskang'

    // 내가 소유한 plan을 가져오기 위해 userId를 상태변수로 관리
    const [userId, setUserId] = useState()

    const navigator = useNavigate(); // 다른 페이지로 이동시킬 때 사용

    // 보안을 위해 매번 component 렌더링 될 때마다 username을 통해 서버에서 userId를 가져오도록 구현
    // 이후 해당 userId에 속하는 plan을 가져오기
    useEffect(() => {
        getUserId(USER_NAME_FOR_TEST)
    }, [])

    useEffect(() => {   
        if (!userId) // userId가 아직 set 되지 않았을 경우 (DB상 userID는 1 이상 값을 가짐)
            return

        getAllPlans(userId)
    }, [userId]) // userId에 변경이 일어날 때 실행
    

    // username을 통해 userId 가져오기 (using REST API)
    async function getUserId(USER_NAME_FOR_TEST){
        const response = await getUserIdAPI(USER_NAME_FOR_TEST).catch(error => console.error(error))
        setUserId(response.data)
    }


    // 모든 Plan 정보를 서버에서 받아와서 state variable에 set
    async function getAllPlans(userId){
        const response = await getAllPlansAPI(userId).catch(error => console.error(error)) 

        // 정상적으로 response 받으면 reponse.data로 state 갱신
        setPlans(response.data)
    }

    function updatePlan(id){
        navigator(`/edit-plan/${id}`)
    }

    async function deletePlan(id){ 
        console.log(id);

        // 차후 bootstrap으로 더 깔끔한 삭제 확인창을 띄워보자
        const confirmed = window.confirm("Are you sure you want to delete this plan?");
        if (!confirmed)
            return
        
        // delete REST API 호출 발생
        const response = await deletePlanAPI(id).catch(error => console.error(error))

        // delete 성공 후 페이지 구성을 위해 DB 정보를 다시 받아와서 state variable 갱신
        getAllPlans();
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Plan</h2>
            <button className='btn btn-primary mb-2' onClick={addNewPlans}>Add Plans</button>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th style={{width: '80%'}}>Plan Name</th>
                        <th style={{width: '10%'}}>Update</th>
                        <th style={{width: '10%'}}>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        plans.map(plan => // 모든 plan 순회
                            <tr key={plan.planId} >
                                <td
                                    onClick={() => navigator(`/daily-plans/${plan.planId}`)} // 클릭 시 해당하는 plan의 daily plan 경로로 이동
                                    style={{ cursor: 'pointer' }} 
                                >{plan.planName}</td>
                                <td>
                                    {/* 매개변수가 있기 때문에 화살표 함수 사용 */}
                                    <button className='btn btn-info' onClick={() => updatePlan(plan.planId)}>Update</button>                                
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deletePlan(plan.planId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListPlanComponent