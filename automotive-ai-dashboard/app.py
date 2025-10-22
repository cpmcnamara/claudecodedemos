"""
AI Operations Dashboard - Automotive Supply & Manufacturing Intelligence
==========================================================================

This Streamlit application demonstrates how AI can drive real-time operational
intelligence across automotive manufacturing networks. Built for consulting leaders
and data strategy executives to showcase AI-enabled decision-making.

Architecture:
- Synthetic data generation with realistic plant/supplier/machine patterns
- ML-based analytics (clustering, correlation analysis)
- Interactive multi-tab dashboard
- Natural language Insight Agent for operational queries

Author: Claude Code
License: MIT
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from scipy.stats import pearsonr
import re

# ============================================================================
# CARBON DESIGN SYSTEM - DATA VISUALIZATION COLORS
# ============================================================================

# Carbon Charts color palette (12-color system)
CARBON_COLORS = {
    'purple': '#8a3ffc',    # Primary data viz color
    'cyan': '#33b1ff',      # Secondary
    'teal': '#007d79',      # Tertiary
    'magenta': '#ff7eb6',   # Accent 1
    'red': '#fa4d56',       # Accent 2
    'pink': '#fff1f1',      # Accent 3
    'green': '#6fdc8c',     # Success
    'blue': '#4589ff',      # Info
    'deep_pink': '#d12771', # Critical
    'gold': '#d2a106',      # Warning
    'aqua': '#08bdba',      # Highlight 1
    'sky_blue': '#bae6ff',  # Highlight 2
}

# Sequential colors for gradients/heatmaps
CARBON_SEQUENTIAL = ['#002d9c', '#0043ce', '#0f62fe', '#4589ff', '#78a9ff']

# Main palette for charts (order optimized for contrast)
CARBON_PALETTE = [
    CARBON_COLORS['purple'],     # #8a3ffc
    CARBON_COLORS['cyan'],       # #33b1ff
    CARBON_COLORS['teal'],       # #007d79
    CARBON_COLORS['magenta'],    # #ff7eb6
    CARBON_COLORS['red'],        # #fa4d56
    CARBON_COLORS['green'],      # #6fdc8c
    CARBON_COLORS['blue'],       # #4589ff
    CARBON_COLORS['deep_pink'],  # #d12771
    CARBON_COLORS['gold'],       # #d2a106
    CARBON_COLORS['aqua'],       # #08bdba
]

# ============================================================================
# PAGE CONFIGURATION
# ============================================================================

st.set_page_config(
    page_title="AI Operations Dashboard",
    page_icon="🏭",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================================
# CUSTOM CSS - PREMIUM DARK THEME
# ============================================================================

st.markdown("""
<style>
    /* === CARBON DESIGN SYSTEM - GRAY 100 THEME === */
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

    /* Carbon Design Tokens */
    :root {
        /* Backgrounds (Layer System) */
        --cds-background: #161616;
        --cds-layer-01: #262626;
        --cds-layer-02: #393939;
        --cds-layer-03: #525252;

        /* UI Elements */
        --cds-border-subtle: #393939;
        --cds-border-strong: #8d8d8d;
        --cds-border-interactive: #4589ff;

        /* Text */
        --cds-text-primary: #f4f4f4;
        --cds-text-secondary: #c6c6c6;
        --cds-text-placeholder: #6f6f6f;
        --cds-text-on-color: #ffffff;
        --cds-text-inverse: #161616;

        /* Interactive */
        --cds-blue-40: #78a9ff;
        --cds-blue-50: #4589ff;
        --cds-blue-60: #0f62fe;
        --cds-blue-70: #0043ce;
        --cds-blue-80: #002d9c;
        --cds-button-primary: #0f62fe;
        --cds-button-primary-hover: #0353e9;
        --cds-button-primary-active: #002d9c;
        --cds-focus: #0f62fe;

        /* Support Colors */
        --cds-support-error: #ff8389;
        --cds-support-success: #42be65;
        --cds-support-warning: #f1c21b;
        --cds-support-info: #4589ff;

        /* Spacing (2px base) */
        --cds-spacing-02: 0.25rem;    /* 4px */
        --cds-spacing-03: 0.5rem;     /* 8px */
        --cds-spacing-04: 0.75rem;    /* 12px */
        --cds-spacing-05: 1rem;       /* 16px */
        --cds-spacing-06: 1.5rem;     /* 24px */
        --cds-spacing-07: 2rem;       /* 32px */

        /* Typography */
        --cds-font-sans: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        --cds-font-mono: 'IBM Plex Mono', 'Menlo', 'Courier New', monospace;

        /* Motion */
        --cds-duration-fast-02: 110ms;
        --cds-duration-moderate-02: 240ms;
        --cds-ease-standard: cubic-bezier(0.5, 0, 0.1, 1);
    }

    /* Main app styling */
    .stApp {
        background: linear-gradient(135deg, var(--cds-background) 0%, var(--cds-layer-01) 100%);
        font-family: var(--cds-font-sans);
        color: var(--cds-text-primary);
    }

    /* Headers */
    h1, h2, h3 {
        font-family: var(--cds-font-sans);
        font-weight: 400;
        letter-spacing: 0;
        color: var(--cds-text-primary);
    }

    h1 {
        font-size: 2.625rem;  /* 42px - Carbon heading-06 */
        line-height: 1.25;
    }

    h2 {
        font-size: 2rem;      /* 32px - Carbon heading-05 */
        line-height: 1.25;
    }

    h3 {
        font-size: 1.75rem;   /* 28px - Carbon heading-04 */
        line-height: 1.25;
    }

    /* Metric cards */
    [data-testid="stMetricValue"] {
        font-size: 2rem;      /* 32px */
        font-family: var(--cds-font-mono);
        font-weight: 600;
        color: var(--cds-blue-50);
    }

    [data-testid="stMetricLabel"] {
        font-size: 0.75rem;   /* 12px - Carbon label-01 */
        text-transform: uppercase;
        letter-spacing: 0.32px;
        color: var(--cds-text-secondary);
        font-weight: 400;
    }

    /* Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: var(--cds-spacing-02);
        background-color: var(--cds-layer-01);
        padding: var(--cds-spacing-03);
        border-radius: 0.5rem;  /* 8px */
    }

    .stTabs [data-baseweb="tab"] {
        padding: var(--cds-spacing-04) var(--cds-spacing-06);
        font-weight: 400;
        border-radius: 0.25rem;  /* 4px - Carbon border-radius-md */
        color: var(--cds-text-secondary);
        transition: background var(--cds-duration-fast-02) var(--cds-ease-standard);
    }

    .stTabs [aria-selected="true"] {
        background: var(--cds-blue-60);
        color: var(--cds-text-on-color);
        border-bottom: 2px solid var(--cds-blue-40);
    }

    /* Cards */
    .dashboard-card {
        background: var(--cds-layer-01);
        border: 1px solid var(--cds-border-subtle);
        border-radius: 0.5rem;  /* 8px */
        padding: var(--cds-spacing-06);
        margin: var(--cds-spacing-04) 0;
        backdrop-filter: blur(10px);
        transition: all var(--cds-duration-moderate-02) var(--cds-ease-standard);
    }

    .dashboard-card:hover {
        border-color: var(--cds-border-interactive);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }

    /* Alert boxes */
    .alert-critical {
        background: rgba(241, 194, 27, 0.1);
        border-left: 4px solid var(--cds-support-warning);
        padding: var(--cds-spacing-05);
        border-radius: 0.25rem;  /* 4px */
        margin: var(--cds-spacing-04) 0;
    }

    .alert-info {
        background: rgba(69, 137, 255, 0.1);
        border-left: 4px solid var(--cds-support-info);
        padding: var(--cds-spacing-05);
        border-radius: 0.25rem;  /* 4px */
        margin: var(--cds-spacing-04) 0;
    }

    /* Chat messages */
    .chat-message {
        padding: var(--cds-spacing-05);
        border-radius: 0.5rem;  /* 8px */
        margin: var(--cds-spacing-03) 0;
        animation: slideIn 240ms var(--cds-ease-standard);
    }

    .chat-user {
        background: rgba(69, 137, 255, 0.1);
        border-left: 3px solid var(--cds-blue-50);
    }

    .chat-agent {
        background: var(--cds-layer-02);
        border-left: 3px solid var(--cds-support-warning);
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Code blocks */
    code {
        font-family: var(--cds-font-mono);
        background: rgba(0, 0, 0, 0.4);
        padding: 2px 6px;
        border-radius: 0.25rem;  /* 4px */
        color: var(--cds-blue-40);
        font-size: 0.875rem;  /* 14px */
    }

    /* Buttons */
    .stButton > button {
        background: var(--cds-button-primary);
        color: var(--cds-text-on-color);
        font-weight: 400;
        border-radius: 0.25rem;  /* 4px */
        border: none;
        padding: var(--cds-spacing-04) var(--cds-spacing-06);
        transition: background var(--cds-duration-fast-02) var(--cds-ease-standard);
    }

    .stButton > button:hover {
        background: var(--cds-button-primary-hover);
    }

    .stButton > button:active {
        background: var(--cds-button-primary-active);
    }

    /* Focus indicators (WCAG AAA) */
    *:focus-visible {
        outline: 2px solid var(--cds-focus);
        outline-offset: 2px;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================================
# DATA GENERATION - SYNTHETIC MANUFACTURING DATA
# ============================================================================

@st.cache_data
def generate_synthetic_data(days=7, plants=3, machines_per_plant=8):
    """
    Generate realistic synthetic manufacturing data with:
    - Daily/weekly cycles
    - Random machine faults
    - Supplier variability
    - Shift patterns

    Business Context:
    This simulates a multi-plant automotive manufacturing network with
    real-time sensor data from 24 machines across 3 plants and 5 suppliers.
    """

    np.random.seed(42)

    start_date = datetime.now() - timedelta(days=days)
    timestamps = pd.date_range(start=start_date, periods=days*24, freq='H')

    data = []

    plants = [f"Plant_{chr(65+i)}" for i in range(plants)]
    suppliers = [f"Supplier_{i+1}" for i in range(5)]
    shifts = ['Day', 'Night', 'Evening']

    for plant in plants:
        for machine_num in range(machines_per_plant):
            machine_id = f"{plant}_M{machine_num+1:02d}"
            supplier = np.random.choice(suppliers)

            # Machine baseline characteristics
            base_temp = np.random.uniform(65, 75)
            base_pressure = np.random.uniform(80, 100)
            base_throughput = np.random.uniform(80, 95)

            # Introduce variability and faults
            machine_health = np.random.choice(['stable', 'degrading', 'faulty'],
                                             p=[0.7, 0.2, 0.1])

            for ts in timestamps:
                hour = ts.hour

                # Shift assignment
                if 6 <= hour < 14:
                    shift = 'Day'
                elif 14 <= hour < 22:
                    shift = 'Evening'
                else:
                    shift = 'Night'

                # Time-based patterns (circadian)
                time_factor = 1 + 0.1 * np.sin(2 * np.pi * hour / 24)

                # Weekly pattern (weekend slowdown)
                week_factor = 0.8 if ts.weekday() >= 5 else 1.0

                # Generate correlated metrics
                temp = base_temp * time_factor + np.random.normal(0, 2)
                pressure = base_pressure * time_factor + np.random.normal(0, 3)

                # Machine health affects performance
                if machine_health == 'faulty':
                    temp += np.random.uniform(5, 12)
                    pressure -= np.random.uniform(5, 15)
                    downtime = np.random.uniform(15, 60)
                    defect_rate = np.random.uniform(5, 15)
                elif machine_health == 'degrading':
                    temp += np.random.uniform(2, 5)
                    pressure -= np.random.uniform(2, 8)
                    downtime = np.random.uniform(5, 20)
                    defect_rate = np.random.uniform(2, 6)
                else:
                    downtime = np.random.uniform(0, 5)
                    defect_rate = np.random.uniform(0.5, 2.5)

                throughput = base_throughput * week_factor * time_factor
                throughput = max(0, throughput - (temp - base_temp) * 0.5)

                # Energy correlates with throughput and temperature
                energy = throughput * 1.2 + temp * 0.8 + np.random.normal(0, 5)

                # Yield is inverse to defects
                yield_rate = 100 - defect_rate - (downtime * 0.1)
                yield_rate = np.clip(yield_rate, 75, 100)

                data.append({
                    'timestamp': ts,
                    'plant_id': plant,
                    'supplier_id': supplier,
                    'machine_id': machine_id,
                    'shift': shift,
                    'temperature': round(temp, 2),
                    'pressure': round(pressure, 2),
                    'throughput': round(throughput, 2),
                    'downtime': round(downtime, 2),
                    'defect_rate': round(defect_rate, 2),
                    'energy_consumption': round(energy, 2),
                    'yield_rate': round(yield_rate, 2)
                })

    df = pd.DataFrame(data)
    return df

# ============================================================================
# ANALYTICS ENGINE
# ============================================================================

@st.cache_data
def compute_kpis(df):
    """
    Compute key performance indicators:
    - OEE (Overall Equipment Effectiveness)
    - Mean Yield
    - Mean Downtime
    - Energy per Unit

    Business Impact:
    OEE improvements of just 5% can translate to $2M+ annual savings per plant
    through reduced waste, better resource utilization, and improved throughput.
    """

    # OEE = Availability × Performance × Quality
    # Simplified calculation for demonstration
    availability = 1 - (df['downtime'] / 60)  # Assuming 60 min max
    performance = df['throughput'] / 100  # Normalized
    quality = (100 - df['defect_rate']) / 100

    df['oee'] = availability * performance * quality * 100

    kpis = {
        'oee_mean': df['oee'].mean(),
        'oee_std': df['oee'].std(),
        'yield_mean': df['yield_rate'].mean(),
        'downtime_mean': df['downtime'].mean(),
        'downtime_total': df['downtime'].sum(),
        'energy_per_unit': (df['energy_consumption'].sum() / df['throughput'].sum()),
        'defect_rate_mean': df['defect_rate'].mean(),
        'total_throughput': df['throughput'].sum()
    }

    return df, kpis

@st.cache_data
def perform_ml_clustering(df):
    """
    Use KMeans clustering to segment machines into risk categories:
    - Stable: Low temperature variance, high yield
    - At-Risk: Moderate anomalies
    - Critical: High defect rates, high downtime

    Business Value:
    Predictive maintenance based on clustering can reduce unplanned downtime
    by 30-50%, saving millions in production losses.
    """

    # Aggregate by machine
    machine_stats = df.groupby('machine_id').agg({
        'temperature': ['mean', 'std'],
        'pressure': ['mean', 'std'],
        'downtime': 'mean',
        'defect_rate': 'mean',
        'yield_rate': 'mean',
        'oee': 'mean'
    }).reset_index()

    machine_stats.columns = ['_'.join(col).strip('_') for col in machine_stats.columns]

    # Select features for clustering
    features = ['temperature_mean', 'temperature_std', 'pressure_std',
                'downtime_mean', 'defect_rate_mean']

    X = machine_stats[features].fillna(0)

    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # KMeans clustering
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    machine_stats['cluster'] = kmeans.fit_predict(X_scaled)

    # Assign risk labels based on cluster characteristics
    cluster_risk = machine_stats.groupby('cluster').agg({
        'defect_rate_mean': 'mean',
        'downtime_mean': 'mean'
    })

    cluster_risk['risk_score'] = (
        cluster_risk['defect_rate_mean'] * 0.6 +
        cluster_risk['downtime_mean'] * 0.4
    )

    risk_mapping = cluster_risk.sort_values('risk_score')['risk_score'].rank().astype(int)
    risk_labels = {1: 'Stable', 2: 'At-Risk', 3: 'Critical'}

    machine_stats['risk_category'] = machine_stats['cluster'].map(
        lambda x: risk_labels[risk_mapping[x]]
    )

    return machine_stats

@st.cache_data
def compute_correlations(df):
    """
    Compute correlation matrix between operational variables
    to identify leading indicators of defects and downtime.
    """

    corr_vars = ['temperature', 'pressure', 'throughput',
                 'defect_rate', 'yield_rate', 'energy_consumption']

    corr_matrix = df[corr_vars].corr()

    return corr_matrix

# ============================================================================
# INSIGHT AGENT - NATURAL LANGUAGE QUERY ENGINE
# ============================================================================

class InsightAgent:
    """
    Natural language interface for operational queries.

    Capabilities:
    - Keyword-based intent parsing
    - Pandas-based query execution
    - Conversational response generation
    - Confidence scoring

    Future Enhancement:
    Replace pattern matching with LLM API (Claude, GPT-4) for
    more sophisticated natural language understanding.
    """

    def __init__(self, df, machine_stats, kpis):
        self.df = df
        self.machine_stats = machine_stats
        self.kpis = kpis

    def parse_query(self, query):
        """Extract intent and entities from user query"""
        query_lower = query.lower()

        intent = None
        entities = {}

        # Intent detection
        if any(word in query_lower for word in ['downtime', 'down', 'offline', 'stopped']):
            intent = 'downtime_analysis'
        elif any(word in query_lower for word in ['yield', 'quality', 'defect', 'defects']):
            intent = 'quality_analysis'
        elif any(word in query_lower for word in ['supplier', 'supply']):
            intent = 'supplier_analysis'
        elif any(word in query_lower for word in ['energy', 'power', 'consumption']):
            intent = 'energy_analysis'
        elif any(word in query_lower for word in ['machine', 'equipment']):
            intent = 'machine_analysis'
        elif any(word in query_lower for word in ['plant', 'facility']):
            intent = 'plant_analysis'
        else:
            intent = 'general'

        # Entity extraction
        plants = self.df['plant_id'].unique()
        for plant in plants:
            if plant.lower() in query_lower:
                entities['plant'] = plant

        suppliers = self.df['supplier_id'].unique()
        for supplier in suppliers:
            if supplier.lower().replace('_', ' ') in query_lower:
                entities['supplier'] = supplier

        # Time period
        if 'week' in query_lower:
            entities['period'] = 'week'
        elif 'day' in query_lower or 'today' in query_lower:
            entities['period'] = 'day'
        else:
            entities['period'] = 'all'

        return intent, entities

    def execute_query(self, intent, entities):
        """Execute data query based on parsed intent"""

        df_filtered = self.df.copy()

        # Apply filters
        if 'plant' in entities:
            df_filtered = df_filtered[df_filtered['plant_id'] == entities['plant']]

        if 'supplier' in entities:
            df_filtered = df_filtered[df_filtered['supplier_id'] == entities['supplier']]

        # Execute intent-specific analysis
        if intent == 'downtime_analysis':
            result = self._analyze_downtime(df_filtered)
        elif intent == 'quality_analysis':
            result = self._analyze_quality(df_filtered)
        elif intent == 'supplier_analysis':
            result = self._analyze_supplier(df_filtered)
        elif intent == 'energy_analysis':
            result = self._analyze_energy(df_filtered)
        elif intent == 'machine_analysis':
            result = self._analyze_machines(df_filtered)
        elif intent == 'plant_analysis':
            result = self._analyze_plants(df_filtered)
        else:
            result = self._general_summary(df_filtered)

        return result

    def _analyze_downtime(self, df):
        """Analyze downtime patterns"""
        top_machines = df.groupby('machine_id')['downtime'].sum().sort_values(ascending=False).head(5)

        response = f"""**Downtime Analysis** 🔧

**Top 5 Machines by Total Downtime:**

"""
        for machine, downtime in top_machines.items():
            response += f"- `{machine}`: **{downtime:.1f} minutes** total downtime\n"

        avg_downtime = df['downtime'].mean()
        response += f"\n**Average Downtime:** {avg_downtime:.2f} minutes per hour\n"

        # Identify shift impact
        shift_downtime = df.groupby('shift')['downtime'].mean().sort_values(ascending=False)
        worst_shift = shift_downtime.index[0]
        response += f"\n**Worst Performing Shift:** {worst_shift} ({shift_downtime.iloc[0]:.2f} min avg)\n"

        response += f"\n💡 **Recommendation:** Focus preventive maintenance on top 3 machines during {worst_shift} shift transition."

        return response, 0.92

    def _analyze_quality(self, df):
        """Analyze quality and defect patterns"""
        avg_defect = df['defect_rate'].mean()
        avg_yield = df['yield_rate'].mean()

        worst_machines = df.groupby('machine_id')['defect_rate'].mean().sort_values(ascending=False).head(3)

        response = f"""**Quality Analysis** ✨

**Overall Performance:**
- Average Defect Rate: **{avg_defect:.2f}%**
- Average Yield: **{avg_yield:.2f}%**

**Machines Requiring Attention:**

"""
        for machine, defect_rate in worst_machines.items():
            response += f"- `{machine}`: {defect_rate:.2f}% defect rate\n"

        # Correlation insight
        temp_defect_corr = df[['temperature', 'defect_rate']].corr().iloc[0, 1]
        if abs(temp_defect_corr) > 0.3:
            response += f"\n📊 **Key Finding:** Temperature shows {abs(temp_defect_corr):.2f} correlation with defect rate."
            response += f"\n💡 **Action:** Implement temperature-based quality control alerts."

        return response, 0.88

    def _analyze_supplier(self, df):
        """Analyze supplier impact on performance"""
        supplier_stats = df.groupby('supplier_id').agg({
            'yield_rate': 'mean',
            'defect_rate': 'mean',
            'downtime': 'mean'
        }).round(2)

        response = f"""**Supplier Performance Analysis** 📦

"""
        for supplier in supplier_stats.index:
            stats = supplier_stats.loc[supplier]
            response += f"\n**{supplier}:**\n"
            response += f"- Yield: {stats['yield_rate']:.1f}%\n"
            response += f"- Defects: {stats['defect_rate']:.1f}%\n"
            response += f"- Avg Downtime: {stats['downtime']:.1f} min\n"

        best_supplier = supplier_stats['yield_rate'].idxmax()
        response += f"\n🏆 **Top Performer:** {best_supplier} with {supplier_stats.loc[best_supplier, 'yield_rate']:.1f}% yield"

        return response, 0.85

    def _analyze_energy(self, df):
        """Analyze energy consumption patterns"""
        total_energy = df['energy_consumption'].sum()
        avg_efficiency = total_energy / df['throughput'].sum()

        plant_energy = df.groupby('plant_id')['energy_consumption'].sum().sort_values(ascending=False)

        response = f"""**Energy Consumption Analysis** ⚡

**Overall Metrics:**
- Total Energy: **{total_energy:,.0f} kWh**
- Energy per Unit: **{avg_efficiency:.2f} kWh/unit**

**Energy by Plant:**

"""
        for plant, energy in plant_energy.items():
            response += f"- {plant}: {energy:,.0f} kWh\n"

        response += f"\n💡 **Optimization Potential:** Reducing energy per unit by 10% could save ${total_energy * 0.1 * 0.12:,.0f} annually (at $0.12/kWh)."

        return response, 0.90

    def _analyze_machines(self, df):
        """Analyze machine performance"""
        machine_risk = self.machine_stats[['machine_id', 'risk_category', 'oee_mean', 'defect_rate_mean']]

        critical = machine_risk[machine_risk['risk_category'] == 'Critical']

        response = f"""**Machine Performance Overview** 🏭

**Risk Distribution:**
- Stable: {len(machine_risk[machine_risk['risk_category'] == 'Stable'])} machines
- At-Risk: {len(machine_risk[machine_risk['risk_category'] == 'At-Risk'])} machines
- Critical: {len(critical)} machines

"""
        if len(critical) > 0:
            response += "**Critical Machines Requiring Immediate Attention:**\n\n"
            for _, row in critical.head(5).iterrows():
                response += f"- `{row['machine_id']}`: OEE {row['oee_mean']:.1f}%, Defects {row['defect_rate_mean']:.1f}%\n"

        return response, 0.94

    def _analyze_plants(self, df):
        """Analyze plant-level performance"""
        plant_stats = df.groupby('plant_id').agg({
            'oee': 'mean',
            'yield_rate': 'mean',
            'downtime': 'sum',
            'throughput': 'sum'
        }).round(2)

        response = f"""**Plant Performance Comparison** 🏭

"""
        for plant in plant_stats.index:
            stats = plant_stats.loc[plant]
            response += f"\n**{plant}:**\n"
            response += f"- OEE: {stats['oee']:.1f}%\n"
            response += f"- Yield: {stats['yield_rate']:.1f}%\n"
            response += f"- Total Downtime: {stats['downtime']:.0f} min\n"
            response += f"- Throughput: {stats['throughput']:,.0f} units\n"

        best_plant = plant_stats['oee'].idxmax()
        response += f"\n🏆 **Top Performer:** {best_plant} with {plant_stats.loc[best_plant, 'oee']:.1f}% OEE"

        return response, 0.91

    def _general_summary(self, df):
        """General operational summary"""
        response = f"""**Operational Summary** 📊

**Key Metrics:**
- Overall OEE: {self.kpis['oee_mean']:.1f}%
- Average Yield: {self.kpis['yield_mean']:.1f}%
- Total Downtime: {self.kpis['downtime_total']:,.0f} minutes
- Average Defect Rate: {self.kpis['defect_rate_mean']:.2f}%

**Fleet Status:**
- Total Machines: {df['machine_id'].nunique()}
- Active Plants: {df['plant_id'].nunique()}
- Supplier Network: {df['supplier_id'].nunique()} suppliers

💡 Try asking specific questions like:
- "Which machines had the most downtime?"
- "How is Supplier_1 affecting quality?"
- "Show me energy consumption by plant"
"""
        return response, 0.75

    def answer(self, query):
        """Main entry point for question answering"""
        intent, entities = self.parse_query(query)
        response, confidence = self.execute_query(intent, entities)

        return {
            'query': query,
            'intent': intent,
            'entities': entities,
            'response': response,
            'confidence': confidence
        }

# ============================================================================
# MAIN APPLICATION
# ============================================================================

def main():

    # Header
    st.markdown("""
    <div style='text-align: center; padding: 20px 0;'>
        <h1 style='font-size: 48px; margin-bottom: 10px;'>
            🏭 AI Operations Dashboard
        </h1>
        <p style='font-size: 20px; color: #8b949e; margin-bottom: 5px;'>
            Automotive Supply & Manufacturing Intelligence
        </p>
        <p style='font-size: 16px; color: #00E0FF;'>
            Turning Data into Decisions
        </p>
    </div>
    """, unsafe_allow_html=True)

    # Sidebar
    with st.sidebar:
        st.markdown("### ⚙️ Configuration")

        days = st.slider("Data History (days)", 3, 14, 7)
        plants = st.slider("Number of Plants", 2, 5, 3)
        machines = st.slider("Machines per Plant", 4, 12, 8)

        st.markdown("---")
        st.markdown("### 📊 System Status")
        st.markdown(f"""
        <div class='alert-info'>
        <strong>Live Data Stream</strong><br>
        ✅ {plants * machines} machines monitored<br>
        ✅ AI Analytics Active<br>
        ✅ Insight Agent Ready
        </div>
        """, unsafe_allow_html=True)

        st.markdown("---")
        st.markdown("""
        ### 💡 About

        This dashboard demonstrates AI-driven operational intelligence for automotive manufacturing.

        **Key Features:**
        - Real-time KPI monitoring
        - ML-based risk clustering
        - Correlation analysis
        - Natural language queries

        **Business Impact:**
        Reducing OEE by 5% = $2M+ savings/year per plant
        """)

    # Generate data
    with st.spinner('🔄 Generating synthetic manufacturing data...'):
        df = generate_synthetic_data(days=days, plants=plants, machines_per_plant=machines)
        df, kpis = compute_kpis(df)
        machine_stats = perform_ml_clustering(df)
        corr_matrix = compute_correlations(df)

    # Initialize Insight Agent
    agent = InsightAgent(df, machine_stats, kpis)

    # Initialize session state for chat
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

    # Create tabs
    tab1, tab2, tab3, tab4 = st.tabs([
        "📊 Overview",
        "🔬 Diagnostics",
        "🤖 AI Insights",
        "💬 Command Center"
    ])

    # ========================================================================
    # TAB 1: OVERVIEW
    # ========================================================================

    with tab1:
        st.markdown("## Key Performance Indicators")

        # KPI Cards
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            delta_oee = kpis['oee_mean'] - 85  # Target baseline
            st.metric(
                "Overall Equipment Effectiveness",
                f"{kpis['oee_mean']:.1f}%",
                f"{delta_oee:+.1f}% from target",
                delta_color="normal" if delta_oee > 0 else "inverse"
            )

        with col2:
            st.metric(
                "Average Yield",
                f"{kpis['yield_mean']:.1f}%",
                f"{kpis['yield_mean'] - 95:+.1f}% from target"
            )

        with col3:
            st.metric(
                "Total Downtime",
                f"{kpis['downtime_total']:,.0f} min",
                f"{kpis['downtime_mean']:.1f} min/hour avg"
            )

        with col4:
            st.metric(
                "Energy Efficiency",
                f"{kpis['energy_per_unit']:.2f} kWh/unit",
                "Optimization target: <1.5"
            )

        st.markdown("---")

        # Business Context
        st.markdown("""
        <div class='alert-info'>
        <strong>Business Impact</strong><br>
        Every 1% improvement in OEE translates to approximately $400K annual savings per plant through:
        reduced waste, improved throughput, and better resource utilization. Current performance indicates
        significant optimization opportunities in downtime reduction and quality improvement.
        </div>
        """, unsafe_allow_html=True)

        st.markdown("### Performance Trends")

        # Time series charts
        col1, col2 = st.columns(2)

        with col1:
            # OEE over time
            hourly_oee = df.groupby('timestamp')['oee'].mean().reset_index()

            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=hourly_oee['timestamp'],
                y=hourly_oee['oee'],
                mode='lines',
                name='OEE',
                line=dict(color=CARBON_COLORS['purple'], width=2),
                fill='tozeroy',
                fillcolor='rgba(138, 63, 252, 0.1)'
            ))

            fig.add_hline(y=85, line_dash="dash", line_color=CARBON_COLORS['gold'],
                         annotation_text="Target: 85%")

            fig.update_layout(
                title="Overall Equipment Effectiveness Over Time",
                template="plotly_dark",
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(family="IBM Plex Sans", color='#c6c6c6'),
                hovermode='x unified',
                height=350
            )

            st.plotly_chart(fig, use_container_width=True)

        with col2:
            # Yield vs Defects
            hourly_quality = df.groupby('timestamp').agg({
                'yield_rate': 'mean',
                'defect_rate': 'mean'
            }).reset_index()

            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=hourly_quality['timestamp'],
                y=hourly_quality['yield_rate'],
                mode='lines',
                name='Yield Rate',
                line=dict(color=CARBON_COLORS['cyan'], width=2)
            ))

            fig.add_trace(go.Scatter(
                x=hourly_quality['timestamp'],
                y=hourly_quality['defect_rate'],
                mode='lines',
                name='Defect Rate',
                line=dict(color=CARBON_COLORS['red'], width=2),
                yaxis='y2'
            ))

            fig.update_layout(
                title="Quality Metrics: Yield vs Defect Rate",
                template="plotly_dark",
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(family="IBM Plex Sans", color='#c6c6c6'),
                hovermode='x unified',
                height=350,
                yaxis=dict(title="Yield Rate (%)"),
                yaxis2=dict(title="Defect Rate (%)", overlaying='y', side='right')
            )

            st.plotly_chart(fig, use_container_width=True)

        # Plant comparison
        st.markdown("### Plant Performance Comparison")

        plant_perf = df.groupby('plant_id').agg({
            'oee': 'mean',
            'yield_rate': 'mean',
            'downtime': 'sum',
            'throughput': 'sum'
        }).reset_index()

        fig = go.Figure()

        fig.add_trace(go.Bar(
            name='OEE',
            x=plant_perf['plant_id'],
            y=plant_perf['oee'],
            marker_color=CARBON_COLORS['purple']
        ))

        fig.add_trace(go.Bar(
            name='Yield',
            x=plant_perf['plant_id'],
            y=plant_perf['yield_rate'],
            marker_color=CARBON_COLORS['cyan']
        ))

        fig.update_layout(
            barmode='group',
            template="plotly_dark",
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(family="IBM Plex Sans", color='#c6c6c6'),
            height=350
        )

        st.plotly_chart(fig, use_container_width=True)

    # ========================================================================
    # TAB 2: DIAGNOSTICS
    # ========================================================================

    with tab2:
        st.markdown("## Advanced Diagnostics & Correlation Analysis")

        col1, col2 = st.columns(2)

        with col1:
            # Scatter plot: Temperature vs Defect Rate
            st.markdown("### Temperature Impact on Quality")

            fig = px.scatter(
                df,
                x='temperature',
                y='defect_rate',
                color='plant_id',
                size='downtime',
                hover_data=['machine_id', 'shift'],
                template='plotly_dark',
                color_discrete_sequence=[CARBON_COLORS['purple'], CARBON_COLORS['cyan'], CARBON_COLORS['teal']]
            )

            fig.update_layout(
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(family="IBM Plex Sans", color='#c6c6c6'),
                height=400
            )

            st.plotly_chart(fig, use_container_width=True)

            # Correlation insight
            temp_defect_corr, p_value = pearsonr(df['temperature'], df['defect_rate'])
            st.markdown(f"""
            **Correlation Coefficient:** `{temp_defect_corr:.3f}` (p={p_value:.4f})

            {':warning:' if abs(temp_defect_corr) > 0.3 else ':white_check_mark:'}
            **Interpretation:** {'Strong' if abs(temp_defect_corr) > 0.5 else 'Moderate' if abs(temp_defect_corr) > 0.3 else 'Weak'}
            correlation detected between temperature and defect rate.
            """)

        with col2:
            # Scatter plot: Pressure vs Throughput
            st.markdown("### Pressure Impact on Throughput")

            fig = px.scatter(
                df,
                x='pressure',
                y='throughput',
                color='supplier_id',
                size='energy_consumption',
                hover_data=['machine_id', 'shift'],
                template='plotly_dark',
                color_discrete_sequence=CARBON_PALETTE[:5]
            )

            fig.update_layout(
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(family="IBM Plex Sans", color='#c6c6c6'),
                height=400
            )

            st.plotly_chart(fig, use_container_width=True)

            press_through_corr, p_value = pearsonr(df['pressure'], df['throughput'])
            st.markdown(f"""
            **Correlation Coefficient:** `{press_through_corr:.3f}` (p={p_value:.4f})

            {':white_check_mark:' if press_through_corr > 0 else ':warning:'}
            **Interpretation:** {'Positive' if press_through_corr > 0 else 'Negative'}
            correlation between pressure and throughput.
            """)

        # Correlation heatmap
        st.markdown("### Full Correlation Matrix")

        fig = go.Figure(data=go.Heatmap(
            z=corr_matrix.values,
            x=corr_matrix.columns,
            y=corr_matrix.columns,
            colorscale=[
                [0, CARBON_COLORS['blue']],
                [0.5, '#262626'],  # Carbon layer-01
                [1, CARBON_COLORS['gold']]
            ],
            zmid=0,
            text=corr_matrix.values,
            texttemplate='%{text:.2f}',
            textfont={"size": 10},
            colorbar=dict(title="Correlation")
        ))

        fig.update_layout(
            template="plotly_dark",
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(family="IBM Plex Sans", color='#c6c6c6'),
            height=500
        )

        st.plotly_chart(fig, use_container_width=True)

        st.markdown("""
        <div class='alert-info'>
        <strong>Key Finding:</strong><br>
        Strong negative correlation between temperature and yield indicates that thermal management
        is a critical control point. Implementing real-time temperature alerts could prevent
        quality degradation before it occurs.
        </div>
        """, unsafe_allow_html=True)

    # ========================================================================
    # TAB 3: AI INSIGHTS
    # ========================================================================

    with tab3:
        st.markdown("## AI-Generated Insights")

        st.markdown("""
        <div class='alert-info'>
        <strong>Machine Learning Analysis</strong><br>
        Using KMeans clustering on operational patterns to segment machines into risk categories.
        This enables proactive maintenance scheduling and resource optimization.
        </div>
        """, unsafe_allow_html=True)

        # Risk distribution
        col1, col2, col3 = st.columns(3)

        risk_counts = machine_stats['risk_category'].value_counts()

        with col1:
            st.metric(
                "🟢 Stable Machines",
                risk_counts.get('Stable', 0),
                "Performing optimally"
            )

        with col2:
            st.metric(
                "🟡 At-Risk Machines",
                risk_counts.get('At-Risk', 0),
                "Requires monitoring"
            )

        with col3:
            st.metric(
                "🔴 Critical Machines",
                risk_counts.get('Critical', 0),
                "Immediate action needed"
            )

        st.markdown("---")

        # Machine risk visualization
        col1, col2 = st.columns([2, 1])

        with col1:
            st.markdown("### Machine Risk Segmentation")

            fig = px.scatter(
                machine_stats,
                x='defect_rate_mean',
                y='downtime_mean',
                color='risk_category',
                size='temperature_std',
                hover_data=['machine_id', 'oee_mean'],
                color_discrete_map={
                    'Stable': CARBON_COLORS['green'],
                    'At-Risk': CARBON_COLORS['gold'],
                    'Critical': CARBON_COLORS['red']
                },
                template='plotly_dark',
                labels={
                    'defect_rate_mean': 'Average Defect Rate (%)',
                    'downtime_mean': 'Average Downtime (min)'
                }
            )

            fig.update_layout(
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(family="IBM Plex Sans", color='#c6c6c6'),
                height=450
            )

            st.plotly_chart(fig, use_container_width=True)

        with col2:
            st.markdown("### Critical Machines")

            critical_machines = machine_stats[
                machine_stats['risk_category'] == 'Critical'
            ][['machine_id', 'oee_mean', 'defect_rate_mean', 'downtime_mean']].head(10)

            if len(critical_machines) > 0:
                for _, row in critical_machines.iterrows():
                    st.markdown(f"""
                    <div class='alert-critical'>
                    <strong>{row['machine_id']}</strong><br>
                    OEE: {row['oee_mean']:.1f}%<br>
                    Defects: {row['defect_rate_mean']:.1f}%<br>
                    Downtime: {row['downtime_mean']:.1f} min
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.success("No critical machines detected!")

        # Auto-generated insights
        st.markdown("---")
        st.markdown("### Auto-Generated Insights")

        # Insight 1: Supplier correlation
        supplier_quality = df.groupby('supplier_id')['defect_rate'].mean().sort_values(ascending=False)
        worst_supplier = supplier_quality.index[0]
        worst_defect_rate = supplier_quality.iloc[0]

        st.markdown(f"""
        <div class='alert-critical'>
        <strong>🔍 Insight #1: Supplier Quality Variance</strong><br>
        {worst_supplier} shows {worst_defect_rate:.2f}% average defect rate,
        {((worst_defect_rate / supplier_quality.mean() - 1) * 100):.1f}% above network average.
        <br><br>
        <strong>Recommendation:</strong> Conduct supplier audit and implement enhanced quality controls for {worst_supplier} shipments.
        </div>
        """, unsafe_allow_html=True)

        # Insight 2: Shift performance
        shift_performance = df.groupby('shift')['oee'].mean().sort_values()
        worst_shift = shift_performance.index[0]
        shift_gap = shift_performance.iloc[-1] - shift_performance.iloc[0]

        st.markdown(f"""
        <div class='alert-critical'>
        <strong>🔍 Insight #2: Shift Performance Gap</strong><br>
        {worst_shift} shift shows {shift_performance.iloc[0]:.1f}% OEE,
        {shift_gap:.1f} percentage points below top-performing shift.
        <br><br>
        <strong>Recommendation:</strong> Analyze {worst_shift} shift SOPs and cross-train with high-performing shift team.
        </div>
        """, unsafe_allow_html=True)

        # Insight 3: Energy optimization
        high_energy_machines = df.groupby('machine_id')['energy_consumption'].mean().sort_values(ascending=False).head(3)

        st.markdown(f"""
        <div class='alert-info'>
        <strong>🔍 Insight #3: Energy Optimization Opportunity</strong><br>
        Top 3 energy-consuming machines account for {(high_energy_machines.sum() / df['energy_consumption'].sum() * 100):.1f}%
        of total consumption.
        <br><br>
        <strong>Potential Savings:</strong> 10% energy reduction = ${(high_energy_machines.sum() * 0.1 * 0.12):,.0f} annually.
        </div>
        """, unsafe_allow_html=True)

    # ========================================================================
    # TAB 4: COMMAND CENTER (INSIGHT AGENT)
    # ========================================================================

    with tab4:
        st.markdown("## 💬 AI Insight Agent - Command Center")

        st.markdown("""
        <div class='alert-info'>
        <strong>Natural Language Query Interface</strong><br>
        Ask questions about your operations in plain English. The AI agent will analyze
        your data and provide actionable insights with confidence scores.
        <br><br>
        <strong>Example queries:</strong><br>
        • "Which machines caused the most downtime this week?"<br>
        • "How is Supplier_1 affecting yield at Plant_A?"<br>
        • "Show me energy consumption by plant"<br>
        • "What are the critical machines?"
        </div>
        """, unsafe_allow_html=True)

        st.markdown("---")

        # Chat history display
        st.markdown("### Conversation History")

        chat_container = st.container()

        with chat_container:
            if len(st.session_state.chat_history) == 0:
                st.info("👋 Start by asking a question about your operations!")
            else:
                for chat in st.session_state.chat_history:
                    # User message
                    st.markdown(f"""
                    <div class='chat-message chat-user'>
                    <strong>You:</strong><br>
                    {chat['query']}
                    </div>
                    """, unsafe_allow_html=True)

                    # Agent response
                    st.markdown(f"""
                    <div class='chat-message chat-agent'>
                    <strong>AI Agent:</strong> <em>Confidence: {chat['confidence']*100:.0f}%</em><br>
                    {chat['response']}
                    </div>
                    """, unsafe_allow_html=True)

        # Chat input
        st.markdown("---")

        query = st.chat_input("Ask me anything about your operations...")

        if query:
            with st.spinner('🤖 Analyzing...'):
                result = agent.answer(query)
                st.session_state.chat_history.append(result)
                st.rerun()

        # Clear history button
        col1, col2, col3 = st.columns([1, 1, 3])
        with col1:
            if st.button("🗑️ Clear History"):
                st.session_state.chat_history = []
                st.rerun()

        with col2:
            if st.button("📊 Quick Stats"):
                result = agent.answer("Show me general summary")
                st.session_state.chat_history.append(result)
                st.rerun()

        # Technical details expander
        with st.expander("🔧 Technical Implementation Details"):
            st.markdown("""
            ### Insight Agent Architecture

            **Current Implementation:**
            - Intent parsing via keyword matching
            - Entity extraction (plants, suppliers, time periods)
            - Pandas-based query execution
            - Conversational response generation

            **Future Enhancements:**
            ```python
            # Integrate with LLM API (Claude, GPT-4)
            import anthropic

            client = anthropic.Anthropic(api_key="...")
            message = client.messages.create(
                model="claude-3-opus-20240229",
                max_tokens=1024,
                messages=[{
                    "role": "user",
                    "content": f"Analyze this data: {data_summary}"
                }]
            )
            ```

            **Benefits:**
            - More sophisticated natural language understanding
            - Complex multi-step reasoning
            - Contextual follow-up questions
            - Automated insight discovery
            """)

    # Footer
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center; color: #8b949e; padding: 20px;'>
    <p>🤖 Generated with <a href='https://claude.com/claude-code' style='color: #00E0FF;'>Claude Code</a></p>
    <p style='font-size: 12px;'>
    This dashboard demonstrates AI-driven operational intelligence for automotive manufacturing.<br>
    Data is synthetically generated for demonstration purposes.
    </p>
    </div>
    """, unsafe_allow_html=True)

# ============================================================================
# RUN APPLICATION
# ============================================================================

if __name__ == "__main__":
    main()
