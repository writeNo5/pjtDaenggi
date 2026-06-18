export const storyData = {
  "scene-start": {
    title: "1. 기동: 초호기 프로젝트 작전회의",
    image: "https://placehold.co/800x450/2b2724/f5f2eb?text=Operation+Cho-ho-gi",
    sound: "🔊 덜커덩거리는 방직공장의 둔탁한 기계 굉음 (BGM)",
    paragraphs: [
      "총괄 프로듀서 '쿠엔틴'의 긴급 지시 하에 초호기 기동 작전 회의실에 불이 켜졌다. 개발 환경 셋업이 완료되었고 시방서가 작성되었으나, 실제 실효성 있게 굴러가는지에 대해 검증이 필요한 중요 시점이었다.",
      "시나리오 작가 '엘리샤', 일러스트레이터 '아이리스', 사운드 디자이너 '라덱', 프론트엔드 엔지니어 '안티그래비티', QA '빅터'가 모여 쿠엔틴의 입술 끝을 주시하고 있다.",
      "쿠엔틴은 안경을 올리며 엄숙한 목소리로 지시를 시작했다. '첫 기동인 만큼 한치의 오차도 허용할 수 없다. 우리 시방서의 가이드에 따라 다음 첫 액션을 무엇으로 정의할 것인가?'"
    ],
    choices: [
      {
        text: "안티그래비티에게 빌드 및 모바일 다이나믹 뷰포트 레이아웃 셋업 검증을 먼저 지시한다.",
        nextScene: "scene-build",
        label: "지시 1"
      },
      {
        text: "엘리샤에게 시나리오 분기 데이터 무결성 검수 작업을 지시한다.",
        nextScene: "scene-scenario",
        label: "지시 2"
      }
    ]
  },
  "scene-build": {
    title: "2-1. 빌드 검증: 안티그래비티의 콘솔",
    image: "https://placehold.co/800x450/2b2724/f5f2eb?text=Vite+Build",
    sound: "🔊 숲의 깊은 곳에 울리는 회중시계의 규칙적인 째깍 소리 (SFX)",
    paragraphs: [
      "안티그래비티는 즉시 Vite 빌드 환경으로 접속하여 패키지를 체크하기 시작했다. `npm install`은 경고 없이 완료되었고 모바일에서의 dynamic viewport height(`100dvh`) 설정과 하단 패딩 150px 규칙이 빈틈없이 셋업되었다.",
      "콘솔 화면에는 성공적인 컴파일 로그가 가득했다. 이제 남은 단계는 실서버 배포 및 최종 사용자 검수다.",
      "쿠엔틴은 이 다음 결정을 신중히 내려야 한다."
    ],
    choices: [
      {
        text: "품질 관리자 '빅터'에게 정밀 크로스브라우징 검수를 맡긴 후 안전하게 승인한다.",
        nextScene: "ending-a1",
        label: "지시 1-1"
      },
      {
        text: "시간 절약을 위해 QA 과정을 생략하고 즉시 런칭 배포를 선언한다.",
        nextScene: "ending-b1",
        label: "지시 1-2"
      }
    ]
  },
  "scene-scenario": {
    title: "2-2. 기획 검수: 엘리샤의 텍스트 스키마",
    image: "https://placehold.co/800x450/2b2724/f5f2eb?text=Story+Review",
    sound: "🔊 스산하게 불어오는 새벽 바람 소리 (BGM)",
    paragraphs: [
      "엘리샤는 스토리 데이터 구조의 JSON 형식을 분석하며, 무한 루프나 데드락에 빠질 확률이 없는지 검토하였다. 시방서의 표준 스키마 덕분에 데이터 수정이 마우스 클릭 한 번처럼 단순해졌다.",
      "안정성을 검증한 엘리샤가 고개를 끄덕이자 회의실 안의 긴장감이 조금 누그러졌다.",
      "쿠엔틴은 검토된 기획을 보며 후속 부서에게 과업을 넘기고자 한다."
    ],
    choices: [
      {
        text: "아이리스에게 시방서 규격에 맞춘 16:9 고해상도 그래픽 이미지 에셋 확정을 요청한다.",
        nextScene: "ending-a1",
        label: "지시 2-1"
      },
      {
        text: "사운드 연출을 배제하고 라덱의 BGM 사운드 설정을 거부한다.",
        nextScene: "ending-b2",
        label: "지시 2-2"
      }
    ]
  },
  "ending-a1": {
    title: "Ending A-1. 초호기 프로젝트 완벽 기동",
    type: "ending",
    badge: "완벽 기동 해피엔딩",
    image: "https://placehold.co/800x450/059669/ffffff?text=SUCCESS+LAUNCH",
    sound: "🔊 끓어오르는 한약 가마솥 소리 (BGM)",
    scenes: [
      {
        subtitle: "Scene 1. 성공적인 런칭 선언",
        text: "모든 담당자가 시방서 규격에 엄격히 입각하여 프로젝트를 구축했고, 최종적으로 빅터의 꼼꼼한 모바일 실기기 검수까지 무사히 통과했다. 쿠엔틴은 기쁜 얼굴로 프로덕션 릴리즈 버튼을 눌렀다."
      },
      {
        subtitle: "Scene 2. 시방서의 승리",
        text: "새로운 모바일 인터랙티브 노블 플랫폼은 크래시나 레이아웃 깨짐 하나 없이 전 세계 유저들에게 성공적으로 서비스되기 시작했다. 첫 단추를 완벽하게 꿴 회의실에는 승리의 환호성이 메아리쳤다."
      }
    ]
  },
  "ending-b1": {
    title: "Ending B-1. 대혼란의 버그 폭풍",
    type: "ending",
    badge: "시스템 크래시 엔딩",
    image: "https://placehold.co/800x450/b22222/ffffff?text=CRASH+BUG",
    sound: "🔊 웅장한 천둥 같은 화승총 폭발 소리 (SFX)",
    scenes: [
      {
        subtitle: "Scene 1. 배포 후의 오작동",
        text: "QA 단계를 무시하고 급박하게 배포된 앱은 런칭 직후 아이폰 사파리 브라우저의 하단바와 겹쳐 선택 버튼이 아예 눌리지 않는 심각한 오버플로우 사태를 유발했다."
      },
      {
        subtitle: "Scene 2. 무너진 신뢰",
        text: "기기마다 제각각 다르게 찌그러진 레이아웃에 분노한 유저들의 피드백이 폭주했고, 쿠엔틴과 개발팀은 밤을 지새우며 핫픽스를 만들어야 했다. 시방서의 중요성을 온몸으로 절감한 뼈아픈 교훈이었다."
      }
    ]
  },
  "ending-b2": {
    title: "Ending B-2. 적막속의 침묵 작전",
    type: "ending",
    badge: "조용한 침묵 엔딩",
    image: "https://placehold.co/800x450/4b5563/ffffff?text=SILENCE+LAUNCH",
    sound: "🔊 스산한 나뭇잎 스치는 바람 소리 (BGM)",
    scenes: [
      {
        subtitle: "Scene 1. 음향이 없는 세계",
        text: "라덱의 멋진 신시사이저 소리와 효과음 없이 강제로 런칭된 소설은 건조하고 밋밋하기 그지없었다. 유저들은 마치 책을 읽는 기분으로 클릭만 할 뿐, 그래픽 노블다운 연출감과 몰입감을 느끼지 못했다."
      },
      {
        subtitle: "Scene 2. 보완책의 등장",
        text: "쿠엔틴은 결국 다음 기동 작전부터는 오디오 사운드를 필수로 의무화하는 보완 시방 조항을 가이드라인에 서명하여 강제하게 되었다."
      }
    ]
  }
};
