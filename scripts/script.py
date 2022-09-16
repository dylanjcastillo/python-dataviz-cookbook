import json

import numpy as np
import pandas as pd
import seaborn as sns

import matplotlib.pyplot as plt
import plotly.express as px

from js import plot_js, update_initial_df
from plotly.utils import PlotlyJSONEncoder
from pyodide import to_js, create_proxy
from pyodide.http import open_url


df = pd.DataFrame({})
chart_data_mapping = {
    "Line Chart": "line_chart.csv",
    "Bar Chart": "bar_chart.csv",
    "Grouped Bar Chart": "bar_chart.csv",
    "Stacked Bar Chart": "stacked_bar_chart.csv",
    "Stacked Area Chart": "stacked_area_chart.csv",
    "Pie Chart": "donut_chart.csv",
    "Donut Chart": "donut_chart.csv",
    "Histogram": "histogram.csv",
    "Scatter Plot": "scatter_plot.csv",
    "Box Plot": "box_plot.csv",
    "Strip Plot": "box_plot.csv",
}

chart_type = document.querySelector("#chart-type")


def plot(fig):
    graph_json = json.dumps(fig, cls=PlotlyJSONEncoder)
    plot_js(graph_json)


def read_data(change):
    global df
    url = "./data/{}"

    try:
        df = pd.read_csv(open_url(url.format(chart_data_mapping[chart_type.value])))

        if "Date" in df.columns:
            df["Date"] = pd.to_datetime(df["Date"])

        update_initial_df(to_js(df.head().to_html()))
    except Exception:
        pass

    document.querySelector(
        "#copy-code-prefix"
    ).innerHTML = f"""import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

df = pd.read_csv("https://raw.githubusercontent.com/dylanjcastillo/python-dataviz-cookbook/main/data/{chart_data_mapping[chart_type.value]}") 

if "Date" in df.columns:
    df["Date"] = pd.to_datetime(df["Date"])
    """


chart_type.addEventListener("change", create_proxy(read_data))
read_data(None)
