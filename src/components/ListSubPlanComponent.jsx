import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteSubPlanAPI, getAllSubPlansAPI } from '../services/SubPlanService';
import { getDailyPlanAPI } from '../services/DailyPlanService';
import { currencyOptions } from '../Options/CurrencyOption';
import { handlingError } from '../Exception/HandlingError'
import { noDataMessage } from './Message/NoDataMessage';

/**
 * ListSubPlanComponent
 * 
 * 모든 SubPlan을 테이블 형태로 보여주는 component 입니다.
 * ListDailyPlanComponent에서 DailyPlan이 클릭되면 해당 DailyPlan에 속하는 SubPlan만 모두 보여줍니다.
 * update 버튼을 눌러서 Sub Plan을 update 할 수 있습니다.
 * delete 버튼을 눌러서 Sub Plan을 delete 할 수 있습니다.
 */

const ListSubPlanComponent = () => {

    // subPlan 저장
    const [subPlans, setSubPlans] = useState([])

    // 현재 보고있는 DailyPlan의 dailyIdFromParams 저장
    const [dailyId, setDailyId] = useState()

    // 현재 보고있는 dailyPlan 이름 저장
    const [dailyName, setDailyName] = useState()

    // 현재 속하고 있는 planId 저장
    const [planId, setPlanId] = useState()

    const {dailyIdFromParams} = useParams(); //  현재 URL 경로의 매개변수(params)에 접근
    const navigator = useNavigate(); // 다른 페이지로 이동시킬 때 사용

    // 특정 dailyPlan id가 URL에 전달되면서 현재 component가 호출됐을 때 실행
    useEffect(() => { 

        if (!dailyIdFromParams) // 현재 URL에 dailyIdFromParams params가 없는 경우는 return
            return;

        setDailyId(dailyIdFromParams) // 상태변수에 daily plan 정보 set
    }, [dailyIdFromParams]) 

    // dailyId 상태변수가 set 되었을 때 실행
    useEffect(() => {

        if (!dailyId) // dailyId 상태 변수가 set 되지 않았다면 return 
             return;
        
        setDailyPlanName(dailyId)
        getAllSubPlans(dailyId)
    }, [dailyId])

    async function setDailyPlanName(dailyId){
        const response = await getDailyPlanAPI(dailyId, false).catch(error => handlingError(error, navigator)) 

        // 상태 변수에 현재 daily plan 이름을 set
        setDailyName(response.data.dailyName)
        setPlanId(response.data.planId)
    }

    // 모든 Sub Plan 정보를 서버에서 받아와서 state variable에 set
    async function getAllSubPlans(dailyId){
        const response = await getAllSubPlansAPI(dailyId).catch(error => handlingError(error, navigator)) 
        noDataMessage(response.data.length) // 데이터 없는 경우 없다고 사용자에게 message 출력

        // 정상적으로 response 받으면 reponse.data로 state 갱신
        setSubPlans(response.data)
    }

    // 현재 daily plan에 sub plan 추가
    function addSubPlan(dailyId){
        navigator(`/sub-plans/add/${dailyId}`)
    }

    function updateSubPlan(subId){
        navigator(`/sub-plans/update/${subId}`)
    }
    
    async function deleteSubPlan(subId){
        console.log(subId);

        // 차후 bootstrap으로 더 깔끔한 삭제 확인창을 띄워보자
        const confirmed = window.confirm("Are you sure you want to delete this sub plan?");
        if (!confirmed)
            return
        
        // delete REST API 호출 발생
        const response = await deleteSubPlanAPI(subId).catch(error => handlingError(error, navigator))

        // delete 성공 후 페이지 구성을 위해 DB 정보를 다시 받아와서 state variable 갱신
        getAllSubPlans(dailyId);
    }

    const formatTime = (timeStr) => {

        if (!timeStr)
            return ''

        // 문자열을 ':'로 분리
        const parts = timeStr.split(':');

        // 'HH'와 'MM' 부분만 결합하여 반환
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : 'Invalid Time'
    };

    const formatMoney = (money, currency) => {
        if (!money)
            return ''

        if (!currencyOptions[currency])
            return 'Invalid currency'

        return `${currencyOptions[currency]}${money.toLocaleString()}`; // {통화} + {3자리마다 쉼표 찍어서 money 출력}
    };

    return (
        <div className='container'>
            <h2 className='text-center'>{dailyName}</h2>
            <button className='btn btn-primary mb-2 me-1' onClick={() => addSubPlan(dailyId)}>Add Sub Plans</button>
            <button className='btn btn-secondary mb-2' onClick={() => navigator(`/daily-plans/${planId}`)}>Back</button>
            <table className='table table-bordered table-hover'>
                <thead className='text-center'>
                    <tr>
                        {/* <th style={{width: '80%'}}>Sub Plan Name</th>
                        <th style={{width: '10%'}}>Update</th>
                        <th style={{width: '10%'}}>Delete</th> */}
                        <th>Type</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                        <th>Vehicle</th>
                        <th>Money</th>
                        <th>Comment</th>
                        <th>Complete</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody className='text-center'>
                    {
                        subPlans.map(subPlan => // 모든 plan 순회
                            <tr key={subPlan.subId} >
                                <td>{subPlan.type}</td>
                                <td>{formatTime(subPlan.startTime)}</td>
                                <td>{formatTime(subPlan.endTime)}</td>
                                <td>{subPlan.location}</td>
                                <td>{subPlan.vehicle}</td>
                                <td>{formatMoney(subPlan.money, subPlan.currency)}</td>
                                <td>{subPlan.comment}</td>
                                <td>{subPlan.isComplete ? 'YES' : 'NO'}</td>
                                <td>
                                    {/* 매개변수가 있기 때문에 화살표 함수 사용 */}
                                    <button className='btn btn-info' onClick={() => updateSubPlan(subPlan.subId)}>Update</button>                                
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteSubPlan(subPlan.subId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSubPlanComponent