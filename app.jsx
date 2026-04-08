const { useMemo, useState } = React;

const initialProfile = {
  name: "Aarav Sharma",
  age: 24,
  income: 65000,
  expenses: 38000,
  savings: 180000,
  location: "Maharashtra",
  risk: "Moderate",
  goal: "Emergency Fund",
};

const locations = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "West Bengal"];
const riskOptions = ["Low", "Moderate", "High"];
const goalOptions = [
  "Emergency Fund",
  "Home Down Payment",
  "Higher Education",
  "Retirement",
  "Travel Fund",
];

const schemeCatalog = [
  {
    name: "Atal Pension Yojana",
    eligibility: (profile) => profile.age >= 18 && profile.age <= 40,
    summary: "Pension-focused scheme for long-term retirement discipline.",
    tag: "Retirement",
  },
  {
    name: "Pradhan Mantri Jan Dhan Yojana",
    eligibility: () => true,
    summary: "Basic banking access with insurance and financial inclusion benefits.",
    tag: "Banking Access",
  },
  {
    name: "National Pension System",
    eligibility: (profile) => profile.age >= 18 && profile.age <= 70,
    summary: "Tax-efficient retirement investing with equity and debt options.",
    tag: "Tax + Retirement",
  },
  {
    name: "Sukanya Samriddhi Yojana",
    eligibility: (profile) => profile.age <= 50,
    summary: "Long-term savings option for family-focused financial planning.",
    tag: "Family Planning",
  },
  {
    name: "PM SVANidhi",
    eligibility: (profile) => profile.income < 50000,
    summary: "Micro-credit support for eligible street vendors and informal earners.",
    tag: "Small Business",
  },
  {
    name: "Public Provident Fund",
    eligibility: () => true,
    summary: "Low-risk compounding product with tax benefits and long-term stability.",
    tag: "Low Risk",
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
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

  return {
    monthlySurplus,
    savingsRate,
    emergencyMonths,
    score: Math.min(Math.round(score), 100),
  };
}

function getRecommendedSip(profile, metrics) {
  const base = metrics.monthlySurplus * 0.45;
  if (profile.risk === "Low") return base * 0.8;
  if (profile.risk === "High") return base * 1.1;
  return base;
}

function getAllocation(risk) {
  if (risk === "Low") return "25% Equity / 50% Debt / 25% Liquid";
  if (risk === "High") return "75% Equity / 15% Debt / 10% Liquid";
  return "60% Equity / 25% Debt / 15% Liquid";
}

function calculatePlan(profile, target, years) {
  const annualReturn = profile.risk === "Low" ? 0.08 : profile.risk === "High" ? 0.14 : 0.11;
  const monthlyRate = annualReturn / 12;
  const months = years * 12;
  const monthlyInvestment =
    monthlyRate === 0
      ? target / months
      : (target * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);

  const surplus = getHealthMetrics(profile).monthlySurplus;

  return {
    monthlyInvestment,
    allocation: getAllocation(profile.risk),
    readiness:
      monthlyInvestment <= surplus * 0.6
        ? `Your ${profile.goal.toLowerCase()} target looks realistic with disciplined monthly investing.`
        : `Your ${profile.goal.toLowerCase()} target may need a longer timeline or a higher savings rate.`,
  };
}

function getNotifications(profile) {
  const metrics = getHealthMetrics(profile);
  const notices = [];

  if (metrics.emergencyMonths < 6) {
    notices.push({
      type: "warning",
      title: "Strengthen emergency fund",
      body: "Your savings cover less than 6 months of expenses. Build a stronger liquid cushion before increasing risk.",
      tag: "Risk Alert",
    });
  }

  if (metrics.savingsRate >= 0.2) {
    notices.push({
      type: "good",
      title: "You are saving at a healthy pace",
      body: "Your current surplus supports automated investing. A standing SIP can reduce missed months.",
      tag: "Growth Signal",
    });
  }

  notices.push({
    type: "default",
    title: `Goal pulse: ${profile.goal}`,
    body: "Review your target every month and step up contributions whenever your income increases.",
    tag: "Goal Update",
  });

  if (profile.expenses / Math.max(profile.income, 1) > 0.7) {
    notices.push({
      type: "warning",
      title: "Overspending watch",
      body: "Expenses are above 70% of income. Tighten discretionary spending before adding aggressive investments.",
      tag: "Budget Watch",
    });
  }

  return notices;
}

function buildAdvisorReply(question, profile) {
  const lower = question.toLowerCase();
  const metrics = getHealthMetrics(profile);

  if (lower.includes("sip") || lower.includes("mutual fund")) {
    return `A practical SIP starting point is ${formatCurrency(
      getRecommendedSip(profile, metrics)
    )} per month, using ${getAllocation(profile.risk)} for your current risk profile.`;
  }

  if (lower.includes("emergency")) {
    return metrics.emergencyMonths >= 6
      ? "Your emergency fund is in a safer range now. You can split fresh savings between investing and liquidity."
      : "Build your emergency fund first until you cover around 6 months of expenses, then scale up long-term investing.";
  }

  if (lower.includes("scheme") || lower.includes("government")) {
    return `The strongest matches in your profile are ${schemeCatalog
      .filter((scheme) => scheme.eligibility(profile))
      .slice(0, 3)
      .map((scheme) => scheme.name)
      .join(", ")}.`;
  }

  if (lower.includes("save") || lower.includes("budget")) {
    return `Your current monthly surplus is ${formatCurrency(
      metrics.monthlySurplus
    )}. Protect that by keeping expenses below 70% of income and automating savings first.`;
  }

  return `For your current profile, focus on three priorities: protect cash flow, keep a strong emergency reserve, and invest consistently toward ${profile.goal.toLowerCase()}.`;
}

function SectionHeading({ kicker, title, badge, badgeClassName = "pill" }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <span className={badgeClassName}>{badge}</span>
    </div>
  );
}

function Hero({ metrics, goalProgress, alertsCount }) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="eyebrow">AI Financial Copilot</p>
        <h1>Build wealth with clear guidance, not guesswork.</h1>
        <p className="hero-text">
          FinMate AI combines planning, investing guidance, government scheme discovery,
          and proactive notifications in one intelligent workspace.
        </p>
      </div>

      <div className="hero-card">
        <p className="hero-card-label">Today</p>
        <div className="hero-card-grid">
          <div>
            <span>Financial Health</span>
            <strong>{metrics.score}</strong>
          </div>
          <div>
            <span>Monthly Savings</span>
            <strong>{Math.round(metrics.savingsRate * 100)}%</strong>
          </div>
          <div>
            <span>Goal Completion</span>
            <strong>{goalProgress}%</strong>
          </div>
          <div>
            <span>Live Alerts</span>
            <strong>{alertsCount}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProfileForm({ draftProfile, onChange, onSubmit }) {
  return (
    <section className="panel">
      <SectionHeading kicker="Onboarding" title="Your financial profile" badge="Step 1" />

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Full name
          <input
            type="text"
            value={draftProfile.name}
            onChange={(event) => onChange("name", event.target.value)}
            placeholder="Aarav Sharma"
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            min="18"
            max="80"
            value={draftProfile.age}
            onChange={(event) => onChange("age", Number(event.target.value))}
            required
          />
        </label>

        <label>
          Monthly income (INR)
          <input
            type="number"
            min="0"
            value={draftProfile.income}
            onChange={(event) => onChange("income", Number(event.target.value))}
            required
          />
        </label>

        <label>
          Monthly expenses (INR)
          <input
            type="number"
            min="0"
            value={draftProfile.expenses}
            onChange={(event) => onChange("expenses", Number(event.target.value))}
            required
          />
        </label>

        <label>
          Current savings (INR)
          <input
            type="number"
            min="0"
            value={draftProfile.savings}
            onChange={(event) => onChange("savings", Number(event.target.value))}
            required
          />
        </label>

        <label>
          Location
          <select value={draftProfile.location} onChange={(event) => onChange("location", event.target.value)}>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label>
          Risk appetite
          <select value={draftProfile.risk} onChange={(event) => onChange("risk", event.target.value)}>
            {riskOptions.map((risk) => (
              <option key={risk} value={risk}>
                {risk}
              </option>
            ))}
          </select>
        </label>

        <label>
          Primary goal
          <select value={draftProfile.goal} onChange={(event) => onChange("goal", event.target.value)}>
            {goalOptions.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit">
          Generate profile
        </button>
      </form>
    </section>
  );
}

function Dashboard({ profile }) {
  const metrics = useMemo(() => getHealthMetrics(profile), [profile]);
  const recommendedSip = useMemo(() => getRecommendedSip(profile, metrics), [profile, metrics]);
  const healthLabel =
    metrics.score >= 80 ? "Strong" : metrics.score >= 65 ? "Stable" : "Needs attention";

  return (
    <div className="panel">
      <SectionHeading
        kicker="Dashboard"
        title="Financial health snapshot"
        badge={healthLabel}
        badgeClassName={`pill ${metrics.score >= 65 ? "success" : "alert"}`}
      />

      <div className="metrics-grid">
        <article className="metric-card">
          <span>Monthly surplus</span>
          <strong>{formatCurrency(metrics.monthlySurplus)}</strong>
          <p>
            {metrics.monthlySurplus >= 20000
              ? "Healthy room for investing and safety buffer."
              : "Tight surplus. Control spending before increasing risk."}
          </p>
        </article>

        <article className="metric-card">
          <span>Emergency runway</span>
          <strong>{metrics.emergencyMonths.toFixed(1)} months</strong>
          <p>
            {metrics.emergencyMonths >= 6
              ? "Your cash cushion is in a safer range."
              : "Aim for at least 6 months for better stability."}
          </p>
        </article>

        <article className="metric-card">
          <span>Recommended SIP</span>
          <strong>{formatCurrency(recommendedSip)}</strong>
          <p>Aligned to a {profile.risk.toLowerCase()}-risk plan.</p>
        </article>

        <article className="metric-card">
          <span>Health score</span>
          <strong>{metrics.score}/100</strong>
          <p>Primary focus: {profile.goal}.</p>
        </article>
      </div>
    </div>
  );
}

function GoalPlanner({ profile }) {
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [timelineYears, setTimelineYears] = useState(5);

  const plan = useMemo(
    () => calculatePlan(profile, Number(targetAmount), Number(timelineYears)),
    [profile, targetAmount, timelineYears]
  );

  return (
    <div className="panel">
      <SectionHeading kicker="Goal Planner" title="Goal-based investment plan" badge="Step 2" />

      <div className="planner-grid">
        <label>
          Target amount (INR)
          <input
            type="number"
            min="10000"
            value={targetAmount}
            onChange={(event) => setTargetAmount(event.target.value)}
          />
        </label>

        <label>
          Timeline (years)
          <input
            type="number"
            min="1"
            max="40"
            value={timelineYears}
            onChange={(event) => setTimelineYears(event.target.value)}
          />
        </label>

        <button className="secondary-button" type="button">
          Live calculation
        </button>
      </div>

      <div className="planner-results">
        <article>
          <span>Required monthly investment</span>
          <strong>{formatCurrency(plan.monthlyInvestment)}</strong>
        </article>
        <article>
          <span>Suggested mix</span>
          <strong>{plan.allocation}</strong>
        </article>
        <article>
          <span>Expected corpus readiness</span>
          <strong>{plan.readiness}</strong>
        </article>
      </div>
    </div>
  );
}

function Advisor({ profile }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Based on your current profile, prioritize emergency reserves, then start systematic investing toward your main goal.",
    },
  ]);

  function handleAsk() {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { type: "user", text: trimmed },
      { type: "ai", text: buildAdvisorReply(trimmed, profile) },
    ]);
    setQuestion("");
  }

  return (
    <section className="panel advisor-panel">
      <SectionHeading kicker="AI Advisor" title="Ask a financial question" badge="Step 3" />

      <div className="chat-thread">
        {messages.map((message, index) => (
          <article key={`${message.type}-${index}`} className={`chat-bubble ${message.type}`}>
            {message.text}
          </article>
        ))}
      </div>

      <div className="chat-actions">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAsk();
            }
          }}
          placeholder="Should I start SIPs or build my emergency fund first?"
        />
        <button className="primary-button" type="button" onClick={handleAsk}>
          Ask FinMate
        </button>
      </div>
    </section>
  );
}

function SchemeFinder({ profile }) {
  const schemes = useMemo(
    () => schemeCatalog.filter((scheme) => scheme.eligibility(profile)),
    [profile]
  );

  return (
    <section className="panel schemes-panel">
      <SectionHeading
        kicker="Scheme Finder"
        title="Government schemes you may qualify for"
        badge="Step 4"
      />

      <div className="scheme-list">
        {schemes.map((scheme) => (
          <article key={scheme.name} className="scheme-item">
            <span>Recommended for {profile.location}</span>
            <strong>{scheme.name}</strong>
            <p>{scheme.summary}</p>
            <div className="tag">{scheme.tag}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Notifications({ profile }) {
  const notifications = useMemo(() => getNotifications(profile), [profile]);

  return (
    <section className="panel notifications-panel">
      <SectionHeading
        kicker="Smart Notifications"
        title="Proactive guidance"
        badge="Live"
        badgeClassName="pill alert"
      />

      <div className="notification-list">
        {notifications.map((item) => (
          <article key={item.title} className={`notification-item ${item.type}`}>
            <span>FinMate alert</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <div className="tag">{item.tag}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);

  const metrics = useMemo(() => getHealthMetrics(profile), [profile]);
  const alertsCount = useMemo(() => getNotifications(profile).length, [profile]);
  const goalProgress = Math.min(
    Math.round((profile.savings / Math.max(profile.income * 12, 1)) * 100),
    100
  );

  function updateDraftProfile(field, value) {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleProfileSubmit(event) {
    event.preventDefault();
    setProfile(draftProfile);
  }

  return (
    <div className="app-shell">
      <Hero metrics={metrics} goalProgress={goalProgress} alertsCount={alertsCount} />

      <main className="layout">
        <ProfileForm
          draftProfile={draftProfile}
          onChange={updateDraftProfile}
          onSubmit={handleProfileSubmit}
        />

        <section className="dashboard-stack">
          <Dashboard profile={profile} />
          <GoalPlanner profile={profile} />
        </section>

        <Advisor profile={profile} />
        <SchemeFinder profile={profile} />
        <Notifications profile={profile} />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
