// 보건복지부 소개 웹 앱 인터랙션 스크립트
document.addEventListener("DOMContentLoaded", () => {
  // 1. 주요 업무 탭 전환
  const tabs = document.querySelectorAll(".duty-tab");
  const panels = document.querySelectorAll(".duty-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanelId = tab.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // 2. 생애주기 맞춤 복지 데이터
  const benefitsData = [
    {
      category: "pregnant",
      categoryName: "임신·출산",
      title: "임신사전건강관리 (가임력 검사 지원)",
      target: "임신 희망 부부(사실혼 포함)",
      desc: "여성 난소기능검사(AMH) 및 부인과 초음파, 남성 정액검사 비용 지원으로 건강한 임신을 돕습니다.",
      apply: "관할 보건소 및 'e보건소' 온라인 신청"
    },
    {
      category: "pregnant",
      categoryName: "영유아",
      title: "부모급여 및 아동수당 지원",
      target: "0~1세 아동 부모 및 만 8세 미만 아동",
      desc: "0세 월 100만 원, 1세 월 50만 원의 부모급여와 매월 10만 원의 아동수당을 지급하여 양육 부담을 경감합니다.",
      apply: "행정복지센터 방문 또는 '복지로' 온라인 신청"
    },
    {
      category: "youth",
      categoryName: "청년·취약계층",
      title: "자립준비청년 자립정착금 및 수당",
      target: "보호종료 5년 이내 청년",
      desc: "홀로서기를 시작하는 청년의 안정적인 사회 정착을 위해 매월 자립수당 지급 및 전담 사례관리사를 지원합니다.",
      apply: "거주지 읍면동 행정복지센터"
    },
    {
      category: "youth",
      categoryName: "가족돌봄청년",
      title: "영케어러(가족돌봄청년) 전담 지원",
      target: "중증질환·장애 가족을 돌보는 13~34세 청년",
      desc: "연 최대 200만 원의 자기돌봄비 지급 및 돌봄·가사 간병 바우처 서비스를 통합 연계합니다.",
      apply: "청년미래센터 및 시·군·구 복지상담"
    },
    {
      category: "senior",
      categoryName: "어르신",
      title: "기초연금 및 노인맞춤돌봄",
      target: "만 65세 이상 소득인정액 기준 하위 70%",
      desc: "안정적인 노후생활 지원을 위한 월 기초연금 지급 및 취약 어르신 대상 안전확인·가사지원 서비스 제공.",
      apply: "주민센터, 국민연금공단 지사, '복지로'"
    },
    {
      category: "senior",
      categoryName: "돌봄·장기요양",
      title: "재택의료센터 및 통합돌봄 서비스",
      target: "거동이 불편하여 병원 방문이 어려운 어르신",
      desc: "의사와 간호사가 집으로 직접 찾아가는 방문진료 및 지역사회 요양·돌봄 연계 원스톱 지원.",
      apply: "시·군·구 통합돌봄 전담창구 및 국민건강보험공단"
    },
    {
      category: "health",
      categoryName: "의료안전망",
      title: "재난적 의료비 지원 사업",
      target: "과도한 의료비로 경제적 부담을 겪는 가구",
      desc: "입원·외래 진료 중 발생한 본인부담 의료비(비급여 포함)의 최대 50~80%(연간 최대 5,000만 원) 지원.",
      apply: "국민건강보험공단 지사 방문 신청"
    },
    {
      category: "health",
      categoryName: "마음건강",
      title: "전국민 마음투자 지원사업",
      target: "우울·불안 등 정서적 어려움이 있는 국민",
      desc: "전문 심리상담을 받을 수 있는 바우처(총 8회기)를 제공하여 마음건강 회복을 지원합니다.",
      apply: "읍면동 행정복지센터 방문 신청"
    }
  ];

  // 3. 혜택 리스트 렌더링 함수
  const benefitListContainer = document.getElementById("benefitList");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderBenefits(filterCategory = "all") {
    if (!benefitListContainer) return;
    benefitListContainer.innerHTML = "";

    const filtered = (filterCategory === "all")
      ? benefitsData
      : benefitsData.filter((b) => b.category === filterCategory);

    filtered.forEach((item) => {
      const card = document.createElement("div");
      card.className = "benefit-item";
      card.innerHTML = `
        <div class="benefit-item-top">
          <span class="benefit-category">${item.categoryName}</span>
          <span class="benefit-target">대상: ${item.target}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <div class="benefit-apply">📌 신청: ${item.apply}</div>
      `;
      benefitListContainer.appendChild(card);
    });
  }

  // 초기 렌더링
  renderBenefits("all");

  // 필터 버튼 이벤트
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderBenefits(category);
    });
  });

  // 4. 네비게이션 스크롤 액티브 표시
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. [NEW] 국민 맞춤 지원 설문 & 자가진단 로직
  const btnDiagnose = document.getElementById("btnDiagnose");
  const btnResetQuiz = document.getElementById("btnResetQuiz");
  const quizResultArea = document.getElementById("quizResultArea");
  const resultCardsContainer = document.getElementById("resultCardsContainer");
  const resultSummaryTitle = document.getElementById("resultSummaryTitle");
  const resultSummaryDesc = document.getElementById("resultSummaryDesc");

  // 진단 지식 베이스
  const quizSupportMap = {
    // 상황별 추천
    cond_low_income: {
      tag: "기본생활보장",
      title: "국민기초생활보장 (생계·의료·주거급여) 및 긴급복지지원",
      agency: "보건복지부 기초생활보장과",
      summary: "실직, 폐업, 질병 등으로 소득이 줄어 생계가 곤란할 때 매월 생계비를 지급하며, 갑작스러운 위기 시 신속하게 긴급복지 생계비·연료비를 선지원합니다.",
      criteria: "기준중위소득 32% 이하(생계급여) 등 가구별 소득인정액 심사 (의료급여 부양의무자 기준 대폭 완화)",
      action: "주소지 읍·면·동 행정복지센터 방문 또는 보건복지상담센터(129) 유선 상담"
    },
    cond_medical_bill: {
      tag: "의료비 안심망",
      title: "재난적의료비 지원사업 & 본인부담상한제",
      agency: "국민건강보험공단 / 보건복지부",
      summary: "과도한 중증 질환, 수술 치료비로 가계 경제가 무너지지 않도록, 비급여를 포함한 본인부담 진료비의 최대 50~80%(연 최대 5,000만 원)를 사후 지원합니다.",
      criteria: "기준중위소득 100% 이하 가구 중심 (의료비가 연소득의 10%를 초과하는 경우 등)",
      action: "퇴원 후 180일 이내 국민건강보험공단 지사 방문 및 신청"
    },
    cond_mental: {
      tag: "정신건강·마음케어",
      title: "전국민 마음투자 심리상담 바우처 & 24시간 상담전화 (109)",
      agency: "보건복지부 정신건강정책과",
      summary: "우울·불안·스트레스 등으로 마음이 지친 국민에게 국가 공인 전문 심리상담을 받을 수 있는 1:1 대면 심리상담 바우처(총 8회)를 제공하며, 위기 시 109로 24시간 즉시 연결됩니다.",
      criteria: "정신건강복지센터, 대학교상담센터 등에서 상담 의뢰서를 발급받았거나 의사 진단서/소견서 소지자",
      action: "읍·면·동 행정복지센터 방문 신청 (위기상황 시 109 즉시 전화)"
    },
    cond_family_care: {
      tag: "돌봄국가책임",
      title: "의료·요양·돌봄 통합지원 서비스 & 영케어러 자기돌봄비",
      agency: "보건복지부 통합돌봄추진단 / 청년정책과",
      summary: "아픈 가족을 병원에만 맡기지 않고 집에서 안심하고 지낼 수 있도록 방문진료(재택의료), 방문간호, 가사간병을 패키지로 연계하며, 가족을 돌보느라 진학·취업이 지체된 청년에게는 연 200만 원의 자기돌봄비를 지급합니다.",
      criteria: "노인장기요양 수급자 및 거동불편자 / 13~34세 가족돌봄청년",
      action: "시·군·구청 통합돌봄창구 문의 또는 '청년미래센터' 신청"
    },
    cond_pregnancy: {
      tag: "출산·가임력",
      title: "임신 사전건강관리 지원 & 난임부부 시술비 확대",
      agency: "보건복지부 출산정책과",
      summary: "건강한 임신을 원하는 모든 부부에게 가임력 검사(여성 난소기능검사·초음파 최대 13만 원, 남성 정액검사 최대 5만 원)를 지원하며, 난임 시술비 지원 횟수와 건강보험 급여를 확대 지원합니다.",
      criteria: "임신을 준비 중인 부부(사실혼 포함, 소득 무관 전국민)",
      action: "e보건소 공공보건포털(e-health.go.kr) 또는 관할 보건소 신청"
    },
    cond_alone_youth: {
      tag: "청년자립·안전망",
      title: "자립준비청년 자립수당 & 고립·은둔청년 일상회복 지원",
      agency: "보건복지부 자립지원과 / 청년정책과",
      summary: "아동양육시설 등에서 퇴소한 청년에게 5년간 매월 자립수당(50만 원)과 정착금, 맞춤형 멘토를 지원하며, 사회적 고립 상태인 청년에게는 자조모임과 일상 회복 전문 프로그램을 제공합니다.",
      criteria: "보호종료 5년 이내 자립준비청년 / 사회 복귀를 희망하는 고립은둔청년",
      action: "자립정보 ON 홈페이지 또는 보건복지상담센터(129)"
    },
    cond_child_emergency: {
      tag: "소아·응급의료",
      title: "달빛어린이병원 & 소아전문응급의료센터 안내",
      agency: "보건복지부 응급의료과",
      summary: "평일 야간이나 토·일요일, 공휴일에 아이가 갑자기 열이 나거나 아플 때 대학병원 응급실 대신 저렴하고 신속하게 이용할 수 있는 야간 소아 외래진료기관망을 이용하실 수 있습니다.",
      criteria: "소아청소년 경증 환자 및 보호자 (누구나 이용 가능)",
      action: "응급의료포털(E-Gen.or.kr)에서 가까운 달빛어린이병원 실시간 검색"
    },
    cond_pension: {
      tag: "노후소득보장",
      title: "내 연금 알아보기 & 국민연금 크레딧 제도",
      agency: "국민연금공단 / 보건복지부 국민연금정책과",
      summary: "내가 낸 연금과 향후 수령할 노령연금을 실시간 시뮬레이션하고, 출산 시(첫째 아이부터 가입기간 추가) 또는 군복무 시 연금 가입기간을 무상으로 얹어주는 크레딧 제도를 통해 수령액을 높일 수 있습니다.",
      criteria: "국민연금 가입자 및 임의가입 대상자",
      action: "국민연금 내연금 사이트(csa.nps.or.kr) 또는 고객센터(1355)"
    }
  };

  // 연령대 기본 추천
  const ageGroupSupport = {
    infant: {
      tag: "영유아 가구 기본",
      title: "부모급여 (0~1세) & 아동수당 (만 8세 미만)",
      agency: "보건복지부 아동정책과",
      summary: "아이 양육의 첫 2년간 매월 최대 100만 원(0세), 50만 원(1세)의 부모급여와 만 8세 미만 전 아동에게 매월 10만 원의 아동수당을 기본 지급합니다.",
      criteria: "해당 연령대 자녀를 양육하는 대한민국 국적 아동",
      action: "주민센터 출생신고 시 행복출산 원스톱 신청 또는 '복지로'"
    },
    youth: {
      tag: "청년 건강안전망",
      title: "청년 국가건강검진 (만 19세 이상 무료) & 복지이음",
      agency: "보건복지부 / 국민건강보험공단",
      summary: "20대와 30대 미취업 청년도 2년 주기로 무료 일반건강검진 및 정신건강(우울증) 검사를 받을 수 있으며, 위기 청년 발굴망을 통해 맞춤 연계됩니다.",
      criteria: "만 19세 이상 지역가입자 및 피부양자 청년",
      action: "국민건강보험공단 대상자 조회 후 전국 지정 검진기관 방문"
    },
    senior: {
      tag: "어르신 노후보장",
      title: "기초연금 지급 & 노인맞춤돌봄서비스",
      agency: "보건복지부 기초연금과 / 노인정책과",
      summary: "만 65세 이상 어르신의 안정된 노후를 위해 월 최대 33만 원 상당의 기초연금을 지급하며, 홀로 계신 취약 어르신에게 생활지원사가 직접 주 1~2회 방문·안부확인을 지원합니다.",
      criteria: "만 65세 이상 소득인정액 선정기준액 이하 (단독·부부가구별 차등)",
      action: "주소지 읍·면·동 행정복지센터 또는 국민연금공단 지사"
    }
  };

  if (btnDiagnose) {
    btnDiagnose.addEventListener("click", () => {
      // 1. 연령대 확인
      const selectedAge = document.querySelector('input[name="age_group"]:checked');
      const ageVal = selectedAge ? selectedAge.value : "youth";

      // 2. 체크된 상황 확인
      const checkedBoxes = document.querySelectorAll('input[name="conditions"]:checked');
      const selectedConds = Array.from(checkedBoxes).map((cb) => cb.value);

      // 결과 리스트 구성
      const matchedResults = [];

      // 먼저 선택한 상황별 혜택 우선 추가
      selectedConds.forEach((cond) => {
        if (quizSupportMap[cond]) {
          matchedResults.push(quizSupportMap[cond]);
        }
      });

      // 연령대 기본 혜택도 추가 (중복 없도록)
      if (ageGroupSupport[ageVal]) {
        matchedResults.push(ageGroupSupport[ageVal]);
      }

      // 결과 렌더링
      resultCardsContainer.innerHTML = "";

      matchedResults.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
          <div class="result-card-header">
            <span class="result-tag">${item.tag}</span>
            <span class="result-agency">${item.agency}</span>
          </div>
          <h4 class="result-card-title">${index + 1}. ${item.title}</h4>
          <p class="result-card-summary">${item.summary}</p>
          <div class="result-detail-box">
            <div class="result-crit">
              <strong>🔍 주요 대상·요건:</strong> ${item.criteria}
            </div>
            <div class="result-act">
              <strong>🚀 이용 및 신청방법:</strong> ${item.action}
            </div>
          </div>
        `;
        resultCardsContainer.appendChild(card);
      });

      // 안내 텍스트 갱신
      const condCount = selectedConds.length;
      resultSummaryTitle.textContent = `총 ${matchedResults.length}건의 맞춤 보건복지 지원책을 찾았습니다!`;
      resultSummaryDesc.textContent = condCount > 0 
        ? `선택하신 ${condCount}가지 생활 상황과 연령대에 꼭 필요한 제도들을 우선 정리했습니다.`
        : `선택하신 연령대의 기본 핵심 지원 제도를 정리했습니다. 겪고 계신 구체적인 어려움을 체크하시면 더욱 정밀한 혜택을 추천해 드립니다.`;

      // 표시 및 스크롤
      quizResultArea.style.display = "block";
      quizResultArea.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (btnResetQuiz) {
    btnResetQuiz.addEventListener("click", () => {
      const form = document.getElementById("welfareQuizForm");
      if (form) form.reset();
      // 기본 청년 라디오 재체크
      const youthRadio = document.querySelector('input[name="age_group"][value="youth"]');
      if (youthRadio) youthRadio.checked = true;

      if (quizResultArea) {
        quizResultArea.style.display = "none";
      }
      const quizSection = document.getElementById("quiz-section");
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
