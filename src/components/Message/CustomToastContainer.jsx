import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right" // 알람 위치 지정
      autoClose={3000} // 자동 off 시간
      hideProgressBar={false} // 진행시간바 숨김 여부
      newestOnTop={false} // 최신 알림 맨 위에 표시 여부
      closeOnClick // 알림을 클릭하면 자동으로 닫힘
      rtl={false} // 알림이 오른쪽에서 왼쪽으로 진행 여부
      pauseOnFocusLoss // // 화면을 벗어나면 알람 정지
      draggable // 드래그 가능
      pauseOnHover // 마우스를 올리면 알람 정지
      theme="light" // 알림의 테마를 설정
    />
  );
};

export default CustomToastContainer;
