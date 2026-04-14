// ─────────────────────────────────────────────────────────────────────────────
//  AILearn — Complete Machine Learning Curriculum
//  Ordered by REAL ML Workflow: Problem → Data → EDA → Clean → Model → Algos
//  30 Topics | Basic → Advanced | With Code, Math & Real Examples
// ─────────────────────────────────────────────────────────────────────────────

export const topics = [
  {
    id: 'what-is-ml',
    title: 'What is Machine Learning?',
    category: 'Phase 1 — Foundations',
    phase: 1,
    xp: 30,
    duration: '10 min',
    difficulty: 'Beginner',
    videoId: 'ukzFI9rgwfU',
    headerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80',
    tags: ['ML', 'AI', 'Intro'],
    mathFormulas: [
      { name: 'General ML Objective', formula: 'ŷ = f(X; θ)  →  minimize L(y, ŷ)' },
      { name: 'Empirical Risk', formula: 'R(θ) = (1/n) Σ L(yᵢ, f(xᵢ; θ))' },
    ],
    realWorldExample: {
      title: 'Netflix Saves $1 Billion/Year with ML',
      description: 'Netflix recommendation engine analyzes 140M+ subscriber patterns to predict what each user wants to watch. Without ML, they\'d need thousands of human curators. With ML, 80% of content watched is driven by recommendations — saving $1B/year in customer retention.',
      icon: '🎬'
    },
    content: `# What is Machine Learning?

Machine Learning (ML) is a way to teach computers to **learn from examples** instead of following hand-written rules.

## Traditional Programming vs Machine Learning

\`\`\`
Traditional:   Rules + Data    → Answers
Machine Learning: Data + Answers → Rules (learned automatically!)
\`\`\`

**Example:** Email spam detection
- Traditional: Programmer manually writes rules — "if email contains 'FREE MONEY' → spam"
- ML: Show the model 1 million labeled emails → it discovers rules automatically

## Three Main Types

### 1. Supervised Learning
You give the model labeled examples: input → correct output.

| Input (X) | Output (y) |
|-----------|-----------|
| Email text | Spam / Not Spam |
| House size | Price |
| Medical scan | Cancer / No Cancer |
| Photo | Cat / Dog / Car |

### 2. Unsupervised Learning
No labels — the model finds hidden patterns on its own.

\`\`\`
1000 customer records → model discovers 5 natural groups
News articles → model finds topic clusters
\`\`\`

### 3. Reinforcement Learning
Agent learns by trial and error — gets rewards for good actions.

\`\`\`
Game → Play → Win/Lose → Learn → Play Better
\`\`\`

## The ML Workflow (What This Course Teaches)

\`\`\`
Step 1: Define the Problem
Step 2: Collect Data
Step 3: Explore Data (EDA)
Step 4: Clean & Prepare Data
Step 5: Choose & Build Model
Step 6: Train the Model
Step 7: Evaluate Performance
Step 8: Improve (tune, regularize)
Step 9: Deploy
Step 10: Monitor
\`\`\`

## Real-World ML Applications

| Industry | Application | ML Type |
|---------|-------------|---------|
| Healthcare | Tumor detection | Supervised (CNN) |
| Finance | Fraud detection | Supervised |
| Retail | Recommendations | Unsupervised + Supervised |
| Transport | Self-driving | RL + Supervised |
| NLP | ChatGPT, Claude | Supervised + RL |

> "Every time you use Google Search, YouTube, Instagram, or Spotify — you're using ML dozens of times per minute."
`,
    quiz: [
      { q: 'What is Machine Learning?', options: ['Writing rules by hand for every situation', 'Teaching computers to learn patterns from data automatically', 'A type of computer hardware', 'A database management system'], answer: 1 },
      { q: 'Which ML type uses labeled training data?', options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Transfer Learning'], answer: 2 },
      { q: 'In traditional programming, what do you provide to get answers?', options: ['Data and answers', 'Rules and data', 'Only data', 'Only rules'], answer: 1 },
      { q: 'Which ML type would you use to group customers without predefined groups?', options: ['Supervised Learning', 'Reinforcement Learning', 'Unsupervised Learning', 'Transfer Learning'], answer: 2 },
    ],
    codeTemplate: `// ── What is ML? — Simple Demonstration ──
// Traditional rules vs ML approach for spam detection

// ── APPROACH 1: Traditional (Rule-Based) ──
function isSpamTraditional(email) {
  const spamWords = ['free money', 'win a prize', 'click here now', 'limited offer'];
  const text = email.toLowerCase();
  return spamWords.some(word => text.includes(word));
}

// ── APPROACH 2: ML (Learn from examples) ──
// Step 1: Training data (labeled examples)
const trainingEmails = [
  { text: "FREE MONEY click here", label: 1 },   // spam
  { text: "win a prize now", label: 1 },           // spam
  { text: "Meeting at 3pm tomorrow", label: 0 },  // not spam
  { text: "Your invoice is attached", label: 0 }, // not spam
  { text: "LIMITED OFFER expires today", label: 1 },
  { text: "Can we reschedule our call?", label: 0 },
];

// Step 2: Extract feature — ratio of CAPS
function capsRatio(text) {
  const upper = (text.match(/[A-Z]/g) || []).length;
  return upper / text.length;
}

// Step 3: Learn threshold from data
const spamCaps = trainingEmails.filter(e => e.label===1).map(e => capsRatio(e.text));
const hamCaps  = trainingEmails.filter(e => e.label===0).map(e => capsRatio(e.text));
const avg = arr => arr.reduce((a,b)=>a+b,0)/arr.length;
const threshold = (avg(spamCaps) + avg(hamCaps)) / 2;

function isSpamML(email) {
  return capsRatio(email) > threshold ? 1 : 0;
}

// ── Compare both approaches ──
console.log("=== Traditional vs ML Spam Detection ===\\n");
console.log(\`ML learned threshold: \${(threshold*100).toFixed(1)}% caps ratio\\n\`);

const testEmails = [
  "FREE PRIZE CLICK NOW",
  "Hey, are you coming to lunch?",
  "WIN BIG TODAY LIMITED",
  "The report is ready for review",
];

testEmails.forEach(email => {
  const trad = isSpamTraditional(email) ? "SPAM" : "OK";
  const ml   = isSpamML(email) ? "SPAM" : "OK";
  const caps = (capsRatio(email)*100).toFixed(0);
  console.log(\`"\${email.substring(0,30)}..."\`);
  console.log(\`  Traditional: \${trad} | ML: \${ml} | CAPS: \${caps}%\\n\`);
});

console.log("Key insight: ML found the caps-ratio rule automatically from examples!");
console.log("Traditional approach required a human to think of 'spam words' manually.");`
  },
  {
    id: 'problem-definition',
    title: 'Problem Definition & Framing',
    category: 'Phase 2 — Problem Definition',
    phase: 2,
    xp: 35,
    duration: '12 min',
    difficulty: 'Beginner',
    videoId: 'M3quJ8YU2Xc',
    headerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
    tags: ['Problem Framing', 'Business Goals', 'ML Formulation'],
    mathFormulas: [
      { name: 'Classification', formula: 'y ∈ {0, 1, ..., K}  →  predict discrete class' },
      { name: 'Regression', formula: 'y ∈ ℝ  →  predict continuous value' },
    ],
    realWorldExample: {
      title: 'How Uber Frames Their ML Problems',
      description: 'Uber\'s ETA prediction was framed as a regression problem (predict travel time in seconds). Surge pricing uses regression (predict demand). Driver-rider matching uses optimization. Fraud detection uses binary classification. Each business problem has a specific ML formulation — getting this right saves months of wasted engineering effort.',
      icon: '🚗'
    },
    content: `# Problem Definition & Framing

The most important step in any ML project is **defining the problem correctly**. Many failed ML projects fail here — not in the algorithm.

## Step 1: Understand the Business Goal

Before writing any code, ask:
- What **decision** will this model support?
- What happens if the model is **wrong**?
- What is the **cost** of a false positive vs false negative?
- What is the minimum **acceptable performance**?

\`\`\`
Business Goal:         "Reduce customer churn"
ML Goal:               Predict which customers will cancel in next 30 days
Success Metric:        Catch 80% of churners (recall ≥ 0.80)
Cost of FP:            Sending unnecessary discount offer (~$5)
Cost of FN:            Losing a customer (~$500/year)
→ We care much more about FN → prioritize RECALL
\`\`\`

## Step 2: Formulate as ML Task

### Classification — Predict a Category
\`\`\`
Binary:      Is this email spam? (Yes/No)
Multiclass:  What digit is this? (0-9)
Multilabel:  What topics does this article cover? (multiple tags)
\`\`\`

### Regression — Predict a Number
\`\`\`
What will this house sell for?   → $485,000
How many units will we sell?     → 12,400
What will the temperature be?    → 28.5°C
\`\`\`

### Clustering — Group Similar Things
\`\`\`
What natural segments exist in our customers?
Which products are frequently bought together?
\`\`\`

### Ranking / Recommendation
\`\`\`
What should we show this user first?
Which ad is most likely to be clicked?
\`\`\`

## Step 3: Define Inputs & Outputs

\`\`\`
Problem: Predict customer churn

Inputs (X):
  ✓ customer_tenure_months
  ✓ num_support_calls_last_30d
  ✓ monthly_spend
  ✓ last_login_days_ago
  ✓ contract_type (monthly/annual)

Output (y):
  ✓ will_churn_30d (0 or 1)

NOT inputs:
  ✗ customer_id (identifier, not informative)
  ✗ future_data (data leakage!)
  ✗ churn_reason (only known AFTER churn)
\`\`\`

## Step 4: Data Availability Check

\`\`\`
Questions to ask:
  • Do we have historical labeled data?
  • How much data? (100? 10K? 1M?)
  • Is the data fresh enough?
  • Are there privacy/legal restrictions?
  • Is the target variable reliable?
\`\`\`

**Minimum data rules of thumb:**
| Model Complexity | Min Samples Needed |
|-----------------|-------------------|
| Linear models | ~100-1K |
| Decision Trees | ~1K-10K |
| Neural Networks | ~10K-1M |
| Large Language Models | Billions |

## Step 5: Define Success Criteria

\`\`\`
Bad success criteria:     "Model should be accurate"
Good success criteria:    "Model achieves F1 ≥ 0.85 on held-out test set
                           AND prediction latency < 100ms
                           AND model retrained weekly with fresh data"
\`\`\`

## Common Problem Framing Mistakes

| Mistake | Example | Fix |
|---------|---------|-----|
| Data leakage | Using future data as feature | Strictly separate train/test time |
| Wrong metric | Accuracy on fraud (imbalanced) | Use recall/F1/AUC |
| Unclear target | "Predict satisfaction" | Define: survey score ≥ 4 = satisfied |
| Ignoring costs | Treating FP = FN | Quantify business cost of each |

> "A problem well-defined is a problem half-solved." — Charles Kettering
`,
    quiz: [
      { q: 'What should be the FIRST step in any ML project?', options: ['Choosing the algorithm', 'Collecting data', 'Understanding the business goal and defining success criteria', 'Training a baseline model'], answer: 2 },
      { q: 'Predicting house prices is an example of:', options: ['Binary classification', 'Regression', 'Clustering', 'Reinforcement Learning'], answer: 1 },
      { q: 'What is "data leakage" in ML problem framing?', options: ['When training data is too small', 'When future or target-related information is accidentally used as an input feature', 'When data is stored insecurely', 'When the model memorizes training data'], answer: 1 },
      { q: 'If a false negative (missing a cancer case) costs 100× more than a false positive, you should prioritize:', options: ['Accuracy', 'Precision', 'Recall', 'R² score'], answer: 2 },
    ],
    codeTemplate: `// ── Problem Definition Framework ──
// Translating business problems into ML tasks

// ── Business Problem Analysis ──
const problems = [
  {
    business: "We're losing customers and don't know why",
    mlTask: "Binary Classification",
    target: "will_churn_next_30_days (0 or 1)",
    inputs: ["tenure_months", "support_calls", "monthly_spend", "last_login_days"],
    metric: "Recall (minimize missed churners)",
    costFP: 5,   // sending unnecessary discount ($5)
    costFN: 500, // losing customer ($500/year)
    minData: 10000
  },
  {
    business: "Set optimal prices for our hotel rooms",
    mlTask: "Regression",
    target: "optimal_price_usd",
    inputs: ["day_of_week", "season", "events_nearby", "competitor_prices", "occupancy_rate"],
    metric: "RMSE (dollar error)",
    costFP: null,
    costFN: null,
    minData: 5000
  },
  {
    business: "Show users products they'll buy",
    mlTask: "Ranking / Recommendation",
    target: "click_through_rate or purchase probability",
    inputs: ["user_history", "item_features", "context", "time_of_day"],
    metric: "NDCG@10, Precision@5",
    costFP: null,
    costFN: null,
    minData: 100000
  }
];

console.log("=== ML Problem Framing Analysis ===\\n");
problems.forEach((p, i) => {
  console.log(\`Problem \${i+1}:\`);
  console.log(\`  Business Goal: "\${p.business}"\`);
  console.log(\`  ML Task:       \${p.mlTask}\`);
  console.log(\`  Target (y):    \${p.target}\`);
  console.log(\`  Features (X):  \${p.inputs.join(', ')}\`);
  console.log(\`  Success Metric:\${p.metric}\`);
  console.log(\`  Min Data:      \${p.minData.toLocaleString()} samples\`);
  if (p.costFP) {
    const ratio = p.costFN / p.costFP;
    console.log(\`  FP cost: $\${p.costFP} | FN cost: $\${p.costFN} | Ratio: \${ratio}x → PRIORITIZE RECALL\`);
  }
  console.log();
});

// ── Baseline Model Decision Helper ──
function recommendApproach(numSamples, numFeatures, hasLabels, isTimeSeries) {
  console.log("=== ML Approach Recommendation ===");
  console.log(\`  Samples: \${numSamples} | Features: \${numFeatures}\`);
  console.log(\`  Labeled: \${hasLabels} | Time Series: \${isTimeSeries}\`);

  if (!hasLabels) return console.log("  → Unsupervised: K-Means, DBSCAN, PCA");
  if (isTimeSeries) return console.log("  → LSTM, ARIMA, Prophet, or feature-engineered tree model");
  if (numSamples < 1000) return console.log("  → Linear/Logistic Regression, SVM, KNN (small data!)");
  if (numSamples < 100000 && numFeatures < 100) return console.log("  → Random Forest, XGBoost (great for tabular data)");
  if (numFeatures > 10000) return console.log("  → Deep Neural Network, CNN, or Transformer");
  return console.log("  → XGBoost + Neural Network ensemble");
}

recommendApproach(5000, 20, true, false);
recommendApproach(500, 50, true, false);
recommendApproach(1000000, 512, true, false);
recommendApproach(2000, 10, false, false);`
  },

  // ══════════════════════════════════════════════════════════════
  //  PHASE 3: DATA COLLECTION
  // ══════════════════════════════════════════════════════════════

  {
    id: 'data-collection',
    title: 'Data Collection & Sources',
    category: 'Phase 3 — Data Collection',
    phase: 3,
    xp: 35,
    duration: '12 min',
    difficulty: 'Beginner',
    videoId: 'DkfLB6CXDHE',
    headerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80',
    tags: ['Data Collection', 'APIs', 'Web Scraping', 'Datasets'],
    mathFormulas: [
      { name: 'Sample Size Estimation', formula: 'n = Z²·p·(1−p) / E²  (for proportions)' },
      { name: 'Class Balance', formula: 'Imbalance Ratio = N_majority / N_minority' },
    ],
    realWorldExample: {
      title: 'How Tesla Collects Training Data for Autopilot',
      description: 'Tesla collects real-world driving data from its 2M+ cars on the road. Every car is a data collection device — recording cameras, radar, ultrasonic sensors at all times. When a human overrides Autopilot, that event is flagged and sent to Tesla\'s servers for training. This "fleet learning" generates billions of miles of training data daily.',
      icon: '🚗'
    },
    content: `# Data Collection & Sources

"Data is the new oil" — but raw oil is useless without refining. Good data collection strategy is what separates successful ML projects from failed ones.

## Types of Data

### Structured Data (Tables)
\`\`\`
Rows = samples, Columns = features
Examples: CSV files, SQL databases, Excel sheets
Best for: Traditional ML (trees, linear models)

customer_id | age | income  | purchases | churn
001         | 28  | 55000   | 12        | 0
002         | 45  | 82000   | 87        | 0
003         | 31  | 41000   | 2         | 1
\`\`\`

### Unstructured Data
\`\`\`
Text:    "The product quality was excellent but delivery was slow"
Images:  PNG/JPEG pixel arrays (224×224×3)
Audio:   WAV files → spectrograms
Video:   Sequences of frames
\`\`\`

### Semi-Structured
\`\`\`
JSON, XML, HTML — has some structure but not tabular
{"user": "alice", "action": "click", "product_id": 4521}
\`\`\`

## Data Sources

### 1. Internal Company Data
- Transaction databases, CRM, logs, user events
- Usually the BEST source — specific to your problem
- Challenge: may be siloed, dirty, or not logged properly

### 2. Public Datasets
\`\`\`
Kaggle:          kaggle.com/datasets          (100K+ datasets)
UCI Repository:  archive.ics.uci.edu          (classic ML datasets)
Google Dataset:  datasetsearch.research.google.com
Hugging Face:    huggingface.co/datasets      (NLP + more)
OpenML:          openml.org                   (benchmarks)
Government:      data.gov, data.world         (public sector)
\`\`\`

### 3. Web Scraping
\`\`\`python
import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://news.ycombinator.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

articles = []
for item in soup.select(".titleline > a"):
    articles.append({"title": item.text, "url": item["href"]})

df = pd.DataFrame(articles)
# Always check robots.txt before scraping!
\`\`\`

### 4. APIs
\`\`\`python
import tweepy  # Twitter/X API
import yfinance  # Stock data
import requests  # Any REST API

# Weather data
resp = requests.get("https://api.openweathermap.org/data/2.5/forecast",
    params={"q": "Mumbai", "appid": API_KEY})
weather = resp.json()
\`\`\`

### 5. Synthetic Data (When Real Data is Scarce)
\`\`\`python
from sklearn.datasets import make_classification, make_regression

# Generate 10,000 samples, 20 features, binary classification
X, y = make_classification(n_samples=10000, n_features=20,
                            n_informative=10, random_state=42)

# Or use generative AI to augment text data
# DALL-E/Stable Diffusion to augment image data
\`\`\`

## How Much Data Do You Need?

\`\`\`
Rule of thumb (not exact science):

Linear Models:          500 – 5,000 samples
Random Forest/XGBoost:  5,000 – 100,000 samples
Deep Neural Networks:   50,000 – 10M+ samples
CNNs for images:        1,000 – 1M+ images
LLMs:                   Billions of tokens

BUT quality > quantity!
1,000 perfectly labeled samples >> 100,000 noisy ones
\`\`\`

## Data Labeling

\`\`\`
Supervised learning needs labels. How to get them?

1. Internal experts:    Doctors label X-rays, lawyers label contracts
2. Crowd-sourcing:      Amazon Mechanical Turk (~$0.01-$0.10/label)
3. Programmatic:        Snorkel — use weak signals to auto-label
4. Active learning:     Model picks the most uncertain samples to label
5. Self-supervised:     BERT/GPT — learn from data structure itself
\`\`\`

## Data Privacy & Ethics

\`\`\`
Before collecting:
  ✓ Do you have user consent?
  ✓ Is this GDPR/CCPA compliant?
  ✓ Can the data be de-identified?
  ✓ Are you introducing bias by what you collect?

Bias examples:
  • Facial recognition trained mostly on white faces
  • Hiring algorithm trained on historically biased decisions
  • Medical model trained on data from one hospital/demographic
\`\`\`

> "Collecting the right data is more important than using the right algorithm."
`,
    quiz: [
      { q: 'Which data source typically provides the BEST data for a specific business ML problem?', options: ['Public Kaggle datasets', 'Internal company databases and logs', 'Wikipedia scrapes', 'Synthetic generated data'], answer: 1 },
      { q: 'Approximately how many samples are needed to train a Deep Neural Network effectively?', options: ['100–500', '500–5,000', '50,000–10M+', 'Exactly 10,000'], answer: 2 },
      { q: 'What is "active learning" in data labeling?', options: ['Labeling all data before training', 'Having the model select the most uncertain/informative samples for human labeling', 'Automatic labeling using another model', 'Crowdsourcing labels from users'], answer: 1 },
      { q: 'What should you always check before web scraping a website?', options: ['The website\'s color scheme', 'robots.txt file and terms of service', 'The server response time', 'The HTML version used'], answer: 1 },
    ],
    codeTemplate: `// ── Data Collection Simulation ──
// Simulating API data collection + basic quality checks

// Simulated API response (stock price data)
function fetchStockData(symbol, days) {
  const data = [];
  let price = 150 + Math.random() * 50;
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.48) * 5; // slight upward bias
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Simulate missing data occasionally
    const volume = Math.random() > 0.05 ? Math.floor(Math.random() * 1000000) : null;

    data.push({
      date: date.toISOString().split('T')[0],
      symbol,
      open:   +(price + Math.random()*2).toFixed(2),
      close:  +(price).toFixed(2),
      high:   +(price + Math.random()*3).toFixed(2),
      low:    +(price - Math.random()*3).toFixed(2),
      volume: volume,
    });
  }
  return data;
}

// Collect data for multiple symbols
const symbols = ['AAPL', 'GOOGL', 'MSFT'];
const allData = {};

symbols.forEach(sym => {
  allData[sym] = fetchStockData(sym, 30);
});

console.log("=== Data Collection Report ===\\n");
symbols.forEach(sym => {
  const data = allData[sym];
  const missing = data.filter(d => d.volume === null).length;
  const prices = data.map(d => d.close);
  const minP = Math.min(...prices).toFixed(2);
  const maxP = Math.max(...prices).toFixed(2);
  const avg = (prices.reduce((a,b)=>a+b,0)/prices.length).toFixed(2);

  console.log(\`\${sym}:\`);
  console.log(\`  Records collected: \${data.length}\`);
  console.log(\`  Date range: \${data[0].date} → \${data[data.length-1].date}\`);
  console.log(\`  Price range: $\${minP} – $\${maxP} (avg: $\${avg})\`);
  console.log(\`  Missing values: \${missing}/\${data.length} (\${(missing/data.length*100).toFixed(1)}%)\`);
  console.log();
});

// Data quality checklist
console.log("=== Data Quality Checklist ===");
const rawData = allData['AAPL'];
const checks = {
  "Sufficient sample size": rawData.length >= 20,
  "No duplicate dates": new Set(rawData.map(d=>d.date)).size === rawData.length,
  "Prices are positive": rawData.every(d => d.close > 0),
  "High >= Low always": rawData.every(d => d.high >= d.low),
  "Close within High-Low": rawData.every(d => d.close <= d.high && d.close >= d.low),
  "Missing volume < 10%": rawData.filter(d=>!d.volume).length/rawData.length < 0.1,
};

Object.entries(checks).forEach(([check, passed]) => {
  console.log(\`  \${passed ? '✅' : '❌'} \${check}\`);
});

// Sample size recommendation
console.log("\\n=== Sample Size Recommendations ===");
const modelTypes = [
  { name: 'Linear Regression', min: 100, ideal: 1000 },
  { name: 'Random Forest',     min: 1000, ideal: 10000 },
  { name: 'Neural Network',    min: 10000, ideal: 100000 },
  { name: 'Large CNN',         min: 100000, ideal: 1000000 },
];
modelTypes.forEach(m => {
  const have = rawData.length;
  const status = have >= m.min ? '✅ sufficient' : \`⚠️ need \${m.min - have} more\`;
  console.log(\`  \${m.name}: \${status} (have \${have}, need \${m.min}+)\`);
});`
  },

  // ══════════════════════════════════════════════════════════════
  //  PHASE 4: EXPLORATORY DATA ANALYSIS
  // ══════════════════════════════════════════════════════════════

  {
    id: 'eda',
    title: 'Exploratory Data Analysis (EDA)',
    category: 'Phase 4 — EDA',
    phase: 4,
    xp: 45,
    duration: '18 min',
    difficulty: 'Beginner',
    videoId: 'xi0vhXFPegw',
    headerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    tags: ['EDA', 'Statistics', 'Visualization', 'Distributions'],
    mathFormulas: [
      { name: 'Mean', formula: 'μ = (1/n) Σ xᵢ' },
      { name: 'Standard Deviation', formula: 'σ = √[(1/n) Σ(xᵢ − μ)²]' },
      { name: 'Pearson Correlation', formula: 'r = Σ(xᵢ−x̄)(yᵢ−ȳ) / [√Σ(xᵢ−x̄)² · √Σ(yᵢ−ȳ)²]' },
      { name: 'Skewness', formula: 'Skew = (1/n) Σ[(xᵢ−μ)/σ]³' },
    ],
    realWorldExample: {
      title: 'How Airbnb Uses EDA to Set Pricing Strategy',
      description: 'Airbnb analysts run EDA on listing data to find: which neighborhoods have highest occupancy, what amenities correlate with premium prices, when is demand seasonal, which hosts undercharge vs overcharge. This EDA directly powers their Smart Pricing feature that suggests optimal nightly rates — increasing host revenue by 13% on average.',
      icon: '🏠'
    },
    content: `# Exploratory Data Analysis (EDA)

EDA is your **investigation phase** — understanding your data before modeling. Skipping EDA is the #1 cause of wasted ML effort.

## The EDA Mindset

\`\`\`
You are a detective. Your data is a crime scene.
Questions to answer:
  • What does this data look like?
  • Are there patterns, outliers, or anomalies?
  • Which features relate to the target?
  • What are the data quality issues?
  • What preprocessing will be needed?
\`\`\`

## Step 1: Shape & Types

\`\`\`python
import pandas as pd
import numpy as np

df = pd.read_csv('data.csv')

print(df.shape)         # (10000, 25) — 10K rows, 25 columns
print(df.dtypes)        # int64, float64, object (string), datetime64
print(df.head())        # first 5 rows
print(df.info())        # types + non-null counts
print(df.describe())    # mean, std, min, 25%, 50%, 75%, max
\`\`\`

## Step 2: Missing Values Analysis

\`\`\`python
# Count missing per column
missing = df.isnull().sum()
missing_pct = (df.isnull().mean() * 100).round(2)
missing_df = pd.DataFrame({'count': missing, 'percent': missing_pct})
print(missing_df[missing_df['count'] > 0].sort_values('percent', ascending=False))
\`\`\`

\`\`\`
Missing Values Report:
  age              → 15.2% missing  ⚠️ Need imputation
  income           →  8.7% missing  ⚠️ Need imputation
  email_verified   →  0.3% missing  ✓ Can drop rows
  churn_reason     → 68.0% missing  ⚠️ Only known after churn!
\`\`\`

## Step 3: Univariate Analysis (1 Feature at a Time)

### For Numerical Features:
\`\`\`
Distribution statistics to check:
  • Mean, Median (are they different? → skewed!)
  • Min, Max (sensible range?)
  • Std Dev (how spread out?)
  • Skewness (0=symmetric, >1=right-skewed, <−1=left-skewed)
  • Kurtosis (normal=3, higher=heavy tails)

Plot: Histogram, Boxplot, Violin plot
\`\`\`

### For Categorical Features:
\`\`\`python
# Value counts
df['country'].value_counts(normalize=True)
# country     freq
# USA         0.45
# UK          0.18
# Germany     0.12
# Other       0.25

# Are there rare categories? (< 1% → consider grouping)
# Cardinality: how many unique values?
df['user_id'].nunique()  # 9,847 — too high for tree models!
\`\`\`

## Step 4: Bivariate Analysis (Feature vs Target)

\`\`\`python
# Numerical feature vs binary target
df.groupby('churn')['monthly_spend'].describe()
# churn=0: mean=$82, std=$31
# churn=1: mean=$45, std=$28   ← churners spend LESS!

# Correlation matrix
corr = df.corr()
# tenure vs churn: -0.61  (strong negative → older customers churn less)
# support_calls vs churn: +0.73 (strong positive → more calls = more churn)

# Categorical feature vs target
pd.crosstab(df['contract_type'], df['churn'], normalize='index')
# contract_type  churn=0  churn=1
# monthly          0.58     0.42   ← 42% monthly customers churn!
# annual           0.93     0.07   ← only 7% annual customers churn!
\`\`\`

## Step 5: Multivariate Analysis

\`\`\`python
# Pair plot — all features vs all features (small datasets)
import seaborn as sns
sns.pairplot(df[numeric_cols + ['churn']], hue='churn')

# Correlation heatmap
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)
\`\`\`

## Step 6: Target Variable Analysis

\`\`\`python
# Class distribution (classification)
df['churn'].value_counts(normalize=True)
# 0 (no churn):  0.85 (85%)
# 1 (churn):     0.15 (15%)
# → Imbalanced! Need special handling.

# Distribution of target (regression)
df['price'].describe()
df['price'].skew()  # 2.3 → right-skewed → consider log transform!
\`\`\`

## Key EDA Findings Template

\`\`\`
Dataset: 10,000 customers, 25 features, 15% churn rate

Key findings:
  1. Annual contract customers have 6× lower churn rate
  2. Customers with 5+ support calls have 78% churn rate
  3. Age has normal distribution (mean=38, std=12)
  4. Income is right-skewed → will need log transform
  5. 15% of 'age' values missing → use median imputation
  6. 'user_id' column is identifier → must be dropped

Planned preprocessing:
  → Log-transform income
  → Median-impute age
  → One-hot encode contract_type, country
  → Scale numerical features
  → Class weight balancing for imbalanced target
\`\`\`

> EDA is not optional — it's where you learn if your project is feasible, what will break your model, and what your most powerful features are.
`,
    quiz: [
      { q: 'What is the primary goal of EDA?', options: ['To train the first model immediately', 'To understand data structure, quality, distributions, and relationships before modeling', 'To clean all missing values', 'To choose the final algorithm'], answer: 1 },
      { q: 'If the mean of a feature is much larger than its median, the distribution is likely:', options: ['Normally distributed', 'Right-skewed (positive skew)', 'Left-skewed (negative skew)', 'Bimodal'], answer: 1 },
      { q: 'A Pearson correlation of -0.73 between "support_calls" and a variable means:', options: ['No relationship', 'Strong positive relationship', 'Strong negative relationship', 'Weak relationship'], answer: 2 },
      { q: 'You find that 68% of the "churn_reason" column is missing. What is likely true?', options: ['The data was collected poorly', 'The column only exists for churned customers — non-churners have no churn reason', 'You should impute these with "Unknown"', 'The feature is useless and should be deleted'], answer: 1 },
    ],
    codeTemplate: `// ── EDA from Scratch ──
// Complete exploratory analysis on a customer dataset

// Simulated customer dataset
const customers = [
  {age:28,income:55000,tenure:12,support_calls:1,monthly_spend:82,contract:'annual',churn:0},
  {age:45,income:82000,tenure:60,support_calls:0,monthly_spend:120,contract:'annual',churn:0},
  {age:31,income:41000,tenure:3,support_calls:5,monthly_spend:45,contract:'monthly',churn:1},
  {age:52,income:95000,tenure:84,support_calls:0,monthly_spend:150,contract:'annual',churn:0},
  {age:24,income:35000,tenure:2,support_calls:8,monthly_spend:38,contract:'monthly',churn:1},
  {age:38,income:68000,tenure:24,support_calls:2,monthly_spend:95,contract:'annual',churn:0},
  {age:29,income:42000,tenure:6,support_calls:4,monthly_spend:55,contract:'monthly',churn:1},
  {age:41,income:77000,tenure:48,support_calls:1,monthly_spend:110,contract:'annual',churn:0},
  {age:33,income:49000,tenure:9,support_calls:6,monthly_spend:60,contract:'monthly',churn:1},
  {age:55,income:110000,tenure:120,support_calls:0,monthly_spend:180,contract:'annual',churn:0},
];

function mean(arr) { return arr.reduce((a,b)=>a+b,0)/arr.length; }
function std(arr)  { const m=mean(arr); return Math.sqrt(arr.reduce((s,x)=>s+(x-m)**2,0)/arr.length); }
function median(arr){ const s=[...arr].sort((a,b)=>a-b); return s.length%2===0?(s[s.length/2-1]+s[s.length/2])/2:s[Math.floor(s.length/2)]; }
function corr(x,y)  {
  const mx=mean(x),my=mean(y),sx=std(x),sy=std(y);
  return x.reduce((s,xi,i)=>s+(xi-mx)*(y[i]-my),0)/(x.length*sx*sy);
}

const numFeatures = ['age','income','tenure','support_calls','monthly_spend'];

console.log("=== 1. DATASET OVERVIEW ===");
console.log(\`Samples: \${customers.length} | Features: \${Object.keys(customers[0]).length}\`);

console.log("\\n=== 2. DESCRIPTIVE STATISTICS ===");
numFeatures.forEach(f => {
  const vals = customers.map(c => c[f]);
  console.log(\`\${f.padEnd(15)}: mean=\${mean(vals).toFixed(1).padEnd(7)} median=\${median(vals).toFixed(1).padEnd(7)} std=\${std(vals).toFixed(1).padEnd(7)} range=[\${Math.min(...vals)},\${Math.max(...vals)}]\`);
});

console.log("\\n=== 3. TARGET DISTRIBUTION ===");
const churners = customers.filter(c=>c.churn===1).length;
const notChurn  = customers.length - churners;
console.log(\`Churn:    \${churners}/\${customers.length} (\${(churners/customers.length*100).toFixed(0)}%) ← minority class!\`);
console.log(\`No Churn: \${notChurn}/\${customers.length} (\${(notChurn/customers.length*100).toFixed(0)}%)\`);

console.log("\\n=== 4. FEATURE vs TARGET CORRELATION ===");
const churn = customers.map(c => c.churn);
numFeatures.forEach(f => {
  const vals = customers.map(c => c[f]);
  const r = corr(vals, churn);
  const bar = '█'.repeat(Math.round(Math.abs(r)*10));
  const dir = r > 0 ? '+' : '-';
  console.log(\`  \${f.padEnd(15)}: r=\${r.toFixed(3)} \${dir}\${bar}\`);
});

console.log("\\n=== 5. CONTRACT TYPE vs CHURN ===");
['monthly','annual'].forEach(ct => {
  const group = customers.filter(c=>c.contract===ct);
  const churnRate = group.filter(c=>c.churn===1).length/group.length;
  console.log(\`  \${ct.padEnd(8)}: \${group.length} customers | churn rate = \${(churnRate*100).toFixed(0)}%\`);
});

console.log("\\n=== 6. HIGH-RISK CUSTOMER SEGMENTS ===");
const highCalls = customers.filter(c=>c.support_calls>=4);
const highCallChurn = highCalls.filter(c=>c.churn===1).length/highCalls.length;
console.log(\`  Customers with 4+ support calls: \${highCalls.length} → churn rate \${(highCallChurn*100).toFixed(0)}%\`);

const lowTenure = customers.filter(c=>c.tenure<6);
const lowTenureChurn = lowTenure.filter(c=>c.churn===1).length/lowTenure.length;
console.log(\`  Customers with < 6 months tenure: \${lowTenure.length} → churn rate \${(lowTenureChurn*100).toFixed(0)}%\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  PHASE 5: DATA CLEANING
  // ══════════════════════════════════════════════════════════════

  {
    id: 'data-cleaning',
    title: 'Data Cleaning & Preprocessing',
    category: 'Phase 5 — Data Cleaning',
    phase: 5,
    xp: 50,
    duration: '20 min',
    difficulty: 'Beginner',
    videoId: 'M3quJ8YU2Xc',
    headerImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80',
    tags: ['Cleaning', 'Imputation', 'Outliers', 'Encoding', 'Scaling'],
    mathFormulas: [
      { name: 'Z-Score Normalization', formula: 'z = (x − μ) / σ' },
      { name: 'Min-Max Scaling', formula: "x' = (x − x_min) / (x_max − x_min)" },
      { name: 'IQR Outlier Rule', formula: 'Outlier if x < Q1−1.5·IQR  or  x > Q3+1.5·IQR' },
    ],
    realWorldExample: {
      title: 'Cleaning Patient Records at Cleveland Clinic',
      description: 'Cleveland Clinic\'s ML team found that 34% of patient records had missing lab values, 12% had conflicting diagnoses, and 8% had impossible values (e.g., age=999). Their data cleaning pipeline took 3 months to build but reduced model error by 47%. "Model quality is bounded by data quality" — their chief data scientist.',
      icon: '🏥'
    },
    content: `# Data Cleaning & Preprocessing

Raw data is almost always dirty. Data cleaning transforms it into a form that ML algorithms can effectively learn from.

## The Data Cleaning Pipeline

\`\`\`
Raw Data
    │
    ▼ 1. Remove duplicates
    ▼ 2. Fix data types
    ▼ 3. Handle missing values
    ▼ 4. Detect & treat outliers
    ▼ 5. Encode categorical variables
    ▼ 6. Scale numerical features
    ▼ 7. Feature engineering
    │
    ▼
Clean Data (Ready for ML!)
\`\`\`

## 1. Remove Duplicates

\`\`\`python
print(f"Before: {df.shape}")
df = df.drop_duplicates()
print(f"After: {df.shape}")
# Removed 234 duplicate rows

# Duplicate by subset of columns
df = df.drop_duplicates(subset=['customer_id'])  # keep first occurrence
\`\`\`

## 2. Fix Data Types

\`\`\`python
# Wrong types are common in real data
df['age'] = pd.to_numeric(df['age'], errors='coerce')  # "25years" → 25 or NaN
df['date'] = pd.to_datetime(df['date'])                # "Jan 1 2024" → datetime
df['income'] = df['income'].str.replace('$','').str.replace(',','').astype(float)
# "$85,000" → 85000.0
\`\`\`

## 3. Handling Missing Values

### Decision Tree for Missing Values:
\`\`\`
Missing value?
  │
  ├── Missing completely randomly?
  │     └── < 5%? → drop rows
  │     └── > 5%? → impute
  │
  ├── Numerical?
  │     └── Normal dist → mean imputation
  │     └── Skewed dist → median imputation
  │     └── Has pattern → KNN or model-based
  │
  ├── Categorical?
  │     └── mode imputation or "Unknown" category
  │
  └── MNAR (Missing Not At Random)?
        └── Often informative! Add "was_missing" flag feature
\`\`\`

\`\`\`python
from sklearn.impute import SimpleImputer, KNNImputer

# Mean imputation (numerical)
imp_mean = SimpleImputer(strategy='mean')
df['income'] = imp_mean.fit_transform(df[['income']])

# Median imputation (skewed)
imp_med = SimpleImputer(strategy='median')
df['age'] = imp_med.fit_transform(df[['age']])

# Most frequent (categorical)
imp_mode = SimpleImputer(strategy='most_frequent')
df['contract'] = imp_mode.fit_transform(df[['contract']])

# KNN imputation (uses other features to estimate)
knn_imp = KNNImputer(n_neighbors=5)
df_imputed = knn_imp.fit_transform(df)

# Flag missing as its own feature
df['income_was_missing'] = df['income'].isnull().astype(int)
\`\`\`

## 4. Outlier Detection & Treatment

### IQR Method (robust to outliers):
\`\`\`
Q1 = 25th percentile
Q3 = 75th percentile
IQR = Q3 - Q1

Lower Fence = Q1 - 1.5 × IQR
Upper Fence = Q3 + 1.5 × IQR

Values outside fences → outliers

Example:
  income = [40K, 45K, 50K, 52K, 55K, 60K, 1,000K]
  Q1=45K, Q3=57.5K, IQR=12.5K
  Upper fence = 57.5K + 1.5×12.5K = 76.25K
  $1,000K is an outlier! (data entry error)
\`\`\`

### Z-Score Method:
\`\`\`
z = (x - μ) / σ
|z| > 3 → likely outlier (>3 standard deviations from mean)

More sensitive to outliers than IQR
Use IQR for skewed data, Z-score for normal distributions
\`\`\`

### Outlier Treatment Options:
\`\`\`python
# 1. Remove (only if data entry error or impossible value)
df = df[df['age'] < 100]

# 2. Cap (Winsorize) — replace with fence value
df['income'] = df['income'].clip(lower=lower_fence, upper=upper_fence)

# 3. Log transform — compresses large values
df['income_log'] = np.log1p(df['income'])  # log1p handles zeros

# 4. Robust scaler — uses median/IQR instead of mean/std
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()  # not sensitive to outliers
\`\`\`

## 5. Encoding Categorical Variables

\`\`\`python
# Label Encoding — ONLY for ordinal (ordered) categories
# size: small < medium < large
df['size'] = df['size'].map({'small':0, 'medium':1, 'large':2})

# One-Hot Encoding — for nominal (no order) categories
# country: USA, UK, India → separate binary columns
df = pd.get_dummies(df, columns=['country'], drop_first=True)

# Target Encoding (for high-cardinality: cities, zip codes)
# Replace category with mean target value
city_means = df.groupby('city')['price'].mean()
df['city_encoded'] = df['city'].map(city_means)
\`\`\`

## 6. Feature Scaling

**Critical for:** KNN, SVM, Neural Networks, PCA, Logistic Regression
**Not needed for:** Decision Trees, Random Forest, XGBoost

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization — mean=0, std=1 (best general choice)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit ONLY on train!
X_test_scaled  = scaler.transform(X_test)        # apply same transform

# Min-Max — scales to [0, 1] (use for neural networks)
scaler = MinMaxScaler()

# CRITICAL: fit scaler ONLY on training data
# Fitting on test data causes data leakage!
\`\`\`

## The Train-Test Split (Do This First!)

\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 80% train, 20% test
    random_state=42,    # reproducibility
    stratify=y          # maintain class proportions
)
# ALL preprocessing must be fit on X_train only, then applied to X_test!
\`\`\`

> The golden rule: **fit on train, transform both**. Anything else is data leakage.
`,
    quiz: [
      { q: 'Why must you fit the scaler ONLY on training data?', options: ['Training data is always cleaner', 'Fitting on test data leaks test distribution information into training, making evaluation invalid', 'Test data doesn\'t need scaling', 'Fitting on both is faster'], answer: 1 },
      { q: 'When should you use Median imputation instead of Mean imputation?', options: ['When the feature is normally distributed', 'When the feature is categorical', 'When the feature is right or left skewed (non-normal)', 'When fewer than 5% of values are missing'], answer: 2 },
      { q: 'One-Hot Encoding should be used for:', options: ['Ordinal categories with a clear order', 'Nominal categories without a natural order', 'Binary features only', 'High-cardinality features with 1000+ categories'], answer: 1 },
      { q: 'Winsorizing (capping) outliers means:', options: ['Removing all outlier rows from the dataset', 'Replacing outliers with the fence values instead of removing them', 'Imputing outliers with the median', 'Converting outliers to z-scores'], answer: 1 },
    ],
    codeTemplate: `// ── Data Cleaning Pipeline ──
// Complete preprocessing on a real-world style dataset

const rawData = [
  {age:'28',income:'$55,000',city:'NYC',contract:'annual',calls:1,spend:82,churn:0},
  {age:'999',income:'$82,000',city:'LA',contract:'annual',calls:0,spend:120,churn:0}, // age outlier
  {age:'31',income:null,city:'NYC',contract:'monthly',calls:5,spend:45,churn:1},       // missing income
  {age:'45',income:'$95,000',city:'Chicago',contract:'annual',calls:0,spend:150,churn:0},
  {age:'24',income:'$35,000',city:'NYC',contract:'monthly',calls:8,spend:38,churn:1},
  {age:'38',income:'$68,000',city:'LA',contract:'annual',calls:2,spend:95,churn:0},
  {age:'31',income:null,city:'NYC',contract:'monthly',calls:5,spend:45,churn:1},      // duplicate!
  {age:'33',income:'$49,000',city:'Miami',contract:'monthly',calls:6,spend:60,churn:1},
  {age:'-5',income:'$42,000',city:'LA',contract:'monthly',calls:4,spend:55,churn:1},  // negative age
  {age:'41',income:'$77,000',city:'NYC',contract:'annual',calls:1,spend:110,churn:0},
];

console.log(\`=== STEP 1: RAW DATA (\${rawData.length} rows) ===\`);
rawData.forEach((d,i) => console.log(\`  \${i+1}: age=\${d.age} income=\${d.income} calls=\${d.calls}\`));

// ── Step 2: Fix data types ──
let data = rawData.map(d => ({
  ...d,
  age: parseFloat(d.age),
  income: d.income ? parseFloat(d.income.replace(/[$,]/g,'')) : null,
}));

// ── Step 3: Remove duplicates ──
const seen = new Set();
data = data.filter(d => {
  const key = \`\${d.age}_\${d.income}_\${d.calls}\`;
  if (seen.has(key)) return false;
  seen.add(key); return true;
});
console.log(\`\\n=== STEP 2: After Dedup (\${data.length} rows) ===\`);

// ── Step 4: Handle impossible values ──
data = data.map(d => ({
  ...d,
  age: (d.age < 0 || d.age > 120) ? null : d.age,
}));
const impossibleAge = rawData.filter(d=>parseFloat(d.age)<0||parseFloat(d.age)>120).length;
console.log(\`Flagged \${impossibleAge} impossible age values\`);

// ── Step 5: Impute missing values ──
const validAges = data.filter(d=>d.age!==null).map(d=>d.age);
const validIncomes = data.filter(d=>d.income!==null).map(d=>d.income);
const medAge = [...validAges].sort((a,b)=>a-b)[Math.floor(validAges.length/2)];
const medIncome = [...validIncomes].sort((a,b)=>a-b)[Math.floor(validIncomes.length/2)];

data = data.map(d => ({
  ...d,
  age: d.age ?? medAge,
  income: d.income ?? medIncome,
  income_was_missing: d.income === null ? 1 : 0,
}));
console.log(\`\\n=== STEP 3: After Imputation ===\`);
console.log(\`Median age used for imputation: \${medAge}\`);
console.log(\`Median income used for imputation: $\${medIncome.toLocaleString()}\`);

// ── Step 6: Outlier detection (IQR on income) ──
const incomes = data.map(d=>d.income).sort((a,b)=>a-b);
const q1 = incomes[Math.floor(incomes.length*0.25)];
const q3 = incomes[Math.floor(incomes.length*0.75)];
const iqr = q3-q1, lo=q1-1.5*iqr, hi=q3+1.5*iqr;
const outliers = data.filter(d=>d.income<lo||d.income>hi).length;
data = data.map(d=>({...d, income: Math.min(Math.max(d.income,lo),hi)}));
console.log(\`\\n=== STEP 4: Outlier Capping (IQR: [\${lo},\${hi}]) ===\`);
console.log(\`Capped \${outliers} income outlier(s)\`);

// ── Step 7: Encode categoricals ──
const cityMap = {NYC:0,LA:1,Chicago:2,Miami:3};
const contractMap = {annual:0, monthly:1};
data = data.map(d=>({
  ...d,
  city_code: cityMap[d.city]??3,
  contract_monthly: contractMap[d.contract],
}));

// ── Step 8: Normalize ──
const numCols = ['age','income','calls','spend'];
const stats = {};
numCols.forEach(col => {
  const vals = data.map(d=>d[col]);
  const m = vals.reduce((a,b)=>a+b,0)/vals.length;
  const s = Math.sqrt(vals.reduce((a,b)=>a+(b-m)**2,0)/vals.length);
  stats[col] = {mean:m, std:s};
});
data = data.map(d=>({
  ...d,
  ...Object.fromEntries(numCols.map(col=>[col+'_z', +((d[col]-stats[col].mean)/stats[col].std).toFixed(3)]))
}));

console.log(\`\\n=== STEP 5: FINAL CLEAN DATA (\${data.length} rows) ===\`);
data.forEach((d,i) =>
  console.log(\`  \${i+1}: age=\${d.age} income=\${d.income.toLocaleString()} age_z=\${d.age_z} income_z=\${d.income_z} contract=\${d.contract_monthly} churn=\${d.churn}\`)
);`
  },

  // ══════════════════════════════════════════════════════════════
  //  PHASE 6: FEATURE ENGINEERING
  // ══════════════════════════════════════════════════════════════

  {
    id: 'feature-engineering',
    title: 'Feature Engineering',
    category: 'Phase 6 — Feature Engineering',
    phase: 6,
    xp: 55,
    duration: '20 min',
    difficulty: 'Intermediate',
    videoId: 'GduT2ZCc26E',
    headerImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80',
    tags: ['Feature Engineering', 'Feature Selection', 'Dimensionality'],
    mathFormulas: [
      { name: 'Log Transform', formula: "x' = log(1 + x)  →  compresses right-skewed" },
      { name: 'Polynomial Features', formula: '[x₁, x₂] → [1, x₁, x₂, x₁², x₁x₂, x₂²]' },
      { name: 'Feature Importance (Trees)', formula: 'Importance = Σ ΔGini weighted by node samples' },
    ],
    realWorldExample: {
      title: 'Instacart\'s Feature Engineering for Product Recommendations',
      description: 'Instacart engineers created 200+ features from raw order data: "days since user last bought this product", "reorder ratio per product per user", "typical hour of day this user shops", "cart size at time of add". These engineered features — not raw data — powered their recommendation model that drives 75% of all add-to-carts.',
      icon: '🛒'
    },
    content: `# Feature Engineering

Feature engineering is the art of creating new input features from raw data. It's often more impactful than choosing the right algorithm.

## Why Feature Engineering?

\`\`\`
Raw data: {"signup_date": "2022-03-15", "last_login": "2024-01-10"}

Engineered features:
  tenure_days = 663 days since signup
  days_since_login = 94 days since last login
  is_inactive = 1 (hasn't logged in 90+ days)
  login_frequency = tenure / num_logins

The raw dates tell the model nothing useful.
The engineered features immediately signal churn risk!
\`\`\`

## Types of Feature Engineering

### 1. Mathematical Transformations

\`\`\`python
# Log transform: compresses right-skewed distributions
df['income_log'] = np.log1p(df['income'])  # log(1+x), handles zeros

# Square root: milder compression
df['visits_sqrt'] = np.sqrt(df['page_visits'])

# Squared: capture non-linear relationships
df['age_sq'] = df['age'] ** 2

# Binning: convert continuous to categorical
df['age_group'] = pd.cut(df['age'],
    bins=[0,18,35,50,65,100],
    labels=['teen','young','middle','senior','elderly'])

# Ratio features: often very powerful
df['spend_per_visit'] = df['total_spend'] / df['num_visits'].clip(1)
df['support_per_tenure'] = df['support_calls'] / df['tenure_months'].clip(1)
\`\`\`

### 2. Date/Time Features

\`\`\`python
df['date'] = pd.to_datetime(df['date'])

# Extract components
df['hour']          = df['date'].dt.hour
df['day_of_week']   = df['date'].dt.dayofweek   # 0=Monday
df['month']         = df['date'].dt.month
df['quarter']       = df['date'].dt.quarter
df['is_weekend']    = df['date'].dt.dayofweek >= 5

# Cyclical encoding for hour (0-23): use sin/cos!
# Hour 23 and hour 0 are adjacent, but 23 and 0 are far apart numerically
df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)

# Time since event
df['days_since_last_purchase'] = (pd.Timestamp.now() - df['last_purchase_date']).dt.days
\`\`\`

### 3. Text Features

\`\`\`python
# Bag of Words / TF-IDF
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(max_features=1000, stop_words='english')
X_text = tfidf.fit_transform(df['review_text'])

# Simple text statistics
df['word_count']     = df['text'].str.split().str.len()
df['char_count']     = df['text'].str.len()
df['caps_ratio']     = df['text'].str.count(r'[A-Z]') / df['char_count']
df['exclamation_ct'] = df['text'].str.count('!')
df['has_url']        = df['text'].str.contains('http').astype(int)
\`\`\`

### 4. Interaction Features

\`\`\`python
# Multiply two features to capture interaction effects
df['age_x_income'] = df['age'] * df['income']

# Polynomial features (automated)
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, interaction_only=False, include_bias=False)
X_poly = poly.fit_transform(X[['age','income','tenure']])
# Creates: age, income, tenure, age², income², tenure², age×income, age×tenure, income×tenure
\`\`\`

### 5. Aggregation Features (Groupby)

\`\`\`python
# Statistics per group — often very powerful!
user_stats = df.groupby('user_id').agg({
    'purchase_amount': ['mean', 'sum', 'count', 'max', 'std'],
    'days_between_orders': ['mean', 'min'],
    'product_category': 'nunique'  # how many different categories bought
}).reset_index()

# Merge back to original
df = df.merge(user_stats, on='user_id', how='left')
\`\`\`

## Feature Selection

Too many features → overfitting, slow training, noise

### Method 1: Filter Methods (fast, model-agnostic)
\`\`\`python
# Correlation with target
correlations = df.corr()['churn'].abs().sort_values(ascending=False)
top_features = correlations[correlations > 0.1].index.tolist()

# Chi-squared for categorical features
from sklearn.feature_selection import chi2, SelectKBest
selector = SelectKBest(chi2, k=10)
X_selected = selector.fit_transform(X, y)
\`\`\`

### Method 2: Wrapper Methods (uses model to evaluate)
\`\`\`python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

rfe = RFE(LogisticRegression(), n_features_to_select=10)
X_selected = rfe.fit_transform(X, y)
print(rfe.ranking_)  # lower = more important
\`\`\`

### Method 3: Embedded Methods (built into model)
\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100)
rf.fit(X_train, y_train)

importances = pd.Series(rf.feature_importances_, index=feature_names)
print(importances.sort_values(ascending=False).head(10))
# support_calls_ratio    0.231  ← most important!
# days_since_login       0.187
# contract_monthly       0.163
\`\`\`

> Feature engineering is where domain knowledge meets data science. The best features come from understanding WHY customers churn, not just WHAT the data shows.
`,
    quiz: [
      { q: 'Why should you use sin/cos encoding for time-of-day features?', options: ['It makes the values smaller', 'It correctly represents the circular nature of time (hour 23 is close to hour 0)', 'It is required by neural networks', 'It reduces the number of features'], answer: 1 },
      { q: 'What does a log transform do to a right-skewed distribution?', options: ['Makes it more skewed', 'Compresses large values and stretches small values, making it more normal', 'Normalizes it to [0,1]', 'Removes outliers automatically'], answer: 1 },
      { q: 'What is the risk of adding too many features without selection?', options: ['The model trains faster', 'Overfitting, slower training, and noise from irrelevant features', 'Data leakage occurs', 'Labels become imbalanced'], answer: 1 },
      { q: 'What type of feature selection uses a model to evaluate which features to keep?', options: ['Filter methods', 'Statistical tests', 'Wrapper methods (e.g., RFE)', 'Correlation analysis'], answer: 2 },
    ],
    codeTemplate: `// ── Feature Engineering Lab ──
// Transform raw e-commerce data into powerful ML features

const rawOrders = [
  {userId:'U1', orderId:'O1', amount:45.5,  date:'2024-01-05', category:'Electronics', items:2},
  {userId:'U1', orderId:'O2', amount:12.0,  date:'2024-01-19', category:'Books',       items:1},
  {userId:'U1', orderId:'O3', amount:89.9,  date:'2024-02-10', category:'Electronics', items:3},
  {userId:'U2', orderId:'O4', amount:156.0, date:'2024-01-08', category:'Clothing',    items:5},
  {userId:'U2', orderId:'O5', amount:34.5,  date:'2024-01-22', category:'Books',       items:2},
  {userId:'U3', orderId:'O6', amount:220.0, date:'2023-12-01', category:'Electronics', items:4},
  {userId:'U3', orderId:'O7', amount:88.0,  date:'2024-02-15', category:'Clothing',    items:3},
  {userId:'U3', orderId:'O8', amount:450.0, date:'2024-02-20', category:'Electronics', items:8},
];

const today = new Date('2024-03-01');
const daysSince = d => Math.floor((today - new Date(d)) / 86400000);

// ── Step 1: Order-level features ──
const orders = rawOrders.map(o => ({
  ...o,
  amount_log: Math.log1p(o.amount),
  amount_per_item: +(o.amount / o.items).toFixed(2),
  days_since_order: daysSince(o.date),
  day_of_week: new Date(o.date).getDay(),
  month: new Date(o.date).getMonth() + 1,
  is_weekend: [0,6].includes(new Date(o.date).getDay()) ? 1 : 0,
  is_electronics: o.category === 'Electronics' ? 1 : 0,
}));

console.log("=== STEP 1: Order-Level Engineered Features ===");
orders.slice(0,3).forEach(o =>
  console.log(\`  \${o.orderId}: $\${o.amount} → log=\${o.amount_log.toFixed(2)} $/item=\${o.amount_per_item} days_ago=\${o.days_since_order}\`)
);

// ── Step 2: User-level aggregation features ──
const users = {};
orders.forEach(o => {
  if (!users[o.userId]) users[o.userId] = {
    userId: o.userId,
    orders: [],
    categories: new Set(),
  };
  users[o.userId].orders.push(o);
  users[o.userId].categories.add(o.category);
});

const userFeatures = Object.values(users).map(u => {
  const amounts = u.orders.map(o => o.amount);
  const daysAgo = u.orders.map(o => o.days_since_order);
  const total = amounts.reduce((a,b)=>a+b,0);
  const mean = total/amounts.length;
  const gaps = daysAgo.slice(0,-1).map((_,i)=>daysAgo[i]-daysAgo[i+1]);

  return {
    userId: u.userId,
    order_count:        u.orders.length,
    total_spend:        +total.toFixed(2),
    mean_order_value:   +mean.toFixed(2),
    max_order_value:    Math.max(...amounts),
    days_since_last_order: Math.min(...daysAgo),
    days_since_first_order: Math.max(...daysAgo),
    avg_days_between_orders: gaps.length ? +(gaps.reduce((a,b)=>a+b,0)/gaps.length).toFixed(1) : null,
    category_diversity: u.categories.size,
    electronics_ratio: +(u.orders.filter(o=>o.is_electronics).length/u.orders.length).toFixed(2),
    spend_per_day: +(total/(Math.max(...daysAgo)||1)).toFixed(3),
    is_high_value: mean > 100 ? 1 : 0,
  };
});

console.log("\\n=== STEP 2: User-Level Aggregated Features ===");
userFeatures.forEach(u => {
  console.log(\`\\nUser \${u.userId}:\`);
  Object.entries(u).filter(([k])=>k!=='userId').forEach(([k,v])=>
    console.log(\`  \${k.padEnd(30)}: \${v}\`)
  );
});

// ── Step 3: Feature importance simulation ──
console.log("\\n=== STEP 3: Hypothetical Feature Importance ===");
const importance = [
  {feature:'days_since_last_order',  score:0.28},
  {feature:'total_spend',            score:0.22},
  {feature:'order_count',            score:0.18},
  {feature:'electronics_ratio',      score:0.13},
  {feature:'avg_days_between_orders',score:0.10},
  {feature:'category_diversity',     score:0.09},
];
importance.forEach(f => {
  const bar = '█'.repeat(Math.round(f.score*30));
  console.log(\`  \${f.feature.padEnd(35)}: \${bar} \${(f.score*100).toFixed(0)}%\`);
});`
  },

  // ══════════════════════════════════════════════════════════════
  //  PHASE 7: MODEL BUILDING — LINEAR MODELS
  // ══════════════════════════════════════════════════════════════

  {
    id: 'linear-regression',
    title: 'Linear Regression',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 65,
    duration: '22 min',
    difficulty: 'Beginner',
    videoId: 'zPG4NjIkCjc',
    headerImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80',
    tags: ['Linear Regression', 'OLS', 'Gradient Descent', 'Regression'],
    mathFormulas: [
      { name: 'Hypothesis', formula: 'ŷ = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ  =  Xθ' },
      { name: 'MSE Loss', formula: 'J(θ) = (1/2m) Σᵢ (ŷᵢ − yᵢ)²' },
      { name: 'Gradient Descent', formula: 'θⱼ := θⱼ − α · (∂J/∂θⱼ)' },
      { name: 'Normal Equation', formula: 'θ = (XᵀX)⁻¹ Xᵀy' },
      { name: 'R² Score', formula: 'R² = 1 − SS_res / SS_tot' },
    ],
    realWorldExample: {
      title: 'Zillow\'s Zestimate — Pricing 100M Homes',
      description: 'Zillow uses regression models (with many features including square footage, neighborhood, school ratings, crime rates) to estimate prices for every home in the US. They update 100M+ estimates daily. Their mean absolute error target is <2% of actual sale price. Linear regression components form the interpretable backbone of their pricing stack.',
      icon: '🏡'
    },
    content: `# Linear Regression

Linear Regression finds the **best-fit line** through data to predict a continuous number (price, temperature, revenue, etc.).

## The Model

\`\`\`
For one feature:          ŷ = θ₀ + θ₁x
For multiple features:    ŷ = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ
In matrix form:           ŷ = Xθ

θ₀ = intercept (baseline prediction when all features = 0)
θ₁,...,θₙ = slopes (how much ŷ changes per unit of each feature)

Example — House Price:
  price = 50,000 + 150×(sq_ft) + 20,000×(bedrooms) − 1,000×(age_years)
\`\`\`

## Training: Gradient Descent

Find θ that minimizes MSE (Mean Squared Error):

\`\`\`
Cost function:
  J(θ) = (1/2m) Σᵢ (ŷᵢ − yᵢ)²

Gradient (partial derivative):
  ∂J/∂θⱼ = (1/m) Σᵢ (ŷᵢ − yᵢ) · xᵢⱼ

Update rule:
  θⱼ := θⱼ − α × (1/m) Σᵢ (ŷᵢ − yᵢ) · xᵢⱼ

α = learning rate (step size, e.g., 0.01)
Repeat until convergence (J stops decreasing)
\`\`\`

## Training: Normal Equation (Analytical Solution)

\`\`\`
θ = (XᵀX)⁻¹ Xᵀy

Advantages:   Exact solution, no learning rate needed, one step
Disadvantages: O(n³) for matrix inverse — slow for n > 10,000 features
\`\`\`

## Evaluation Metrics

\`\`\`
R² = 1 − SS_res/SS_tot  (coefficient of determination)
   = 1 = perfect fit
   = 0 = model as good as predicting the mean
   < 0 = model worse than predicting the mean!

RMSE = √[(1/m) Σ(ŷᵢ−yᵢ)²]  ← same units as y
MAE  = (1/m) Σ|ŷᵢ−yᵢ|       ← robust to outliers
\`\`\`

## Assumptions to Check

\`\`\`
1. Linearity — relationship between X and y is (roughly) linear
   Check: scatter plot X vs y

2. No multicollinearity — features shouldn't be highly correlated
   Check: VIF (Variance Inflation Factor) < 5

3. Homoscedasticity — residuals have constant variance
   Check: residual plot (should look random, no pattern)

4. No autocorrelation — residuals independent
   Check: Durbin-Watson test (time series)

5. Normality of residuals — residuals ≈ Gaussian
   Check: Q-Q plot of residuals
\`\`\`

## Regularized Regression

Prevent overfitting by penalizing large coefficients:

\`\`\`
Ridge (L2):    J(θ) = MSE + λΣθⱼ²
               Shrinks all coefficients, none to exactly zero
               Use when all features somewhat contribute

Lasso (L1):    J(θ) = MSE + λΣ|θⱼ|
               Can zero out coefficients → automatic feature selection
               Use when you suspect many features are irrelevant

ElasticNet:    J(θ) = MSE + α·λΣ|θⱼ| + (1-α)·λΣθⱼ²
               Combines both — best of both worlds
\`\`\`

\`\`\`python
from sklearn.linear_model import LinearRegression, Ridge, Lasso

# Basic
lr = LinearRegression()
lr.fit(X_train, y_train)
print(lr.coef_)        # learned θ values
print(lr.intercept_)   # θ₀

# With regularization
ridge = Ridge(alpha=1.0)  # alpha = λ
ridge.fit(X_train, y_train)

lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)

# Evaluation
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
y_pred = lr.predict(X_test)
print(f"R²: {r2_score(y_test, y_pred):.4f}")
print(f"MAE: {mean_absolute_error(y_test, y_pred):.2f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")
\`\`\`

> Linear Regression is the foundation. Every other algorithm — neural networks, XGBoost, SVMs — can be understood as extensions or alternatives to it.
`,
    quiz: [
      { q: 'In linear regression ŷ = θ₀ + θ₁x, what does θ₁ represent?', options: ['The intercept where the line crosses y-axis', 'How much ŷ increases per unit increase in x', 'The error of the prediction', 'The learning rate'], answer: 1 },
      { q: 'What is the purpose of the learning rate α in gradient descent?', options: ['Controls number of training samples', 'Controls the step size when updating θ — too large diverges, too small is slow', 'Determines the number of features', 'Sets the regularization strength'], answer: 1 },
      { q: 'When should you prefer Lasso over Ridge regression?', options: ['When you want faster computation', 'When you believe many features are irrelevant and want automatic feature selection', 'When the dataset is very small', 'When the target variable is categorical'], answer: 1 },
      { q: 'R² = 0.85 means:', options: ['85% of predictions are exactly correct', 'The model explains 85% of the variance in y', 'The model makes errors of 15% on average', 'The model has 85% accuracy'], answer: 1 },
    ],
    codeTemplate: `// ── Linear Regression from Scratch ──
// Gradient descent + evaluation on house price prediction

const dataset = [
  {sqft:800,  beds:2, age:20, price:150},
  {sqft:1200, beds:3, age:15, price:210},
  {sqft:1500, beds:3, age:10, price:265},
  {sqft:1800, beds:4, age:8,  price:320},
  {sqft:2100, beds:4, age:5,  price:375},
  {sqft:2500, beds:5, age:3,  price:450},
  {sqft:900,  beds:2, age:25, price:155},
  {sqft:3000, beds:5, age:2,  price:530},
];

// Normalize features
const normalize = (vals) => {
  const min = Math.min(...vals), max = Math.max(...vals);
  return { scaled: vals.map(v=>(v-min)/(max-min)), min, max };
};

const sqftN = normalize(dataset.map(d=>d.sqft));
const bedsN = normalize(dataset.map(d=>d.beds));
const ageN  = normalize(dataset.map(d=>d.age));
const priceN= normalize(dataset.map(d=>d.price));

// Design matrix X with bias column: [1, sqft_n, beds_n, age_n]
const X = dataset.map((_,i) => [1, sqftN.scaled[i], bedsN.scaled[i], ageN.scaled[i]]);
const y = priceN.scaled;

// Initialize weights
let theta = [0, 0, 0, 0]; // [bias, sqft, beds, age]
const lr = 0.5, epochs = 1000, m = X.length;

function predict(X, theta) { return X.map(xi => theta.reduce((s,t,j)=>s+t*xi[j],0)); }
function mse(y, yhat)      { return y.reduce((s,yi,i)=>s+(yi-yhat[i])**2,0)/(2*m); }

// Gradient descent
const history = [];
for (let e = 0; e < epochs; e++) {
  const yhat = predict(X, theta);
  const errors = yhat.map((p,i)=>p-y[i]);

  theta = theta.map((t,j) =>
    t - lr * errors.reduce((s,e,i)=>s+e*X[i][j],0)/m
  );
  if (e%100===0) history.push({e, mse: mse(y, predict(X,theta)).toFixed(6)});
}

console.log("=== Linear Regression Training ===");
console.log("Training Loss (MSE on normalized scale):");
history.forEach(h=>console.log(\`  Epoch \${h.e}: \${h.mse}\`));

console.log(\`\\nLearned coefficients (normalized scale):\`);
console.log(\`  bias=\${theta[0].toFixed(4)} sqft=\${theta[1].toFixed(4)} beds=\${theta[2].toFixed(4)} age=\${theta[3].toFixed(4)}\`);

// Predict in original scale
function predictPrice(sqft, beds, age) {
  const xn = [
    1,
    (sqft - sqftN.min)/(sqftN.max - sqftN.min),
    (beds - bedsN.min)/(bedsN.max - bedsN.min),
    (age  - ageN.min) /(ageN.max  - ageN.min),
  ];
  const yNorm = theta.reduce((s,t,j) => s+t*xn[j], 0);
  return yNorm*(priceN.max-priceN.min)+priceN.min;
}

// Evaluate
const yhat = dataset.map(d => predictPrice(d.sqft, d.beds, d.age));
const actual = dataset.map(d=>d.price);
const yMean = actual.reduce((a,b)=>a+b,0)/actual.length;
const ssTot = actual.reduce((s,y)=>s+(y-yMean)**2,0);
const ssRes = actual.reduce((s,y,i)=>s+(y-yhat[i])**2,0);
const r2 = 1-ssRes/ssTot;
const mae = actual.reduce((s,y,i)=>s+Math.abs(y-yhat[i]),0)/actual.length;

console.log("\\n=== Predictions vs Actual ===");
dataset.forEach((d,i)=>
  console.log(\`  \${d.sqft}sqft \${d.beds}bed: predicted=$\${yhat[i].toFixed(0)}k actual=$\${d.price}k error=$\${(yhat[i]-d.price).toFixed(0)}k\`)
);
console.log(\`\\nR²: \${r2.toFixed(4)} | MAE: $\${mae.toFixed(1)}k\`);

console.log("\\n=== New Predictions ===");
[[1600,3,12],[2200,4,6],[3500,6,1]].forEach(([s,b,a])=>
  console.log(\`  \${s}sqft \${b}bed \${a}yr → $\${predictPrice(s,b,a).toFixed(0)}k\`)
);`
  },

  // ══════════════════════════════════════════════════════════════
  //  LOGISTIC REGRESSION
  // ══════════════════════════════════════════════════════════════

  {
    id: 'logistic-regression',
    title: 'Logistic Regression',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 65,
    duration: '20 min',
    difficulty: 'Beginner',
    videoId: 'yIYKR4sgzI8',
    headerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
    tags: ['Logistic Regression', 'Classification', 'Sigmoid', 'Probability'],
    mathFormulas: [
      { name: 'Sigmoid', formula: 'σ(z) = 1 / (1 + e⁻ᶻ)  →  output ∈ (0, 1)' },
      { name: 'Log-Loss', formula: 'J = −(1/m)Σ[y·log(ŷ) + (1−y)·log(1−ŷ)]' },
      { name: 'Decision Boundary', formula: 'Predict 1 if σ(Xθ) ≥ 0.5, else predict 0' },
    ],
    realWorldExample: {
      title: 'Credit Card Approval at Capital One',
      description: 'Capital One uses logistic regression as the interpretable backbone of credit approval decisions. Input: income, debt-to-income ratio, credit score, employment history. Output: probability of default. Regulatory requirements (ECOA, Fair Credit Reporting Act) often require the model be explainable — logistic regression\'s coefficients directly show which factors matter most.',
      icon: '💳'
    },
    content: `# Logistic Regression

Despite the name, Logistic Regression is a **classification** algorithm. It predicts the **probability** that a sample belongs to a class.

## Why Not Linear Regression for Classification?

\`\`\`
Problem: predict P(spam) for email

Linear Regression output: could be -0.3 or 1.8
→ Negative probability? > 100% probability? IMPOSSIBLE!

We need output constrained to (0, 1)
Solution: apply the sigmoid function to the linear output!
\`\`\`

## The Sigmoid Function

\`\`\`
σ(z) = 1 / (1 + e⁻ᶻ)

z = −∞ → σ(z) → 0.0
z = 0   → σ(z) = 0.5
z = +∞ → σ(z) → 1.0

Properties:
  • Output always ∈ (0, 1) — valid probability ✓
  • Smooth, differentiable everywhere ✓
  • σ'(z) = σ(z)(1 − σ(z)) — simple gradient ✓
\`\`\`

## The Model

\`\`\`
Step 1: Linear combination
  z = θ₀ + θ₁x₁ + θ₂x₂ + ... = Xθ

Step 2: Apply sigmoid
  P(y=1 | x) = σ(z) = 1 / (1 + e⁻ᶻ)

Step 3: Threshold to classify
  ŷ = 1 if P(y=1|x) ≥ 0.5 (equivalently: z ≥ 0)
  ŷ = 0 if P(y=1|x) < 0.5

Real example — Credit Default:
  z = −3 + 0.002×income − 0.05×debt_ratio + 0.001×credit_score
  P(default) = σ(z) → 0.23 (23% chance of default → APPROVE!)
\`\`\`

## Training: Binary Cross-Entropy Loss

\`\`\`
Loss = −(1/m) Σᵢ [yᵢ·log(ŷᵢ) + (1−yᵢ)·log(1−ŷᵢ)]

When y=1:  Loss = −log(ŷ)       → high cost if ŷ ≈ 0 (confident wrong!)
When y=0:  Loss = −log(1−ŷ)    → high cost if ŷ ≈ 1 (confident wrong!)

Why not MSE? MSE is non-convex for logistic regression
→ Multiple local minima → gradient descent gets stuck
Cross-entropy is convex → guaranteed global minimum!
\`\`\`

## Confusion Matrix & Threshold

\`\`\`
Default threshold = 0.5
But you can adjust based on business needs:

Lower threshold (e.g., 0.3):
  → Catch more positives (higher recall)
  → More false positives (lower precision)
  Use for: cancer screening (never miss a case)

Higher threshold (e.g., 0.7):
  → Fewer false positives (higher precision)
  → Miss more positives (lower recall)
  Use for: spam filter (don't block real emails)
\`\`\`

## Multiclass Extension

\`\`\`
One-vs-Rest (OvR):
  Train K classifiers, one per class
  Each: "Is this class k vs all others?"
  Predict: class with highest probability

Softmax Regression (Multinomial):
  P(y=k|x) = exp(θₖᵀx) / Σⱼ exp(θⱼᵀx)
  Train all classes together
  Probabilities sum to 1 across all classes
\`\`\`

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

lr = LogisticRegression(
    C=1.0,           # regularization (C=1/λ, smaller C = more regularization)
    solver='lbfgs',  # optimization algorithm
    max_iter=1000,
    random_state=42
)
lr.fit(X_train, y_train)

# Probabilities (NOT just class labels)
proba = lr.predict_proba(X_test)[:, 1]  # P(positive class)

# Adjust threshold
y_pred_custom = (proba >= 0.3).astype(int)  # higher recall

print(classification_report(y_test, y_pred_custom))
print(f"AUC-ROC: {roc_auc_score(y_test, proba):.4f}")
\`\`\`

> Logistic Regression is interpretable, fast, probabilistic, and often the right answer. Try it before XGBoost or neural networks.
`,
    quiz: [
      { q: 'Why does logistic regression use sigmoid instead of a linear function?', options: ['Sigmoid is faster to compute', 'Sigmoid constrains output to (0,1) — a valid probability range', 'Sigmoid prevents overfitting', 'Sigmoid makes the model non-linear automatically'], answer: 1 },
      { q: 'What does lowering the classification threshold from 0.5 to 0.3 do?', options: ['Increases precision', 'Decreases both precision and recall', 'Increases recall but decreases precision', 'Has no effect on predictions'], answer: 2 },
      { q: 'Why is Binary Cross-Entropy preferred over MSE for logistic regression?', options: ['Cross-entropy is faster', 'MSE creates a non-convex loss surface with local minima for probabilities; cross-entropy is convex', 'MSE only works for regression', 'Cross-entropy handles missing values better'], answer: 1 },
      { q: 'In logistic regression, C=0.01 (very small) means:', options: ['No regularization', 'Heavy L2 regularization (small C = large λ = more penalty)', 'Only L1 regularization', 'The model uses 100 iterations'], answer: 1 },
    ],
    codeTemplate: `// ── Logistic Regression from Scratch ──
// Spam email classifier with full training loop

function sigmoid(z) { return 1/(1+Math.exp(-z)); }
function predict(X, w, b) { return X.map(x=>sigmoid(x.reduce((s,xi,i)=>s+xi*w[i],b))); }

function logLoss(y, yhat) {
  const eps=1e-15;
  return -y.reduce((s,yi,i)=>{
    const p=Math.min(Math.max(yhat[i],eps),1-eps);
    return s+yi*Math.log(p)+(1-yi)*Math.log(1-p);
  },0)/y.length;
}

function train(X, y, lr=0.1, epochs=500) {
  const m=X.length, n=X[0].length;
  let w=new Array(n).fill(0), b=0;
  const log=[];
  for (let e=0;e<epochs;e++) {
    const yhat=predict(X,w,b);
    const err=yhat.map((p,i)=>p-y[i]);
    w=w.map((wi,j)=>wi-lr*err.reduce((s,e,i)=>s+e*X[i][j],0)/m);
    b-=lr*err.reduce((a,b)=>a+b,0)/m;
    if(e%100===0) log.push({e, loss:logLoss(y,yhat).toFixed(4)});
  }
  return {w,b,log};
}

// Spam dataset: [caps_ratio, exclamation_count, link_count, word_free_freq]
const X=[
  [0.02, 1, 0, 0.0], // ham
  [0.01, 0, 1, 0.0], // ham
  [0.45, 5, 3, 0.8], // spam
  [0.38, 4, 2, 0.7], // spam
  [0.03, 1, 0, 0.0], // ham
  [0.52, 7, 5, 0.9], // spam
  [0.02, 0, 1, 0.0], // ham
  [0.41, 4, 3, 0.6], // spam
  [0.04, 1, 0, 0.0], // ham
  [0.35, 3, 2, 0.5], // spam
];
const y=[0,0,1,1,0,1,0,1,0,1];
const featureNames=['caps_ratio','exclamations','links','word_free'];

console.log("=== Logistic Regression: Spam Classifier ===");
const {w,b,log}=train(X,y,0.5,500);

console.log("\\nTraining Loss:");
log.forEach(h=>console.log(\`  Epoch \${h.e}: \${h.loss}\`));

console.log("\\nLearned weights (larger = stronger signal):");
featureNames.forEach((f,i)=>console.log(\`  \${f.padEnd(15)}: \${w[i].toFixed(4)}\`));
console.log(\`  bias: \${b.toFixed(4)}\`);

// Evaluate
const probs=predict(X,w,b);
const preds=probs.map(p=>p>=0.5?1:0);
const correct=preds.filter((p,i)=>p===y[i]).length;
let tp=0,fp=0,fn=0,tn=0;
preds.forEach((p,i)=>{if(p===1&&y[i]===1)tp++;else if(p===1)fp++;else if(y[i]===1)fn++;else tn++;});
const prec=tp/(tp+fp)||0, rec=tp/(tp+fn)||0;
const f1=2*prec*rec/(prec+rec)||0;

console.log("\\n=== Classification Results ===");
y.forEach((_,i)=>{
  const status=preds[i]===y[i]?'✓':'✗';
  const label=preds[i]?'SPAM':'HAM';
  console.log(\`  Sample \${i+1}: P(spam)=\${probs[i].toFixed(3)} → \${label} [\${status}]\`);
});
console.log(\`\\nAccuracy: \${(correct/X.length*100).toFixed(0)}%\`);
console.log(\`Precision: \${(prec*100).toFixed(0)}% | Recall: \${(rec*100).toFixed(0)}% | F1: \${(f1*100).toFixed(0)}%\`);

// New email
const newEmail=[0.43,5,3,0.85];
const spamP=sigmoid(newEmail.reduce((s,xi,i)=>s+xi*w[i],b));
console.log(\`\\nNew email features: [\${newEmail}]\`);
console.log(\`→ P(spam) = \${(spamP*100).toFixed(1)}% → \${spamP>=0.5?'🚫 SPAM':'✅ HAM'}\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  DECISION TREES
  // ══════════════════════════════════════════════════════════════

  {
    id: 'decision-trees',
    title: 'Decision Trees',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 70,
    duration: '22 min',
    difficulty: 'Intermediate',
    videoId: 'RmajweUFKvM',
    headerImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
    tags: ['Decision Tree', 'Gini', 'Entropy', 'CART', 'Overfitting'],
    mathFormulas: [
      { name: 'Gini Impurity', formula: 'Gini = 1 − Σₖ pₖ²' },
      { name: 'Entropy', formula: 'H = −Σₖ pₖ · log₂(pₖ)' },
      { name: 'Information Gain', formula: 'IG = H(parent) − Σ (|child|/|parent|) · H(child)' },
    ],
    realWorldExample: {
      title: 'Loan Approval at Wells Fargo',
      description: 'Wells Fargo uses interpretable decision tree rules that loan officers can explain to customers: "If income > $60K AND debt-ratio < 0.35 AND credit_score > 680 AND employment_years > 2 → APPROVE." Regulators require this explainability under Fair Lending laws. A neural network with identical accuracy would be rejected for production.',
      icon: '🏦'
    },
    content: `# Decision Trees

A Decision Tree makes predictions by asking a series of **yes/no questions** about features — exactly like a flowchart for humans.

## How Decision Trees Work

\`\`\`
                    ┌────────────────────┐
                    │  Support Calls > 4?│
                    └────────────────────┘
                         /          \\
                       YES           NO
                       /              \\
        ┌─────────────────┐    ┌──────────────────┐
        │ Tenure < 6 mon? │    │ Contract=Monthly? │
        └─────────────────┘    └──────────────────┘
           /      \\                /        \\
          YES      NO            YES         NO
          /          \\           /             \\
       [CHURN]  [CHURN]    [CHURN]          [STAY]
         85%      62%        41%              8%
\`\`\`

**Key terms:**
- Root node: first question (most informative split)
- Internal node: intermediate question
- Leaf node: final prediction (class + confidence)
- Depth: number of levels (controls overfitting)

## How to Choose the Best Split?

### Gini Impurity (sklearn default)
\`\`\`
Gini = 1 − Σₖ pₖ²

Pure node (one class):    Gini = 1 − 1² = 0     (perfect!)
50/50 split (2 classes):  Gini = 1 − (0.5²+0.5²) = 0.5 (worst)

For split on feature A:
  Gini_split = (n_left/n)×Gini_left + (n_right/n)×Gini_right
  Pick feature with LOWEST Gini_split (most pure children)
\`\`\`

### Entropy & Information Gain (ID3 algorithm)
\`\`\`
H(S) = −Σₖ pₖ × log₂(pₖ)

Pure (all one class): H = 0    (no uncertainty)
50/50 binary:         H = 1    (max uncertainty)

Information Gain = H(parent) − Σ (|child|/|parent|) × H(child)
Pick feature with HIGHEST Information Gain
\`\`\`

### Worked Example

\`\`\`
Root: 14 customers: 9 churn, 5 stay
H(root) = −(9/14)log₂(9/14) − (5/14)log₂(5/14) = 0.940

Split on "support_calls > 4":
  High calls (6 customers): 5 churn, 1 stay → H = 0.650
  Low calls  (8 customers): 4 churn, 4 stay → H = 1.000

IG = 0.940 − (6/14×0.650 + 8/14×1.000) = 0.940 − 0.849 = 0.091

Try all features, pick the one with highest IG!
\`\`\`

## Preventing Overfitting

\`\`\`
Deep tree problem:
  Train accuracy: 100%  (memorized every sample)
  Test accuracy:  64%   (didn't generalize)

Solutions:
  max_depth=5        → stop growing after 5 levels
  min_samples_split=10 → need 10+ samples to split a node
  min_samples_leaf=5   → each leaf must have 5+ samples
  max_features='sqrt'  → consider √n features per split (like RF)
  ccp_alpha=0.01       → cost-complexity pruning
\`\`\`

\`\`\`python
from sklearn.tree import DecisionTreeClassifier, export_text

dt = DecisionTreeClassifier(
    criterion='gini',       # or 'entropy'
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
dt.fit(X_train, y_train)

# Print human-readable rules!
print(export_text(dt, feature_names=feature_names))
\`\`\`

## Decision Tree for Regression

For regression, leaf nodes predict the **mean** of all training samples that fall there. Split criterion: minimize MSE within each child node.

## Advantages vs Disadvantages

| Advantage | Disadvantage |
|-----------|-------------|
| Human-interpretable | High variance (unstable) |
| No feature scaling needed | Overfits easily without pruning |
| Handles mixed types | Biased toward high-cardinality features |
| Fast prediction | Piecewise linear boundaries |
| Built-in feature importance | Sensitive to small data changes |

> Decision Trees are the building blocks of Random Forests and Gradient Boosting — the two most powerful tabular ML algorithms.
`,
    quiz: [
      { q: 'What does Gini Impurity = 0 mean for a node?', options: ['All samples have the same class — perfectly pure node', 'The node is split exactly 50/50', 'The split is invalid', 'The node needs further splitting'], answer: 0 },
      { q: 'Why does a decision tree with max_depth=None (unlimited) overfit?', options: ['It uses too many features', 'It memorizes the training data by creating leaf nodes for every sample', 'It cannot handle categorical features', 'Unlimited depth causes numerical errors'], answer: 1 },
      { q: 'What is Information Gain?', options: ['The speed improvement from using a decision tree', 'The reduction in entropy/impurity achieved by splitting on a feature', 'The number of training samples correctly classified', 'The number of features used in the tree'], answer: 1 },
      { q: 'Decision trees don\'t require feature scaling. Why?', options: ['They only work with binary features', 'Splits are based on relative orderings and thresholds, not absolute magnitudes', 'They always use categorical features', 'The sklearn implementation handles scaling internally'], answer: 1 },
    ],
    codeTemplate: `// ── Decision Tree: Gini, Entropy, IG from Scratch ──

function gini(labels) {
  const n=labels.length, counts={};
  labels.forEach(l=>counts[l]=(counts[l]||0)+1);
  return 1-Object.values(counts).reduce((s,c)=>s+(c/n)**2,0);
}

function entropy(labels) {
  const n=labels.length, counts={};
  labels.forEach(l=>counts[l]=(counts[l]||0)+1);
  return -Object.values(counts).reduce((s,c)=>{const p=c/n;return s+(p>0?p*Math.log2(p):0);},0);
}

function informationGain(parent, children) {
  const n=parent.length;
  return entropy(parent) - children.reduce((s,c)=>s+(c.length/n)*entropy(c),0);
}

function bestSplitNumeric(data, feature) {
  const vals=[...new Set(data.map(d=>d[feature]))].sort((a,b)=>a-b);
  let bestIG=-Infinity, bestThresh=null;
  for (let i=0;i<vals.length-1;i++) {
    const thresh=(vals[i]+vals[i+1])/2;
    const left=data.filter(d=>d[feature]<=thresh).map(d=>d.label);
    const right=data.filter(d=>d[feature]>thresh).map(d=>d.label);
    if(!left.length||!right.length) continue;
    const ig=informationGain(data.map(d=>d.label),[left,right]);
    if(ig>bestIG){bestIG=ig;bestThresh=thresh;}
  }
  return {threshold:bestThresh,ig:bestIG};
}

// Churn dataset
const data=[
  {support_calls:1,tenure:24,spend:95,contract:0,label:'stay'},
  {support_calls:8,tenure:3,spend:38,contract:1,label:'churn'},
  {support_calls:0,tenure:60,spend:120,contract:0,label:'stay'},
  {support_calls:5,tenure:6,spend:45,contract:1,label:'churn'},
  {support_calls:2,tenure:18,spend:82,contract:0,label:'stay'},
  {support_calls:7,tenure:4,spend:42,contract:1,label:'churn'},
  {support_calls:1,tenure:36,spend:105,contract:0,label:'stay'},
  {support_calls:6,tenure:5,spend:50,contract:1,label:'churn'},
  {support_calls:0,tenure:48,spend:135,contract:0,label:'stay'},
  {support_calls:9,tenure:2,spend:35,contract:1,label:'churn'},
];

const allLabels=data.map(d=>d.label);
console.log("=== Decision Tree Analysis ===");
console.log(\`Dataset: \${data.length} samples | Churn: \${allLabels.filter(l=>l==='churn').length} | Stay: \${allLabels.filter(l=>l==='stay').length}\`);
console.log(\`Root Entropy: \${entropy(allLabels).toFixed(4)}\`);
console.log(\`Root Gini:    \${gini(allLabels).toFixed(4)}\`);

// Find best split for each feature
console.log("\\n=== Information Gain per Feature ===");
['support_calls','tenure','spend'].forEach(f=>{
  const {threshold,ig}=bestSplitNumeric(data,f);
  const left=data.filter(d=>d[f]<=threshold).map(d=>d.label);
  const right=data.filter(d=>d[f]>threshold).map(d=>d.label);
  const bar='█'.repeat(Math.round(ig*50));
  console.log(\`\\n  Feature: \${f} | Best threshold: \${threshold} | IG: \${ig.toFixed(4)} \${bar}\`);
  console.log(\`    Left  (<=\${threshold}): [\${left}]\`);
  console.log(\`    Right (> \${threshold}): [\${right}]\`);
  console.log(\`    Left Gini: \${gini(left).toFixed(3)} | Right Gini: \${gini(right).toFixed(3)}\`);
});

// Contract categorical split
const c0=data.filter(d=>d.contract===0).map(d=>d.label);
const c1=data.filter(d=>d.contract===1).map(d=>d.label);
const contractIG=informationGain(allLabels,[c0,c1]);
console.log(\`\\n  Feature: contract | IG: \${contractIG.toFixed(4)} \${'█'.repeat(Math.round(contractIG * 50))}\`);
console.log(\`    Annual: [\${c0}] → Gini: \${gini(c0).toFixed(3)}\`);
console.log(\`    Monthly: [\${c1}] → Gini: \${gini(c1).toFixed(3)}\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  MODEL EVALUATION
  // ══════════════════════════════════════════════════════════════

  {
    id: 'model-evaluation',
    title: 'Model Evaluation & Cross-Validation',
    category: 'Phase 8 — Evaluation',
    phase: 8,
    xp: 60,
    duration: '20 min',
    difficulty: 'Beginner',
    videoId: 'Kdsp6soqA7o',
    headerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    tags: ['Evaluation', 'Cross-Validation', 'F1', 'AUC', 'Confusion Matrix'],
    mathFormulas: [
      { name: 'Precision', formula: 'P = TP / (TP + FP)' },
      { name: 'Recall', formula: 'R = TP / (TP + FN)' },
      { name: 'F1 Score', formula: 'F1 = 2PR / (P + R)' },
      { name: 'R² (Regression)', formula: 'R² = 1 − SS_res / SS_tot' },
    ],
    realWorldExample: {
      title: 'Why 99% Accuracy is Useless — COVID Screening',
      description: 'In January 2020, COVID prevalence was ~0.1%. A model predicting "not COVID" for everyone achieves 99.9% accuracy — yet it catches zero cases. Hospitals use sensitivity (recall=100%) as the primary metric — missing one COVID patient can cause an outbreak. This is why metric selection is a critical business decision, not a technical afterthought.',
      icon: '🏥'
    },
    content: `# Model Evaluation & Cross-Validation

The right evaluation setup is as important as the right algorithm. A great model can look terrible with wrong metrics, and a terrible model can look great.

## The Confusion Matrix

\`\`\`
              Predicted: CHURN | Predicted: STAY
Actual: CHURN   TP = 82        |    FN = 18
Actual: STAY    FP = 24        |    TN = 376

Total: 500 customers

TP (True Positive):  Predicted churn, actually churned ✓
TN (True Negative):  Predicted stay, actually stayed ✓
FP (False Positive): Predicted churn, actually stayed ✗ (Type I)
FN (False Negative): Predicted stay, actually churned ✗ (Type II)
\`\`\`

## Classification Metrics

\`\`\`
Accuracy  = (TP+TN)/(TP+TN+FP+FN) = (82+376)/500 = 91.6%
            ⚠️ Misleading if imbalanced!

Precision = TP/(TP+FP) = 82/(82+24) = 77.4%
            "Of all predicted churners, 77% actually churn"
            Low FP priority: use when false alarms are costly

Recall    = TP/(TP+FN) = 82/(82+18) = 82.0%
            "Of all actual churners, we caught 82%"
            Low FN priority: use when misses are costly

F1 Score  = 2×P×R/(P+R) = 2×0.774×0.82/(0.774+0.82) = 0.796
            Balance between precision and recall

Specificity = TN/(TN+FP) = 376/400 = 94%
              "Of all actual non-churners, 94% correctly identified"
\`\`\`

## AUC-ROC — The Gold Standard for Classification

\`\`\`
ROC Curve: plot TPR vs FPR at EVERY possible threshold
  TPR = Recall = TP/(TP+FN)
  FPR = FP/(FP+TN)

AUC = Area Under ROC Curve
  1.0 → Perfect classifier
  0.5 → Random guessing (diagonal line)
  0.0 → Perfectly wrong

Interpretation: If I randomly pick one real churner and one real stayer,
AUC = probability that the model ranks the churner higher.
\`\`\`

## Cross-Validation — Reliable Estimation

Never evaluate on training data — it's biased!

\`\`\`
K-Fold Cross-Validation (K=5):

Split data into 5 equal folds:
  [■■■■■] [■■■■■] [■■■■■] [■■■■■] [■■■■■]
     F1       F2       F3       F4       F5

Round 1: Train on F2,F3,F4,F5 → Test on F1 → Score: 0.84
Round 2: Train on F1,F3,F4,F5 → Test on F2 → Score: 0.82
Round 3: Train on F1,F2,F4,F5 → Test on F3 → Score: 0.87
Round 4: Train on F1,F2,F3,F5 → Test on F4 → Score: 0.83
Round 5: Train on F1,F2,F3,F4 → Test on F5 → Score: 0.85

Final: mean=0.842 ± std=0.018

Much more reliable than a single 80/20 split!
\`\`\`

\`\`\`python
from sklearn.model_selection import cross_val_score, StratifiedKFold

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)  # maintains class ratio
scores = cross_val_score(model, X, y, cv=cv, scoring='f1')
print(f"F1: {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

## Regression Metrics

\`\`\`
MAE  = mean(|y - ŷ|)       Interpretable, same units as y
MSE  = mean((y - ŷ)²)      Penalizes large errors heavily
RMSE = √MSE                 Same units as y, MSE-like sensitivity
MAPE = mean(|y-ŷ|/|y|)×100 Percentage error (intuitive)
R²   = 1 - SS_res/SS_tot   Fraction of variance explained
\`\`\`

## Metric Selection Guide

| Problem | Recommended Metric |
|---------|-------------------|
| Balanced classification | Accuracy, F1 |
| Imbalanced classification | F1, AUC-ROC, Precision-Recall AUC |
| Miss cost > false alarm | Recall |
| False alarm cost > miss | Precision |
| Regression, outliers OK | RMSE |
| Regression, robust | MAE |
| Ranking/probability | AUC-ROC |

> Pick your metric BEFORE you look at results. Choosing the metric after, to make your model look better, is p-hacking and will lead to production failures.
`,
    quiz: [
      { q: 'What does AUC = 0.5 indicate about a classifier?', options: ['Perfect performance', 'No better than random guessing', '50% accuracy', 'Balanced precision and recall'], answer: 1 },
      { q: 'Why is Stratified K-Fold preferred over regular K-Fold for imbalanced datasets?', options: ['It is faster', 'It ensures each fold maintains the same class proportion as the full dataset', 'It uses more training data', 'It prevents overfitting'], answer: 1 },
      { q: 'You have 95% negative class, 5% positive. Which is the BEST primary metric?', options: ['Accuracy (will be ~95% even for useless model)', 'F1 score or AUC-ROC (handles imbalance properly)', 'R² score', 'RMSE'], answer: 1 },
      { q: 'What does RMSE measure that MAE does not?', options: ['Directional bias (overestimate vs underestimate)', 'Sensitivity to outliers — larger errors are penalized disproportionately', 'The percentage error', 'Relative error'], answer: 1 },
    ],
    codeTemplate: `// ── Model Evaluation Metrics from Scratch ──

function confusionMatrix(actual,pred){
  let TP=0,TN=0,FP=0,FN=0;
  actual.forEach((a,i)=>{
    if(a===1&&pred[i]===1)TP++;else if(a===0&&pred[i]===0)TN++;
    else if(a===0&&pred[i]===1)FP++;else FN++;
  });return{TP,TN,FP,FN};
}
function metrics({TP,TN,FP,FN}){
  const n=TP+TN+FP+FN;
  const acc=(TP+TN)/n,prec=TP/(TP+FP)||0,rec=TP/(TP+FN)||0;
  const f1=2*prec*rec/(prec+rec)||0,spec=TN/(TN+FP)||0;
  return{acc,prec,rec,f1,spec};
}
function regMetrics(y,yhat){
  const n=y.length,yMean=y.reduce((a,b)=>a+b,0)/n;
  const mae=y.reduce((s,yi,i)=>s+Math.abs(yi-yhat[i]),0)/n;
  const mse=y.reduce((s,yi,i)=>s+(yi-yhat[i])**2,0)/n;
  const ssTot=y.reduce((s,yi)=>s+(yi-yMean)**2,0);
  const ssRes=y.reduce((s,yi,i)=>s+(yi-yhat[i])**2,0);
  return{mae,rmse:Math.sqrt(mse),r2:1-ssRes/ssTot};
}

// ── Classification: Cancer Detection ──
const actual=[1,1,0,1,0,0,1,0,1,1,0,0,1,0,0,1,0,1,0,1];
const modelA=[1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1]; // conservative
const modelB=[1,1,1,1,0,1,1,1,1,1,0,0,1,0,0,1,1,1,0,1]; // aggressive
const naive =new Array(20).fill(0);                        // always "no cancer"

console.log("=== Cancer Detection Evaluation ===\\n");
console.log(\`Prevalence: \${actual.filter(x=>x===1).length}/\${actual.length} (\${(actual.filter(x=>x===1).length/actual.length*100).toFixed(0)}%) positive\\n\`);

[['Naive (always negative)', naive], ['Model A (conservative)', modelA], ['Model B (aggressive)', modelB]]
  .forEach(([name,pred])=>{
    const cm=confusionMatrix(actual,pred);
    const m=metrics(cm);
    console.log(\`--- \${name} ---\`);
    console.log(\`  Confusion: TP=\${cm.TP} FP=\${cm.FP} FN=\${cm.FN} TN=\${cm.TN}\`);
    console.log(\`  Accuracy:  \${(m.acc*100).toFixed(1)}%  ← Don't trust this alone!\`);
    console.log(\`  Precision: \${(m.prec*100).toFixed(1)}%  (of flagged, how many real)\`);
    console.log(\`  Recall:    \${(m.rec*100).toFixed(1)}%  (of real, how many caught) ← most important!\`);
    console.log(\`  F1 Score:  \${(m.f1*100).toFixed(1)}%\\n\`);
  });

// ── K-Fold Cross-Validation simulation ──
console.log("=== 5-Fold Cross-Validation Simulation ===");
const allScores=[];
for(let fold=0;fold<5;fold++){
  const testAct=actual.filter((_,i)=>i%5===fold);
  const testPred=modelA.filter((_,i)=>i%5===fold);
  const cm=confusionMatrix(testAct,testPred);
  const {f1}=metrics(cm);
  allScores.push(f1);
  console.log(\`  Fold \${fold+1}: F1 = \${f1.toFixed(3)}\`);
}
const mean=allScores.reduce((a,b)=>a+b,0)/allScores.length;
const std=Math.sqrt(allScores.reduce((s,x)=>s+(x-mean)**2,0)/allScores.length);
console.log(\`  Mean F1: \${mean.toFixed(3)} ± \${std.toFixed(3)}\`);

// ── Regression: House Prices ──
console.log("\\n=== Regression Evaluation ===");
const yTrue=[250,300,320,280,350,310,290,340,380,260];
const yPred=[243,308,315,285,345,318,295,335,390,255];
const rm=regMetrics(yTrue,yPred);
console.log(\`  MAE:  $\${rm.mae.toFixed(1)}k (avg absolute error)\`);
console.log(\`  RMSE: $\${rm.rmse.toFixed(1)}k (punishes big errors more)\`);
console.log(\`  R²:   \${rm.r2.toFixed(4)} (\${(rm.r2*100).toFixed(1)}% variance explained)\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  HYPERPARAMETER TUNING
  // ══════════════════════════════════════════════════════════════

  {
    id: 'hyperparameter-tuning',
    title: 'Hyperparameter Tuning',
    category: 'Phase 9 — Model Improvement',
    phase: 9,
    xp: 65,
    duration: '18 min',
    difficulty: 'Intermediate',
    videoId: 'TwJ8aSZoh2U',
    headerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    tags: ['Hyperparameter Tuning', 'Grid Search', 'Bayesian Optimization', 'Overfitting'],
    mathFormulas: [
      { name: 'Grid Search', formula: 'Evaluate all combinations in {α₁,...,αₙ} × {λ₁,...,λₙ}' },
      { name: 'Bayesian Optimization', formula: "x* = argmax EI(x) = E[max(f(x)−f(x*), 0)]" },
    ],
    realWorldExample: {
      title: 'AutoML at Google: Automatic Hyperparameter Search',
      description: 'Google\'s AutoML and Neural Architecture Search (NAS) systems automatically tune hyperparameters for production models. Google Brain used NAS to find the EfficientNet architecture — it outperformed human-designed nets while being 8× smaller. At scale, hyperparameter tuning can be the difference between 85% and 95% model accuracy.',
      icon: '🔧'
    },
    content: `# Hyperparameter Tuning

Parameters are learned during training. **Hyperparameters** are set before training and control the learning process — they're the dials you tune to get the best model.

## Parameters vs Hyperparameters

\`\`\`
Parameters (LEARNED during training):
  Linear Regression: slope θ₁, intercept θ₀
  Neural Network: all weights W and biases b
  SVM: support vector coefficients

Hyperparameters (SET BEFORE training):
  Learning rate α
  Regularization strength λ (or C in SVM)
  Tree depth, number of trees
  Dropout rate
  Batch size, number of epochs
  Number of hidden layers / neurons
\`\`\`

## Common Hyperparameters by Algorithm

| Algorithm | Key Hyperparameters |
|-----------|-------------------|
| Linear/Logistic Regression | C (regularization strength) |
| Decision Tree | max_depth, min_samples_leaf |
| Random Forest | n_estimators, max_features, max_depth |
| XGBoost | learning_rate, max_depth, n_estimators, subsample |
| SVM | C, kernel, gamma |
| Neural Network | learning_rate, hidden_size, dropout, batch_size |
| KNN | n_neighbors, metric |

## Method 1: Grid Search CV

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'max_depth':        [3, 5, 7, 10, None],
    'n_estimators':     [50, 100, 200],
    'min_samples_leaf': [1, 5, 10],
    'max_features':     ['sqrt', 'log2'],
}
# Total: 5 × 3 × 3 × 2 = 90 combinations × 5 folds = 450 fits!

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='f1',
    n_jobs=-1,       # use all CPU cores
    verbose=2
)
grid_search.fit(X_train, y_train)

print(grid_search.best_params_)
print(grid_search.best_score_)
model = grid_search.best_estimator_
\`\`\`

**Problem:** Exponential in number of hyperparameters. 5 params × 5 values each = 5⁵ = 3,125 combinations!

## Method 2: Random Search CV

\`\`\`python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, loguniform

param_dist = {
    'max_depth':        randint(3, 20),
    'n_estimators':     randint(50, 500),
    'learning_rate':    loguniform(1e-4, 1e-1),
    'subsample':        [0.6, 0.7, 0.8, 0.9, 1.0],
}

random_search = RandomizedSearchCV(
    XGBClassifier(random_state=42),
    param_dist,
    n_iter=50,    # try 50 random combinations (vs 3125 for full grid)
    cv=5,
    scoring='roc_auc',
    n_jobs=-1,
    random_state=42
)

# Research shows: random search finds equally good solutions
# with 5-10× fewer evaluations than grid search!
\`\`\`

## Method 3: Bayesian Optimization

\`\`\`python
# pip install optuna
import optuna

def objective(trial):
    params = {
        'max_depth':     trial.suggest_int('max_depth', 3, 10),
        'learning_rate': trial.suggest_float('learning_rate', 1e-4, 0.3, log=True),
        'n_estimators':  trial.suggest_int('n_estimators', 100, 1000),
        'subsample':     trial.suggest_float('subsample', 0.6, 1.0),
    }
    model = XGBClassifier(**params, random_state=42)
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='roc_auc')
    return scores.mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)

print(study.best_params)
print(f"Best AUC: {study.best_value:.4f}")
\`\`\`

## Learning Curve Analysis

\`\`\`python
from sklearn.model_selection import learning_curve

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, scoring='f1',
    train_sizes=np.linspace(0.1, 1.0, 10)
)

# High bias (underfitting):
#   Both curves are low and close to each other
#   → Need more complex model or better features
#
# High variance (overfitting):
#   Train score high, val score low, large gap
#   → Need more data, regularization, or simpler model
\`\`\`

## Practical Tuning Strategy

\`\`\`
Step 1: Start with defaults → baseline score
Step 2: Identify what's wrong
          Large train-val gap → overfitting → tune regularization
          Both scores low     → underfitting → more features/complexity
Step 3: Run RandomizedSearch (50-100 trials) for broad exploration
Step 4: Run Bayesian (Optuna) around best region
Step 5: Manual fine-tuning of top 1-2 params
Step 6: Re-evaluate on held-out TEST set (ONLY ONCE!)
\`\`\`

> Never look at test set performance while tuning. Every time you peek at the test set and adjust, you're overfitting to it.
`,
    quiz: [
      { q: 'What is the main disadvantage of Grid Search over Random Search?', options: ['Grid Search is less accurate', 'Grid Search evaluates every combination, which is exponentially expensive', 'Grid Search doesn\'t work with cross-validation', 'Grid Search cannot tune neural networks'], answer: 1 },
      { q: 'Why does Bayesian Optimization outperform Random Search?', options: ['It uses more compute per trial', 'It learns from previous evaluations to guide search toward promising regions', 'It only works on convex problems', 'It removes the need for cross-validation'], answer: 1 },
      { q: 'Learning curves show both train and validation scores are low. What is indicated?', options: ['Overfitting — add regularization', 'Underfitting — model is too simple or features are poor', 'Perfect balance achieved', 'Need to increase learning rate only'], answer: 1 },
      { q: 'Why should you evaluate on the held-out test set ONLY ONCE at the very end?', options: ['Test evaluation is computationally expensive', 'Looking at test results multiple times leads to implicit tuning to the test set', 'The test set cannot be reused after first evaluation', 'Cross-validation already uses the test set'], answer: 1 },
    ],
    codeTemplate: `// ── Hyperparameter Tuning Simulation ──
// Manual grid search + learning curve analysis

function euclidean(a, b) { return Math.sqrt(a.reduce((s,x,i)=>s+(x-b[i])**2,0)); }

function knnPredict(trainX, trainY, testX, k) {
  return testX.map(qx => {
    const dists = trainX.map((x,i) => ({dist:euclidean(x,qx),label:trainY[i]}));
    const knn = dists.sort((a,b)=>a.dist-b.dist).slice(0,k);
    const votes = {};
    knn.forEach(n=>votes[n.label]=(votes[n.label]||0)+1);
    return parseInt(Object.entries(votes).sort((a,b)=>b[1]-a[1])[0][0]);
  });
}

function accuracy(actual, pred) {
  return actual.filter((a,i)=>a===pred[i]).length/actual.length;
}

function crossValScore(X, y, k, folds=5) {
  const n=X.length, size=Math.floor(n/folds), scores=[];
  for(let f=0;f<folds;f++){
    const testIdx=Array.from({length:size},(_,i)=>f*size+i);
    const testSet=new Set(testIdx);
    const trainX=X.filter((_,i)=>!testSet.has(i));
    const trainY=y.filter((_,i)=>!testSet.has(i));
    const testX=X.filter((_,i)=>testSet.has(i));
    const testY=y.filter((_,i)=>testSet.has(i));
    const preds=knnPredict(trainX,trainY,testX,k);
    scores.push(accuracy(testY,preds));
  }
  const mean=scores.reduce((a,b)=>a+b,0)/scores.length;
  const std=Math.sqrt(scores.reduce((s,x)=>s+(x-mean)**2,0)/scores.length);
  return{mean,std,scores};
}

function genData(n, seed=42) {
  let r=seed;
  const rand=()=>{r=(r*1664525+1013904223)%2**32;return r/2**32;};
  return Array.from({length:n},()=>{
    const cls=rand()>0.5?1:0;
    return{x:[cls*2+rand()*1.5,cls*2+rand()*1.5],y:cls};
  });
}

const dataset=genData(80);
const X=dataset.map(d=>d.x);
const y=dataset.map(d=>d.y);

console.log("=== Grid Search: K-Nearest Neighbors ===");
console.log("Tuning hyperparameter K using 5-fold CV\\n");

const kValues=[1,3,5,7,9,11,15,21];
const results=[];

kValues.forEach(k=>{
  const{mean,std}=crossValScore(X,y,k,5);
  results.push({k,mean,std});
  const bar='█'.repeat(Math.round(mean*30));
  console.log(\`K=\${String(k).padStart(2)}: mean=\${mean.toFixed(3)} ±\${std.toFixed(3)} \${bar}\`);
});

const best=results.reduce((a,b)=>a.mean>b.mean?a:b);
console.log(\`\\n✅ Best K = \${best.k} with CV accuracy = \${best.mean.toFixed(3)} ±\${best.std.toFixed(3)}\`);

console.log("\\n=== Learning Curve (K="+best.k+") ===");
console.log("How much data do we need?\\n");

const trainSizes=[10,20,30,40,50,60,70];
trainSizes.forEach(size=>{
  const subset_X=X.slice(0,size), subset_y=y.slice(0,size);
  const trainPred=knnPredict(subset_X,subset_y,subset_X,best.k);
  const trainAcc=accuracy(subset_y,trainPred);
  const valPred=knnPredict(subset_X,subset_y,X.slice(size,size+10),best.k);
  const valAcc=accuracy(y.slice(size,size+10),valPred);
  const gap=trainAcc-valAcc;
  const status=gap>0.15?'⚠️ overfit':gap<0.05?'✓ balanced':'~ slight overfit';
  console.log(\`  n=\${String(size).padStart(2)}: train=\${trainAcc.toFixed(2)} val=\${valAcc.toFixed(2)} gap=\${gap.toFixed(2)} \${status}\`);
});`
  },

  // ══════════════════════════════════════════════════════════════
  //  RANDOM FOREST & ENSEMBLE
  // ══════════════════════════════════════════════════════════════

  {
    id: 'random-forests',
    title: 'Random Forests & Ensemble Methods',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 80,
    duration: '25 min',
    difficulty: 'Intermediate',
    videoId: 'J4Wdy0Wc_xQ',
    headerImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
    tags: ['Random Forest', 'Bagging', 'Boosting', 'XGBoost', 'Ensemble'],
    mathFormulas: [
      { name: 'Bagging Prediction', formula: 'ŷ = (1/T) Σₜ fₜ(x)  (average of T trees)' },
      { name: 'Bias-Variance', formula: 'Error = Bias² + Variance + Noise' },
      { name: 'Gradient Boosting', formula: 'Fₘ(x) = Fₘ₋₁(x) + η · hₘ(x)' },
    ],
    realWorldExample: {
      title: 'XGBoost Wins 60% of Kaggle Competitions',
      description: 'Between 2015-2021, XGBoost (gradient boosted trees) won the majority of Kaggle tabular data competitions. It\'s used in production at Airbnb (pricing), Uber (ETA), and Goldman Sachs (risk). Random Forest powers Spotify\'s real-time song recommendations. These two algorithms are the go-to choice for any structured/tabular data problem.',
      icon: '🏆'
    },
    content: `# Random Forests & Ensemble Methods

Ensemble methods combine **many weak models** into one strong one. The most powerful tabular ML algorithms — Random Forest and XGBoost — are both ensemble methods.

## Why Ensembles Work — Wisdom of Crowds

\`\`\`
Problem: Single decision tree is unstable
  Change 5 training samples → completely different tree!
  Train: 98%,  Test: 72%  (high variance, overfits)

Solution: Average 100 trees trained on different data subsets
  Each tree sees different data → makes different errors
  Errors cancel out when averaging!
  Train: 95%,  Test: 89%  (variance reduced dramatically)

Math: If N independent classifiers each have error rate ε < 0.5,
  Ensemble error → 0 as N → ∞ (law of large numbers!)
\`\`\`

## Bias-Variance Tradeoff

\`\`\`
Total Error = Bias² + Variance + Irreducible Noise

Bias²:    Error from wrong assumptions (underfitting)
Variance: Error from sensitivity to training data (overfitting)

Deep single tree:    Low bias, HIGH variance → overfits
Random Forest:       Low bias, Low variance → bagging reduces variance!
Linear model:        HIGH bias, Low variance → underfits
\`\`\`

## Random Forest — Bagging + Feature Randomness

\`\`\`
Algorithm:
  For t = 1 to T (e.g., T=500 trees):
    1. Bootstrap sample: draw n samples WITH replacement
       (~37% of samples are excluded from each tree — "out-of-bag")
    2. Grow full decision tree BUT:
       At each split, consider only √(num_features) random features
       (This decorrelates trees → better ensemble!)
    3. No pruning — grow trees fully

Prediction:
  Classification: majority vote of all T trees
  Regression:     average of all T trees

Key benefit: OOB (Out-of-Bag) samples give FREE validation!
  No need for separate validation set.
\`\`\`

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=500,      # number of trees
    max_features='sqrt',   # √n features per split
    max_depth=None,        # grow full trees
    bootstrap=True,        # bagging
    oob_score=True,        # free OOB validation
    n_jobs=-1,             # parallel training
    random_state=42
)
rf.fit(X_train, y_train)

print(f"OOB Score: {rf.oob_score_:.4f}")

# Feature importance
fi = pd.Series(rf.feature_importances_, index=feature_names)
print(fi.sort_values(ascending=False))
\`\`\`

## XGBoost — Gradient Boosting

Unlike bagging (parallel), boosting trains trees **sequentially**, each correcting the previous errors:

\`\`\`
Round 1: Train tree h₁ on original data D
         F₁(x) = h₁(x)

Round 2: Compute residuals = y − F₁(x)  ← what we got WRONG
         Train tree h₂ to predict RESIDUALS
         F₂(x) = F₁(x) + η·h₂(x)       ← η = shrinkage / learning rate

Round 3: New residuals = y − F₂(x)
         Train tree h₃ to predict these
         F₃(x) = F₂(x) + η·h₃(x)
...

Final model: F(x) = Σₘ ηhₘ(x)
\`\`\`

\`\`\`python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_alpha=0.1,
    reg_lambda=1.0,
    early_stopping_rounds=50,
    eval_metric='auc',
    random_state=42
)
model.fit(X_train, y_train,
          eval_set=[(X_val, y_val)],
          verbose=100)
\`\`\`

## When to Use Which?

| Situation | Use |
|-----------|-----|
| Fast prototype needed | Random Forest |
| Maximum accuracy, tabular | XGBoost / LightGBM |
| Noisy data with outliers | Random Forest |
| Missing values natively | XGBoost |
| Need feature importance fast | Random Forest (simpler) |
| Competitive ML / Kaggle | XGBoost + tuning |

> Before trying deep learning for tabular data, try XGBoost. 9 times out of 10, it wins.
`,
    quiz: [
      { q: 'Why does Random Forest use bootstrap sampling (sampling with replacement)?', options: ['To increase the training dataset size', 'To create diverse, decorrelated training sets for each tree', 'To reduce memory usage', 'To speed up training'], answer: 1 },
      { q: 'At each split in Random Forest, why consider only √n random features instead of all features?', options: ['To reduce training time', 'To further decorrelate trees, reducing ensemble variance', 'To avoid overfitting each node', 'All features would cause errors'], answer: 1 },
      { q: 'In gradient boosting, what does each new tree learn to predict?', options: ['The original target labels', 'A random subset of training samples', 'The residual errors of the current ensemble', 'The feature importance scores'], answer: 2 },
      { q: 'What is "early stopping" in XGBoost?', options: ['Stop training when learning rate reaches 0', 'Stop adding trees when validation metric stops improving', 'Stop training at a fixed number of rounds', 'Limit tree depth automatically'], answer: 1 },
    ],
    codeTemplate: `// ── Random Forest & Boosting Simulation ──

function euclidean(a,b){return Math.sqrt(a.reduce((s,x,i)=>s+(x-b[i])**2,0));}
function sampleWith(data,n){return Array.from({length:n},()=>data[Math.floor(Math.random()*data.length)]);}

function trainStump(data,feature,threshold){
  const left=data.filter(d=>d.x[feature]<=threshold);
  const right=data.filter(d=>d.x[feature]>threshold);
  if(!left.length||!right.length) return null;
  const lMean=left.reduce((s,d)=>s+d.y,0)/left.length;
  const rMean=right.reduce((s,d)=>s+d.y,0)/right.length;
  return{feature,threshold,lMean,rMean};
}
function predictStump(x,stump){
  return x[stump.feature]<=stump.threshold?stump.lMean:stump.rMean;
}
function mse(data,preds){return data.reduce((s,d,i)=>s+(d.y-preds[i])**2,0)/data.length;}

const loanData=[
  {x:[0.2,0.1],y:0},{x:[0.8,0.9],y:1},{x:[0.9,0.8],y:1},{x:[0.1,0.2],y:0},
  {x:[0.7,0.75],y:1},{x:[0.3,0.25],y:0},{x:[0.85,0.7],y:1},{x:[0.15,0.3],y:0},
  {x:[0.6,0.65],y:1},{x:[0.4,0.35],y:0},{x:[0.75,0.8],y:1},{x:[0.25,0.2],y:0},
];

console.log("=== 1. BAGGING (Random Forest style) ===");
const T=7, bags=[], numFeats=2;
for(let t=0;t<T;t++){
  const boot=sampleWith(loanData,loanData.length);
  const fi=Math.floor(Math.random()*numFeats);
  const th=0.5;
  const stump=trainStump(boot,fi,th);
  if(stump) bags.push(stump);
}

function bagPredict(x){
  const votes=bags.map(s=>predictStump(x,s)>=0.5?1:0);
  return votes.reduce((a,b)=>a+b,0)/votes.length;
}

console.log("Ensemble predictions (avg vote of 7 stumps):");
loanData.forEach((d,i)=>{
  const prob=bagPredict(d.x);
  const pred=prob>=0.5?1:0;
  const ok=pred===d.y?'✓':'✗';
  console.log(\`  Sample \${i+1}: income=\${d.x[0]} credit=\${d.x[1]} → P=\${prob.toFixed(2)} pred=\${pred} actual=\${d.y} \${ok}\`);
});
const bagAcc=loanData.filter((d,i)=>(bagPredict(d.x)>=0.5?1:0)===d.y).length/loanData.length;
console.log(\`Ensemble accuracy: \${(bagAcc*100).toFixed(0)}%\`);

console.log("\\n=== 2. GRADIENT BOOSTING (Residual fitting) ===");
const yMean=loanData.reduce((s,d)=>s+d.y,0)/loanData.length;
let preds=loanData.map(()=>yMean);
const lr=0.5, rounds=5;

console.log(\`Initial prediction (mean): \${yMean.toFixed(3)}\`);
console.log(\`Initial MSE: \${mse(loanData,preds).toFixed(4)}\\n\`);

const boostingStumps=[];
for(let r=0;r<rounds;r++){
  const residData=loanData.map((d,i)=>({x:d.x,y:d.y-preds[i]}));
  let bestStump=null,bestMSE=Infinity;
  for(let fi=0;fi<numFeats;fi++){
    for(const th of[0.3,0.5,0.7]){
      const s=trainStump(residData,fi,th);
      if(!s) continue;
      const rPreds=residData.map(d=>predictStump(d.x,s));
      const m=mse(residData,rPreds);
      if(m<bestMSE){bestMSE=m;bestStump=s;}
    }
  }
  if(!bestStump) break;
  boostingStumps.push(bestStump);
  preds=preds.map((p,i)=>p+lr*predictStump(loanData[i].x,bestStump));
  console.log(\`Round \${r+1}: MSE=\${mse(loanData,preds).toFixed(4)} | split on feature \${bestStump.feature} at \${bestStump.threshold}\`);
}

const finalPreds=preds.map(p=>p>=0.5?1:0);
const boostAcc=finalPreds.filter((p,i)=>p===loanData[i].y).length/loanData.length;
console.log(\`\\nBoosting accuracy: \${(boostAcc*100).toFixed(0)}%\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  NEURAL NETWORKS
  // ══════════════════════════════════════════════════════════════

  {
    id: 'neural-networks',
    title: 'Neural Networks & Deep Learning',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 90,
    duration: '28 min',
    difficulty: 'Intermediate',
    videoId: 'aircAruvnKk',
    headerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80',
    tags: ['Neural Networks', 'Deep Learning', 'Backpropagation', 'Activation'],
    mathFormulas: [
      { name: 'Forward Pass', formula: 'a⁽ˡ⁾ = σ(W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾)' },
      { name: 'Cross-Entropy Loss', formula: 'L = −Σ yₖ log(ŷₖ)' },
      { name: 'Backprop (Chain Rule)', formula: 'δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀδ⁽ˡ⁺¹⁾ ⊙ σ\'(z⁽ˡ⁾)' },
    ],
    realWorldExample: {
      title: 'DeepMind AlphaFold — Solving 50-Year Biology Problem',
      description: 'AlphaFold2 used deep neural networks to predict 3D protein structure from amino acid sequence — a problem unsolved for 50 years. It predicted structures for 200M+ proteins, potentially unlocking treatments for Alzheimer\'s, cancer, and antibiotic-resistant bacteria. The Nobel Committee cited it as one of history\'s greatest scientific achievements.',
      icon: '🧬'
    },
    content: `# Neural Networks & Deep Learning

Neural networks are **universal function approximators** — they can learn any relationship between inputs and outputs given enough data. They're the engine behind modern AI.

## Architecture Overview

\`\`\`
Input Layer  → Hidden Layers  → Output Layer
[x₁]          [h₁] [h₂]          [ŷ₁]
[x₂]    →    [h₃] [h₄]    →    [ŷ₂]
[x₃]          [h₅] [h₆]          [ŷ₃]

Each connection has a learned WEIGHT.
Each neuron has a learned BIAS.
Each layer applies: a = σ(Wa_prev + b)
\`\`\`

## The Neuron

\`\`\`
Inputs: x₁=0.5, x₂=0.3, x₃=0.8
Weights: w₁=0.2, w₂=-0.4, w₃=0.7
Bias: b=0.1

Linear combination: z = w₁x₁ + w₂x₂ + w₃x₃ + b
                      = 0.1 + (-0.12) + 0.56 + 0.1
                      = 0.64

Activation: a = ReLU(0.64) = 0.64  (passes through)
         or a = σ(0.64) = 0.655    (sigmoid)
\`\`\`

## Activation Functions

\`\`\`
ReLU:    f(z) = max(0, z)     → hidden layers (default)
Sigmoid: f(z) = 1/(1+e⁻ᶻ)   → binary output
Softmax: f(z)ₖ = e^zₖ/Σe^zⱼ → multiclass output
Tanh:    f(z) = (e^z-e^-z)/(e^z+e^-z) → similar to sigmoid
GELU:    Used in BERT, GPT — smooth ReLU variant
\`\`\`

## Forward Propagation

\`\`\`
Layer 1:  z¹ = W¹x + b¹,   a¹ = ReLU(z¹)
Layer 2:  z² = W²a¹ + b²,  a² = ReLU(z²)
Output:   z³ = W³a² + b³,  ŷ  = Softmax(z³)

Loss: Cross-Entropy L = -Σₖ yₖ log(ŷₖ)
Where y is one-hot encoded true label
\`\`\`

## Backpropagation

\`\`\`
Compute how much each weight contributed to the error
using the chain rule of calculus:

Output error:  δ³ = ŷ − y
Layer 2 error: δ² = (W³)ᵀδ³ ⊙ ReLU'(z²)
Layer 1 error: δ¹ = (W²)ᵀδ² ⊙ ReLU'(z¹)

Gradients:
  ∂L/∂W³ = δ³(a²)ᵀ
  ∂L/∂W² = δ²(a¹)ᵀ
  ∂L/∂W¹ = δ¹(x)ᵀ

Updates (gradient descent):
  Wˡ := Wˡ − α × ∂L/∂Wˡ
\`\`\`

## Regularization for Neural Networks

\`\`\`python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(20, 128),
    nn.ReLU(),
    nn.BatchNorm1d(128),
    nn.Dropout(0.3),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.BatchNorm1d(64),
    nn.Dropout(0.3),
    nn.Linear(64, 2),
    nn.Softmax(dim=1)
)

optimizer = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
criterion = nn.CrossEntropyLoss()
\`\`\`

## When to Use Neural Networks

\`\`\`
✅ Use neural networks when:
  • Large dataset (>50K samples)
  • Unstructured data: images, text, audio, video
  • Complex patterns that trees can't capture
  • Transfer learning available (pretrained models)

❌ Prefer XGBoost when:
  • Tabular/structured data with <100K samples
  • Need interpretability (regulatory requirement)
  • Limited compute budget
  • Quick prototyping needed
\`\`\`

## The PyTorch Training Loop

\`\`\`python
for epoch in range(num_epochs):
    model.train()
    for X_batch, y_batch in train_loader:
        y_pred = model(X_batch)
        loss = criterion(y_pred, y_batch)

        optimizer.zero_grad()
        loss.backward()

        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()

    model.eval()
    with torch.no_grad():
        val_loss = criterion(model(X_val), y_val)
    print(f"Epoch {epoch}: train_loss={loss:.4f}, val_loss={val_loss:.4f}")
\`\`\`

> The "deep" in deep learning just means many layers. More layers = more abstract representations. Images → edges → shapes → objects → meaning.
`,
    quiz: [
      { q: 'What is the purpose of an activation function?', options: ['Initialize the weights', 'Introduce non-linearity so the network can learn complex patterns', 'Normalize the input data', 'Select the best features'], answer: 1 },
      { q: 'What does backpropagation compute?', options: ['The optimal number of hidden layers', 'Gradients of the loss with respect to each weight using the chain rule', 'The best activation function', 'The training batch size'], answer: 1 },
      { q: 'Why is Dropout used during training?', options: ['To reduce the number of parameters permanently', 'To randomly deactivate neurons each pass, preventing co-adaptation and overfitting', 'To speed up backpropagation', 'To replace batch normalization'], answer: 1 },
      { q: 'When is XGBoost usually better than a neural network?', options: ['For image classification tasks', 'For structured/tabular data with moderate dataset sizes', 'For sequence modeling', 'When compute is unlimited'], answer: 1 },
    ],
    codeTemplate: `// ── Neural Network from Scratch (XOR Problem) ──

const relu = x => Math.max(0,x);
const drelu = x => x>0?1:0;
const sigmoid = x => 1/(1+Math.exp(-x));
const dsigmoid = x => { const s=sigmoid(x); return s*(1-s); };
const dot = (a,b) => a.reduce((s,x,i)=>s+x*b[i],0);

const heInit = (rows,cols) => {
  const std=Math.sqrt(2/cols);
  return Array.from({length:rows},()=>Array.from({length:cols},()=>(Math.random()*2-1)*std));
};

// Network: 2 → 4 → 1 (XOR: non-linearly separable!)
let W1=heInit(4,2), b1=[0,0,0,0];
let W2=heInit(1,4), b2=[0];

function forward(x) {
  const z1=b1.map((bi,i)=>dot(W1[i],x)+bi);
  const a1=z1.map(relu);
  const z2=[dot(W2[0],a1)+b2[0]];
  const a2=z2.map(sigmoid);
  return{z1,a1,z2,a2};
}

const trainData=[{x:[0,0],y:0},{x:[0,1],y:1},{x:[1,0],y:1},{x:[1,1],y:0}];
const lr=0.5;
let lossHistory=[];

console.log("=== Training Neural Network: XOR Problem ===");
console.log("XOR: non-linearly separable → needs hidden layer!\\n");

for(let epoch=0;epoch<=3000;epoch++){
  let totalLoss=0;
  for(const d of trainData){
    const{z1,a1,z2,a2}=forward(d.x);
    const loss=(d.y-a2[0])**2/2;
    totalLoss+=loss;

    const dL_da2=[a2[0]-d.y];
    const dL_dz2=[dL_da2[0]*dsigmoid(z2[0])];

    const dW2=[W2[0].map((_,j)=>dL_dz2[0]*a1[j])];
    const db2=[dL_dz2[0]];

    const delta1=b1.map((_,i)=>dL_dz2[0]*W2[0][i]*drelu(z1[i]));
    const dW1=W1.map((row,i)=>row.map((_,j)=>delta1[i]*d.x[j]));

    W2=W2.map((row,i)=>row.map((w,j)=>w-lr*dW2[i][j]));
    b2=b2.map((b,i)=>b-lr*db2[i]);
    W1=W1.map((row,i)=>row.map((w,j)=>w-lr*dW1[i][j]));
    b1=b1.map((b,i)=>b-lr*delta1[i]);
  }
  if(epoch%500===0){
    lossHistory.push({epoch,loss:(totalLoss/4).toFixed(5)});
  }
}

console.log("Training Progress:");
lossHistory.forEach(h=>console.log(\`  Epoch \${h.epoch}: MSE=\${h.loss}\`));

console.log("\\n=== Final Predictions ===");
trainData.forEach(d=>{
  const{a2}=forward(d.x);
  const pred=a2[0]>=0.5?1:0;
  const ok=pred===d.y?'✓':'✗';
  console.log(\`  XOR(\${d.x[0]},\${d.x[1]})=\${d.y} → P=\${a2[0].toFixed(4)} pred=\${pred} \${ok}\`);
});

console.log("\\nLearned W1 (hidden weights):");
W1.forEach((row,i)=>console.log(\`  Neuron \${i}: [\${row.map(v=>v.toFixed(3))}]\`));
console.log("W2 (output weights):", W2[0].map(v=>v.toFixed(3)));`
  },

  // ══════════════════════════════════════════════════════════════
  //  SVM
  // ══════════════════════════════════════════════════════════════

  {
    id: 'svm',
    title: 'Support Vector Machines (SVM)',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 75,
    duration: '22 min',
    difficulty: 'Intermediate',
    videoId: '_YPScrckx28',
    headerImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=900&q=80',
    tags: ['SVM', 'Kernel Trick', 'Maximum Margin', 'Classification'],
    mathFormulas: [
      { name: 'SVM Objective', formula: 'min ½‖w‖² s.t. yᵢ(w·xᵢ+b) ≥ 1' },
      { name: 'Margin Width', formula: 'Margin = 2/‖w‖' },
      { name: 'RBF Kernel', formula: 'K(x,z) = exp(−γ‖x−z‖²)' },
    ],
    realWorldExample: {
      title: 'Genomics: Cancer Classification from Gene Expression',
      description: 'SVMs are still the gold standard in bioinformatics. Golub et al. used SVM to classify leukemia types from 7,129 gene expression features with only 72 patient samples — impossible with neural networks (not enough data). SVMs excel when features >> samples, which is common in genomics, medical imaging, and text classification.',
      icon: '🔬'
    },
    content: `# Support Vector Machines (SVM)

SVMs find the **widest possible margin** between classes. This maximum-margin approach gives exceptional generalization, especially on small datasets.

## The Core Idea

\`\`\`
          Class A (×)  |  Class B (○)
              × ×      |   ○ ○
               × ×     |  ○ ○
               ×  ← margin → ○
                  |
              Decision Boundary: w·x + b = 0

Wider margin → more robust to unseen data
Support vectors = the boundary-defining points (closest to line)
Margin width = 2 / ‖w‖
\`\`\`

## The Optimization Problem

\`\`\`
Hard margin (linearly separable):
  Minimize:   ½ ‖w‖²
  Subject to: yᵢ(w·xᵢ+b) ≥ 1   for all i

Soft margin (allows some misclassification):
  Minimize:   ½ ‖w‖² + C Σᵢ ξᵢ
  Subject to: yᵢ(w·xᵢ+b) ≥ 1 − ξᵢ,  ξᵢ ≥ 0

C = regularization parameter
  Small C → large margin, more misclassifications allowed
  Large C → small margin, few misclassifications (may overfit)
\`\`\`

## The Kernel Trick — Non-Linear SVM

\`\`\`
Non-linearly separable in 2D?
Map to higher dimensions where it IS separable!

2D: x = [x₁, x₂] → 3D: φ(x) = [x₁, x₂, x₁²+x₂²]

The KERNEL computes φ(xᵢ)·φ(xⱼ) without computing φ!
  K(xᵢ, xⱼ) = φ(xᵢ)·φ(xⱼ)
\`\`\`

### Common Kernels

| Kernel | Formula | Use Case |
|--------|---------|---------|
| Linear | K(x,z) = x·z | Linearly separable, text |
| Polynomial | K(x,z) = (x·z+1)^d | Image features |
| RBF/Gaussian | K(x,z) = exp(−γ‖x−z‖²) | General purpose (default) |
| Sigmoid | K(x,z) = tanh(αx·z+c) | Neural-net-like |

\`\`\`python
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV

svm = SVC(
    C=1.0,
    kernel='rbf',
    gamma='scale',
    probability=True
)

param_grid = {
    'C':     [0.01, 0.1, 1, 10, 100],
    'gamma': [0.001, 0.01, 0.1, 1, 'scale'],
}
grid = GridSearchCV(SVC(kernel='rbf', probability=True), param_grid, cv=5)
grid.fit(X_train, y_train)
print(grid.best_params_)
\`\`\`

## SVM vs Logistic Regression

\`\`\`
Logistic Regression:
  + Gives calibrated probabilities
  + Works well with many samples
  + Faster training on large datasets

SVM:
  + Maximum margin → better generalization
  + Works well with small samples (features >> samples)
  + Kernel trick for non-linear data
  - Slow on large datasets (O(n²) to O(n³))
  - C and γ sensitive — requires careful tuning
\`\`\`

## Feature Scaling is CRITICAL for SVM

\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

svm_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', SVC(C=10, kernel='rbf', gamma=0.01))
])

svm_pipeline.fit(X_train, y_train)
svm_pipeline.predict(X_test)
\`\`\`

> SVM is the algorithm of choice for high-dimensional small datasets — genomics, document classification, anomaly detection.
`,
    quiz: [
      { q: 'What are "support vectors" in SVM?', options: ['All training samples', 'The training points closest to the decision boundary that define the margin', 'The weights of the model', 'The kernel functions used'], answer: 1 },
      { q: 'What does increasing C in a soft-margin SVM do?', options: ['Increases the margin width', 'Decreases regularization, creating a smaller margin that allows fewer misclassifications', 'Makes the kernel more smooth', 'Reduces training time'], answer: 1 },
      { q: 'What does the "kernel trick" allow?', options: ['Training SVM without any data', 'Implicitly computing dot products in high-dimensional spaces without explicitly transforming data', 'Avoiding the need for C parameter tuning', 'Outputting probabilities directly'], answer: 1 },
      { q: 'Why must you ALWAYS scale features before using SVM?', options: ['SVM cannot handle negative values', 'SVM distances are dominated by features with largest numeric range — scaling ensures equal contribution', 'SVM requires binary features', 'Sklearn\'s SVM requires it'], answer: 1 },
    ],
    codeTemplate: `// ── SVM Concepts: Margin & Kernel Demo ──

function decisionFn(x,w,b){return x.reduce((s,xi,i)=>s+xi*w[i],b);}
function marginWidth(w){return 2/Math.sqrt(w.reduce((s,wi)=>s+wi*wi,0));}

const linearKernel=(x,z)=>x.reduce((s,xi,i)=>s+xi*z[i],0);
const rbfKernel=(x,z,gamma=0.5)=>Math.exp(-gamma*x.reduce((s,xi,i)=>s+(xi-z[i])**2,0));
const polyKernel=(x,z,d=2,c=1)=>Math.pow(x.reduce((s,xi,i)=>s+xi*z[i],0)+c,d);

const classA=[[2,3],[3,2],[2.5,3.5],[3.5,3],[4,2],[2,4]];
const classB=[[0,1],[1,0],[0.5,0.5],[0,2],[1,1],[-0.5,1]];

const w=[1.2,1.0], b=-3.5;

console.log("=== SVM Decision Boundary ===");
console.log(\`Weight vector: [\${w}]\`);
console.log(\`Bias: \${b}\`);
console.log(\`Margin width: 2/||w|| = \${marginWidth(w).toFixed(4)}\\n\`);

console.log("Class A (positive, should have f(x) > 0):");
classA.forEach((p,i)=>{
  const f=decisionFn(p,w,b);
  const margin=f>1?'✓ outside margin':f>0?'⚠ inside margin':'✗ wrong side';
  console.log(\`  A\${i+1} \${JSON.stringify(p)}: f=\${f.toFixed(3)} → \${margin}\`);
});

console.log("\\nClass B (negative, should have f(x) < 0):");
classB.forEach((p,i)=>{
  const f=decisionFn(p,w,b);
  const margin=f<-1?'✓ outside margin':f<0?'⚠ inside margin':'✗ wrong side';
  console.log(\`  B\${i+1} \${JSON.stringify(p)}: f=\${f.toFixed(3)} → \${margin}\`);
});

console.log("\\n=== Kernel Comparison ===");
const x=[1,2],z=[3,1],z2=[1.1,2.1];
console.log(\`Points: x=\${JSON.stringify(x)}, z=\${JSON.stringify(z)}, z_near=\${JSON.stringify(z2)}\\n\`);

console.log("Linear kernel:");
console.log(\`  K(x,x):     \${linearKernel(x,x).toFixed(3)}\`);
console.log(\`  K(x,z_near):\${linearKernel(x,z2).toFixed(3)}\`);
console.log(\`  K(x,z):     \${linearKernel(x,z).toFixed(3)}\`);

console.log("\\nRBF kernel (similarity 0→1, closer=higher):");
[0.1,0.5,2.0].forEach(g=>{
  console.log(\`  γ=\${g}: K(x,x)=\${rbfKernel(x,x,g).toFixed(3)} K(x,z_near)=\${rbfKernel(x,z2,g).toFixed(3)} K(x,z)=\${rbfKernel(x,z,g).toFixed(3)}\`);
});

console.log("\\n=== Effect of C Parameter ===");
[0.01,0.1,1,10,100].forEach(C=>{
  const wNorm=Math.sqrt(1/(2*C));
  const margin=2/wNorm;
  const desc=C<0.1?'large margin, high bias':C>10?'small margin, may overfit':'balanced';
  console.log(\`  C=\${String(C).padEnd(5)}: ~||w||=\${wNorm.toFixed(2)} margin~\${margin.toFixed(2)} → \${desc}\`);
});`
  },

  // ══════════════════════════════════════════════════════════════
  //  K-MEANS CLUSTERING
  // ══════════════════════════════════════════════════════════════

  {
    id: 'kmeans',
    title: 'K-Means Clustering',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 65,
    duration: '20 min',
    difficulty: 'Intermediate',
    videoId: '4b5d3muPQmA',
    headerImage: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=900&q=80',
    tags: ['Clustering', 'Unsupervised', 'K-Means', 'Elbow Method'],
    mathFormulas: [
      { name: 'WCSS Objective', formula: 'J = Σₖ Σ_{x∈Cₖ} ‖x − μₖ‖²' },
      { name: 'Centroid Update', formula: 'μₖ = (1/|Cₖ|) Σ_{x∈Cₖ} x' },
      { name: 'Silhouette', formula: 's = (b−a)/max(a,b)' },
    ],
    realWorldExample: {
      title: 'Uber Driver Zone Assignment & Airbnb Market Segmentation',
      description: 'Uber uses K-Means to cluster city maps into demand zones for surge pricing and driver positioning. Airbnb uses K-Means to segment 150M+ listings into market groups for competitor analysis. Both run clustering pipelines continuously, re-fitting every few hours as demand patterns shift throughout the day.',
      icon: '🗺️'
    },
    content: `# K-Means Clustering

K-Means groups data into K clusters by minimizing within-cluster distance. It's the most widely used unsupervised learning algorithm.

## The Algorithm

\`\`\`
Input: Dataset X, number of clusters K

Initialize: Place K centroids randomly (or K-Means++)

Repeat until convergence:
  Step 1 — Assign: assign each point to nearest centroid
    C(i) = argmin_k ‖x(i) − μₖ‖²

  Step 2 — Update: recompute centroids as cluster means
    μₖ = (1/|Cₖ|) Σ_{x∈Cₖ} x

Converged when: centroids stop moving

Objective (WCSS): J = Σₖ Σ_{x∈Cₖ} ‖x − μₖ‖²
Lower WCSS = tighter, better clusters
\`\`\`

## Choosing K — Elbow Method

\`\`\`
Plot WCSS vs K:

WCSS  │●
      │  ●
      │    ●  ← elbow
      │       ●─────────────
      └───────────────── K
          1  2  3  4  5  6

The "elbow" = diminishing returns from adding more clusters
Optimal K = elbow point (K=3 in example)

Also use: Silhouette Score (higher = better clusters)
\`\`\`

## K-Means++ Initialization

\`\`\`
Better than random init:
1. Pick first centroid randomly
2. For each subsequent centroid:
   → Pick point with probability ∝ D(x)²
   → (Farther from existing centroids = more likely chosen)
3. Run standard K-Means

Benefits: 2x fewer iterations, consistently better clusters
\`\`\`

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

inertias = []
for k in range(2, 11):
    km = KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42)
    km.fit(X_scaled)
    inertias.append(km.inertia_)

km = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
labels = km.fit_predict(X_scaled)

df['cluster'] = labels
print(df.groupby('cluster')[feature_cols].mean())
\`\`\`

## Silhouette Analysis

\`\`\`
For each point i:
  a(i) = avg distance to SAME cluster (cohesion)
  b(i) = avg distance to NEAREST OTHER cluster (separation)

  s(i) = (b(i) − a(i)) / max(a(i), b(i))

s ≈ +1: well clustered
s ≈  0: on cluster boundary
s ≈ −1: misclassified!

from sklearn.metrics import silhouette_score
score = silhouette_score(X_scaled, labels)
\`\`\`

## When K-Means Fails

\`\`\`
K-Means assumes: spherical clusters of similar size/density

Fails on:
  ● Non-spherical (ring shapes, crescents)
  ● Very different cluster sizes
  ● Very different cluster densities
  ● Outliers (pulled toward them)

Alternatives:
  DBSCAN:  density-based, finds arbitrary shapes, auto-detects outliers
  GMM:     Gaussian Mixture Models — soft assignments, elliptical clusters
  HDBSCAN: hierarchical DBSCAN, robust, auto-selects epsilon
\`\`\`

## Business Application: Customer Segments

\`\`\`
After K-Means on RFM features (Recency, Frequency, Monetary):

Cluster 0 — Champions (high F, high M, low R):
  Strategy: reward programs, early access to new products

Cluster 1 — At Risk (was good, now high R):
  Strategy: win-back campaigns, special offers

Cluster 2 — New Customers (low F, recent):
  Strategy: onboarding sequence, first purchase incentives

Cluster 3 — Lost (high R, low F, low M):
  Strategy: reactivation email or write off
\`\`\`

> K-Means with good feature engineering can replace expensive human market research.
`,
    quiz: [
      { q: 'What does K-Means minimize?', options: ['Between-cluster distance', 'Within-cluster sum of squares (WCSS)', 'Number of iterations', 'Distance to the nearest boundary'], answer: 1 },
      { q: 'In the Elbow Method, what does the "elbow" represent?', options: ['The K value where WCSS = 0', 'The K where adding more clusters gives diminishing returns in WCSS reduction', 'The maximum silhouette score', 'The point of minimum variance'], answer: 1 },
      { q: 'Why must you scale features before K-Means?', options: ['K-Means needs normalized probabilities', 'Features with larger numeric ranges dominate Euclidean distance calculations', 'K-Means converges faster with scaled features', 'Sklearn requires it for all clustering algorithms'], answer: 1 },
      { q: 'What does a silhouette score of -0.3 indicate for a data point?', options: ['It is well-clustered and far from other clusters', 'It is on the exact boundary between two clusters', 'It is likely assigned to the wrong cluster', 'It is an outlier'], answer: 2 },
    ],
    codeTemplate: `// ── K-Means from Scratch ──

function dist(a,b){return Math.sqrt(a.reduce((s,x,i)=>s+(x-b[i])**2,0));}

function kmeanspp(data,k){
  const centroids=[data[Math.floor(Math.random()*data.length)]];
  while(centroids.length<k){
    const dists=data.map(x=>Math.min(...centroids.map(c=>dist(x,c)**2)));
    const total=dists.reduce((a,b)=>a+b,0);
    let r=Math.random()*total,cum=0;
    for(let i=0;i<data.length;i++){cum+=dists[i];if(cum>=r){centroids.push(data[i]);break;}}
  }
  return centroids;
}

function kmeans(data,k,maxIter=100){
  let centers=kmeanspp(data,k);
  let assigns=new Array(data.length).fill(0);
  for(let it=0;it<maxIter;it++){
    const newA=data.map(x=>centers.map((c,i)=>({i,d:dist(x,c)})).sort((a,b)=>a.d-b.d)[0].i);
    if(newA.every((a,i)=>a===assigns[i])) break;
    assigns=newA;
    centers=Array.from({length:k},(_,ki)=>{
      const members=data.filter((_,i)=>assigns[i]===ki);
      if(!members.length) return centers[ki];
      return members[0].map((_,d)=>members.reduce((s,x)=>s+x[d],0)/members.length);
    });
  }
  const wcss=data.reduce((s,x,i)=>s+dist(x,centers[assigns[i]])**2,0);
  return{centers,assigns,wcss};
}

const customers=[
  [0.9,0.85],[0.85,0.9],[0.8,0.88],[0.88,0.82],
  [0.15,0.2],[0.2,0.15],[0.12,0.18],[0.18,0.22],
  [0.5,0.5],[0.48,0.52],[0.53,0.47],[0.5,0.48],
  [0.8,0.2],[0.75,0.25],[0.85,0.15],[0.78,0.22],
];

console.log("=== K-Means Customer Segmentation ===");
console.log(\`Dataset: \${customers.length} customers, 2 features\\n\`);

console.log("Elbow Method (WCSS vs K):");
for(let k=2;k<=6;k++){
  const{wcss}=kmeans(customers,k);
  const bar='█'.repeat(Math.round(wcss*40));
  console.log(\`  K=\${k}: WCSS=\${wcss.toFixed(3)} \${bar}\`);
}

const{centers,assigns,wcss}=kmeans(customers,4);
console.log(\`\\n=== Final Clustering K=4 | WCSS=\${wcss.toFixed(3)} ===\`);

const segmentNames=['💎 VIP','💰 Budget','⭐ Mid','🎯 Aspirers'];
centers.forEach((c,i)=>{
  const members=customers.filter((_,j)=>assigns[j]===i);
  const spendLabel=c[0]>0.6?'High':c[0]>0.4?'Med':'Low';
  const incomeLabel=c[1]>0.6?'High':c[1]>0.4?'Med':'Low';
  console.log(\`\\nCluster \${i+1} - \${segmentNames[i]}\`);
  console.log(\`  Center: spend=\${c[0].toFixed(2)} income=\${c[1].toFixed(2)} (\${spendLabel} spend, \${incomeLabel} income)\`);
  console.log(\`  Size: \${members.length} customers\`);
});

console.log("\\n=== Silhouette Analysis ===");
const silScores=customers.map((x,i)=>{
  const sameCluster=customers.filter((_,j)=>assigns[j]===assigns[i]&&j!==i);
  const a=sameCluster.length?sameCluster.reduce((s,y)=>s+dist(x,y),0)/sameCluster.length:0;
  let b=Infinity;
  for(let k=0;k<4;k++){
    if(k===assigns[i])continue;
    const others=customers.filter((_,j)=>assigns[j]===k);
    if(!others.length)continue;
    const avgD=others.reduce((s,y)=>s+dist(x,y),0)/others.length;
    b=Math.min(b,avgD);
  }
  return(b-a)/Math.max(a,b);
});
const avgSil=silScores.reduce((a,b)=>a+b,0)/silScores.length;
console.log(\`Avg Silhouette Score: \${avgSil.toFixed(3)}\`);
silScores.forEach((s,i)=>console.log(\`  Customer \${i+1} (cluster \${assigns[i]}): \${s.toFixed(3)} \${s>0.5?'✓':s>0?'~':'✗'}\`));`
  },

  // ══════════════════════════════════════════════════════════════
  //  NLP & TRANSFORMERS
  // ══════════════════════════════════════════════════════════════

  {
    id: 'nlp-transformers',
    title: 'NLP & Transformers',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 100,
    duration: '30 min',
    difficulty: 'Advanced',
    videoId: '4Bdc55j80l8',
    headerImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    tags: ['NLP', 'Transformers', 'Attention', 'BERT', 'GPT', 'LLM'],
    mathFormulas: [
      { name: 'Attention', formula: 'Attention(Q,K,V) = softmax(QKᵀ/√dₖ) V' },
      { name: 'Positional Encoding', formula: 'PE(pos,2i) = sin(pos/10000^(2i/d))' },
    ],
    realWorldExample: {
      title: 'How Claude & ChatGPT Work',
      description: 'Claude (Anthropic) and ChatGPT (OpenAI) are both Transformer-based decoder models trained on trillions of tokens, then fine-tuned with RLHF. BERT-style Transformers power Google Search (affects 10% of queries). Transformers are also used in AlphaFold2 for protein structure prediction, DALL-E for image generation, and GitHub Copilot for code completion.',
      icon: '🤖'
    },
    content: `# NLP & Transformers

The Transformer (2017) is the most impactful ML architecture of the 21st century. It powers ChatGPT, Claude, Google Search, GitHub Copilot, and AlphaFold.

## Text Preprocessing Pipeline

\`\`\`
Raw text: "The quick brown fox jumps over the lazy dog!"
           ↓
1. Lowercase: "the quick brown fox jumps over the lazy dog!"
2. Tokenize:  ["the","quick","brown","fox","jumps","over","the","lazy","dog","!"]
3. Remove stops (optional): ["quick","brown","fox","jumps","lazy","dog"]
4. Lemmatize: ["quick","brown","fox","jump","lazy","dog"]
5. Convert to IDs: [2841, 5923, 4621, 9384, 3921, 5021]
6. Embed: each ID → 768-dimensional vector
\`\`\`

## Word Embeddings

\`\`\`
Before: words are just indices (no meaning)
After:  words are dense vectors that capture meaning

Word2Vec (2013):
  "king" - "man" + "woman" ≈ "queen"  ← arithmetic on meaning!

GloVe:
  Trained on global co-occurrence statistics

BERT/GPT embeddings:
  Contextual — same word different vector in different context
  "bank" in "river bank" ≠ "bank" in "bank account"
\`\`\`

## The Attention Mechanism

\`\`\`
For sentence "The animal didn't cross the street because it was tired":
  What does "it" refer to? "animal" (not "street")

Self-attention lets "it" look at every other word and figure this out:

  Attention(Q, K, V) = softmax(QKᵀ / √dₖ) × V

  Q = "what am I looking for?"   (query for "it")
  K = "what do I offer?"         (keys for every word)
  V = "what is my actual content?"

  QKᵀ → similarity scores
  /√dₖ → scale to prevent vanishing gradients
  softmax → attention weights (sum to 1)
  × V → weighted sum of values
\`\`\`

## Transformer Architecture

\`\`\`
ENCODER (BERT-style):
  Input → Embeddings + Positional Encoding
  → [Self-Attention → Add&Norm → FFN → Add&Norm] × 12 layers
  → Contextual representations of each token

DECODER (GPT-style):
  → Masked Self-Attention (only sees past tokens)
  → [Cross-Attention with encoder if seq2seq]
  → Predict next token
  → Repeat autoregressively

Positional Encoding (why):
  Attention has no sense of position!
  PE(pos, 2i) = sin(pos/10000^(2i/d)) injects position info
\`\`\`

## BERT vs GPT

\`\`\`
BERT (Bidirectional):
  Sees ENTIRE sequence at once (bidirectional context)
  Pre-trained with: [MASK] prediction + next sentence prediction
  Best for: Classification, NER, QA, sentence embeddings

GPT (Generative):
  Sees only LEFT context (causal/autoregressive)
  Pre-trained with: predict next token
  Best for: Text generation, completion, summarization, chatbots
\`\`\`

## Fine-tuning for Your Task

\`\`\`python
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from transformers import Trainer, TrainingArguments

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2
)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def tokenize(examples):
    return tokenizer(examples['text'], max_length=512, truncation=True, padding=True)

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    learning_rate=2e-5,
    weight_decay=0.01,
)
trainer = Trainer(model=model, args=training_args,
                  train_dataset=tokenized_train, eval_dataset=tokenized_val)
trainer.train()
\`\`\`

## Practical NLP with HuggingFace

\`\`\`python
from transformers import pipeline

sentiment = pipeline("sentiment-analysis")
result = sentiment("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.9998}]

gen = pipeline("text-generation", model="gpt2")
output = gen("Machine learning is", max_length=50)

ner = pipeline("ner", aggregation_strategy="simple")
ner("Elon Musk founded SpaceX in Hawthorne, California")
\`\`\`

| Model | Best For | Size | Speed |
|-------|---------|------|-------|
| BERT-base | Classification, NER | 110M params | Fast |
| RoBERTa | Better BERT (more training) | 125M params | Fast |
| DistilBERT | 60% size of BERT, 97% performance | 66M params | Fastest |
| GPT-2 | Text generation | 124M-1.5B | Medium |
| T5 | Seq2Seq tasks | 60M-11B | Slow |

> The HuggingFace transformers library gives you access to 500,000+ pre-trained models. You almost never need to train from scratch.
`,
    quiz: [
      { q: 'What problem does self-attention solve in NLP?', options: ['It replaces word embeddings entirely', 'It allows each token to consider all other tokens in context when forming its representation', 'It makes training faster than RNNs', 'It removes the need for positional encoding'], answer: 1 },
      { q: 'Why divide QKᵀ by √dₖ in the attention formula?', options: ['To normalize attention weights to [0,1]', 'To prevent dot products from becoming too large and causing softmax saturation/vanishing gradients', 'To match the scale of the value vectors', 'To reduce computational complexity'], answer: 1 },
      { q: 'What is the main difference between BERT and GPT architectures?', options: ['BERT generates text, GPT classifies it', 'BERT uses bidirectional attention (sees full sequence); GPT uses causal attention (left context only)', 'BERT has more parameters', 'GPT uses convolutional layers'], answer: 1 },
      { q: 'What is positional encoding used for in Transformers?', options: ['To reduce embedding dimensionality', 'To inject token position information since attention is position-agnostic', 'To create the Q, K, V matrices', 'To normalize hidden states'], answer: 1 },
    ],
    codeTemplate: `// ── Self-Attention Mechanism from Scratch ──

function softmax(arr){const m=Math.max(...arr),e=arr.map(x=>Math.exp(x-m)),s=e.reduce((a,b)=>a+b);return e.map(x=>x/s);}
function matMul(A,B){return A.map(row=>B[0].map((_,j)=>row.reduce((s,_,k)=>s+row[k]*B[k][j],0)));}
function transpose(M){return M[0].map((_,j)=>M.map(r=>r[j]));}

function scaledDotAttention(Q,K,V){
  const dk=Q[0].length;
  const scores=matMul(Q,transpose(K)).map(row=>row.map(v=>v/Math.sqrt(dk)));
  const weights=scores.map(softmax);
  return{output:matMul(weights,V),weights};
}

const tokens=["The","cat","sat","on","the","mat"];
const d=4;

const embeddings=tokens.map((_,i)=>[
  Math.sin(i*0.5+0.1), Math.cos(i*0.3+0.2),
  Math.sin(i*0.7+0.3), Math.cos(i*0.4+0.1)
]);

const PE=tokens.map((_,pos)=>[
  Math.sin(pos/1),Math.cos(pos/1),
  Math.sin(pos/100),Math.cos(pos/100)
]);

const X=embeddings.map((e,i)=>e.map((v,j)=>v+PE[i][j]*0.1));

const proj=(n,m)=>Array.from({length:n},()=>Array.from({length:m},()=>(Math.random()-0.5)*0.5));
const Wq=proj(d,d),Wk=proj(d,d),Wv=proj(d,d);

const Q=matMul(X,Wq),K=matMul(X,Wk),V=matMul(X,Wv);
const{output,weights}=scaledDotAttention(Q,K,V);

console.log("=== Self-Attention: 'The cat sat on the mat' ===\\n");
console.log("Attention weights (what each word attends to):");
console.log("       "+tokens.map(t=>t.padEnd(6)).join(''));
weights.forEach((row,i)=>{
  const bars=row.map(w=>'█'.repeat(Math.round(w*10)).padEnd(10));
  console.log(\`\${tokens[i].padEnd(6)} \${bars.join('')}\`);
});

console.log("\\nTop attention per token:");
weights.forEach((row,i)=>{
  const sorted=[...row.entries()].sort((a,b)=>b[1]-a[1]);
  const top2=sorted.slice(0,2).map(([j,w])=>\`"\${tokens[j]}":\${w.toFixed(2)}\`);
  console.log(\`  "\${tokens[i]}" → \${top2.join(', ')}\`);
});

console.log("\\n=== TF-IDF (Bag-of-Words) ===");
const docs=[
  "machine learning is amazing machine",
  "deep learning neural networks learning",
  "machine learning data science statistics",
];
const tokenize=s=>s.toLowerCase().split(' ');
const vocab=[...new Set(docs.flatMap(tokenize))];

const tf=(doc,term)=>{const t=tokenize(doc);return t.filter(w=>w===term).length/t.length;};
const idf=term=>{const n=docs.filter(d=>tokenize(d).includes(term)).length;return Math.log((docs.length+1)/(n+1))+1;};

console.log("TF-IDF scores for key terms:");
['machine','learning','neural','statistics'].forEach(term=>{
  docs.forEach((doc,i)=>{
    const score=tf(doc,term)*idf(term);
    if(score>0) console.log(\`  "\${term}" in doc\${i+1}: \${score.toFixed(4)}\`);
  });
});`
  },

  // ══════════════════════════════════════════════════════════════
  //  PCA
  // ══════════════════════════════════════════════════════════════

  {
    id: 'pca',
    title: 'PCA & Dimensionality Reduction',
    category: 'Phase 7 — Building Models',
    phase: 7,
    xp: 75,
    duration: '22 min',
    difficulty: 'Intermediate',
    videoId: 'FgakZw6K1QQ',
    headerImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
    tags: ['PCA', 'Dimensionality Reduction', 'Eigenvalues', 'Variance'],
    mathFormulas: [
      { name: 'Covariance Matrix', formula: 'Σ = (1/n) Xᵀ X  (after mean-centering)' },
      { name: 'Eigen Decomposition', formula: 'Σv = λv  →  sort by λ descending' },
      { name: 'Explained Variance Ratio', formula: 'EVR_k = λₖ / Σᵢ λᵢ' },
    ],
    realWorldExample: {
      title: 'Netflix Compresses 17,000 Movies into 50 Dimensions',
      description: 'Netflix\'s recommendation system factorizes a 140M user × 17,000 movie rating matrix using SVD (related to PCA) into ~50 "latent factors" — comedy-lover, action-fan, etc. This 340× compression retains >90% of the rating signal. PCA/SVD makes it possible to compute user similarities efficiently for real-time recommendations.',
      icon: '🎬'
    },
    content: `# PCA & Dimensionality Reduction

PCA finds new axes that capture the most variance in your data, allowing you to represent high-dimensional data in fewer dimensions with minimal information loss.

## Why Reduce Dimensions?

\`\`\`
Problems with high-dimensional data:
  • Curse of dimensionality (distances become meaningless)
  • Slow model training (more features = more computation)
  • Overfitting risk (more parameters to overfit)
  • Impossible to visualize > 3D

Real examples:
  Gene expression: 20,000 genes → 10 PCs (capture 95% variance)
  Images: 50,176 pixels (224×224) → 256 PCs
  Text TF-IDF: 100,000 terms → 300 PCs
\`\`\`

## PCA Step by Step

\`\`\`
1. Mean-center each feature: X_c = X - μ

2. Compute covariance matrix: Σ = (1/n) X_cᵀ X_c

3. Eigendecomposition: Σ vᵢ = λᵢ vᵢ
   λᵢ = eigenvalue (variance along this axis)
   vᵢ = eigenvector (direction = "principal component")

4. Sort by eigenvalue (largest first):
   PC1 = direction of maximum variance
   PC2 = direction of next most variance (orthogonal to PC1)

5. Project data onto top K PCs:
   Z = X_c × [v₁, v₂, ..., vₖ]   shape: (n × k)

6. Choose K: keep enough PCs to explain 95% variance
\`\`\`

## Explained Variance

\`\`\`python
from sklearn.decomposition import PCA

pca = PCA()
pca.fit(X_scaled)

print(pca.explained_variance_ratio_)
# [0.44, 0.28, 0.16, 0.06, 0.04, 0.02, ...]

import numpy as np
cumvar = np.cumsum(pca.explained_variance_ratio_)
k95 = np.argmax(cumvar >= 0.95) + 1
print(f"Need {k95} components for 95% variance")

pca_k = PCA(n_components=k95)
X_reduced = pca_k.fit_transform(X_scaled)
\`\`\`

## PCA for Visualization

\`\`\`python
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_scaled)

import matplotlib.pyplot as plt
plt.scatter(X_2d[:, 0], X_2d[:, 1], c=labels, cmap='tab10')
plt.xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]*100:.1f}% variance)')
plt.ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]*100:.1f}% variance)')
\`\`\`

## t-SNE — Better for Visualization Only

\`\`\`python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, perplexity=30, random_state=42)
X_tsne = tsne.fit_transform(X_scaled)

# t-SNE: better at revealing cluster structure in 2D
# BUT: not reproducible, not a transform you can apply to new data!
# Use PCA for preprocessing, t-SNE for exploration visualization only
\`\`\`

## PCA in ML Pipeline

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=0.95)),
    ('clf', LogisticRegression())
])
pipe.fit(X_train, y_train)
print(pipe['pca'].n_components_)
\`\`\`

| Method | Type | Best For |
|--------|------|---------|
| PCA | Linear | Preprocessing, compression |
| t-SNE | Non-linear | Visualization only |
| UMAP | Non-linear | Visualization + preserves structure |
| Autoencoder | Non-linear (NN) | Complex patterns, generative models |
| LDA | Supervised | Maximize class separation |

> PCA is not just for visualization — using it before KNN, SVM, or Logistic Regression on high-dimensional data routinely improves both speed and accuracy.
`,
    quiz: [
      { q: 'What does PCA maximize?', options: ['Between-class separation', 'Variance of the projected data (amount of information retained)', 'Number of features', 'Reconstruction accuracy'], answer: 1 },
      { q: 'Why must you mean-center data before PCA?', options: ['To make all values positive', 'So that the first principal component passes through the data origin (covariance is properly centered)', 'To speed up eigendecomposition', 'To prevent negative eigenvalues'], answer: 1 },
      { q: 'You run PCA and cumulative explained variance reaches 95% at component 8 (of 100 features). You should:', options: ['Always use all 100 components', 'Use 8 components for downstream modeling', 'Use 50 components as a compromise', 'Discard PCA and use the original features'], answer: 1 },
      { q: 'Why is t-SNE NOT suitable for preprocessing ML features?', options: ['t-SNE is too slow for large datasets only', 't-SNE cannot be applied to new data (no transform function) and is not reproducible', 't-SNE requires labeled data', 't-SNE produces too many dimensions'], answer: 1 },
    ],
    codeTemplate: `// ── PCA from Scratch ──

function mean(arr){return arr.reduce((a,b)=>a+b,0)/arr.length;}
function covMatrix(X){
  const n=X.length,d=X[0].length;
  const means=Array.from({length:d},(_,j)=>mean(X.map(r=>r[j])));
  const Xc=X.map(row=>row.map((v,j)=>v-means[j]));
  const cov=Array.from({length:d},(_,i)=>
    Array.from({length:d},(_,j)=>Xc.reduce((s,row)=>s+row[i]*row[j],0)/n)
  );
  return{cov,Xc,means};
}

function dominantEigen(M,iters=200){
  let v=Array.from({length:M.length},()=>Math.random()-0.5);
  for(let i=0;i<iters;i++){
    const Mv=M.map(row=>row.reduce((s,_,j)=>s+row[j]*v[j],0));
    const norm=Math.sqrt(Mv.reduce((s,x)=>s+x*x,0));
    v=Mv.map(x=>x/norm);
  }
  const lambda=v.reduce((s,vi,i)=>s+vi*M[i].reduce((ss,_,j)=>ss+M[i][j]*v[j],0),0);
  return{v,lambda};
}

function deflate(M,v,lambda){
  return M.map((row,i)=>row.map((val,j)=>val-lambda*v[i]*v[j]));
}

const X=[
  [2.5,2.4,1.0,0.9,3.1],[0.5,0.7,0.5,0.8,0.6],[2.2,2.9,2.1,2.0,2.8],
  [1.9,2.2,1.8,1.9,2.1],[3.1,3.0,2.5,2.8,3.5],[2.3,2.7,2.3,2.1,2.6],
  [2.0,1.6,1.5,1.7,1.9],[1.0,1.1,1.0,1.2,0.9],[1.5,1.6,1.6,1.5,1.7],[1.1,0.9,1.0,0.8,1.2],
];
const n=X.length,d=X[0].length;

console.log(\`=== PCA from Scratch ===\\n\${n} samples x \${d} features\\n\`);

const{cov,Xc,means}=covMatrix(X);
console.log("Feature means:",means.map(m=>m.toFixed(3)));
console.log("\\nCovariance matrix (top 3x3):");
cov.slice(0,3).forEach(row=>console.log("  ["+row.slice(0,3).map(v=>v.toFixed(3)).join(', ')+"]"));

let M=cov.map(row=>[...row]);
const pcs=[];
for(let i=0;i<2;i++){
  const{v,lambda}=dominantEigen(M);
  pcs.push({v,lambda,evr:null});
  M=deflate(M,v,lambda);
}

const totalVar=cov.reduce((s,row,i)=>s+row[i],0);
pcs.forEach((pc,i)=>{pc.evr=pc.lambda/totalVar;});

console.log("\\n=== Principal Components ===");
pcs.forEach((pc,i)=>{
  console.log(\`PC\${i+1}: direction=[\${pc.v.map(v=>v.toFixed(3))}]\`);
  console.log(\`  Eigenvalue: \${pc.lambda.toFixed(3)} | Explained variance: \${(pc.evr*100).toFixed(1)}%\`);
});

const cumVar=(pcs[0].evr+pcs[1].evr)*100;
console.log(\`\\nCumulative (2 PCs): \${cumVar.toFixed(1)}% of total variance\`);

const Z=Xc.map(x=>[
  x.reduce((s,xi,j)=>s+xi*pcs[0].v[j],0),
  x.reduce((s,xi,j)=>s+xi*pcs[1].v[j],0),
]);
console.log("\\n=== Projected Data (5D → 2D) ===");
Z.forEach((z,i)=>console.log(\`  Sample \${i+1}: [\${z.map(v=>v.toFixed(3)).join(', ')}]\`));

const reconErr=Xc.reduce((s,row,i)=>{
  const z=[pcs[0],pcs[1]].map(pc=>row.reduce((ss,x,j)=>ss+x*pc.v[j],0));
  const recon=row.map((_,j)=>pcs.reduce((ss,pc,k)=>ss+z[k]*pc.v[j],0));
  return s+row.reduce((ss,x,j)=>ss+(x-recon[j])**2,0);
},0)/n;
console.log(\`\\nMean reconstruction error (2 PCs): \${reconErr.toFixed(4)}\`);
console.log(\`Keeping only 2 of 5 features: \${cumVar.toFixed(1)}% info retained\`);`
  },

  // ══════════════════════════════════════════════════════════════
  //  DEPLOYMENT
  // ══════════════════════════════════════════════════════════════

  {
    id: 'model-deployment',
    title: 'Model Deployment & MLOps',
    category: 'Phase 10 — Deployment',
    phase: 10,
    xp: 80,
    duration: '22 min',
    difficulty: 'Intermediate',
    videoId: 'pnSNc8mxolI',
    headerImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=900&q=80',
    tags: ['MLOps', 'Deployment', 'API', 'Docker', 'Monitoring'],
    mathFormulas: [
      { name: 'Model Drift Detection', formula: 'KL(P_train ‖ P_prod) = Σ P_train(x) log(P_train(x)/P_prod(x))' },
      { name: 'A/B Test Power', formula: 'n = (z_{α/2} + z_β)² · 2σ² / Δ²' },
    ],
    realWorldExample: {
      title: 'Uber\'s ML Platform: Michelangelo',
      description: 'Uber\'s Michelangelo platform deploys 10,000+ ML models in production — from surge pricing (updates every minute) to ETA prediction (real-time) to fraud detection (<100ms latency). They process 1 petabyte of feature data daily. Without proper MLOps, Uber\'s 23M daily trips would be unmanageable. Model monitoring alone prevented $50M in fraud in 2022.',
      icon: '🚀'
    },
    content: `# Model Deployment & MLOps

A model sitting in a Jupyter notebook creates zero business value. Deployment makes it useful. MLOps makes it reliable at scale.

## The Deployment Gap

\`\`\`
Notebook → Production: many things break!

Issues:
  • Different Python/library versions
  • Training data vs production data differences
  • Latency requirements (10ms vs 10 seconds)
  • Throughput (1 prediction vs 1M/second)
  • Model drift (data distribution changes over time)
  • No monitoring (silent failures)
\`\`\`

## Step 1: Save & Load Your Model

\`\`\`python
import joblib
import json

model_artifacts = {
    'model': trained_model,
    'scaler': fitted_scaler,
    'feature_names': feature_names,
    'label_encoder': fitted_encoder,
    'metadata': {
        'trained_date': '2024-03-01',
        'val_f1': 0.847,
        'val_auc': 0.921,
        'n_training_samples': 50000,
    }
}
joblib.dump(model_artifacts, 'model_v1.joblib')

artifacts = joblib.load('model_v1.joblib')
model = artifacts['model']
scaler = artifacts['scaler']
\`\`\`

## Step 2: Build a REST API

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib, numpy as np

app = FastAPI(title="Churn Prediction API")
artifacts = joblib.load("model_v1.joblib")

class PredictionRequest(BaseModel):
    tenure_months: int
    support_calls: int
    monthly_spend: float
    contract_type: str

class PredictionResponse(BaseModel):
    churn_probability: float
    prediction: str
    confidence: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    features = np.array([[
        request.tenure_months,
        request.support_calls,
        request.monthly_spend,
        1 if request.contract_type == "monthly" else 0,
        request.support_calls / max(request.tenure_months, 1)
    ]])

    features_scaled = artifacts['scaler'].transform(features)
    proba = artifacts['model'].predict_proba(features_scaled)[0][1]

    return {
        "churn_probability": round(float(proba), 4),
        "prediction": "CHURN" if proba >= 0.5 else "STAY",
        "confidence": "HIGH" if abs(proba - 0.5) > 0.3 else "MEDIUM"
    }
\`\`\`

## Step 3: Containerize with Docker

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY model_v1.joblib .
COPY main.py .

EXPOSE 8000
HEALTHCHECK CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

\`\`\`bash
docker build -t churn-model:v1 .
docker run -p 8000:8000 churn-model:v1
\`\`\`

## Step 4: Monitoring — The Most Important Step

\`\`\`python
from scipy.stats import ks_2samp

def check_data_drift(train_distribution, production_batch):
    alerts = []
    for feature in feature_names:
        stat, p_value = ks_2samp(
            train_distribution[feature],
            production_batch[feature]
        )
        if p_value < 0.05:
            alerts.append(f"DRIFT: {feature} (p={p_value:.4f})")
    return alerts

predictions_log = []
def log_prediction(features, prediction, actual_outcome=None):
    predictions_log.append({
        'timestamp': datetime.now(),
        'features': features,
        'prediction': prediction,
        'actual': actual_outcome,
    })
\`\`\`

## Step 5: CI/CD for ML

\`\`\`
ML CI/CD Pipeline:
  1. Code push → GitHub
  2. Automated tests:
     - Unit tests for feature engineering
     - Integration tests for API
     - Data validation tests
     - Model performance on holdout set
  3. If all pass → build new Docker image
  4. Deploy to staging → A/B test vs production model
  5. If A/B test shows improvement → promote to production
\`\`\`

## MLOps Tools Stack

| Category | Popular Tools |
|---------|--------------|
| Experiment tracking | MLflow, Weights & Biases, Neptune |
| Feature store | Feast, Tecton, Hopsworks |
| Model registry | MLflow, SageMaker Model Registry |
| Serving | FastAPI, TorchServe, Triton Inference |
| Orchestration | Airflow, Kubeflow, Prefect |
| Monitoring | Evidently, Grafana, Datadog |

> "Most ML value comes from models in production, not notebooks on laptops."
`,
    quiz: [
      { q: 'Why do models need to be retrained periodically after deployment?', options: ['The model forgets what it learned', 'Data distribution changes over time (data drift), causing model performance to degrade', 'The server runs out of memory', 'Regulations require it'], answer: 1 },
      { q: 'What is the purpose of A/B testing a new model before full rollout?', options: ['To train the model on production data', 'To compare the new model against the current production model on real traffic safely', 'To reduce server costs', 'To check for data leakage'], answer: 1 },
      { q: 'Why containerize an ML model with Docker?', options: ['Docker makes models train faster', 'Containers ensure the same environment (Python version, libraries) in development and production', 'Docker is required by all cloud providers', 'It compresses the model file'], answer: 1 },
      { q: 'What is "model drift" monitoring for?', options: ['Checking if model weights have changed', 'Detecting when production data distribution diverges from training distribution, degrading predictions', 'Monitoring server response time', 'Tracking model file size'], answer: 1 },
    ],
    codeTemplate: `// ── ML Deployment Simulation ──

const modelArtifacts = {
  version: "1.2.0",
  trainedDate: "2024-01-15",
  valF1: 0.847,
  valAUC: 0.921,
  featureNames: ['tenure_months','support_calls','monthly_spend','contract_monthly','calls_per_tenure'],
  weights: [0.3, -0.8, 0.2, -0.6, -1.2],
  bias: 0.5,
  scalerMean: [24, 3, 85, 0.4, 0.15],
  scalerStd:  [18, 2, 40, 0.5, 0.12],
};

function sigmoid(z){return 1/(1+Math.exp(-z));}

class ChurnPredictionAPI {
  constructor(artifacts) {
    this.artifacts = artifacts;
    this.predictionLog = [];
  }

  _engineer(request) {
    const {tenure_months,support_calls,monthly_spend,contract_type} = request;
    return [
      tenure_months,
      support_calls,
      monthly_spend,
      contract_type === 'monthly' ? 1 : 0,
      support_calls / Math.max(tenure_months, 1),
    ];
  }

  _scale(features) {
    return features.map((f,i) => (f - this.artifacts.scalerMean[i]) / this.artifacts.scalerStd[i]);
  }

  predict(request) {
    const features = this._engineer(request);
    const scaled = this._scale(features);
    const z = scaled.reduce((s,x,i) => s + x * this.artifacts.weights[i], this.artifacts.bias);
    const proba = sigmoid(z);
    const prediction = proba >= 0.5 ? 'CHURN' : 'STAY';
    const confidence = Math.abs(proba - 0.5) > 0.3 ? 'HIGH' : 'MEDIUM';
    this.predictionLog.push({ timestamp: Date.now(), request, proba, prediction });
    return { churn_probability: +proba.toFixed(4), prediction, confidence, model_version: this.artifacts.version };
  }

  detectDrift(productionBatch, trainingStats) {
    const alerts = [];
    productionBatch[0].forEach((_,fi) => {
      const prodVals = productionBatch.map(r=>r[fi]);
      const prodMean = prodVals.reduce((a,b)=>a+b,0)/prodVals.length;
      const deviation = Math.abs(prodMean - trainingStats.mean[fi]) / trainingStats.std[fi];
      if (deviation > 2) alerts.push(\`Warning: Drift on feature \${fi}: z=\${deviation.toFixed(2)}\`);
    });
    return alerts;
  }

  health() {
    return {
      status: 'healthy',
      model_version: this.artifacts.version,
      predictions_served: this.predictionLog.length,
    };
  }
}

const api = new ChurnPredictionAPI(modelArtifacts);

console.log("=== Churn Prediction API v"+modelArtifacts.version+" ===\\n");
console.log("Health:", JSON.stringify(api.health()));

const testRequests = [
  { tenure_months: 3,  support_calls: 7, monthly_spend: 40,  contract_type: 'monthly' },
  { tenure_months: 36, support_calls: 0, monthly_spend: 120, contract_type: 'annual'  },
  { tenure_months: 8,  support_calls: 4, monthly_spend: 65,  contract_type: 'monthly' },
  { tenure_months: 60, support_calls: 1, monthly_spend: 150, contract_type: 'annual'  },
  { tenure_months: 2,  support_calls: 9, monthly_spend: 35,  contract_type: 'monthly' },
];

console.log("\\nPredictions:");
testRequests.forEach((req, i) => {
  const result = api.predict(req);
  console.log(\`  \${i+1}. tenure=\${req.tenure_months}mo calls=\${req.support_calls} \${req.contract_type}\`);
  console.log(\`     → P(churn)=\${result.churn_probability} | \${result.prediction} | \${result.confidence}\`);
});

console.log("\\n=== Data Drift Detection ===");
const productionBatch = testRequests.map(r =>
  [r.tenure_months, r.support_calls, r.monthly_spend, r.contract_type==='monthly'?1:0, r.support_calls/Math.max(r.tenure_months,1)]
);
const trainingStats = { mean: modelArtifacts.scalerMean, std: modelArtifacts.scalerStd };
const driftAlerts = api.detectDrift(productionBatch, trainingStats);
if (driftAlerts.length) {
  driftAlerts.forEach(a => console.log("  "+a));
} else {
  console.log("  No significant drift detected");
}

console.log("\\n=== Model Registry ===");
[{v:"1.0.0",date:"2023-06-01",f1:0.812,status:"retired"},
 {v:"1.1.0",date:"2023-11-15",f1:0.831,status:"shadow"},
 {v:"1.2.0",date:"2024-01-15",f1:0.847,status:"production"},
 {v:"1.3.0",date:"2024-03-01",f1:0.851,status:"staging (A/B)"},
].forEach(m=>console.log(\`  v\${m.v} (\${m.date}): F1=\${m.f1} | \${m.status}\`));`
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const PHASES = [
  { phase: 1, name: 'Foundations', color: 'bg-slate-500', topics: ['what-is-ml'] },
  { phase: 2, name: 'Problem Definition', color: 'bg-blue-500', topics: ['problem-definition'] },
  { phase: 3, name: 'Data Collection', color: 'bg-cyan-500', topics: ['data-collection'] },
  { phase: 4, name: 'EDA', color: 'bg-teal-500', topics: ['eda'] },
  { phase: 5, name: 'Data Cleaning', color: 'bg-green-500', topics: ['data-cleaning'] },
  { phase: 6, name: 'Feature Eng.', color: 'bg-lime-500', topics: ['feature-engineering'] },
  { phase: 7, name: 'Building Models', color: 'bg-yellow-500', topics: ['linear-regression', 'logistic-regression', 'decision-trees', 'random-forests', 'neural-networks', 'svm', 'kmeans', 'nlp-transformers', 'pca'] },
  { phase: 8, name: 'Evaluation', color: 'bg-orange-500', topics: ['model-evaluation'] },
  { phase: 9, name: 'Model Improvement', color: 'bg-red-500', topics: ['hyperparameter-tuning'] },
  { phase: 10, name: 'Deployment', color: 'bg-purple-500', topics: ['model-deployment'] },
];

export const BADGES = [
  {
    id: 'first-topic',
    name: 'First Step',
    desc: 'Complete first topic',
    icon: '🎯',
    condition: s => s.completedTopics.length >= 1
  },
  {
    id: 'data-phase',
    name: 'Data Master',
    desc: 'Complete all data phases',
    icon: '📊',
    condition: s =>
      ['eda', 'data-cleaning', 'data-collection']
        .every(t => s.completedTopics.includes(t))
  },
  {
    id: 'first-model',
    name: 'First Model',
    desc: 'Complete a model topic',
    icon: '🤖',
    condition: s =>
      ['linear-regression', 'logistic-regression', 'decision-trees']
        .some(t => s.completedTopics.includes(t))
  },
  {
    id: 'quiz-ace',
    name: 'Quiz Ace',
    desc: 'Score 100% on any quiz',
    icon: '🏆',
    condition: s =>
      Object.values(s.quizScores || {}).some(score => score === 100)
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    desc: 'Maintain a 3-day learning streak',
    icon: '🔥',
    condition: s => (s.streak || 0) >= 3
  },
  {
    id: 'streak-7',
    name: 'Unstoppable',
    desc: 'Maintain a 7-day learning streak',
    icon: '🚀',
    condition: s => (s.streak || 0) >= 7
  },
  {
    id: 'halfway',
    name: 'Halfway There',
    desc: 'Complete 50% of all topics',
    icon: '⚡',
    condition: s =>
      s.completedTopics.length >= Math.ceil(topics.length / 2)
  },
  {
    id: 'all-topics',
    name: 'ML Master',
    desc: 'Complete all topics',
    icon: '👑',
    condition: s => s.completedTopics.length === topics.length
  }
];

export const LEVELS = [
  { level: 1, name: 'Beginner', minXp: 0, maxXp: 200, icon: '🌱' },
  { level: 2, name: 'Learner', minXp: 200, maxXp: 500, icon: '📚' },
  { level: 3, name: 'Practitioner', minXp: 500, maxXp: 900, icon: '⚙️' },
  { level: 4, name: 'Advanced', minXp: 900, maxXp: 1400, icon: '🔬' },
  { level: 5, name: 'Expert', minXp: 1400, maxXp: 2000, icon: '🧠' },
  { level: 6, name: 'ML Master', minXp: 2000, maxXp: 99999, icon: '👑' },
];

export function getLevel(xp) {
  return LEVELS.find(l => xp >= l.minXp && xp < l.maxXp) || LEVELS[LEVELS.length - 1];
}