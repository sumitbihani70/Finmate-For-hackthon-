const profileForm = document.getElementById("profile-form");
const planButton = document.getElementById("plan-button");
const askButton = document.getElementById("ask-button");
const chatInput = document.getElementById("chat-input");
const chatThread = document.getElementById("chat-thread");
const schemeResults = document.getElementById("scheme-results");
const questionList = document.getElementById("question-list");
const schemeButton = document.getElementById("scheme-button");
const modeButtons = document.querySelectorAll("[data-mode]");
const navButtons = document.querySelectorAll("[data-screen-target]");
const screens = document.querySelectorAll(".app-screen");
const languageSelect = document.getElementById("language-select");

const state = {
  currentScreen: "profile-screen",
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
    pageTitle: "FinMate",
    currentView: {
      "profile-screen": "Profile",
      "dashboard-screen": "Dashboard",
      "advisor-screen": "Adviser",
      "planner-screen": "Planner",
      "scheme-screen": "Scheme Finder",
    },
    healthLabels: {
      strong: "Strong",
      stable: "Stable",
      needsAttention: "Needs attention",
    },
    months: "months",
    profileCreated: (profile) => `Profile created for ${profile.name}. Your dashboard is ready, and the plan will focus on ${profile.goal.toLowerCase()}.`,
    askButton: "Ask",
    planButton: "Calculate plan",
    schemeButton: "Find Schemes",
    labels: {
      "hero-eyebrow": "Financial Copilot",
      "hero-title": "Profile first. Then guided money decisions.",
      "hero-text": "FinMate now follows your exact product flow: create a profile, land on a dashboard, then choose between Adviser, Planner, and Scheme Finder.",
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
      "profile-copy": "The user first fills basic financial details. After submitting, the app moves to the dashboard.",
      "profile-gate-message": "Complete this profile first. Dashboard and all modules unlock after this step.",
      "label-name": "Full name",
      "label-age": "Age",
      "label-income": "Monthly income (INR)",
      "label-expenses": "Monthly expenses (INR)",
      "label-savings": "Current savings (INR)",
      "label-location": "Location",
      "label-risk": "Risk appetite",
      "label-goal": "Primary goal",
      "profile-submit": "Create Profile",
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
      "card-adviser-copy": "Ask questions about savings, SIPs, budgeting, and financial choices.",
      "card-planner-span": "Planner",
      "card-planner-title": "Create a goal-based plan",
      "card-planner-copy": "See how much to invest monthly and which mix fits your risk profile.",
      "card-scheme-span": "Scheme Finder",
      "card-scheme-title": "Find relevant government schemes",
      "card-scheme-copy": "Match benefits and schemes using age, income, goal, and location.",
      "back-adviser": "Back to Dashboard",
      "back-planner": "Back to Dashboard",
      "back-scheme": "Back to Dashboard",
      "adviser-kicker": "Module 1",
      "adviser-title": "Adviser",
      "adviser-pill": "Guided Q&A",
      "mode-investing": "Investing",
      "mode-saving": "Saving",
      "mode-growing": "Growing Wealth",
      "adviser-intro": "Choose one mode and ask from those topics only.",
      "planner-kicker": "Module 2",
      "planner-title": "Planner",
      "planner-pill": "Goal Plan",
      "planner-copy": "Plan for investments, trips, gadgets, education, emergency fund, or any major expense and get practical suggestions.",
      "planner-type-label": "Planning type",
      "planner-target-label": "Target amount (INR)",
      "planner-timeline-label": "Timeline (years)",
      "planner-result-investment-label": "Required monthly investment",
      "planner-result-mix-label": "Suggested mix",
      "planner-result-insight-label": "Planner insight",
      "planner-result-action-label": "Suggested action",
      "planner-result-priority-label": "Priority level",
      "planner-result-suggestion-label": "Extra suggestion",
      "scheme-kicker": "Module 3",
      "scheme-title": "Scheme Finder",
      "scheme-pill": "Eligibility",
      "scheme-copy": "Use your profile plus an extra goal filter to find the most relevant government support.",
      "scheme-goal-label": "Goal focus",
      "scheme-occupation-label": "Occupation type",
      "scheme-gender-label": "Gender",
      "scheme-tax-label": "Tax preference",
    },
    placeholders: {
      name: "Enter your full name",
      "chat-input": "Ask a question from the selected mode",
    },
    selectOptions: {
      location: { Maharashtra: "Maharashtra", Karnataka: "Karnataka", Delhi: "Delhi", "Tamil Nadu": "Tamil Nadu", "West Bengal": "West Bengal" },
      risk: { Low: "Low", Moderate: "Moderate", High: "High" },
      goal: { "Emergency Fund": "Emergency Fund", "Home Down Payment": "Home Down Payment", "Higher Education": "Higher Education", Retirement: "Retirement", "Travel Fund": "Travel Fund" },
      planType: { Investments: "Investments", Trip: "Trip", "Emergency Fund": "Emergency Fund", Education: "Education", "Gadget Purchase": "Gadget Purchase", "Big Expense": "Big Expense" },
      schemeGoal: { "Emergency Fund": "Emergency Fund", Retirement: "Retirement", "Family Support": "Family Support", "Small Business": "Small Business", "Tax Saving": "Tax Saving" },
      schemeOccupation: { Salaried: "Salaried", "Self-Employed": "Self-Employed", Student: "Student", "Street Vendor": "Street Vendor" },
      schemeGender: { Any: "Any", Male: "Male", Female: "Female" },
      schemeTax: { Any: "Any", "Tax Free": "Tax Free", "No Tax Preference": "No Tax Preference" },
    },
  },
  hi: {
    pageTitle: "फिनमेट",
    currentView: {
      "profile-screen": "प्रोफ़ाइल",
      "dashboard-screen": "डैशबोर्ड",
      "advisor-screen": "सलाहकार",
      "planner-screen": "प्लानर",
      "scheme-screen": "योजना खोजक",
    },
    healthLabels: {
      strong: "मजबूत",
      stable: "स्थिर",
      needsAttention: "ध्यान चाहिए",
    },
    months: "महीने",
    profileCreated: (profile) => `${profile.name} के लिए प्रोफ़ाइल बन गई है। आपका डैशबोर्ड तैयार है और योजना ${translateValue("goal", profile.goal, "hi")} पर केंद्रित रहेगी।`,
    askButton: "पूछें",
    planButton: "योजना निकालें",
    schemeButton: "योजनाएँ खोजें",
    labels: {
      "hero-eyebrow": "वित्तीय साथी",
      "hero-title": "पहले प्रोफ़ाइल। फिर सही पैसों के फैसले।",
      "hero-text": "FinMate अब आपके तय फ्लो के अनुसार चलता है: पहले प्रोफ़ाइल बनाइए, फिर डैशबोर्ड पर जाइए, और उसके बाद सलाहकार, प्लानर और योजना खोजक में से चुनिए।",
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
      "profile-copy": "उपयोगकर्ता पहले बुनियादी वित्तीय जानकारी भरता है। सबमिट करने के बाद ऐप डैशबोर्ड पर जाता है।",
      "profile-gate-message": "पहले यह प्रोफ़ाइल पूरी करें। इसके बाद डैशबोर्ड और सभी मॉड्यूल खुलेंगे।",
      "label-name": "पूरा नाम",
      "label-age": "उम्र",
      "label-income": "मासिक आय (INR)",
      "label-expenses": "मासिक खर्च (INR)",
      "label-savings": "वर्तमान बचत (INR)",
      "label-location": "स्थान",
      "label-risk": "जोखिम स्तर",
      "label-goal": "मुख्य लक्ष्य",
      "profile-submit": "प्रोफ़ाइल बनाएँ",
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
      "card-adviser-copy": "बचत, SIP, बजट और वित्तीय फैसलों पर सवाल पूछें।",
      "card-planner-span": "प्लानर",
      "card-planner-title": "लक्ष्य आधारित योजना बनाएँ",
      "card-planner-copy": "देखें हर महीने कितना निवेश करना है और कौन-सा मिश्रण आपके जोखिम स्तर के अनुसार सही है।",
      "card-scheme-span": "योजना खोजक",
      "card-scheme-title": "उपयुक्त सरकारी योजनाएँ खोजें",
      "card-scheme-copy": "उम्र, आय, लक्ष्य और स्थान के आधार पर योजनाएँ मिलाएँ।",
      "back-adviser": "डैशबोर्ड पर वापस जाएँ",
      "back-planner": "डैशबोर्ड पर वापस जाएँ",
      "back-scheme": "डैशबोर्ड पर वापस जाएँ",
      "adviser-kicker": "मॉड्यूल 1",
      "adviser-title": "सलाहकार",
      "adviser-pill": "मार्गदर्शित सवाल-जवाब",
      "mode-investing": "निवेश",
      "mode-saving": "बचत",
      "mode-growing": "धन वृद्धि",
      "adviser-intro": "एक मोड चुनें और उसी विषय से जुड़े सवाल पूछें।",
      "planner-kicker": "मॉड्यूल 2",
      "planner-title": "प्लानर",
      "planner-pill": "लक्ष्य योजना",
      "planner-copy": "निवेश, यात्रा, गैजेट, शिक्षा, इमरजेंसी फंड या किसी बड़े खर्च के लिए योजना बनाएँ और व्यावहारिक सुझाव पाएँ।",
      "planner-type-label": "योजना का प्रकार",
      "planner-target-label": "लक्ष्य राशि (INR)",
      "planner-timeline-label": "समय सीमा (वर्ष)",
      "planner-result-investment-label": "ज़रूरी मासिक निवेश",
      "planner-result-mix-label": "सुझाया गया मिश्रण",
      "planner-result-insight-label": "प्लानर इनसाइट",
      "planner-result-action-label": "सुझाया गया कदम",
      "planner-result-priority-label": "प्राथमिकता स्तर",
      "planner-result-suggestion-label": "अतिरिक्त सुझाव",
      "scheme-kicker": "मॉड्यूल 3",
      "scheme-title": "योजना खोजक",
      "scheme-pill": "पात्रता",
      "scheme-copy": "अपनी प्रोफ़ाइल और अतिरिक्त लक्ष्य फ़िल्टर का उपयोग करके सबसे उपयुक्त सरकारी सहायता खोजें।",
      "scheme-goal-label": "लक्ष्य फोकस",
      "scheme-occupation-label": "पेशा प्रकार",
      "scheme-gender-label": "लिंग",
      "scheme-tax-label": "टैक्स पसंद",
    },
    placeholders: {
      name: "अपना पूरा नाम लिखें",
      "chat-input": "चुने गए मोड से सवाल पूछें",
    },
    selectOptions: {
      location: { Maharashtra: "महाराष्ट्र", Karnataka: "कर्नाटक", Delhi: "दिल्ली", "Tamil Nadu": "तमिल नाडु", "West Bengal": "पश्चिम बंगाल" },
      risk: { Low: "कम", Moderate: "मध्यम", High: "उच्च" },
      goal: { "Emergency Fund": "इमरजेंसी फंड", "Home Down Payment": "घर की डाउन पेमेंट", "Higher Education": "उच्च शिक्षा", Retirement: "रिटायरमेंट", "Travel Fund": "यात्रा फंड" },
      planType: { Investments: "निवेश", Trip: "यात्रा", "Emergency Fund": "इमरजेंसी फंड", Education: "शिक्षा", "Gadget Purchase": "गैजेट खरीद", "Big Expense": "बड़ा खर्च" },
      schemeGoal: { "Emergency Fund": "इमरजेंसी फंड", Retirement: "रिटायरमेंट", "Family Support": "परिवार सहायता", "Small Business": "छोटा व्यवसाय", "Tax Saving": "टैक्स बचत" },
      schemeOccupation: { Salaried: "वेतनभोगी", "Self-Employed": "स्वरोज़गार", Student: "विद्यार्थी", "Street Vendor": "रेहड़ी विक्रेता" },
      schemeGender: { Any: "कोई भी", Male: "पुरुष", Female: "महिला" },
      schemeTax: { Any: "कोई भी", "Tax Free": "टैक्स लाभ चाहिए", "No Tax Preference": "टैक्स की विशेष पसंद नहीं" },
    },
  },
};

const adviserQuestions = {
  investing: [
    { key: "riskTolerance", en: "What is my risk tolerance and how much money am I prepared to lose?", hi: "मेरा जोखिम स्तर क्या है और मैं कितना पैसा जोखिम में डाल सकता हूँ?" },
    { key: "volatileMarkets", en: "What is the best way to invest in volatile markets?", hi: "अस्थिर बाजार में निवेश करने का सबसे अच्छा तरीका क्या है?" },
    { key: "diversification", en: "What is diversification, and how do I do it?", hi: "डाइवर्सिफिकेशन क्या है और मैं इसे कैसे करूँ?" },
    { key: "startInvesting", en: "How much money do I need to start investing?", hi: "निवेश शुरू करने के लिए मुझे कितने पैसे चाहिए?" },
    { key: "fees", en: "What are the fees or expense ratios, and how do they affect returns?", hi: "फीस या एक्सपेंस रेशियो क्या होते हैं और ये रिटर्न को कैसे प्रभावित करते हैं?" },
    { key: "sellInvestments", en: "When should I sell my investments?", hi: "मुझे अपने निवेश कब बेचने चाहिए?" },
  ],
  saving: [
    { key: "savePercent", en: "How much of my income should I save or invest?", hi: "मुझे अपनी आय का कितना हिस्सा बचाना या निवेश करना चाहिए?" },
    { key: "savedByAge", en: "How much should I have saved by my age?", hi: "मेरी उम्र तक मेरे पास कितनी बचत होनी चाहिए?" },
    { key: "emergencyFund", en: "Do I have a cash emergency fund?", hi: "क्या मेरे पास नकद इमरजेंसी फंड है?" },
    { key: "saveWithDebt", en: "How can I afford to save while paying rent or debt?", hi: "किराया या कर्ज चुकाते हुए मैं बचत कैसे कर सकता हूँ?" },
    { key: "savingVsInvesting", en: "What is the difference between saving and investing?", hi: "बचत और निवेश में क्या अंतर है?" },
  ],
  growing: [
    { key: "goals", en: "What are my investment goals, short-term vs long-term?", hi: "मेरे निवेश लक्ष्य क्या होने चाहिए, अल्पकालिक या दीर्घकालिक?" },
    { key: "growthDriver", en: "How does this investment make money?", hi: "यह निवेश पैसा कैसे बनाता है?" },
    { key: "trackRecord", en: "What is the historical performance and track record of this fund or manager?", hi: "इस फंड या मैनेजर का पिछला प्रदर्शन और ट्रैक रिकॉर्ड कैसा है?" },
    { key: "taxAdvantages", en: "Does this investment provide tax advantages?", hi: "क्या यह निवेश टैक्स लाभ देता है?" },
    { key: "loanForStocks", en: "Should I take loans to invest in stocks?", hi: "क्या मुझे शेयरों में निवेश करने के लिए कर्ज लेना चाहिए?" },
    { key: "crypto", en: "Is cryptocurrency worth considering?", hi: "क्या क्रिप्टोकरेंसी पर विचार करना ठीक है?" },
  ],
};

const schemeCatalog = [
  { nameEn: "Atal Pension Yojana", nameHi: "अटल पेंशन योजना", eligibility: (profile) => profile.age >= 18 && profile.age <= 40, summaryEn: "Pension-focused scheme for long-term retirement discipline.", summaryHi: "लंबी अवधि की रिटायरमेंट योजना और पेंशन अनुशासन के लिए उपयुक्त योजना।", tagEn: "Retirement", tagHi: "रिटायरमेंट", goals: ["Retirement", "Tax Saving"], occupations: ["Salaried", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: true },
  { nameEn: "Pradhan Mantri Jan Dhan Yojana", nameHi: "प्रधानमंत्री जन धन योजना", eligibility: () => true, summaryEn: "Basic banking access with insurance and financial inclusion benefits.", summaryHi: "बुनियादी बैंकिंग, बीमा और वित्तीय समावेशन लाभ देने वाली योजना।", tagEn: "Banking Access", tagHi: "बैंकिंग सुविधा", goals: ["Emergency Fund", "Family Support"], occupations: ["Salaried", "Self-Employed", "Student", "Street Vendor"], genders: ["Male", "Female"], taxBenefit: false },
  { nameEn: "National Pension System", nameHi: "नेशनल पेंशन सिस्टम", eligibility: (profile) => profile.age >= 18 && profile.age <= 70, summaryEn: "Tax-efficient retirement investing with equity and debt options.", summaryHi: "इक्विटी और डेट विकल्पों के साथ टैक्स-कुशल रिटायरमेंट निवेश योजना।", tagEn: "Tax + Retirement", tagHi: "टैक्स + रिटायरमेंट", goals: ["Retirement", "Tax Saving"], occupations: ["Salaried", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: true },
  { nameEn: "Sukanya Samriddhi Yojana", nameHi: "सुकन्या समृद्धि योजना", eligibility: (profile) => profile.age <= 50, summaryEn: "Long-term savings option for family-focused planning and disciplined saving.", summaryHi: "परिवार-केंद्रित योजना और अनुशासित बचत के लिए लंबी अवधि का विकल्प।", tagEn: "Family Planning", tagHi: "परिवार योजना", goals: ["Family Support"], occupations: ["Salaried", "Self-Employed"], genders: ["Female"], taxBenefit: true },
  { nameEn: "PM SVANidhi", nameHi: "पीएम स्वनिधि", eligibility: (profile, preference) => profile.income < 50000 || preference.occupation === "Street Vendor", summaryEn: "Micro-credit support for eligible street vendors and informal earners.", summaryHi: "योग्य रेहड़ी विक्रेताओं और अनौपचारिक कमाई करने वालों के लिए माइक्रो-क्रेडिट सहायता।", tagEn: "Small Business", tagHi: "छोटा व्यवसाय", goals: ["Small Business"], occupations: ["Street Vendor", "Self-Employed"], genders: ["Male", "Female"], taxBenefit: false },
  { nameEn: "Public Provident Fund", nameHi: "पब्लिक प्रोविडेंट फंड", eligibility: () => true, summaryEn: "Low-risk long-term savings product with tax benefits and compounding.", summaryHi: "कम जोखिम वाला दीर्घकालिक बचत विकल्प जिसमें टैक्स लाभ और कंपाउंडिंग मिलती है।", tagEn: "Low Risk", tagHi: "कम जोखिम", goals: ["Emergency Fund", "Tax Saving", "Retirement"], occupations: ["Salaried", "Self-Employed", "Student"], genders: ["Male", "Female"], taxBenefit: true },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "decimal", maximumFractionDigits: 0 }).format(Math.round(value));
}

function money(value) {
  return `₹${formatCurrency(value)}`;
}

function translateValue(group, value, language = state.language) {
  const optionGroups = uiText[language].selectOptions;
  const mapping = optionGroups[group] || {};
  return mapping[value] || value;
}

function getProfileFromForm() {
  return {
    name: document.getElementById("name").value.trim(),
    age: Number(document.getElementById("age").value),
    income: Number(document.getElementById("income").value),
    expenses: Number(document.getElementById("expenses").value),
    savings: Number(document.getElementById("savings").value),
    location: document.getElementById("location").value,
    risk: document.getElementById("risk").value,
    goal: document.getElementById("goal").value,
  };
}

function getSchemePreferenceFromForm() {
  return {
    goal: document.getElementById("scheme-goal").value,
    occupation: document.getElementById("scheme-occupation").value,
    gender: document.getElementById("scheme-gender").value,
    taxPreference: document.getElementById("scheme-tax").value,
  };
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

  return { monthlySurplus, savingsRate, emergencyMonths, score: Math.min(Math.round(score), 100) };
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
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function setPlaceholder(id, text) {
  const element = document.getElementById(id);
  if (element) element.placeholder = text;
}

function setOptionLabels(selectId, optionMap) {
  const select = document.getElementById(selectId);
  if (!select) return;

  Array.from(select.options).forEach((option) => {
    option.textContent = optionMap[option.value] || option.value;
  });
}

function setScreen(screenId) {
  if (!state.profileCompleted && screenId !== "profile-screen") return;

  state.currentScreen = screenId;

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screenTarget === screenId);
  });

  document.getElementById("hero-current-view").textContent = uiText[state.language].currentView[screenId];
}
function applyTranslations() {
  const text = uiText[state.language];
  document.title = text.pageTitle;

  Object.entries(text.labels).forEach(([id, value]) => {
    setText(id, value);
  });

  Object.entries(text.placeholders).forEach(([id, value]) => {
    setPlaceholder(id, value);
  });

  setText("ask-button", text.askButton);
  setText("plan-button", text.planButton);
  setText("scheme-button", text.schemeButton);

  setOptionLabels("location", text.selectOptions.location);
  setOptionLabels("risk", text.selectOptions.risk);
  setOptionLabels("goal", text.selectOptions.goal);
  setOptionLabels("plan-type", text.selectOptions.planType);
  setOptionLabels("scheme-goal", text.selectOptions.schemeGoal);
  setOptionLabels("scheme-occupation", text.selectOptions.schemeOccupation);
  setOptionLabels("scheme-gender", text.selectOptions.schemeGender);
  setOptionLabels("scheme-tax", text.selectOptions.schemeTax);

  const englishOption = languageSelect.querySelector('option[value="en"]');
  const hindiOption = languageSelect.querySelector('option[value="hi"]');
  if (englishOption) englishOption.textContent = "English";
  if (hindiOption) hindiOption.textContent = "हिंदी";
}

function resetChatThread() {
  chatThread.innerHTML = "";
  appendChatMessage(uiText[state.language].labels["adviser-intro"], "ai");
}

function updateAccessState() {
  navButtons.forEach((button) => {
    const isProfile = button.dataset.screenTarget === "profile-screen";
    const locked = !state.profileCompleted && !isProfile;
    button.classList.toggle("locked", locked);
    button.disabled = locked;
  });
}

function renderDashboard() {
  const metrics = getHealthMetrics(state.profile);
  const sip = getRecommendedSip(state.profile, metrics);
  const text = uiText[state.language];
  const healthLabel = metrics.score >= 80 ? text.healthLabels.strong : metrics.score >= 65 ? text.healthLabels.stable : text.healthLabels.needsAttention;
  const healthBadge = document.getElementById("health-badge");

  document.getElementById("dashboard-name").textContent = state.profile.name || "-";
  document.getElementById("dashboard-goal").textContent = translateValue("goal", state.profile.goal);
  document.getElementById("dashboard-location").textContent = translateValue("location", state.profile.location);
  document.getElementById("monthly-surplus").textContent = money(metrics.monthlySurplus);
  document.getElementById("emergency-runway").textContent = `${metrics.emergencyMonths.toFixed(1)} ${text.months}`;
  document.getElementById("recommended-sip").textContent = money(sip);
  document.getElementById("health-score").textContent = `${metrics.score}/100`;

  healthBadge.textContent = healthLabel;
  healthBadge.className = `pill ${metrics.score >= 65 ? "success" : "alert"}`;

  document.getElementById("surplus-caption").textContent =
    state.language === "hi"
      ? metrics.monthlySurplus >= 20000
        ? "निवेश और सुरक्षा के लिए अच्छा अतिरिक्त पैसा उपलब्ध है।"
        : "मासिक बचत कम है। जोखिम बढ़ाने से पहले खर्च नियंत्रित करें।"
      : metrics.monthlySurplus >= 20000
        ? "Healthy room for investing and safety buffer."
        : "Tight surplus. Control spending before increasing risk.";

  document.getElementById("runway-caption").textContent =
    state.language === "hi"
      ? metrics.emergencyMonths >= 6
        ? "आपका नकद सुरक्षा कुशन बेहतर स्थिति में है।"
        : "बेहतर स्थिरता के लिए कम से कम 6 महीने का फंड रखें।"
      : metrics.emergencyMonths >= 6
        ? "Your cash cushion is in a safer range."
        : "Aim for at least 6 months for better stability.";

  document.getElementById("sip-caption").textContent =
    state.language === "hi"
      ? `यह आपकी ${translateValue("risk", state.profile.risk)} जोखिम प्रोफ़ाइल के अनुसार है।`
      : `Aligned to a ${state.profile.risk.toLowerCase()}-risk plan.`;

  document.getElementById("health-caption").textContent =
    state.language === "hi"
      ? `मुख्य फोकस: ${translateValue("goal", state.profile.goal)}।`
      : `Primary focus: ${state.profile.goal}.`;

  document.getElementById("scheme-goal").value = state.profile.goal;
}

function getPlanSuggestions(planType, monthlyInvestment, monthlySurplus) {
  const affordable = monthlyInvestment <= monthlySurplus * 0.6;
  const isHindi = state.language === "hi";

  if (planType === "Trip") {
    return isHindi
      ? {
          mix: "70% आवर्ती बचत / 30% लिक्विड फंड",
          readiness: affordable ? "यदि आप हर महीने लगातार बचत करें तो यह यात्रा योजना संभव दिखती है।" : "इस यात्रा बजट के लिए अधिक समय या कम लागत की जरूरत हो सकती है।",
          action: "यात्रा के लिए अलग बचत खाता बनाएँ और हर महीने ऑटो-सेव करें।",
          priority: "जीवनशैली प्राथमिकता",
          suggestion: "यदि मासिक नकदी प्रवाह कम है तो यात्रा के लिए क्रेडिट कार्ड कर्ज से बचें।",
        }
      : {
          mix: "70% Recurring Savings / 30% Liquid Fund",
          readiness: affordable ? "Your trip plan looks achievable if you save consistently each month." : "This trip budget may need a longer timeline or lower target cost.",
          action: "Create a separate travel bucket and auto-save into it every month.",
          priority: "Lifestyle priority",
          suggestion: "Avoid using credit card debt for travel if monthly cash flow is tight.",
        };
  }

  if (planType === "Emergency Fund") {
    return isHindi
      ? {
          mix: "80% बचत / 20% लिक्विड फंड",
          readiness: affordable ? "आप बिना मासिक दबाव बढ़ाए इमरजेंसी फंड बना सकते हैं।" : "दूसरे लक्ष्यों से पहले इसे छोटे चरणों में बनाइए।",
          action: "इस पैसे को पूरी तरह तरल और आसानी से उपलब्ध रखें।",
          priority: "उच्च प्राथमिकता",
          suggestion: "आक्रामक निवेश से पहले इमरजेंसी रिजर्व पूरा करें।",
        }
      : {
          mix: "80% Savings / 20% Liquid Fund",
          readiness: affordable ? "You can build your emergency fund steadily without stressing monthly cash flow." : "Build this in smaller phases before funding less urgent goals.",
          action: "Keep this money highly liquid and easy to access.",
          priority: "High priority",
          suggestion: "Complete emergency reserves before aggressive long-term investing.",
        };
  }

  if (planType === "Education") {
    return isHindi
      ? {
          mix: "50% इक्विटी / 30% डेट / 20% लिक्विड",
          readiness: affordable ? "अनुशासित योजना के साथ आपका शिक्षा लक्ष्य व्यावहारिक है।" : "समय सीमा बढ़ाने या स्कॉलरशिप व शिक्षा ऋण जैसे विकल्पों पर सावधानी से विचार करें।",
          action: "इस लक्ष्य को सालाना हिस्सों में बाँटें और फीस महंगाई की समीक्षा करते रहें।",
          priority: "लक्ष्य प्राथमिकता",
          suggestion: "डेडलाइन पास आते ही फंड का कुछ हिस्सा सुरक्षित साधनों में रखें।",
        }
      : {
          mix: "50% Equity / 30% Debt / 20% Liquid",
          readiness: affordable ? "Your education target is realistic with disciplined planning." : "Consider extending the timeline or combining savings with scholarship or loan options carefully.",
          action: "Split this goal into yearly milestones and review fees inflation regularly.",
          priority: "Goal priority",
          suggestion: "Keep part of the corpus in safer instruments as the deadline comes closer.",
        };
  }

  if (planType === "Gadget Purchase") {
    return isHindi
      ? {
          mix: "100% बचत योजना",
          readiness: affordable ? "अगर आप हर महीने बचत करें तो यह खरीद संभव है और जल्दबाजी से बचेंगे।" : "वित्तीय स्थिरता बनाए रखने के लिए लक्ष्य घटाएँ या खरीद टालें।",
          action: "इस लक्ष्य के लिए लंबी अवधि निवेश की जगह अल्पकालिक बचत का उपयोग करें।",
          priority: "कम से मध्यम प्राथमिकता",
          suggestion: "गैजेट खरीद के लिए इमरजेंसी बचत न तोड़ें।",
        }
      : {
          mix: "100% Savings Plan",
          readiness: affordable ? "This purchase looks manageable if you save monthly instead of buying impulsively." : "Try a lower target or delay the purchase to protect financial stability.",
          action: "Use a short-term savings bucket instead of long-term investments for this goal.",
          priority: "Low to medium priority",
          suggestion: "Do not break emergency savings for a gadget purchase.",
        };
  }

  if (planType === "Big Expense") {
    return isHindi
      ? {
          mix: "60% आवर्ती बचत / 40% डेट या लिक्विड",
          readiness: affordable ? "यह खर्च संगठित मासिक बचत से संभाला जा सकता है।" : "यह नकदी प्रवाह पर दबाव डाल सकता है, इसलिए खर्च को चरणों में बाँटें या लक्ष्य घटाएँ।",
          action: "यदि जरूरी न हो तो पूरे खर्च को एक साथ चुकाने से बचें।",
          priority: "मध्यम प्राथमिकता",
          suggestion: "लंबी अवधि निवेश घटाने से पहले जाँचें कि यह लक्ष्य वास्तव में कितना जरूरी है।",
        }
      : {
          mix: "60% Recurring Savings / 40% Debt or Liquid",
          readiness: affordable ? "This expense can be planned with structured monthly saving." : "This may put pressure on cash flow, so phase the expense or reduce target value.",
          action: "Break the expense into milestones and avoid paying for all of it at once if unnecessary.",
          priority: "Medium priority",
          suggestion: "Check whether this goal is essential before reducing long-term investment contributions.",
        };
  }

  return isHindi
    ? {
        mix: getAllocation(state.profile.risk, "hi"),
        readiness: affordable ? `${translateValue("planType", planType)} की योजना अनुशासित मासिक निवेश से संभव लगती है।` : `${translateValue("planType", planType)} लक्ष्य के लिए अधिक समय या अधिक बचत की जरूरत हो सकती है।`,
        action: "मासिक SIP से शुरुआत करें और हर तिमाही प्रगति देखें।",
        priority: "मध्यम प्राथमिकता",
        suggestion: "इस लक्ष्य के लिए इमरजेंसी बचत कम करने से बचें।",
      }
    : {
        mix: getAllocation(state.profile.risk, "en"),
        readiness: affordable ? `Your ${planType.toLowerCase()} plan is realistic with disciplined monthly investing.` : `Your ${planType.toLowerCase()} plan may need a longer timeline or higher savings rate.`,
        action: "Start with a monthly SIP and review progress every quarter.",
        priority: "Medium priority",
        suggestion: "Avoid reducing emergency savings while funding this goal.",
      };
}

function calculatePlan() {
  const planType = document.getElementById("plan-type").value;
  const target = Number(document.getElementById("target-amount").value);
  const years = Number(document.getElementById("timeline-years").value);
  const annualReturn = state.profile.risk === "Low" ? 0.08 : state.profile.risk === "High" ? 0.14 : 0.11;
  const monthlyRate = annualReturn / 12;
  const months = years * 12;
  const monthlySurplus = getHealthMetrics(state.profile).monthlySurplus;
  const monthlyInvestment = monthlyRate === 0 ? target / months : (target * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);

  document.getElementById("required-investment").textContent = money(monthlyInvestment);
  const planDetails = getPlanSuggestions(planType, monthlyInvestment, monthlySurplus);

  document.getElementById("suggested-mix").textContent = planDetails.mix;
  document.getElementById("readiness-message").textContent = planDetails.readiness;
  document.getElementById("planner-action").textContent = planDetails.action;
  document.getElementById("planner-priority").textContent = planDetails.priority;
  document.getElementById("planner-suggestion").textContent = planDetails.suggestion;
}

function renderSchemes() {
  const matchedPrefix = state.language === "hi" ? `${translateValue("location", state.profile.location)} • ${translateValue("schemeGoal", state.schemePreference.goal)} के लिए उपयुक्त` : `Matched for ${state.profile.location} • ${state.schemePreference.goal}`;
  const taxBenefitText = state.language === "hi" ? "टैक्स लाभ" : "Tax Benefit";

  const eligibleSchemes = schemeCatalog
    .filter((scheme) => scheme.eligibility(state.profile, state.schemePreference))
    .filter((scheme) => state.schemePreference.gender === "Any" ? true : scheme.genders.includes(state.schemePreference.gender))
    .map((scheme) => {
      let score = 0;
      if (scheme.goals.includes(state.schemePreference.goal)) score += 2;
      if (scheme.occupations.includes(state.schemePreference.occupation)) score += 2;
      if (state.schemePreference.gender !== "Any" && scheme.genders.includes(state.schemePreference.gender)) score += 1;
      if (state.schemePreference.taxPreference === "Tax Free" && scheme.taxBenefit) score += 2;
      if (state.schemePreference.taxPreference === "No Tax Preference" && !scheme.taxBenefit) score += 1;
      if (scheme.goals.includes(state.profile.goal)) score += 1;
      return { ...scheme, score };
    })
    .sort((a, b) => b.score - a.score);

  schemeResults.innerHTML = eligibleSchemes
    .map((scheme) => `
      <article class="scheme-item">
        <span>${matchedPrefix}</span>
        <strong>${state.language === "hi" ? scheme.nameHi : scheme.nameEn}</strong>
        <p>${state.language === "hi" ? scheme.summaryHi : scheme.summaryEn}</p>
        <div class="tag">${state.language === "hi" ? scheme.tagHi : scheme.tagEn}${scheme.taxBenefit ? ` • ${taxBenefitText}` : ""}</div>
      </article>
    `)
    .join("");
}
function getQuestionSet() {
  return adviserQuestions[state.adviserMode];
}

function renderQuestionList() {
  const languageKey = state.language === "hi" ? "hi" : "en";
  questionList.innerHTML = getQuestionSet()
    .map((question) => `
      <button class="question-chip" type="button" data-question-key="${question.key}">
        ${question[languageKey]}
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-question-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = getQuestionSet().find((item) => item.key === button.dataset.questionKey);
      if (!question) return;

      const visibleText = question[state.language === "hi" ? "hi" : "en"];
      const answer = respondToQuestion(question.key, visibleText);
      appendChatMessage(visibleText, "user");
      appendChatMessage(answer, "ai");
    });
  });
}

function appendChatMessage(text, type) {
  const bubble = document.createElement("article");
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatThread.appendChild(bubble);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function buildAnswers(questionKey, questionText) {
  const { monthlySurplus, emergencyMonths } = getHealthMetrics(state.profile);
  const riskText = translateValue("risk", state.profile.risk);
  const goalText = translateValue("goal", state.profile.goal);

  const answers = {
    en: {
      riskTolerance: `For your question "${questionText}", your ${state.profile.risk.toLowerCase()} risk profile suggests you should invest only the money you can leave untouched for years. Keep essential savings and emergency funds out of high-volatility assets.`,
      volatileMarkets: `For your question "${questionText}", the best approach is usually disciplined investing through SIPs instead of trying to time the market. This spreads your buying over time and reduces emotional decisions.`,
      diversification: `For your question "${questionText}", diversification means spreading money across different asset types instead of depending on one investment. For your profile, a mix like ${getAllocation(state.profile.risk, "en")} is a practical starting point.`,
      startInvesting: `For your question "${questionText}", you do not need a very large amount to begin. Even a small start like ${money(Math.max(1000, Math.round(monthlySurplus * 0.1)))} per month can help you build the habit.`,
      fees: `For your question "${questionText}", fees reduce your net return over time, so lower-cost funds usually leave more growth in your hands. Always compare cost before choosing a product.`,
      sellInvestments: `For your question "${questionText}", sell when the investment no longer matches your goal, timeline, or risk capacity, not just because prices move suddenly.`,
      savePercent: `For your question "${questionText}", aiming to save or invest around 20% to 30% of income is a strong benchmark. Your current monthly surplus is ${money(monthlySurplus)}.`,
      savedByAge: `For your question "${questionText}", a useful early milestone is to build several months of expenses as savings. Right now your savings cover about ${emergencyMonths.toFixed(1)} months.`,
      emergencyFund: emergencyMonths >= 6 ? `For your question "${questionText}", your emergency reserve is in a safer range. You can now split new savings between investing and liquidity.` : `For your question "${questionText}", build your emergency fund first until you reach about 6 months of expenses, then increase long-term investments.`,
      saveWithDebt: `For your question "${questionText}", start by automating a small savings amount first and keep fixed expenses under control. Protect a basic emergency buffer even while paying rent or debt.`,
      savingVsInvesting: `For your question "${questionText}", saving is mainly for safety and short-term needs, while investing is for long-term growth. Saving protects money, investing grows money over time.`,
      goals: `For your question "${questionText}", short-term goals usually need safer and more liquid options, while long-term goals can take more equity exposure. Your current main goal is ${state.profile.goal.toLowerCase()}.`,
      growthDriver: `For your question "${questionText}", an investment grows through business earnings, price appreciation, interest, or a combination of these. You should understand that growth driver before investing.`,
      trackRecord: `For your question "${questionText}", historical performance helps you judge consistency, but it should not be the only reason to invest. Look at performance together with risk, cost, and fit.`,
      taxAdvantages: `For your question "${questionText}", tax benefits can improve returns, but they should support your plan rather than drive it completely. The investment still needs to fit your risk profile and time horizon.`,
      loanForStocks: `For your question "${questionText}", taking loans to invest in stocks is usually too risky for most people, especially early in their journey.`,
      crypto: `For your question "${questionText}", cryptocurrency should only be considered as a very small optional part of a portfolio, if at all. It should never replace emergency savings or your core plan.`,
      fallback: `For your question "${questionText}", focus on three priorities: control cash flow, maintain liquidity, and invest consistently toward ${state.profile.goal.toLowerCase()}.`,
    },
    hi: {
      riskTolerance: `"${questionText}" के लिए, आपकी ${riskText} जोखिम प्रोफ़ाइल बताती है कि आपको वही पैसा निवेश करना चाहिए जिसे आप कई सालों तक बिना छुए छोड़ सकते हैं। ज़रूरी बचत और इमरजेंसी फंड को अधिक उतार-चढ़ाव वाले निवेश से अलग रखें।`,
      volatileMarkets: `"${questionText}" के लिए, अस्थिर बाजार में SIP जैसी नियमित निवेश पद्धति बेहतर रहती है। इससे एक ही समय पर पूरा पैसा लगाने का जोखिम कम होता है।`,
      diversification: `"${questionText}" के लिए, डाइवर्सिफिकेशन का मतलब है पैसा अलग-अलग एसेट में बाँटना। आपकी प्रोफ़ाइल के लिए ${getAllocation(state.profile.risk, "hi")} जैसा मिश्रण एक व्यावहारिक शुरुआत हो सकती है।`,
      startInvesting: `"${questionText}" के लिए, निवेश शुरू करने के लिए बहुत बड़ी रकम की जरूरत नहीं होती। ${money(Math.max(1000, Math.round(monthlySurplus * 0.1)))} जैसी छोटी मासिक शुरुआत भी अच्छी आदत बना सकती है।`,
      fees: `"${questionText}" के लिए, फीस और एक्सपेंस रेशियो समय के साथ आपके नेट रिटर्न को कम करते हैं। इसलिए कम लागत वाले विकल्पों की तुलना करना जरूरी है।`,
      sellInvestments: `"${questionText}" के लिए, निवेश तब बेचें जब वह आपके लक्ष्य, समय सीमा या जोखिम क्षमता से मेल न खाए, केवल बाजार गिरने पर नहीं।`,
      savePercent: `"${questionText}" के लिए, आय का लगभग 20% से 30% बचाना या निवेश करना एक मजबूत लक्ष्य माना जाता है। आपका वर्तमान मासिक शेष ${money(monthlySurplus)} है।`,
      savedByAge: `"${questionText}" के लिए, शुरुआती लक्ष्य के रूप में कई महीनों के खर्च जितनी बचत बनाना अच्छा रहता है। अभी आपकी बचत लगभग ${emergencyMonths.toFixed(1)} महीने के खर्च के बराबर है।`,
      emergencyFund: emergencyMonths >= 6 ? `"${questionText}" के लिए, आपका इमरजेंसी फंड अपेक्षाकृत सुरक्षित स्तर पर है। अब आप नई बचत को निवेश और तरलता में बाँट सकते हैं।` : `"${questionText}" के लिए, पहले लगभग 6 महीने के खर्च जितना इमरजेंसी फंड बनाइए, फिर लंबी अवधि के निवेश बढ़ाइए।`,
      saveWithDebt: `"${questionText}" के लिए, सबसे पहले छोटी ऑटोमेटेड बचत शुरू करें और फिक्स्ड खर्च नियंत्रित रखें। किराया या कर्ज चुकाते समय भी एक बेसिक इमरजेंसी बफर बनाएँ।`,
      savingVsInvesting: `"${questionText}" के लिए, बचत मुख्य रूप से सुरक्षा और छोटे लक्ष्यों के लिए होती है, जबकि निवेश लंबी अवधि की वृद्धि के लिए होता है।`,
      goals: `"${questionText}" के लिए, अल्पकालिक लक्ष्यों के लिए सुरक्षित और तरल विकल्प बेहतर होते हैं, जबकि दीर्घकालिक लक्ष्यों में अधिक इक्विटी ली जा सकती है। आपका मुख्य लक्ष्य अभी ${goalText} है।`,
      growthDriver: `"${questionText}" के लिए, निवेश से पैसा व्यवसाय की कमाई, कीमत बढ़ने, ब्याज या इनके संयोजन से बनता है। निवेश से पहले यह समझना जरूरी है कि वृद्धि कहाँ से आएगी।`,
      trackRecord: `"${questionText}" के लिए, पिछला प्रदर्शन स्थिरता समझने में मदद करता है, लेकिन केवल उसी आधार पर निर्णय नहीं लेना चाहिए। जोखिम, लागत और लक्ष्य से मेल भी देखें।`,
      taxAdvantages: `"${questionText}" के लिए, टैक्स लाभ रिटर्न बेहतर बना सकते हैं, लेकिन केवल टैक्स बचत के आधार पर निवेश चुनना सही नहीं है।`,
      loanForStocks: `"${questionText}" के लिए, शेयरों में निवेश करने के लिए कर्ज लेना अधिकतर लोगों के लिए बहुत जोखिम भरा होता है, खासकर शुरुआत में।`,
      crypto: `"${questionText}" के लिए, क्रिप्टोकरेंसी को केवल बहुत छोटे वैकल्पिक हिस्से के रूप में ही देखें। यह इमरजेंसी फंड या मुख्य निवेश योजना की जगह नहीं ले सकती।`,
      fallback: `"${questionText}" के लिए, तीन बातों पर ध्यान दें: नकदी प्रवाह संभालें, तरलता बनाए रखें, और ${goalText} के लिए नियमित निवेश करें।`,
    },
  };

  return answers[state.language][questionKey] || answers[state.language].fallback;
}

function findQuestionByText(input) {
  const normalized = input.trim().toLowerCase();
  const allQuestions = Object.values(adviserQuestions).flat();
  return allQuestions.find((item) => item.en.toLowerCase() === normalized || item.hi.toLowerCase() === normalized);
}

function respondToQuestion(questionKey, questionText) {
  return buildAnswers(questionKey, questionText);
}

function syncFormWithState() {
  document.getElementById("name").value = state.profile.name;
  document.getElementById("age").value = state.profile.age || "";
  document.getElementById("income").value = state.profile.income || "";
  document.getElementById("expenses").value = state.profile.expenses || "";
  document.getElementById("savings").value = state.profile.savings || "";
  document.getElementById("location").value = state.profile.location;
  document.getElementById("risk").value = state.profile.risk;
  document.getElementById("goal").value = state.profile.goal;
  document.getElementById("scheme-goal").value = state.schemePreference.goal;
  document.getElementById("scheme-occupation").value = state.schemePreference.occupation;
  document.getElementById("scheme-gender").value = state.schemePreference.gender;
  document.getElementById("scheme-tax").value = state.schemePreference.taxPreference;
  languageSelect.value = state.language;
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.profile = getProfileFromForm();
  state.profileCompleted = true;
  renderDashboard();
  calculatePlan();
  renderSchemes();
  updateAccessState();
  appendChatMessage(uiText[state.language].profileCreated(state.profile), "ai");
  setScreen("dashboard-screen");
});

planButton.addEventListener("click", calculatePlan);

askButton.addEventListener("click", () => {
  const questionText = chatInput.value.trim();
  if (!questionText) return;

  const matchedQuestion = findQuestionByText(questionText);
  appendChatMessage(questionText, "user");
  chatInput.value = "";

  if (matchedQuestion) {
    appendChatMessage(respondToQuestion(matchedQuestion.key, questionText), "ai");
    return;
  }

  const fallbackText = state.language === "hi" ? `"${questionText}" के लिए, कृपया चुने गए मोड के भीतर मौजूद सवाल पूछें ताकि सलाह अधिक सटीक रहे।` : `For "${questionText}", please ask within the selected mode so the guidance stays focused.`;
  appendChatMessage(fallbackText, "ai");
});

schemeButton.addEventListener("click", () => {
  state.schemePreference = getSchemePreferenceFromForm();
  renderSchemes();
});

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    askButton.click();
  }
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.adviserMode = button.dataset.mode;
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderQuestionList();
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.screenTarget);
  });
});

languageSelect.addEventListener("change", () => {
  state.language = languageSelect.value;
  applyTranslations();
  resetChatThread();
  renderQuestionList();
  renderDashboard();
  calculatePlan();
  renderSchemes();
  setScreen(state.currentScreen);
});

syncFormWithState();
applyTranslations();
resetChatThread();
renderDashboard();
calculatePlan();
renderSchemes();
renderQuestionList();
updateAccessState();
setScreen("profile-screen");
