# Trip Plan Web Application


Trip Plan Web Application은 Spring boot, React를 활용하여 제작한 여행계획을 위한 풀스택 웹 애플리케이션 입니다.

## 목차

- [Trip Plan Web Application](#Trip-Plan-Web-Application)
  - [목차](#목차)
  - [소개](#소개)
  - [구현내용](#구현내용)
    - [1. 백엔드](#1-백엔드)
    - [2. 프론트엔드](#2-프론트엔드)
  - [라이센스](#라이센스)

## 소개

- 로그인 후 개인 사용자별로 여행 계획을 누적할 수 있습니다.

- 여행 계획에 대해 불러오기, 추가, 업데이트, 삭제 작업을 할 수 있습니다.

- Github
    - backend : https://github.com/aika1118/trip-plan-web-application-backend
    - frondend : https://github.com/aika1118/trip-plan-web-application-frontend

## 구현내용

### 1. 백엔드

- Spring boot를 통해 구축 진행
- Plan, DailyPlan, SubPlan에 대해 계층형 아키텍쳐 구현
  - CRUD 기능을 위한 REST API 응답 로직 구현
- 인증/인가 기능 구현
  - 인증을 위해 JWT 활용


### 2. 프론트엔드

- React를 활용하여 component 단위로 화면개발 진행
- 로그인 및 회원가입 컴포넌트 구현
- Plan, DailyPlan, SubPlan에 대해 CRUD 조작이 가능한 컴포넌트 구현
- 로그인, 회원가입, CRUD 조작을 위한 REST API 호출 로직 구현
- 모든 API 요청 전 Authorization 헤더에 JWT를 추가하여 인증 진행
- API 호출 후 에러 발생 시 catch 후 error handling 함수에서 처리진행

## 라이센스

이 프로젝트는 MIT 라이센스 하에 라이센스가 부여됩니다.
