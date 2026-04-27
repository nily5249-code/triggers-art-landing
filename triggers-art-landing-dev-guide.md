# 제1회 트리거스 ART 전시회 랜딩페이지 개발문서

## 1. 문서 목적

이 문서는 `제1회 트리거스 ART 전시회` 랜딩페이지를 HTML, CSS, JavaScript로 구현하기 위한 개발 기준 문서다.  
기획서의 방향을 유지하면서 실제 마크업 구조, 스타일 설계, 인터랙션 구현, 콘텐츠 관리 방식을 정리한다.

## 2. 프로젝트 목표

- 디지털 아트 전시 특유의 정제된 분위기를 웹 화면에서 구현한다.
- 전시 정보, 작가 참가 신청, 관람 신청을 명확하게 전달한다.
- 30명 이상의 단체전이라는 특성을 반영하되, 작품 수 변동에도 대응 가능한 구조로 만든다.
- 모바일과 데스크톱 모두에서 안정적으로 동작하는 반응형 랜딩페이지를 제작한다.

## 3. 기본 전시 정보

- 전시명: 제1회 트리거스 ART 전시회
- 전시 형식: 30명 이상 참여 단체전
- 출품 방식: 작가 1인당 1작품
- 작품 수: 최종 참여 인원에 따라 변동 가능
- 장소: 대전 아르테미 갤러리
- 지역: 대전
- 전시 기간: 5월 30일 ~ 6월 5일
- 작가 참가 신청: 구글폼 접수
- 전시 관람 신청: 별도 구글폼 접수
- 튜터 정보 표기명: 트리거스

## 4. 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript

추가 라이브러리 없이도 구현 가능하도록 설계한다.  
애니메이션은 CSS와 Intersection Observer 기반 JavaScript로 처리하는 것을 기본으로 한다.

## 5. 권장 파일 구조

```text
/project-root
  index.html
  /assets
    /images
    /icons
  /styles
    reset.css
    main.css
    responsive.css
  /scripts
    main.js
    data.js
```

## 6. 페이지 구성

랜딩페이지는 한 페이지 스크롤 구조를 기본으로 한다.

### 섹션 구성 순서

1. Hero
2. Exhibition Intro
3. Curatorial Note
4. Artists
5. Works Preview
6. Space Experience
7. Exhibition Info
8. CTA / Location
9. Footer

## 7. HTML 설계 가이드

### 7.1 기본 레이아웃

- `header`는 고정형 또는 반고정형으로 구성한다.
- 각 주요 영역은 `section` 태그로 구분한다.
- 콘텐츠 너비를 제한하는 공통 `container` 클래스를 사용한다.
- 접근성을 위해 제목 계층은 `h1 > h2 > h3` 순서를 유지한다.

### 7.2 예시 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>제1회 트리거스 ART 전시회</title>
  <link rel="stylesheet" href="./styles/reset.css" />
  <link rel="stylesheet" href="./styles/main.css" />
  <link rel="stylesheet" href="./styles/responsive.css" />
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="#hero" class="logo">TRIGGERS ART</a>
      <nav class="gnb">
        <a href="#intro">전시 소개</a>
        <a href="#artists">참여 작가</a>
        <a href="#info">전시 정보</a>
      </nav>
    </div>
  </header>

  <main>
    <section id="hero" class="hero-section"></section>
    <section id="intro" class="intro-section"></section>
    <section id="curatorial" class="curatorial-section"></section>
    <section id="artists" class="artists-section"></section>
    <section id="works" class="works-section"></section>
    <section id="experience" class="experience-section"></section>
    <section id="info" class="info-section"></section>
    <section id="cta" class="cta-section"></section>
  </main>

  <footer class="site-footer"></footer>

  <script src="./scripts/data.js"></script>
  <script src="./scripts/main.js"></script>
</body>
</html>
```

## 8. 섹션별 개발 명세

## 8.1 Hero 섹션

### 목적

- 첫 화면에서 전시의 무드를 강하게 전달한다.
- 작가 신청과 관람 신청을 즉시 유도한다.

### 포함 콘텐츠

- 전시명
- 메인 카피
- 기간
- 장소
- CTA 버튼 2개
- 대표 비주얼 이미지 또는 영상

### 구현 포인트

- 화면 높이 기준 `min-height: 100vh`
- 좌측 텍스트, 우측 비주얼 또는 풀스크린 비주얼 오버레이 구조
- CTA 버튼은 `전시 작가로 참가 신청`, `전시 관람 신청`으로 분리
- 버튼 클릭 시 각각 다른 구글폼 링크로 이동

## 8.2 전시 소개 섹션

### 목적

- 전시의 성격을 짧고 인상적으로 설명한다.

### 포함 콘텐츠

- 소개 제목
- 소개 본문
- 전시 키워드
- 단체전 구성 설명

### 반영 문구 기준

- 특정 기술 소개처럼 보이지 않게 작성
- 30명 이상 단체전, 1인 1작품 구조가 자연스럽게 드러나야 함

## 8.3 큐레토리얼 노트 섹션

### 목적

- 전시의 해석 축을 제공한다.

### 포함 콘텐츠

- 섹션 타이틀
- 3~5문단 텍스트

### 구현 포인트

- 넓은 행간과 여백 사용
- 본문 길이가 길 경우 2열 레이아웃 가능

## 8.4 참여 작가 섹션

### 목적

- 많은 참여 작가를 구조적으로 보여준다.

### 포함 콘텐츠

- 작가명
- 간단 소개
- 썸네일 또는 프로필 이미지

### 구현 포인트

- 카드형 그리드 레이아웃
- 인원 증가에 따라 자동 줄바꿈되는 CSS Grid 사용
- 참여 작가 수 확정 전까지는 더미 데이터 또는 placeholder 사용 가능

### 데이터 구조 예시

```js
const artists = [
  {
    name: "작가명",
    description: "작업 소개 한 줄",
    image: "./assets/images/artist-01.jpg"
  }
];
```

## 8.5 주요 작품 프리뷰 섹션

### 목적

- 작품 중심의 시각적 몰입을 강화한다.

### 포함 콘텐츠

- 작품 이미지
- 작품명
- 작가명
- 매체 정보
- 짧은 설명

### 구현 포인트

- 슬라이드, 그리드, masonry 중 선택 가능
- 초기 버전은 유지보수가 쉬운 그리드 구성이 적합
- 작품 수는 작가 수에 따라 달라질 수 있으므로 렌더링을 데이터 기반으로 처리

### 데이터 구조 예시

```js
const works = [
  {
    title: "작품명",
    artist: "작가명",
    medium: "Digital Print",
    description: "짧은 작품 설명",
    image: "./assets/images/work-01.jpg"
  }
];
```

## 8.6 공간 경험 섹션

### 목적

- 현장 관람 포인트를 전달한다.

### 포함 콘텐츠

- 공간 연출 설명
- 전시 동선 또는 몰입 요소 설명
- 사운드, 화면, 조명, 배열 등에 대한 텍스트

### 구현 포인트

- 큰 이미지와 짧은 텍스트 블록 조합
- 스크롤 등장 애니메이션 사용 가능

## 8.7 전시 정보 섹션

### 목적

- 방문에 필요한 실용 정보를 빠르게 전달한다.

### 포함 콘텐츠

- 전시명
- 기간
- 장소
- 주소
- 운영 시간
- 신청 방식
- 튜터 정보

### 실제 반영 정보

- 전시명: 제1회 트리거스 ART 전시회
- 기간: 5월 30일 ~ 6월 5일
- 장소: 대전 아르테미 갤러리
- 신청 방식: 작가 신청 구글폼 / 관람 신청 구글폼
- 튜터 정보: 트리거스

### 구현 포인트

- 정보 카드형 UI 권장
- 모바일에서는 1열, 태블릿 이상에서는 2열 이상 배치

## 8.8 CTA / 오시는 길 섹션

### 목적

- 최종 행동 전환 유도

### 포함 콘텐츠

- 작가 참가 신청 버튼
- 관람 신청 버튼
- 지도 링크 또는 주소 안내
- SNS 링크

### 구현 포인트

- CTA 버튼은 시각적으로 명확히 구분
- 외부 링크는 새 창 열기 처리

## 8.9 Footer

### 포함 콘텐츠

- 전시명
- 장소명
- 기간
- 튜터 정보: 트리거스
- SNS 또는 문의 링크

## 9. CSS 설계 가이드

## 9.1 디자인 방향

- 어두운 배경 또는 뉴트럴 배경 기반
- 큰 타이포그래피와 넓은 여백
- 과한 장식보다 이미지와 텍스트 비율로 분위기 형성
- 기술 홍보 페이지처럼 보이지 않도록 UI 요소는 절제

## 9.2 권장 CSS 변수

```css
:root {
  --color-bg: #0f0f10;
  --color-surface: #18181b;
  --color-text: #f5f5f0;
  --color-subtext: #b7b7b2;
  --color-line: rgba(255, 255, 255, 0.12);
  --color-accent: #d6d0c4;
  --max-width: 1280px;
  --header-height: 72px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 28px;
  --transition-base: 0.4s ease;
}
```

## 9.3 공통 스타일 규칙

- `.container`로 최대 너비 제어
- `section`마다 충분한 상하 패딩 확보
- 텍스트는 밝은 회색 계열, 보조 텍스트는 채도 낮은 색 사용
- hover 애니메이션은 미세하게 적용

## 9.4 반응형 기준

```css
@media (max-width: 1024px) { }
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

### 모바일 대응 원칙

- Hero 영역은 세로 스택 구조로 전환
- 내비게이션은 햄버거 메뉴 또는 단순 앵커 구조로 축소
- 카드형 콘텐츠는 1열 중심
- 긴 문장은 줄 길이를 짧게 유지

## 10. JavaScript 설계 가이드

## 10.1 주요 역할

- 메뉴 스크롤 이동
- 섹션 등장 애니메이션 제어
- 작가/작품 데이터 렌더링
- 외부 링크 및 버튼 제어

## 10.2 권장 기능 목록

### 1. 스크롤 애니메이션

Intersection Observer를 사용해 섹션이나 카드가 화면에 들어올 때 `is-visible` 클래스를 추가한다.

### 2. 작가 목록 렌더링

`data.js`에 정의된 배열을 기반으로 참여 작가 카드를 자동 생성한다.

### 3. 작품 목록 렌더링

작품 수가 고정되지 않으므로 JavaScript로 카드 생성 처리한다.

### 4. CTA 링크 관리

작가 참가 신청 구글폼 링크와 관람 신청 구글폼 링크를 상수로 분리해 관리한다.

## 10.3 예시 코드

```js
const artistApplyLink = "https://forms.google.com/artist-form";
const visitorApplyLink = "https://forms.google.com/visitor-form";

document.querySelectorAll("[data-artist-apply]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(artistApplyLink, "_blank", "noopener");
  });
});

document.querySelectorAll("[data-visitor-apply]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(visitorApplyLink, "_blank", "noopener");
  });
});
```

## 11. 콘텐츠 관리 원칙

## 11.1 고정 콘텐츠

- 전시명
- 장소
- 전시 기간
- 튜터 정보: 트리거스

## 11.2 추후 교체 가능 콘텐츠

- 작가 수
- 작품 수
- 참여 작가 목록
- 작품 이미지
- 실제 구글폼 링크
- 운영 시간
- 문의처

## 11.3 표기 원칙

- 튜터 정보는 항상 `트리거스`로 표기한다.
- 작품 수는 확정 전까지 고정 숫자보다 유동 표현을 우선한다.
- `30명 이상 참여`, `작가별 1작품` 같은 표현을 기본 사용한다.

## 12. 접근성 및 사용성 체크리스트

- 모든 이미지에 `alt` 속성 제공
- 버튼과 링크의 역할이 명확해야 함
- 텍스트 대비 충분히 확보
- 키보드로 CTA 접근 가능해야 함
- 모바일에서 버튼 클릭 영역 충분히 확보

## 13. 개발 우선순위

### 1차 구현

- 전체 HTML 구조 작성
- 주요 섹션 스타일링
- CTA 링크 연결
- 반응형 레이아웃 구성

### 2차 구현

- 작가/작품 데이터 렌더링
- 스크롤 애니메이션
- 세부 인터랙션 보강

### 3차 구현

- 실제 이미지 및 실데이터 반영
- SEO 메타 태그 정리
- 오픈그래프 이미지 설정

## 14. 최종 개발 메모

이 페이지는 일반적인 행사 홍보 페이지보다, 전시의 서문과 장면을 디지털 화면 안에 배치하는 방식으로 접근하는 것이 적합하다.  
개발 시에도 정보 전달 기능만 고려하기보다, 텍스트와 이미지 사이의 밀도, 여백의 호흡, 스크롤 흐름을 함께 설계해야 한다.

실무적으로 가장 중요한 포인트는 아래와 같다.

- `전시 작가로 참가 신청`과 `전시 관람 신청`을 명확히 분리할 것
- `튜터 정보`는 항상 `트리거스`로 통일할 것
- 참여 인원과 작품 수의 변동 가능성을 고려해 데이터 기반 구조로 만들 것
- 전시 무드를 해치지 않는 수준에서 절제된 애니메이션만 사용할 것
