import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createDailyPlanAPI, getDailyPlanAPI, updateDailyPlanAPI } from '../services/DailyPlanService';
import { createSubPlanAPI, getSubPlanAPI, updateSubPlanAPI } from '../services/SubPlanService';
import { typeOptions } from '../Options/TypeOption';
import { currencyOptions } from '../Options/CurrencyOption';
import { DateTime } from 'luxon';

/**
 * SubPlanComponent
 * 
 * Sub Plan을 Add 또는 Update 할 수 있는 Component 입니다.
 * Add, Update는 같은 component를 쓰고 있으며 URL 파라미터 Key 값을 통해 구분합니다.
 * 
 * URL 파라미터의 key 값이 “subIdFromParamsWhenUpdate” 이면 Update를 진행합니다. (http://localhost:3000/sub-plan/update/{subIdFromParamsWhenUpdate})
 * Update 연산은 특정 sub plan에 대해 진행하기 때문에 URL 파라미터로 subId 전달합니다.
 * 
 * URL 파라미터의 key 값이  “dailyIdFromParamsWhenAdd” 이면 Add를 진행합니다. (http://localhost:3000/sub-plan/add/{dailyIdFromParamsWhenAdd})
 * Add 연산은 특정 daily plan에 대해 진행하기 때문에 URL 파라미터로 dailyId를 전달합니다.
 */

const SubPlanComponent = () => {

    const params = useParams(); //  모든 URL 파라미터를 객체로 가져옴
    const navigator = useNavigate()

    const [type, setType] = useState('')
    const [startTime, setStartTime] = useState('') // {HH:MM} 형식으로 저장 (백엔드에서 추가 검증 로직 O)
    const [endTime, setEndTime] = useState('') // {HH:MM} 형식으로 저장 (백엔드에서 추가 검증 로직 O)
    const [location, setLocation] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [money, setMoney] = useState('')
    const [currency, setCurrency] = useState('')
    const [comment, setComment] = useState('')
    const [isComplete, setIsComplete] = useState('')

    const [dailyId, setDailyId] = useState()

    // 이름 유효성 검사에 사용
    const [errors, setErrors] = useState({

        //type: '',
        //startTime: '',
        //endTime: '',
        location: '',
        //vehicle: '',
        money: '',
        currency: ''
        //comment: '',
        //isComplete: ''

    })

    // URL 파라미터에 값이 설정되어 변동이 생길 때 실행 
    useEffect(() => { 
        console.log(params)

        if (!params)
            return

        if (params.subIdFromParamsWhenUpdate) // update 일 때 (params key 값으로 판단)
        {
            setSubPlanState(params.subIdFromParamsWhenUpdate)    
            return
        }

        // add 일 때
        setDailyId(params.dailyIdFromParamsWhenAdd)

    }, [params]) 

    // dailyId를 통해 daily plan 정보 GET 후 daily Name, plan Id를 상태변수에 저장
    async function setSubPlanState(subIdFromParams){
        const response = await getSubPlanAPI(subIdFromParams).catch(error => console.error(error))
        console.log(response)
        
        setType(response.data.type)
        setStartTime(response.data.startTime)
        setEndTime(response.data.endTime)
        setLocation(response.data.location)
        setVehicle(response.data.vehicle)
        setMoney(response.data.money)
        setCurrency(response.data.currency)
        setComment(response.data.comment)
        setIsComplete(response.data.isComplete)

        setDailyId(response.data.dailyId)
    }

    // form 데이터의 유효성 검사
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors} // "..." 복사 연산

        errorsCopy.location = location.trim() ? '' : 'Location is required';
        errorsCopy.currency = currency.trim() ? '' : 'Currency is required';

        // 하나라도 유효성 검사에 어긋나 error 메세지가 기록된 경우 valid = false 처리
        valid = errorsCopy.location || 
                errorsCopy.currency ? false : true; 

        setErrors(errorsCopy);

        return valid;
    }

    // params 객체에 할당된 값에 따라 동적으로 title 변경
    function pageTitle(){
        if (params.subIdFromParamsWhenUpdate){ // update 인 경우
            return <h2 className='text-center'>Update Sub Plan</h2>
        }
        else{ // add 인 경우
            return <h2 className='text-center'>Add Sub Plan</h2>
        }
    }


    

    // submit 버튼 눌릴 때 ADD or UPDATE 진행
    async function saveOrupdateSubPlan(e){
        e.preventDefault(); // submit form 하기 전 default activity 방지 

        if (!validateForm()) // 입력된 input값이 유효하지 않을 때 바로 return 처리
            return;

        const subPlan = {
            type,
            startTime,
            endTime,
            location,
            vehicle,
            money,
            currency,
            comment,
            isComplete,
            dailyId
        } // subPlan은 JSON 형태로 서버에 전달된다

        console.log(subPlan)
        
        if (params.subIdFromParamsWhenUpdate){ // Update 연산
            const response = await updateSubPlanAPI(params.subIdFromParamsWhenUpdate, subPlan).catch(error => console.error(error))
            console.log(response.data)
            navigator(`/sub-plans/${response.data.dailyId}`) // sub plan component로 돌아가기

            return
        }

        // Add 연산
        const response = await createSubPlanAPI(subPlan).catch(error => console.error(error))
        console.log(response.data);
        navigator(`/sub-plans/${response.data.dailyId}`) // sub plan component로 돌아가기
    }

    const formatTime = (timeStr) => {

        if (!timeStr)
            return ''

        // 문자열을 ':'로 분리
        const parts = timeStr.split(':');

        // 'HH'와 'MM' 부분만 결합하여 반환
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : 'Invalid Time'
    };

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
                                <label className='form-label'>Type:</label><br/>
                                <select 
                                    id="typeSelect" 
                                    value={type} 
                                    className="form-control"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value={type} className="hidden-option">{type ? type : "Select Option ▼"}</option>
                                    {
                                        typeOptions.map(typeOption => 
                                            <option key={typeOption} value={typeOption}>{typeOption}</option>
                                        )
                                    }
                                </select>
                            </div>
                            
                            {/* StartTime와 endTime을 한 row에 표시 */}
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group mb-2'>
                                        <label className='form-label'>Start Time:</label>
                                        <input
                                            type='time'
                                            placeholder='Enter Start Time'
                                            name='startTime'
                                            value={formatTime(startTime)}
                                            className='form-control'
                                            // input에 값이 바뀔때마다 state 갱신
                                            onChange={(e) => setStartTime(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                        >          
                                        </input>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-2'>
                                        <label className='form-label'>End Time:</label>
                                        <input
                                            type='time'
                                            placeholder='Enter End Time'
                                            name='endTime'
                                            value={formatTime(endTime)}
                                            className='form-control'
                                            // input에 값이 바뀔때마다 state 갱신
                                            onChange={(e) => setEndTime(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                        >          
                                        </input>
                                    </div>
                                </div>
                            </div>
                                
                            <div className='form-group mb-2'>
                                <label className='form-label'>Location:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Location'
                                    name='location'
                                    value={location}
                                    className={`form-control ${errors.location ? 'is-invalid': ''}`} // 유효성 검사
                                    // input에 값이 바뀔때마다 state 갱신
                                    onChange={(e) => setLocation(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                >          
                                </input>
                                {errors.location && <div className='invalid-feedback'>{errors.location}</div>} {/*error 문구가 저장된 경우 실행*/}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Vehicle:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Vehicle'
                                    name='vehicle'
                                    value={vehicle}
                                    className='form-control'
                                    // input에 값이 바뀔때마다 state 갱신
                                    onChange={(e) => setVehicle(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                >          
                                </input>
                            </div>
                            
                            {/* Money와 Currency를 한 row에 표시 */}
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group mb-2'>
                                        <label className='form-label'>Money:</label>
                                        <input
                                            type='number'
                                            placeholder='Enter Money'
                                            name='money'
                                            value={money}
                                            className='form-control'
                                            // input에 값이 바뀔때마다 state 갱신
                                            onChange={(e) => setMoney(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                        >          
                                        </input>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-2'>
                                        <label className='form-label'>Currency:</label><br/>
                                        <select 
                                            id="currencySelect" 
                                            value={currency} 
                                            className={`form-control ${errors.currency ? 'is-invalid': ''}`} // 유효성 검사
                                            onChange={(e) => setCurrency(e.target.value)}
                                        >
                                            <option value="" className="hidden-option">Select Option ▼</option>
                                            {
                                                Object.keys(currencyOptions).map(currencyOption => 
                                                    <option key={currencyOption} value={currencyOption}>{currencyOption}</option>
                                                )
                                            }
                                        </select>
                                        {errors.currency && <div className='invalid-feedback'>{errors.currency}</div>} {/*error 문구가 저장된 경우 실행*/}
                                    </div>
                                </div>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Comment:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Comment'
                                    name='comment'
                                    value={comment}
                                    className='form-control'
                                    // input에 값이 바뀔때마다 state 갱신
                                    onChange={(e) => setComment(e.target.value)} // e.target.value : event 객체에서 입력값을 가져옴
                                >          
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={saveOrupdateSubPlan}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubPlanComponent