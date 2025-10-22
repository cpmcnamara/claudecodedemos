# 🏭 AI Operations Dashboard

**Automotive Supply & Manufacturing Intelligence Platform**

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new)

> A production-grade Streamlit application demonstrating how AI drives real-time operational intelligence across automotive manufacturing networks. Built for consulting leaders and data strategy executives.

![Hero Banner](assets/images/hero-banner-placeholder.png)

---

## 🎯 What It Does

This dashboard transforms raw manufacturing data into actionable business decisions through:

- **Real-Time KPI Monitoring** - Track OEE, yield, downtime, and energy consumption across your manufacturing network
- **AI-Powered Analytics** - ML-based machine clustering and predictive maintenance recommendations
- **Correlation Analysis** - Identify hidden patterns and leading indicators of quality issues
- **Natural Language Interface** - Ask questions in plain English via the Insight Agent chatbot

### Business Impact

- **5% OEE improvement** = **$2M+ annual savings** per plant
- **30-50% reduction** in unplanned downtime through predictive maintenance
- **Real-time decision support** for operations managers and executives

---

## 🚀 Quick Start

### Option 1: GitHub Codespaces (Recommended)

Click the badge above or follow these steps:

1. Navigate to the repository on GitHub
2. Click the **Code** button → **Codespaces** tab → **Create codespace on main**
3. Wait for the environment to build (2-3 minutes)
4. The dashboard will auto-launch at `http://localhost:8501`
5. Start exploring the data!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/cpmcnamara/claudecodedemos.git
cd claudecodedemos/automotive-ai-dashboard

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the dashboard
streamlit run app.py
```

The dashboard will open at `http://localhost:8501`

### Option 3: Docker

```bash
# Build the container
docker build -t ai-operations-dashboard .

# Run the container
docker run -p 8501:8501 ai-operations-dashboard
```

---

## 📊 Features

### Tab 1: Overview
- Executive KPI cards (OEE, Yield, Downtime, Energy)
- Time-series performance trends
- Plant-by-plant comparison charts
- Business impact calculations

### Tab 2: Diagnostics
- Interactive scatter plots (Temperature vs Defects, Pressure vs Throughput)
- Full correlation matrix heatmap
- Statistical significance testing
- Actionable insights based on correlations

### Tab 3: AI Insights
- **ML-based machine clustering** (Stable / At-Risk / Critical)
- Risk segmentation visualization
- Auto-generated insights:
  - Supplier quality variance analysis
  - Shift performance gaps
  - Energy optimization opportunities
- Critical machine alerts

### Tab 4: Command Center (Insight Agent)
- Natural language query interface
- Example queries:
  - *"Which machines caused the most downtime this week?"*
  - *"How is Supplier_1 affecting yield at Plant_A?"*
  - *"Show me energy consumption by plant"*
  - *"What are the critical machines?"*
- Conversational responses with confidence scores
- Chat history tracking

---

## 🧠 Technical Architecture

### Data Generation
```python
# Synthetic multi-plant manufacturing data
- 3 plants × 8 machines = 24 machines monitored
- 5 supplier network
- 7 days × 24 hours = 168 data points per machine
- Realistic daily/weekly cycles, shift patterns, machine faults
```

### Analytics Engine
```python
# Key computations
- OEE = Availability × Performance × Quality
- KMeans clustering for risk segmentation
- Pearson correlation analysis
- Real-time aggregations via Pandas
```

### Insight Agent
```python
# Natural language processing
1. Intent parsing (keyword-based)
2. Entity extraction (plants, suppliers, time)
3. Pandas query execution
4. Conversational response generation
5. Confidence scoring

# Future: LLM integration (Claude, GPT-4)
```

---

## 🎨 Design System - Built on IBM Carbon

This dashboard leverages **IBM Carbon Design System** - the world-class design system used by IBM Cloud, Watson, and enterprise products globally.

### Carbon Features
- ✅ **Gray 100 Dark Theme** - Professional, enterprise-grade appearance
- ✅ **IBM Plex Typography** - Clear, readable fonts optimized for data
- ✅ **WCAG AAA Accessibility** - Best-in-class compliance
- ✅ **2px Spacing System** - Mathematical precision for layouts
- ✅ **12-Color Data Viz Palette** - Optimized for charts and graphs

### Key Colors
- **Background:** Carbon Gray 100 `#161616`
- **Cards/Tiles:** Carbon Layer-01 `#262626`
- **Primary Interactive:** Carbon Blue 60 `#0f62fe`
- **Data Viz:** Purple `#8a3ffc`, Cyan `#33b1ff`, Teal `#007d79`, etc.
- **Alerts:** Warning `#f1c21b`, Error `#ff8389`, Success `#42be65`

### Typography
- **Headings:** IBM Plex Sans (400 weight, Carbon type scale)
- **Body:** IBM Plex Sans Regular (16px)
- **Metrics/Code:** IBM Plex Mono

### Visual Style
- Carbon Gray 100 dark theme
- 2px base spacing system for precision
- Consulting-grade polish
- Inspired by: Siemens Mindsphere, Tesla factory UI, Apple Design System

---

## 📦 Project Structure

```
automotive-ai-dashboard/
├── app.py                      # Main Streamlit application
├── requirements.txt            # Python dependencies
├── .devcontainer/
│   └── devcontainer.json      # GitHub Codespaces configuration
├── assets/
│   ├── icons/                 # SVG icon set
│   ├── images/                # Hero banners and screenshots
│   ├── mockups/               # UI mockup HTML files
│   └── ...
├── docs/
│   └── DESIGN_SYSTEM.md      # Visual identity guidelines
├── src/
│   └── hero-banner-generator.html  # Banner generation tool
└── README.md                  # This file
```

---

## 🔧 Configuration Options

### Sidebar Controls
- **Data History:** 3-14 days (default: 7)
- **Number of Plants:** 2-5 (default: 3)
- **Machines per Plant:** 4-12 (default: 8)

### Performance Optimization
```python
# Caching enabled for expensive operations
@st.cache_data
def generate_synthetic_data(...):
    # Data generation cached per configuration

@st.cache_data
def perform_ml_clustering(...):
    # ML computations cached
```

---

## 🚀 Deployment

### Production Deployment

#### Streamlit Cloud
1. Fork this repository
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub account
4. Select the repository and `app.py`
5. Deploy!

#### AWS / Azure / GCP
```bash
# Install Streamlit on your server
pip install streamlit

# Run with production settings
streamlit run app.py \
  --server.port=8501 \
  --server.address=0.0.0.0 \
  --server.headless=true
```

#### Docker Compose
```yaml
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - "8501:8501"
    environment:
      - STREAMLIT_SERVER_HEADLESS=true
    restart: unless-stopped
```

---

## 💡 Use Cases

### For Manufacturing Operations
- **Real-time monitoring** of production lines
- **Predictive maintenance** scheduling
- **Quality control** insights
- **Energy optimization** opportunities

### For Consulting Engagements
- **Executive presentations** with live data
- **ROI calculations** for AI investments
- **Process improvement** recommendations
- **Digital transformation** roadmaps

### For Data Teams
- **Template** for manufacturing analytics
- **ML pipeline** demonstrations
- **Dashboard design patterns**
- **Natural language interfaces**

---

## 🔮 Future Enhancements

### Phase 2: Live Data Integration
```python
# Connect to real factory systems
- OPC UA industrial protocol support
- MQTT sensor streams
- ERP/MES system integration
- Time-series database (InfluxDB, TimescaleDB)
```

### Phase 3: Advanced AI
```python
# LLM-powered insights
- Integration with Claude API / GPT-4
- Multi-step reasoning chains
- Automated root cause analysis
- Predictive forecasting models
```

### Phase 4: Closed-Loop Operations
```python
# AI-driven automation
- Automatic parameter adjustments
- Self-healing systems
- Autonomous maintenance scheduling
- Digital twin simulations
```

---

## 📚 Documentation

- [Design System Guide](docs/DESIGN_SYSTEM.md)
- [API Integration Guide](docs/API_INTEGRATION.md)
- [Deployment Best Practices](docs/DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Areas for improvement:

- Additional visualization types
- More sophisticated ML models
- Real-time data connectors
- Mobile-responsive layouts
- Multi-language support

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

## 🎓 Learn More

### Related Resources
- [Streamlit Documentation](https://docs.streamlit.io)
- [Plotly Dash for Manufacturing](https://plotly.com/dash/)
- [Manufacturing Analytics Best Practices](https://example.com)
- [OEE Calculation Standards](https://example.com)

### About the Project
This dashboard was created to demonstrate how AI can transform manufacturing operations from reactive to proactive, from data-rich to insight-driven.

**Key Differentiators:**
- ✅ Production-ready code with clear documentation
- ✅ Realistic synthetic data generation
- ✅ Consulting-grade visual design
- ✅ Natural language query interface
- ✅ End-to-end deployment support

---

## 👤 Author

**Created with [Claude Code](https://claude.com/claude-code)**

For questions or consulting inquiries, please open an issue on GitHub.

---

## 🌟 Showcase

*Add screenshots and demo videos here once deployed*

### Dashboard Overview
![Overview Tab](assets/images/screenshot-overview.png)

### AI Insights
![AI Insights Tab](assets/images/screenshot-insights.png)

### Insight Agent
![Command Center](assets/images/screenshot-agent.png)

---

<div align="center">

**[⬆ Back to Top](#-ai-operations-dashboard)**

Made with ❤️ using Streamlit, Plotly, and scikit-learn

</div>
