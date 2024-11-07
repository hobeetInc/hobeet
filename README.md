## hobeet team 입니다.

# Egg Friends - 모임을 통해 관계의 온도를 높이다

# 프로젝트 소개
Egg Friends는 기존 모임 플랫폼의 한계를 개선한 새로운 커뮤니티 서비스입니다. 네이버 밴드, 카페, 블로그 등의 기존 플랫폼에서는 결제 시스템이 부재하여 별도의 플랫폼을 통해 참가비를 처리해야 하는 불편함이 있었고, 이러한 불편함을 해결하기 위해 자체 결제 시스템을 핵심으로 하는 올인원 커뮤니티 플랫폼을 개발했습니다.


## 팀 소개 👨‍🏫
- 팀명: 호빗 = hobby(취미) + meet(만나다)
- 프론트엔드 개발자 (4명)
- 디자이너 (2명)


## 역할 분담
- 장성현: 결제 시스템 기능 구현
- 이태연: 실시간 채팅 기능 구현
- 최지민: 모임 생성 및 상세 페이지 구현
- 이재호: 모임 가입 기능 구현
- 구양희: 디자인
- 김혜빈: 디자인


## 배포 주소
(url 넣을 예정)


## 기획 배경
1. 분절된 플랫폼 통합
    - 기존 플랫폼: 모임 운영과 결제가 서로 다른 플랫폼에서 이루어짐
    - 해결방안: 카카오페이 연동으로 모임 운영과 결제를 하나의 플랫폼에서 해결

2. 체계적인 모임 관리
    - 기존 플랫폼: 참여자 조건 설정과 관리가 제한적
    - 해결방안: 상세한 참여자 조건 설정과 승인 시스템 도입


## 🛠 Tech Stack
### Framework & Language
<div>
  <img src="https://img.shields.io/badge/Next.js 14-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

### Styling
<div>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white">
</div>

### State Management
<div>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-brown?style=for-the-badge&logo=zustand&logoColor=white">
</div>

### Backend & Database
<div>
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
</div>

### Development Tools
<div>
  <img src="https://img.shields.io/badge/App Router-000000?style=for-the-badge&logo=next.js&logoColor=white">
</div>


## Key Features
- Next.js App Router: 페이지 라우팅 및 SSR 지원
- TypeScript: 정적 타입 검사로 안정성 확보
- Tailwind CSS: 유틸리티 기반 스타일링
- React Query: 서버 상태 관리 및 캐싱
- Zustand: 클라이언트 상태 관리
- Supabase:
    - Authentication
    - Database
    - Real-time subscriptions
    - File storage


## 서비스 특징
1. 에그팝(Eggpop)
    - 부담없이 참여할 수 있는 일회성 모임
    - 인원, 성별, 나이 제한 설정 가능
    - 조건 충족 시 즉시 가입 가능

2. 에그클럽(Eggclub)
    - 지속적인 관계 형성을 위한 정기적 모임
    - 인원, 성별, 나이 제한 설정 가능
    - 승인제 / 비승인제 선택 가능

2-1. 에그데이(Eggday)
    - 에그클럽 내 정기 모임 공지 시스템
    - 모임장이 생성한 공지에 크루원들이 참여
    - 참가비 결제 후 참여 확정
    - 간편한 정기모임 일정 관리


## 주요 기술 특징
    1. 결제 시스템
    - 카카오페이 API 연동
    - 에그팝, 에그데이 참가 시 결제-참여 연동
    - 자동화된 결제 내역 관리

    2. 실시간 채팅
    - Supabase Realtime 활용
    - 실시간 데이터 동기화
    - 즉각적인 메세지 전송 및 수신
    - 안정적인 실시간 커뮤니케이션
    - 모임별 독립된 채팅방 제공


 ## 권한 관리 🔐

    1. 비로그인 유저
        - 모임 검색 및 조회 (읽기 전용)
        - 로그인/회원가입

    2. 로그인 유저
        - 모임 생성 및 참여
        - 채팅 참여
        - 결제 기능
        - 마이페이지 접근

    3. 에그장(호스트)
        - 모임 관리
        - 에그데이 생성
        - 멤버 승인


## 프로젝트 구조
    ```
📦app
 ┣ 📂(pages)
 ┃ ┣ 📂(auth)      # 인증 관련
 ┃ ┣ 📂(club)      # 모임 관련
 ┃ ┣ 📂(chat)      # 채팅 관련
 ┃ ┣ 📂(mypage)    # 마이페이지
 ┃ ┣ 📂(search)    # 검색 관련
 ┃ ┗ 📂(kakaopay)  # 결제 관련
 ┣ 📂api           # API 라우트
 ┣ 📂store         # 전역 상태 관리
 ┗ 📂providers     # 프로바이더

    ```