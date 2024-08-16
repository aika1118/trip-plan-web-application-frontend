# Node.js 20 버전을 사용하는 Alpine 이미지 선택
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR '/app'

# .package.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 애플리케이션 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

FROM nginx:stable-alpine

# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 빌드된 결과물을 Nginx로 복사 
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx는 기본적으로 80 포트에서 서비스
EXPOSE 80