/**
 * RestApiUrlConfig
 * 
 * REST API를 요청할 서버의 IP, PORT를 설정 (개발, 운영 나누어 변수 지정)
 * 
 */

const DEV = 'localhost'
const PUBLISH = import.meta.env.VITE_APP_PUBLIC_IP

const urlConfig = {
    IP: PUBLISH,
    PORT: '8080',
  };
  
  export default urlConfig;

