const STORAGE_KEY = "finmate-state";

const defaultState = {
  profileCompleted: false,
  profile: {
    name: "",
    age: 0,
    income: 0,
    expenses: 0,
    savings: 0,
    location: "Maharashtra",
    risk: "Moderate",
    goal: "Emergency Fund",
  },
  schemePreference: {
    goal: "Emergency Fund",
    occupation: "Salaried",
    gender: "Any",
    taxPreference: "Any",
  },
  adviserMode: "investing",
  language: "en",
};

const uiText = {
  en: {
    pageTitle: {
      profile: "FinMate - Profile",
      dashboard: "FinMate - Dashboard",
      adviser: "FinMate - Adviser",
      planner: "FinMate - Planner",
      scheme: "FinMate - Scheme Finder",
    },
    currentView: {
      profile: "Profile",
      dashboard: "Dashboard",
      adviser: "Adviser",
      planner: "Planner",
      scheme: "Scheme Finder",
    },
    healthLabels: { strong: "Strong", stable: "Stable", needsAttention: "Needs attention" },
    months: "months",
    labels: {
      "hero-eyebrow": "Financial Copilot",
      "hero-title": "Profile first. Then guided money decisions.",
      "hero-text": "Create a profile, move to the dashboard, then work inside Adviser, Planner, and Scheme Finder.",
      "flow-label": "App Flow",
      "language-label": "Language",
      "flow-step1-label": "Step 1",
      "flow-step1-value": "Profile",
      "flow-step2-label": "Step 2",
      "flow-step2-value": "Dashboard",
      "flow-step3-label": "Step 3",
      "flow-step3-value": "3 Tools",
      "flow-current-label": "Current View",
      "nav-profile": "Profile",
      "nav-dashboard": "Dashboard",
      "nav-adviser": "Adviser",
      "nav-planner": "Planner",
      "nav-schemes": "Scheme Finder",
      "profile-step-kicker": "Step 1",
      "profile-title": "Create financial profile",
      "profile-pill": "Start Here",
      "profile-copy": "Fill basic financial details first. After this, the rest of the product unlocks.",
      "profile-submit": "Create Profile",
      "label-name": "Full name",
      "label-age": "Age",
      "label-income": "Monthly income (INR)",
      "label-expenses": "Monthly expenses (INR)",
      "label-savings": "Current savings (INR)",
      "label-location": "Location",
      "label-risk": "Risk tolerance",
      "label-goal": "Primary goal",
      "dashboard-step-kicker": "Step 2",
      "dashboard-title": "Dashboard",
      "dashboard-user-label": "User",
      "dashboard-goal-label": "Primary goal",
      "dashboard-location-label": "Location",
      "monthly-surplus-label": "Monthly surplus",
      "emergency-runway-label": "Emergency runway",
      "recommended-sip-label": "Recommended SIP",
      "health-score-label": "Health score",
      "dashboard-module-kicker": "Step 3",
      "dashboard-modules-title": "Choose one module",
      "card-adviser-span": "Adviser",
      "card-adviser-title": "Chat with a financial assistant",
      "card-adviser-copy": "Ask focused questions about savings, investing, and wealth building.",
      "card-planner-span": "Planner",
      "card-planner-title": "Create a goal-based plan",
      "card-planner-copy": "Estimate monthly contributions and practical actions for each goal.",
      "card-scheme-span": "Scheme Finder",
      "card-scheme-title": "Find relevant government schemes",
      "card-scheme-copy": "Match schemes using your profile, goal, and preference filters.",
      "adviser-kicker": "Module 1",
      "adviser-title": "Adviser",
      "adviser-pill": "Guided Q&A",
      "mode-investing": "Investing",
      "mode-saving": "Saving",
      "mode-growing": "Growing Wealth",
      "adviser-intro": "Choose one mode and ask from those topics only.",
      "ask-button": "Ask",
      "planner-kicker": "Module 2",
      "planner-title": "Planner",
      "planner-pill": "Goal Plan",
      "planner-copy": "Plan for investments, trips, education, emergency fund, gadgets, or other large expenses.",
      "planner-type-label": "Planning type",
      "planner-target-label": "Target amount (INR)",
      "planner-timeline-label": "Timeline (years)",
      "plan-button": "Calculate plan",
      "planner-result-investment-label": "Required monthly investment",
      "planner-result-mix-label": "Suggested mix",
      "planner-result-insight-label": "Planner insight",
      "planner-result-action-label": "Suggested action",
      "planner-result-priority-label": "Priority level",
      "planner-result-suggestion-label": "Extra suggestion",
      "scheme-kicker": "Module 3",
      "scheme-title": "Scheme Finder",
      "scheme-pill": "Eligibility",
      "scheme-copy": "Use your profile and extra filters to find the most relevant government support.",
      "scheme-goal-label": "Goal focus",
      "scheme-occupation-label": "Occupation type",
      "scheme-gender-label": "Gender",
      "scheme-tax-label": "Tax preference",
      "scheme-button": "Find Schemes",
      "back-dashboard": "Back to Dashboard"
    },
    placeholders: {
      name: "Enter your full name",
      "chat-input": "Ask a question from the selected mode"
    },
    selectOptions: {
      location: { Maharashtra: "Maharashtra", Karnataka: "Karnataka", Delhi: "Delhi", "Tamil Nadu": "Tamil Nadu", "West Bengal": "West Bengal" },
      risk: { Low: "Low", Moderate: "Moderate", High: "High" },
      goal: { "Emergency Fund": "Emergency Fund", "Home Down Payment": "Home Down Payment", "Higher Education": "Higher Education", Retirement: "Retirement", "Travel Fund": "Travel Fund" },
      planType: { Investments: "Investments", Trip: "Trip", "Emergency Fund": "Emergency Fund", Education: "Education", "Gadget Purchase": "Gadget Purchase", "Big Expense": "Big Expense" },
      schemeGoal: { "Emergency Fund": "Emergency Fund", Retirement: "Retirement", "Family Support": "Family Support", "Small Business": "Small Business", "Tax Saving": "Tax Saving" },
      schemeOccupation: { Salaried: "Salaried", "Self-Employed": "Self-Employed", Student: "Student", "Street Vendor": "Street Vendor" },
      schemeGender: { Any: "Any", Male: "Male", Female: "Female" },
      schemeTax: { Any: "Any", "Tax Free": "Tax Free", "No Tax Preference": "No Tax Preference" }
    },
    profileCreated: (profile) => `Profile created for ${profile.name}. Your dashboard is ready and your main goal is ${profile.goal.toLowerCase()}.`,
    adviserFallback: (question) => `For "${question}", please ask within the selected mode so the guidance stays focused.`,
    matchedFor: (location, goal) => `Matched for ${location} • ${goal}`,
    taxBenefit: "Tax Benefit"
  },
  hi: {
    pageTitle: {
      profile: "फिनमेट - प्रोफ़ाइल",
      dashboard: "फिनमेट - डैशबोर्ड",
      adviser: "फिनमेट - सलाहकार",
      planner: "फिनमेट - प्लानर",
      scheme: "फिनमेट - योजना खोजक"
    },
    currentView: {
      profile: "प्रोफ़ाइल",
      dashboard: "डैशबोर्ड",
      adviser: "सलाहकार",
      planner: "प्लानर",
      scheme: "योजना खोजक"
    },
    healthLabels: { strong: "मजबूत", stable: "स्थिर", needsAttention: "ध्यान चाहिए" },
    months: "महीने",
    labels: {
      "hero-eyebrow": "वित्तीय साथी",
      "hero-title": "पहले प्रोफ़ाइल। फिर सही पैसों के फैसले।",
      "hero-text": "पहले प्रोफ़ाइल बनाइए, फिर डैशबोर्ड पर जाइए, उसके बाद सलाहकार, प्लानर और योजना खोजक का उपयोग कीजिए।",
      "flow-label": "ऐप फ्लो",
      "language-label": "भाषा",
      "flow-step1-label": "स्टेप 1",
      "flow-step1-value": "प्रोफ़ाइल",
      "flow-step2-label": "स्टेप 2",
      "flow-step2-value": "डैशबोर्ड",
      "flow-step3-label": "स्टेप 3",
      "flow-step3-value": "3 टूल",
      "flow-current-label": "वर्तमान स्क्रीन",
      "nav-profile": "प्रोफ़ाइल",
      "nav-dashboard": "डैशबोर्ड",
      "nav-adviser": "सलाहकार",
      "nav-planner": "प्लानर",
      "nav-schemes": "योजना खोजक",
      "profile-step-kicker": "स्टेप 1",
      "profile-title": "वित्तीय प्रोफ़ाइल बनाएँ",
      "profile-pill": "यहीं से शुरू करें",
      "profile-copy": "पहले बुनियादी वित्तीय जानकारी भरें। इसके बाद बाकी प्रोडक्ट खुलेगा।",
      "profile-submit": "प्रोफ़ाइल बनाएँ",
      "label-name": "पूरा नाम",
      "label-age": "उम्र",
      "label-income": "मासिक आय (INR)",
      "label-expenses": "मासिक खर्च (INR)",
      "label-savings": "वर्तमान बचत (INR)",
      "label-location": "स्थान",
      "label-risk": "जोखिम स्तर",
      "label-goal": "मुख्य लक्ष्य",
      "dashboard-step-kicker": "स्टेप 2",
      "dashboard-title": "डैशबोर्ड",
      "dashboard-user-label": "उपयोगकर्ता",
      "dashboard-goal-label": "मुख्य लक्ष्य",
      "dashboard-location-label": "स्थान",
      "monthly-surplus-label": "मासिक बचत शेष",
      "emergency-runway-label": "इमरजेंसी रनवे",
      "recommended-sip-label": "सुझाई गई SIP",
      "health-score-label": "हेल्थ स्कोर",
      "dashboard-module-kicker": "स्टेप 3",
      "dashboard-modules-title": "एक मॉड्यूल चुनें",
      "card-adviser-span": "सलाहकार",
      "card-adviser-title": "वित्तीय सहायक से बात करें",
      "card-adviser-copy": "बचत, निवेश और धन वृद्धि से जुड़े सवाल पूछें।",
      "card-planner-span": "प्लानर",
      "card-planner-title": "लक्ष्य आधारित योजना बनाएँ",
      "card-planner-copy": "हर लक्ष्य के लिए मासिक राशि और व्यावहारिक कदम देखें।",
      "card-scheme-span": "योजना खोजक",
      "card-scheme-title": "उपयुक्त सरकारी योजनाएँ खोजें",
      "card-scheme-copy": "प्रोफ़ाइल, लक्ष्य और पसंद के अनुसार योजनाएँ मिलाएँ।",
      "adviser-kicker": "मॉड्यूल 1",
      "adviser-title": "सलाहकार",
      "adviser-pill": "मार्गदर्शित सवाल-जवाब",
      "mode-investing": "निवेश",
      "mode-saving": "बचत",
      "mode-growing": "धन वृद्धि",
      "adviser-intro": "एक मोड चुनें और उसी विषय से जुड़े सवाल पूछें।",
      "ask-button": "पूछें",
      "planner-kicker": "मॉड्यूल 2",
      "planner-title": "प्लानर",
      "planner-pill": "लक्ष्य योजना",
      "planner-copy": "निवेश, यात्रा, शिक्षा, इमरजेंसी फंड, गैजेट या बड़े खर्च के लिए योजना बनाएँ।",
      "planner-type-label": "योजना का प्रकार",
      "planner-target-label": "लक्ष्य राशि (INR)",
      "planner-timeline-label": "समय सीमा (वर्ष)",
      "plan-button": "योजना निकालें",
      "planner-result-investment-label": "ज़रूरी मासिक निवेश",
      "planner-result-mix-label": "सुझाया गया मिश्रण",
      "planner-result-insight-label": "प्लानर इनसाइट",
      "planner-result-action-label": "सुझाया गया कदम",
      "planner-result-priority-label": "प्राथमिकता स्तर",
      "planner-result-suggestion-label": "अतिरिक्त सुझाव",
      "scheme-kicker": "मॉड्यूल 3",
      "scheme-title": "योजना खोजक",
      "scheme-pill": "पात्रता",
      "scheme-copy": "अपनी प्रोफ़ाइल और अतिरिक्त फ़िल्टर से सबसे उपयुक्त सरकारी सहायता खोजें।",
      "scheme-goal-label": "लक्ष्य फोकस",
      "scheme-occupation-label": "पेशा प्रकार",
      "scheme-gender-label": "लिंग",
      "scheme-tax-label": "टैक्स पसंद",
      "scheme-button": "योजनाएँ खोजें",
      "back-dashboard": "डैशबोर्ड पर वापस जाएँ"
    },
    placeholders: {
      name: "अपना पूरा नाम लिखें",
      "chat-input": "चुने गए मोड से सवाल पूछें"
    },
    selectOptions: {
      location: { Maharashtra: "महाराष्ट्र", Karnataka: "कर्नाटक", Delhi: "दिल्ली", "Tamil Nadu": "तमिल नाडु", "West Bengal": "पश्चिम बंगाल" },
      risk: { Low: "कम", Moderate: "मध्यम", High: "उच्च" },
      goal: { "Emergency Fund": "इमरजेंसी फंड", "Home Down Payment": "घर की डाउन पेमेंट", "Higher Education": "उच्च शिक्षा", Retirement: "रिटायरमेंट", "Travel Fund": "यात्रा फंड" },
      planType: { Investments: "निवेश", Trip: "यात्रा", "Emergency Fund": "इमरजेंसी फंड", Education: "शिक्षा", "Gadget Purchase": "गैजेट खरीद", "Big Expense": "बड़ा खर्च" },
      schemeGoal: { "Emergency Fund": "इमरजेंसी फंड", Retirement: "रिटायरमेंट", "Family Support": "परिवार सहायता", "Small Business": "छोटा व्यवसाय", "Tax Saving": "टैक्स बचत" },
      schemeOccupation: { Salaried: "वेतनभोगी", "Self-Employed": "स्वरोज़गार", Student: "विद्यार्थी", "Street Vendor": "रेहड़ी विक्रेता" },
      schemeGender: { Any: "कोई भी", Male: "पुरुष", Female: "महिला" },
      schemeTax: { Any: "कोई भी", "Tax Free": "टैक्स लाभ चाहिए", "No Tax Preference": "टैक्स की विशेष पसंद नहीं" }
    },
    profileCreated: (profile) => `${profile.name} के लिए प्रोफ़ाइल बन गई है। आपका डैशबोर्ड तैयार है और मुख्य लक्ष्य ${translateValue("goal", profile.goal, "hi")} है।`,
    adviserFallback: (question) => `"${question}" के लिए, कृपया चुने गए मोड के भीतर का सवाल पूछें ताकि सलाह अधिक सटीक रहे।`,
    matchedFor: (location, goal) => `${location} • ${goal} के लिए उपयुक्त`,
    taxBenefit: "टैक्स लाभ"
  }
};

const adviserQuestions = {
  investing: [
    { key: "riskTolerance", en: "What is my risk tolerance and how much money am I prepared to lose?", hi: "मेरा जोखिम स्तर क्या है और मैं कितना पैसा जोखिम में डाल सकता हूँ?" },
    { key: "volatileMarkets", en: "What is the best way to invest in volatile markets?", hi: "अस्थिर बाजार में निवेश करने का सबसे अच्छा तरीका क्या है?" },
    { key: "diversification", en: "What is diversification, and how do I do it?", hi: "डाइवर्सिफिकेशन क्या है और मैं इसे कैसे करूँ?" },
    { key: "startInvesting", en: "How much money do I need to start investing?", hi: "निवेश शुरू करने के लिए मुझे कितने पैसे चाहिए?" },
    { key: "fees", en: "What are the fees or expense ratios, and how do they affect returns?", hi: "फीस या एक्सपेंस रेशियो क्या होते हैं और ये रिटर्न को कैसे प्रभावित करते हैं?" },
    { key: "sellInvestments", en: "When should I sell my investments?", hi: "मुझे अपने निवेश कब बेचने चाहिए?" }
  ],
  saving: [
    { key: "savePercent", en: "How much of my income should I save or invest?", hi: "मुझे अपनी आय का कितना हिस्सा बचाना या निवेश करना चाहिए?" },
    { key: "savedByAge", en: "How much should I have saved by my age?", hi: "मेरी उम्र तक मेरे पास कितनी बचत होनी चाहिए?" },
    { key: "emergencyFund", en: "Do I have a cash emergency fund?", hi: "क्या मेरे पास नकद इमरजेंसी फंड है?" },
    { key: "saveWithDebt", en: "How can I afford to save while paying rent or debt?", hi: "किराया या कर्ज चुकाते हुए मैं बचत कैसे कर सकता हूँ?" },
    { key: "savingVsInvesting", en: "What is the difference between saving and investing?", hi: "बचत और निवेश में क्या अंतर है?" }
  ],
  growing: [
    { key: "goals", en: "What are my investment goals, short-term vs long-term?", hi: "मेरे निवेश लक्ष्य क्या होने चाहिए, अल्पकालिक या दीर्घकालिक?" },
    { key: "growthDriver", en: "How does this investment make money?", hi: "यह निवेश पैसा कैसे बनाता है?" },
    { key: "trackRecord", en: "What is the historical performance and track record of this fund or manager?", hi: "इस फंड या मैनेजर का पिछला प्रदर्शन और ट्रैक रिकॉर्ड कैसा है?" },
    { key: "taxAdvantages", en: "Does this investment provide tax advantages?", hi: "क्या यह निवेश टैक्स लाभ देता है?" },
    { key: "loanForStocks", en: "Should I take loans to invest in stocks?", hi: "क्या मुझे शेयरों में निवेश करने के लिए कर्ज लेना चाहिए?" },
    { key: "crypto", en: "Is cryptocurrency worth considering?", hi: "क्या क्रिप्टोकरेंसी पर विचार करना ठीक है?" }
  ]
};

const schemeCatalog = [
  { nameEn: "Atal Pension Yojana", nameHi: "अटल पेंशन योजना", eligibility: (profile) => profile.age >= 18 && profile.age <= 40, summaryEn: "Pension-focused scheme for long-term retirement discipline.", summaryHi: "लंबी अवधि की रिटायरमेंट योजना और पेंशन अनुशासन के लिए उपयुक्त योजना।", tagEn: "Retirement", tagHi: "रिटायरमेंट", goals: ["Retirement", "Tax Saving"], occupations: ["Salaried", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: true },
  { nameEn: "Pradhan Mantri Jan Dhan Yojana", nameHi: "प्रधानमंत्री जन धन योजना", eligibility: () => true, summaryEn: "Basic banking access with insurance and financial inclusion benefits.", summaryHi: "बुनियादी बैंकिंग, बीमा और वित्तीय समावेशन लाभ देने वाली योजना।", tagEn: "Banking Access", tagHi: "बैंकिंग सुविधा", goals: ["Emergency Fund", "Family Support"], occupations: ["Salaried", "Self-Employed", "Student", "Street Vendor"], genders: ["Male", "Female"], taxBenefit: false },
  { nameEn: "National Pension System", nameHi: "नेशनल पेंशन सिस्टम", eligibility: (profile) => profile.age >= 18 && profile.age <= 70, summaryEn: "Tax-efficient retirement investing with equity and debt options.", summaryHi: "इक्विटी और डेट विकल्पों के साथ टैक्स-कुशल रिटायरमेंट निवेश योजना।", tagEn: "Tax + Retirement", tagHi: "टैक्स + रिटायरमेंट", goals: ["Retirement", "Tax Saving"], occupations: ["Salaried", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: true },
  { nameEn: "Sukanya Samriddhi Yojana", nameHi: "सुकन्या समृद्धि योजना", eligibility: (profile) => profile.age <= 50, summaryEn: "Long-term savings option for family-focused planning and disciplined saving.", summaryHi: "परिवार-केंद्रित योजना और अनुशासित बचत के लिए लंबी अवधि का विकल्प।", tagEn: "Family Planning", tagHi: "परिवार योजना", goals: ["Family Support"], occupations: ["Salaried", "Self-Employed"], genders: ["Female"], taxBenefit: true },
  { nameEn: "PM SVANidhi", nameHi: "पीएम स्वनिधि", eligibility: (profile, preference) => profile.income < 50000 || preference.occupation === "Street Vendor", summaryEn: "Micro-credit support for eligible street vendors and informal earners.", summaryHi: "योग्य रेहड़ी विक्रेताओं और अनौपचारिक कमाई करने वालों के लिए माइक्रो-क्रेडिट सहायता।", tagEn: "Small Business", tagHi: "छोटा व्यवसाय", goals: ["Small Business"], occupations: ["Street Vendor", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: false },
  { nameEn: "Public Provident Fund", nameHi: "पब्लिक प्रोविडेंट फंड", eligibility: () => true, summaryEn: "Low-risk long-term savings product with tax benefits and compounding.", summaryHi: "कम जोखिम वाला दीर्घकालिक बचत विकल्प जिसमें टैक्स लाभ और कंपाउंडिंग मिलती है।", tagEn: "Low Risk", tagHi: "कम जोखिम", goals: ["Emergency Fund", "Tax Saving", "Retirement"], occupations: ["Salaried", "Self-Employed", "Student"], genders: ["Male", "Female"], taxBenefit: true }
];
function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed
      ? {
          ...defaultState,
          ...parsed,
          profile: { ...defaultState.profile, ...(parsed.profile || {}) },
          schemePreference: { ...defaultState.schemePreference, ...(parsed.schemePreference || {}) }
        }
      : JSON.parse(JSON.stringify(defaultState));
  } catch {
    return JSON.parse(JSON.stringify(defaultState));
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function translateValue(group, value, language = state.language) {
  const map = uiText[language].selectOptions[group] || {};
  return map[value] || value;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "decimal", maximumFractionDigits: 0 }).format(Math.round(value));
}

function money(value) {
  return `₹${formatCurrency(value)}`;
}

function getHealthMetrics(profile) {
  const monthlySurplus = Math.max(profile.income - profile.expenses, 0);
  const savingsRate = profile.income > 0 ? monthlySurplus / profile.income : 0;
  const emergencyMonths = profile.expenses > 0 ? profile.savings / profile.expenses : 0;
  let score = 40;
  score += Math.min(savingsRate * 100, 25);
  score += Math.min(emergencyMonths * 4, 20);
  score += profile.risk === "Moderate" ? 8 : profile.risk === "Low" ? 6 : 5;
  score += profile.goal === "Emergency Fund" ? 7 : 10;
  return { monthlySurplus, emergencyMonths, score: Math.min(Math.round(score), 100) };
}

function getRecommendedSip(profile, metrics) {
  const base = metrics.monthlySurplus * 0.45;
  if (profile.risk === "Low") return Math.round(base * 0.8);
  if (profile.risk === "High") return Math.round(base * 1.1);
  return Math.round(base);
}

function getAllocation(risk, language = state.language) {
  if (language === "hi") {
    if (risk === "Low") return "25% इक्विटी / 50% डेट / 25% लिक्विड";
    if (risk === "High") return "75% इक्विटी / 15% डेट / 10% लिक्विड";
    return "60% इक्विटी / 25% डेट / 15% लिक्विड";
  }
  if (risk === "Low") return "25% Equity / 50% Debt / 25% Liquid";
  if (risk === "High") return "75% Equity / 15% Debt / 10% Liquid";
  return "60% Equity / 25% Debt / 15% Liquid";
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setPlaceholder(id, text) {
  const el = document.getElementById(id);
  if (el) el.placeholder = text;
}

function setOptionLabels(selectId, optionMap) {
  const select = document.getElementById(selectId);
  if (!select) return;
  Array.from(select.options).forEach((option) => {
    option.textContent = optionMap[option.value] || option.value;
  });
}

function applyTranslations(page) {
  const text = uiText[state.language];
  document.title = text.pageTitle[page] || "FinMate";
  Object.entries(text.labels).forEach(([id, value]) => setText(id, value));
  Object.entries(text.placeholders).forEach(([id, value]) => setPlaceholder(id, value));
  setOptionLabels("location", text.selectOptions.location);
  setOptionLabels("risk", text.selectOptions.risk);
  setOptionLabels("goal", text.selectOptions.goal);
  setOptionLabels("plan-type", text.selectOptions.planType);
  setOptionLabels("scheme-goal", text.selectOptions.schemeGoal);
  setOptionLabels("scheme-occupation", text.selectOptions.schemeOccupation);
  setOptionLabels("scheme-gender", text.selectOptions.schemeGender);
  setOptionLabels("scheme-tax", text.selectOptions.schemeTax);
  setText("hero-current-view", text.currentView[page]);
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) {
    languageSelect.value = state.language;
    const enOption = languageSelect.querySelector('option[value="en"]');
    const hiOption = languageSelect.querySelector('option[value="hi"]');
    if (enOption) enOption.textContent = "English";
    if (hiOption) hiOption.textContent = "हिंदी";
  }
}

function updateNav(page) {
  const lockedPages = ["dashboard", "adviser", "planner", "scheme"];
  document.querySelectorAll(".nav-chip").forEach((link) => {
    const target = link.dataset.page;
    const isLocked = !state.profileCompleted && lockedPages.includes(target);
    link.classList.toggle("active", target === page);
    link.classList.toggle("locked", isLocked);
    link.setAttribute("aria-disabled", String(isLocked));
  });
}

function bindLockedNav() {
  const lockedPages = ["dashboard", "adviser", "planner", "scheme"];
  document.querySelectorAll(".nav-chip").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.dataset.page;
      if (!state.profileCompleted && lockedPages.includes(target)) {
        event.preventDefault();
      }
    });
  });
}

function enforceAccess(page) {
  if (!state.profileCompleted && page !== "profile") {
    window.location.href = "./profile.html";
  }
}

function bindLanguage(page, rerender) {
  const select = document.getElementById("language-select");
  if (!select) return;
  select.addEventListener("change", () => {
    state.language = select.value;
    saveState();
    applyTranslations(page);
    rerender();
  });
}

function initProfilePage() {
  const form = document.getElementById("profile-form");
  if (!form) return;
  ["name", "age", "income", "expenses", "savings", "location", "risk", "goal"].forEach((id) => {
    const field = document.getElementById(id);
    const value = state.profile[id];
    if (!field) return;
    field.value = value || (typeof value === "number" ? "" : field.value);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state.profile = {
      name: document.getElementById("name").value.trim(),
      age: Number(document.getElementById("age").value),
      income: Number(document.getElementById("income").value),
      expenses: Number(document.getElementById("expenses").value),
      savings: Number(document.getElementById("savings").value),
      location: document.getElementById("location").value,
      risk: document.getElementById("risk").value,
      goal: document.getElementById("goal").value,
    };
    state.profileCompleted = true;
    state.schemePreference.goal = state.profile.goal;
    saveState();
    window.location.href = "./dashboard.html";
  });
}

function renderDashboard() {
  const metrics = getHealthMetrics(state.profile);
  const sip = getRecommendedSip(state.profile, metrics);
  const text = uiText[state.language];
  const badge = metrics.score >= 80 ? text.healthLabels.strong : metrics.score >= 65 ? text.healthLabels.stable : text.healthLabels.needsAttention;
  setText("dashboard-name", state.profile.name || "-");
  setText("dashboard-goal", translateValue("goal", state.profile.goal));
  setText("dashboard-location", translateValue("location", state.profile.location));
  setText("monthly-surplus", money(metrics.monthlySurplus));
  setText("emergency-runway", `${metrics.emergencyMonths.toFixed(1)} ${text.months}`);
  setText("recommended-sip", money(sip));
  setText("health-score", `${metrics.score}/100`);
  setText("health-badge", badge);
  setText("surplus-caption", state.language === "hi" ? metrics.monthlySurplus >= 20000 ? "निवेश और सुरक्षा के लिए अच्छा अतिरिक्त पैसा उपलब्ध है।" : "जोखिम बढ़ाने से पहले खर्च नियंत्रित करें।" : metrics.monthlySurplus >= 20000 ? "Healthy room for investing and safety buffer." : "Control spending before increasing risk.");
  setText("runway-caption", state.language === "hi" ? metrics.emergencyMonths >= 6 ? "आपका नकद सुरक्षा कुशन बेहतर स्थिति में है।" : "कम से कम 6 महीने का फंड रखने की कोशिश करें।" : metrics.emergencyMonths >= 6 ? "Your cash cushion is in a safer range." : "Aim for at least 6 months for better stability.");
  setText("sip-caption", state.language === "hi" ? `यह आपकी ${translateValue("risk", state.profile.risk)} जोखिम प्रोफ़ाइल के अनुसार है।` : `Aligned to a ${state.profile.risk.toLowerCase()}-risk plan.`);
  setText("health-caption", state.language === "hi" ? `मुख्य फोकस: ${translateValue("goal", state.profile.goal)}।` : `Primary focus: ${state.profile.goal}.`);
}
function getPlanSuggestions(planType, monthlyInvestment, monthlySurplus) {
  const affordable = monthlyInvestment <= monthlySurplus * 0.6;
  const hi = state.language === "hi";
  if (planType === "Trip") {
    return hi
      ? { mix: "70% आवर्ती बचत / 30% लिक्विड फंड", readiness: affordable ? "यह यात्रा योजना संभव दिखती है।" : "अधिक समय या कम लागत की जरूरत हो सकती है।", action: "यात्रा के लिए अलग बचत खाता बनाएँ।", priority: "जीवनशैली प्राथमिकता", suggestion: "यात्रा के लिए कर्ज लेने से बचें।" }
      : { mix: "70% Recurring Savings / 30% Liquid Fund", readiness: affordable ? "This trip plan looks achievable." : "This trip budget may need more time or a lower target.", action: "Create a separate travel bucket and auto-save into it.", priority: "Lifestyle priority", suggestion: "Avoid using debt for travel." };
  }
  if (planType === "Emergency Fund") {
    return hi
      ? { mix: "80% बचत / 20% लिक्विड फंड", readiness: affordable ? "आप बिना दबाव बढ़ाए इमरजेंसी फंड बना सकते हैं।" : "इसे छोटे चरणों में बनाइए।", action: "इस पैसे को आसानी से उपलब्ध रखें।", priority: "उच्च प्राथमिकता", suggestion: "आक्रामक निवेश से पहले रिजर्व पूरा करें।" }
      : { mix: "80% Savings / 20% Liquid Fund", readiness: affordable ? "You can build your emergency fund steadily." : "Build this in smaller phases first.", action: "Keep this money highly liquid.", priority: "High priority", suggestion: "Complete reserves before aggressive investing." };
  }
  return hi
    ? { mix: getAllocation(state.profile.risk, "hi"), readiness: affordable ? `${translateValue("planType", planType)} की योजना व्यावहारिक लगती है।` : `${translateValue("planType", planType)} लक्ष्य के लिए अधिक समय चाहिए।`, action: "मासिक SIP से शुरुआत करें और हर तिमाही समीक्षा करें।", priority: "मध्यम प्राथमिकता", suggestion: "इमरजेंसी बचत कम करने से बचें।" }
    : { mix: getAllocation(state.profile.risk, "en"), readiness: affordable ? `Your ${planType.toLowerCase()} plan is realistic.` : `Your ${planType.toLowerCase()} plan may need a longer timeline.`, action: "Start with a monthly SIP and review progress every quarter.", priority: "Medium priority", suggestion: "Avoid reducing emergency savings while funding this goal." };
}

function renderPlanner() {
  const target = Number(document.getElementById("target-amount").value);
  const years = Number(document.getElementById("timeline-years").value);
  const planType = document.getElementById("plan-type").value;
  const annualReturn = state.profile.risk === "Low" ? 0.08 : state.profile.risk === "High" ? 0.14 : 0.11;
  const monthlyRate = annualReturn / 12;
  const months = years * 12;
  const monthlySurplus = getHealthMetrics(state.profile).monthlySurplus;
  const monthlyInvestment = monthlyRate === 0 ? target / months : (target * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  const details = getPlanSuggestions(planType, monthlyInvestment, monthlySurplus);
  setText("required-investment", money(monthlyInvestment));
  setText("suggested-mix", details.mix);
  setText("readiness-message", details.readiness);
  setText("planner-action", details.action);
  setText("planner-priority", details.priority);
  setText("planner-suggestion", details.suggestion);
}

function renderSchemes() {
  const text = uiText[state.language];
  const eligibleSchemes = schemeCatalog
    .filter((scheme) => scheme.eligibility(state.profile, state.schemePreference))
    .filter((scheme) => state.schemePreference.gender === "Any" ? true : scheme.genders.includes(state.schemePreference.gender))
    .map((scheme) => {
      let score = 0;
      if (scheme.goals.includes(state.schemePreference.goal)) score += 2;
      if (scheme.occupations.includes(state.schemePreference.occupation)) score += 2;
      if (state.schemePreference.taxPreference === "Tax Free" && scheme.taxBenefit) score += 2;
      if (scheme.goals.includes(state.profile.goal)) score += 1;
      return { ...scheme, score };
    })
    .sort((a, b) => b.score - a.score);
  const container = document.getElementById("scheme-results");
  if (!container) return;
  container.innerHTML = eligibleSchemes
    .map((scheme) => `
      <article class="scheme-item">
        <span>${text.matchedFor(translateValue("location", state.profile.location), translateValue("schemeGoal", state.schemePreference.goal))}</span>
        <strong>${state.language === "hi" ? scheme.nameHi : scheme.nameEn}</strong>
        <p>${state.language === "hi" ? scheme.summaryHi : scheme.summaryEn}</p>
        <div class="tag">${state.language === "hi" ? scheme.tagHi : scheme.tagEn}${scheme.taxBenefit ? ` • ${text.taxBenefit}` : ""}</div>
      </article>
    `)
    .join("");
}

function buildAnswers(questionKey, questionText) {
  const { monthlySurplus, emergencyMonths } = getHealthMetrics(state.profile);
  const goalText = translateValue("goal", state.profile.goal);
  const riskText = translateValue("risk", state.profile.risk);
  const answers = {
    en: {
      riskTolerance: `For "${questionText}", your ${state.profile.risk.toLowerCase()} risk profile suggests you should invest only the money you can leave untouched for years.`,
      volatileMarkets: `For "${questionText}", disciplined investing through SIPs is usually better than timing the market.`,
      diversification: `For "${questionText}", diversification means spreading money across assets. A mix like ${getAllocation(state.profile.risk, "en")} is a practical starting point.`,
      startInvesting: `For "${questionText}", even ${money(Math.max(1000, Math.round(monthlySurplus * 0.1)))} per month is enough to start.`,
      fees: `For "${questionText}", lower fees usually leave more growth in your hands over time.`,
      sellInvestments: `For "${questionText}", sell when the investment no longer matches your goal, timeline, or risk capacity.`,
      savePercent: `For "${questionText}", saving or investing around 20% to 30% of income is a strong benchmark. Your current surplus is ${money(monthlySurplus)}.`,
      savedByAge: `For "${questionText}", your savings currently cover about ${emergencyMonths.toFixed(1)} months of expenses.`,
      emergencyFund: emergencyMonths >= 6 ? `For "${questionText}", your emergency reserve is in a safer range.` : `For "${questionText}", build your emergency fund toward 6 months of expenses first.`,
      saveWithDebt: `For "${questionText}", automate a small savings amount first and protect a basic emergency buffer.`,
      savingVsInvesting: `For "${questionText}", saving is mainly for safety while investing is for long-term growth.`,
      goals: `For "${questionText}", short-term goals need safer options, while long-term goals can take more equity. Your main goal is ${state.profile.goal.toLowerCase()}.`,
      growthDriver: `For "${questionText}", investments grow through earnings, appreciation, interest, or a combination of these.`,
      trackRecord: `For "${questionText}", historical performance matters, but it should be reviewed with risk, cost, and fit.`,
      taxAdvantages: `For "${questionText}", tax benefits help, but the investment still needs to match your profile and timeline.`,
      loanForStocks: `For "${questionText}", taking loans to invest in stocks is usually too risky for most people.`,
      crypto: `For "${questionText}", cryptocurrency should only be a very small optional part of a portfolio, if any.`
    },
    hi: {
      riskTolerance: `"${questionText}" के लिए, आपकी ${riskText} जोखिम प्रोफ़ाइल बताती है कि आपको वही पैसा निवेश करना चाहिए जिसे लंबे समय तक बिना छुए छोड़ सकें।`,
      volatileMarkets: `"${questionText}" के लिए, अस्थिर बाजार में SIP जैसी नियमित निवेश पद्धति बेहतर रहती है।`,
      diversification: `"${questionText}" के लिए, डाइवर्सिफिकेशन का मतलब है पैसा अलग-अलग एसेट में बाँटना। ${getAllocation(state.profile.risk, "hi")} जैसा मिश्रण एक अच्छी शुरुआत है।`,
      startInvesting: `"${questionText}" के लिए, ${money(Math.max(1000, Math.round(monthlySurplus * 0.1)))} जैसी छोटी मासिक शुरुआत भी पर्याप्त है।`,
      fees: `"${questionText}" के लिए, कम फीस वाले विकल्प लंबे समय में बेहतर नेट रिटर्न दे सकते हैं।`,
      sellInvestments: `"${questionText}" के लिए, निवेश तब बेचें जब वह आपके लक्ष्य, समय सीमा या जोखिम क्षमता से मेल न खाए।`,
      savePercent: `"${questionText}" के लिए, आय का लगभग 20% से 30% बचाना या निवेश करना अच्छा मानक है। आपका वर्तमान मासिक शेष ${money(monthlySurplus)} है।`,
      savedByAge: `"${questionText}" के लिए, आपकी बचत अभी लगभग ${emergencyMonths.toFixed(1)} महीने के खर्च के बराबर है।`,
      emergencyFund: emergencyMonths >= 6 ? `"${questionText}" के लिए, आपका इमरजेंसी फंड बेहतर स्थिति में है।` : `"${questionText}" के लिए, पहले लगभग 6 महीने के खर्च जितना इमरजेंसी फंड बनाइए।`,
      saveWithDebt: `"${questionText}" के लिए, छोटी ऑटोमेटेड बचत शुरू करें और एक बेसिक इमरजेंसी बफर बनाएँ।`,
      savingVsInvesting: `"${questionText}" के लिए, बचत मुख्य रूप से सुरक्षा के लिए होती है, जबकि निवेश लंबी अवधि की वृद्धि के लिए।`,
      goals: `"${questionText}" के लिए, अल्पकालिक लक्ष्य सुरक्षित विकल्प माँगते हैं और दीर्घकालिक लक्ष्य अधिक इक्विटी ले सकते हैं। आपका मुख्य लक्ष्य ${goalText} है।`,
      growthDriver: `"${questionText}" के लिए, निवेश से पैसा कमाई, कीमत बढ़ने, ब्याज या इनके संयोजन से बनता है।`,
      trackRecord: `"${questionText}" के लिए, पिछला प्रदर्शन देखें, लेकिन उसे जोखिम, लागत और लक्ष्य से मेल के साथ समझें।`,
      taxAdvantages: `"${questionText}" के लिए, टैक्स लाभ मदद करते हैं, लेकिन निवेश आपकी प्रोफ़ाइल और समय सीमा से भी मेल खाना चाहिए।`,
      loanForStocks: `"${questionText}" के लिए, शेयरों में निवेश के लिए कर्ज लेना अधिकतर लोगों के लिए बहुत जोखिम भरा होता है।`,
      crypto: `"${questionText}" के लिए, क्रिप्टोकरेंसी को केवल बहुत छोटे वैकल्पिक हिस्से के रूप में ही देखें।`
    }
  };
  return answers[state.language][questionKey] || uiText[state.language].adviserFallback(questionText);
}

function renderQuestionList() {
  const container = document.getElementById("question-list");
  if (!container) return;
  const langKey = state.language === "hi" ? "hi" : "en";
  container.innerHTML = adviserQuestions[state.adviserMode]
    .map((question) => `
      <button class="question-chip" type="button" data-question-key="${question.key}">
        ${question[langKey]}
      </button>
    `)
    .join("");
  container.querySelectorAll("[data-question-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = adviserQuestions[state.adviserMode].find((item) => item.key === button.dataset.questionKey);
      if (!question) return;
      const visibleText = question[langKey];
      appendChatMessage(visibleText, "user");
      appendChatMessage(buildAnswers(question.key, visibleText), "ai");
    });
  });
}

function appendChatMessage(text, type) {
  const thread = document.getElementById("chat-thread");
  if (!thread) return;
  const bubble = document.createElement("article");
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  thread.appendChild(bubble);
}

function resetChatThread() {
  const thread = document.getElementById("chat-thread");
  if (!thread) return;
  thread.innerHTML = "";
  appendChatMessage(uiText[state.language].labels["adviser-intro"], "ai");
}

function initAdviserPage() {
  resetChatThread();
  renderQuestionList();
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.adviserMode);
    button.addEventListener("click", () => {
      state.adviserMode = button.dataset.mode;
      saveState();
      document.querySelectorAll("[data-mode]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderQuestionList();
    });
  });
  document.getElementById("ask-button").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    const questionText = input.value.trim();
    if (!questionText) return;
    appendChatMessage(questionText, "user");
    input.value = "";
    const allQuestions = Object.values(adviserQuestions).flat();
    const matched = allQuestions.find((item) => item.en.toLowerCase() === questionText.toLowerCase() || item.hi.toLowerCase() === questionText.toLowerCase());
    appendChatMessage(matched ? buildAnswers(matched.key, questionText) : uiText[state.language].adviserFallback(questionText), "ai");
  });
}

function initPlannerPage() {
  document.getElementById("plan-button").addEventListener("click", renderPlanner);
  renderPlanner();
}

function initSchemePage() {
  document.getElementById("scheme-goal").value = state.schemePreference.goal;
  document.getElementById("scheme-occupation").value = state.schemePreference.occupation;
  document.getElementById("scheme-gender").value = state.schemePreference.gender;
  document.getElementById("scheme-tax").value = state.schemePreference.taxPreference;
  document.getElementById("scheme-button").addEventListener("click", () => {
    state.schemePreference = {
      goal: document.getElementById("scheme-goal").value,
      occupation: document.getElementById("scheme-occupation").value,
      gender: document.getElementById("scheme-gender").value,
      taxPreference: document.getElementById("scheme-tax").value
    };
    saveState();
    renderSchemes();
  });
  renderSchemes();
}

function initPage() {
  const page = document.body.dataset.page;
  enforceAccess(page);
  applyTranslations(page);
  updateNav(page);
  bindLockedNav();
  bindLanguage(page, () => {
    applyTranslations(page);
    updateNav(page);
    if (page === "dashboard") renderDashboard();
    if (page === "adviser") {
      resetChatThread();
      renderQuestionList();
    }
    if (page === "planner") renderPlanner();
    if (page === "scheme") renderSchemes();
  });
  if (page === "profile") initProfilePage();
  if (page === "dashboard") renderDashboard();
  if (page === "adviser") initAdviserPage();
  if (page === "planner") initPlannerPage();
  if (page === "scheme") initSchemePage();
}

document.addEventListener("DOMContentLoaded", initPage);
