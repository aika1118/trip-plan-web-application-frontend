import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllPlans } from '../services/PlanService';

const ListPlanComponent = () => {

    function addNewPlans(){
        navigator('/add-plan') // 해당 경로로 이동시킴
        // 이후 app.jsx의 router에 따라 PlanComponent가 렌더링됨
        // 해당 component에서 새로운 plan 추가 작업 진행
    }

    // 초기상태 = 빈 배열 ([])
    // plans에 plan 정보를 배열에 담을 것임 (JSON 객체 형식으로)
    const [plans, setPlans] = useState([])
    const navigator = useNavigate(); // 다른 페이지로 이동시킬 때 사용
    
    // 컴포넌트가 렌더링된 이후에 실행
    useEffect(() => {
        listPlans();
    }, []) // 빈 배열: 이 이펙트는 컴포넌트가 렌더링 될 때마다 실행됨

    // 모든 Plan 정보를 서버에서 받아와서 state variable에 set
    async function listPlans(){
        const response = await getAllPlans().catch(error => console.error(error)) 
        console.log(response.data)

        // 정상적으로 response 받으면 employees에 reponse.data로 state 갱신
        setPlans(response.data)
    }

    // function addNewEmployee(){
    //     navigator('/add-employee') // 해당 경로로 이동시킴
    //     // 이후 app.jsx의 router에 따라 EmployeeComponent가 렌더링됨
    //     // 해당 component에서 새로운 employee 추가 작업 진행
    // }

    // function updateEmployee(id){
    //     navigator(`/edit-employee/${id}`)
    // }

    // function removeEmployee(id){
    //     console.log(id);

    //     deleteEmployee(id).then((response) => { // delete REST API 호출 발생
    //         getAllEmployees(); // delete 성공 후 페이지 구성을 위해 DB 정보를 다시 받아와서 state variable 갱신
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Plan</h2>
            <button className='btn btn-primary mb-2' onClick={addNewPlans}>Add Plans</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th style={{width: '90%'}}>Plan Name</th>
                        <th style={{width: '10%'}}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        plans.map(plan => // 모든 plan 순회
                            <tr key={plan.planId}>
                                <td>{plan.planName}</td>
                                <td>
                                    {/* 매개변수가 있기 때문에 화살표 함수 사용 */}
                                    {/* <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                        style={{marginLeft: '10px'}}
                                    >Delete</button> */}
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