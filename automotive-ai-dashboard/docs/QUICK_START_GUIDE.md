# Quick Start Guide

**Get your AI Operations Dashboard running in 5 minutes**

---

## 🚀 Fastest Path: GitHub Codespaces

### Step 1: Create a Codespace

1. Open the repository in GitHub
2. Click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespace on main**

### Step 2: Wait for Setup

The devcontainer will automatically:
- Install Python 3.11
- Install all dependencies from `requirements.txt`
- Launch Streamlit on port 8501
- Open the dashboard in your browser

**Estimated time: 2-3 minutes**

### Step 3: Explore!

The dashboard opens automatically at `http://localhost:8501`

Navigate through the 4 tabs:
1. **Overview** - KPIs and trends
2. **Diagnostics** - Correlation analysis
3. **AI Insights** - Machine learning clustering
4. **Command Center** - Ask questions to the Insight Agent

---

## 💻 Local Development

### Prerequisites

```bash
# Check Python version (3.11+ required)
python --version

# Check pip is installed
pip --version
```

### Installation

```bash
# Clone repository
git clone https://github.com/cpmcnamara/claudecodedemos.git
cd claudecodedemos/automotive-ai-dashboard

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Run the Dashboard

```bash
streamlit run app.py
```

The dashboard will open at `http://localhost:8501`

---

## 🐳 Docker Deployment

### Build Container

```bash
docker build -t ai-operations-dashboard .
```

### Run Container

```bash
docker run -p 8501:8501 ai-operations-dashboard
```

Access at `http://localhost:8501`

---

## 🎯 First Actions

### Customize Your Data

In the **sidebar**, adjust:
- **Data History:** Change from 7 to 14 days
- **Number of Plants:** Scale from 3 to 5 plants
- **Machines per Plant:** Increase from 8 to 12 machines

Watch the dashboard regenerate with new synthetic data!

### Ask the Insight Agent

Navigate to **Tab 4: Command Center** and try these queries:

```
Which machines caused the most downtime?
```

```
How is Supplier_1 affecting yield at Plant_A?
```

```
Show me energy consumption by plant
```

```
What are the critical machines?
```

The agent will analyze the data and provide conversational responses with confidence scores.

### Explore Correlations

Go to **Tab 2: Diagnostics** to see:
- Temperature vs Defect Rate scatter plot
- Pressure vs Throughput analysis
- Full correlation matrix heatmap

Look for patterns where:
- **Temperature correlates with defects** → Implement cooling alerts
- **Pressure correlates with throughput** → Optimize pressure settings

### Review AI Insights

**Tab 3: AI Insights** shows ML-powered analysis:
- Machine risk clustering (Stable / At-Risk / Critical)
- Auto-generated insights about supplier quality
- Shift performance gaps
- Energy optimization opportunities

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill existing Streamlit process
pkill -f streamlit

# Or use a different port
streamlit run app.py --server.port=8502
```

### Import Errors

```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt

# Or force reinstall
pip install --force-reinstall -r requirements.txt
```

### Slow Performance

```bash
# Clear Streamlit cache
streamlit cache clear

# Then restart the app
```

### Module Not Found

```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Verify Streamlit is installed
pip list | grep streamlit
```

---

## 📊 Understanding the Data

### Synthetic Data Generation

The dashboard generates realistic manufacturing data with:

```python
# 3 plants × 8 machines = 24 machines
# 5 suppliers
# 7 days × 24 hours = 168 hours of data
# = 4,032 data points per run
```

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **OEE** | Availability × Performance × Quality | > 85% |
| **Yield** | (Good Units / Total Units) × 100 | > 95% |
| **Downtime** | Minutes of unplanned stops | < 5 min/hour |
| **Energy/Unit** | Total kWh / Total Units | < 1.5 kWh |

### Machine States

- **Stable:** Low variance, high yield, minimal downtime
- **At-Risk:** Moderate anomalies, requires monitoring
- **Critical:** High defects, frequent downtime, immediate action needed

---

## 🎓 Learning Path

### 1. Explore the Overview (10 min)

- Understand KPI cards
- Watch time-series trends
- Compare plant performance

### 2. Deep Dive into Diagnostics (15 min)

- Analyze scatter plots
- Interpret correlation matrix
- Identify actionable insights

### 3. Study AI Insights (10 min)

- Review machine clustering
- Read auto-generated findings
- Understand risk categories

### 4. Interact with the Agent (15 min)

- Ask 5+ different questions
- Note confidence scores
- Experiment with query phrasing

### 5. Review the Code (30 min)

- Open `app.py` in VS Code
- Study data generation logic
- Understand ML clustering
- Examine Insight Agent implementation

**Total learning time: ~80 minutes**

---

## 🚀 Next Steps

### Customize the Dashboard

1. **Change color scheme** - Edit CSS in `app.py`
2. **Add new charts** - Use Plotly Express
3. **Modify KPIs** - Adjust `compute_kpis()` function
4. **Enhance clustering** - Tune KMeans parameters

### Connect Real Data

```python
# Replace synthetic data with database connection
import psycopg2

def load_real_data():
    conn = psycopg2.connect(DATABASE_URL)
    df = pd.read_sql("SELECT * FROM sensor_data", conn)
    return df
```

### Deploy to Production

Follow the [Deployment Guide](DEPLOYMENT.md) to:
- Deploy to Streamlit Cloud (easiest)
- Set up on AWS/Azure/GCP
- Configure with Docker Compose
- Add authentication

### Integrate LLMs

```python
# Add to requirements.txt
anthropic>=0.18.0

# Update Insight Agent
import anthropic

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
# Enhanced NLP capabilities!
```

---

## 💡 Pro Tips

### Performance Optimization

```python
# Use caching aggressively
@st.cache_data(ttl=300)  # Cache for 5 minutes
def expensive_computation():
    # Your code here
    pass
```

### Better Visualizations

```python
# Add animations to Plotly charts
fig.update_traces(
    hovertemplate="<b>%{x}</b><br>Value: %{y:.2f}",
    marker=dict(
        size=10,
        line=dict(width=2, color='DarkSlateGrey')
    )
)
```

### Custom Metrics

```python
# Add your own KPIs
def compute_custom_kpi(df):
    kpi = (
        df['throughput'].sum() /
        (df['energy_consumption'].sum() + df['downtime'].sum())
    )
    return kpi
```

---

## 📞 Get Help

- **Issues:** [GitHub Issues](https://github.com/cpmcnamara/claudecodedemos/issues)
- **Discussions:** [GitHub Discussions](https://github.com/cpmcnamara/claudecodedemos/discussions)
- **Documentation:** [Full Docs](README.md)

---

## ✅ Checklist

- [ ] Dashboard running locally
- [ ] Explored all 4 tabs
- [ ] Asked 5+ questions to Insight Agent
- [ ] Customized data parameters
- [ ] Reviewed the source code
- [ ] Attempted one customization
- [ ] Ready for production deployment

---

<div align="center">

**Happy Analyzing! 📊**

*Built with Streamlit, Plotly, and scikit-learn*

</div>
