# Car Project

## 🛠 프로젝트 빌드 및 서버 실행 방법

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/luckyhyom/car-project.git
```

1. 패키지를 설치합니다.

```
$ npm install
```

1. 서버를 실행해 줍니다.

```
$ npm start
```

1. 정해진 API에 접근하여 서비스를 이용합니다.

<br>

## 📝 개발 요구사항

<details>
  <summary><b>1. 배경 및 공통 요구사항</b></summary>
  <br>

<aside>

😁 **실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.**

</aside>

- 데이터베이스 환경은 별도로 제공하지 않습니다.
  **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

| Response Code             | Description                     |
| ------------------------- | ------------------------------- |
| 200 OK                    | 성공                            |
| 400 Bad Request           | Parameter가 잘못된(범위, 값 등) |
| 401 Unauthorized          | 인증을 위한 Header가 잘못됨     |
| 500 Internal Server Error | 기타 서버 에러                  |

</details>

<details>
  <summary><b>2. 사용자 생성 API</b></summary>
<br>

🎁 **요구사항**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */
 { "id": "candycandy", "password": "ASdfdsf3232@" }
```

</details>

<details>
  <summary><b>3. 사용자가 소유한 타이어 정보를 저장하는 API</b></summary>
<br>

🎁 **요구사항**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    id: 'candycandy',
    trimId: 5000,
  },
  {
    id: 'mylovewolkswagen',
    trimId: 9000,
  },
  {
    id: 'bmwwow',
    trimId: 11000,
  },
  {
    id: 'dreamcar',
    trimId: 15000,
  },
];
```

🔍 **상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
  - **자동차 정보 조회 API 사용 예제** → <br>
    📄 [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000) <br>
    📄 [https://dev.mycar.cardoc.co.kr/v1/trim/9000](https://dev.mycar.cardoc.co.kr/v1/trim/9000) <br>
    📄 [https://dev.mycar.cardoc.co.kr/v1/trim/11000](https://dev.mycar.cardoc.co.kr/v1/trim/11000) <br>
    📄 [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
  위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.

</details>

<details>
  <summary><b>4. 사용자가 소유한 타이어 정보 조회 API</b></summary>
<br>

🎁 **요구사항**

- 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.

</details>

## 🧬 DB 모델링

### 최종 모델

![image](https://user-images.githubusercontent.com/63238936/143810223-54437968-dd51-474c-beae-8240d2d867ac.png)

### 고려했던 모델들

![image](https://user-images.githubusercontent.com/63238936/143810303-e4f86412-dd04-4076-8709-8cfa5153e8ec.png)
![image](https://user-images.githubusercontent.com/63238936/143810322-72508077-ca68-45e1-9841-43ba39ab2e8a.png)

### Column Data Type

[MySQL 최적의 데이터 타입 선택 방법 - Useful Guide](https://nomadlee.com/mysql-%EC%B5%9C%EC%A0%81%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85-%EC%84%A0%ED%83%9D-%EB%B0%A9%EB%B2%95/#VARCHAR)

### Tire Table

| column name      | data type    | 제약조건 | 이유                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | integer      | PK       | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| carId            | integer      | FK       | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| drivingDistance  | SMALLINT     |          | 위키피디아에 따르면 자동차 평균 수명 주행거리가 322,000 km라고 한다. 6개의 숫자가 필요하므로 [how many kms can a car do before it dies - Google Search](https://www.google.com/search?q=how+many+kms+can+a+car+do+before+it+dies&rlz=1C5CHFA_enKR944KR944&ei=IEKjYd6yOMf7hwPWxaTwCA&oq=how+many+kilometers+can+a+car+work&gs_lcp=Cgdnd3Mtd2l6EAEYAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwAzIHCAAQRxCwA0oECEEYAFAAWABgwH9oAXACeACAAQCIAQCSAQCYAQDIAQjAAQE&sclient=gws-wiz) |
| brand            | VARCHAR(100) |          | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| side             | CHAR(1)      | NN       | 앞 뒤의 경우 F, R 혹여나 네개로 구분할경우 1,2,3,4 [Understanding tire types/sizes](https://www.tirebuyer.com/education/understanding-tire-sizes-and-types)                                                                                                                                                                                                                                                                                                                                                           |
| width            | SMALLINT     | NN       | 타이어 넓이가 255를 넘어가므로                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| aspectRatio      | TINYINT      | NN       | 편평비이다. 숫자 2자리를 넘기기 힘들다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| wheelDiameter    | TINYINT      | NN       | 림의 높이(인치)이다. 숫자 2자리를 넘기기 힘들다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| constructionType | VARCHAR(10)  | NN       | 타이어 생산법이 여러가지가 있단다.. 보통 1~2글자 인듯 하지만 넉넉히 가변길이 문자형을 사용하자.                                                                                                                                                                                                                                                                                                                                                                                                                       |

<br>

## 디자인패턴

- NestJS MVC 패턴

## 🏫 사용 기술

- Backend : [![img](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465) [![img](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)
- DataBase : [![img](https://camo.githubusercontent.com/93b7b220122f943f4de91262b7aa6109a0fa4dd601e115d1b7c8bfa906e166ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53514c6974652d3030334235373f7374796c653d666c6174266c6f676f3d53514c697465266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/93b7b220122f943f4de91262b7aa6109a0fa4dd601e115d1b7c8bfa906e166ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53514c6974652d3030334235373f7374796c653d666c6174266c6f676f3d53514c697465266c6f676f436f6c6f723d7768697465)
- Collaboration : [![img](https://camo.githubusercontent.com/493683d1e69c600dc04bb375ab588466c554471ea28f7326b390b5103c401058/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769742d4630353033323f7374796c653d666c6174266c6f676f3d476974266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/493683d1e69c600dc04bb375ab588466c554471ea28f7326b390b5103c401058/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769742d4630353033323f7374796c653d666c6174266c6f676f3d476974266c6f676f436f6c6f723d7768697465) [![img](https://camo.githubusercontent.com/779ecf5e6059fd906fca2099015186945f91679f22da6bf05f37f52e69e86e8a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3138313731373f7374796c653d666c6174266c6f676f3d476974487562266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/779ecf5e6059fd906fca2099015186945f91679f22da6bf05f37f52e69e86e8a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3138313731373f7374796c653d666c6174266c6f676f3d476974487562266c6f676f436f6c6f723d7768697465)

<br>

## 📂 폴더 구조

<img src="https://user-images.githubusercontent.com/63238936/144231735-c8f19d8a-505a-440e-875b-ff27d9def098.png" width="400"/>

## 고민했던 것들

### 타이어에 대해서

- 넓이(105\~395), 편평비(10\~99), 제작형태 ZR|R|D, 림 인치(10\~29)

<img src="https://user-images.githubusercontent.com/63238936/143815963-e9d1c4f7-2928-4ee0-be3b-a8552ef4a15e.png" width="400"/>

<img src="https://user-images.githubusercontent.com/63238936/143811572-2c3e5583-8365-4698-bd92-a0bd6b3b90a4.png" width="400"/>

### Custom Pipe

요구사항에 Request Body가 객체로 덮이지 않은 배열로 되어있고 다섯개 까지 길이 제한이 있다.

```
{ items: [item1, item2] } // X
[ item1, item2, item3 ... ] // O
```

- class-validator의 데코레이터를 쓰면 개수 제한과 각 요소에 대한 유효성 검사가 가능하지만 배열형태가 아님

- 해당 형식에 맞추면서 각 요소의 유효성 검사까지 가능하게 하기 위해서 pipe 모듈을 분석하고 상속하여 커스텀
- 단순히 컨트롤러에서 길이가 5 이상인 요청은 거부하면 되지만, NestJS에서 권장하고 제공하는 SRP(단일책임원칙)를 따라 Pipe를 사용

</br>
<img src="https://user-images.githubusercontent.com/63238936/144232533-d3dc9dcf-db8c-45f3-8efa-fcaa096a6d58.png" width="400"/>

모듈 분석 </br>
<img src="https://user-images.githubusercontent.com/63238936/144232971-d6f737b8-1da0-41a5-b815-3e2216a6c041.png" width="500"/> </br>
커스텀 파이프 </br>
<img src="https://user-images.githubusercontent.com/63238936/144233520-014ef1d5-075a-48cb-8bbb-4d24ee2dc49e.png" width="500"/> </br>
사용예시 </br>
<img src="https://user-images.githubusercontent.com/63238936/144233549-652beb7b-971c-4932-800c-69e6b40e9b42.png" width="500">

## 느낀점

프로그래밍뿐 아니라 타이어에 대해 알아가는 과정도 재미있었다.
무언가에 대한 기능을 만들려면 그 대상에 대한 이해도 필요하다고 생각한다.

아쉬웠던 점: 일단 전체적인 기능을 먼저 구현하고 리팩토링하는 경험을 하면 좋을 것 같다.

## 🐾 API

```
[POST] 127.0.0.1:3000/signUp

{
    "userId": "gyals1479",
    "password": "12341234"
}
```

![image](https://user-images.githubusercontent.com/63238936/143811150-37f88772-af9b-4d5b-bd5a-323cc52d12ab.png)

```
[POST] 127.0.0.1:3000/cars

[
    {
        "id": "gyals1479",
        "trimId": "5000"
    },
    {
        "id": "gyals1479",
        "trimId": "5002"
    },
    {
        "id": "gyals1479",
        "trimId": "10000"
    },
    {
        "id": "gyals1479",
        "trimId": "10100"
    },
    {
        "id": "gyals1479",
        "trimId": "12000"
    }

]
```

![image](https://user-images.githubusercontent.com/63238936/143811177-7f76e5f4-a1e9-4b1e-ba7f-c278a0e75cd4.png)

```
[GET] 127.0.0.1:3000/cars/gyals1479

```

![image](https://user-images.githubusercontent.com/63238936/143811197-595bc4d0-ed45-42ab-8e78-7cd5055714cf.png)
