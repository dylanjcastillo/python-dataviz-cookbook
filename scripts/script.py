import js
import json
import plotly

import numpy as np
import pandas as pd
import seaborn as sns

import matplotlib.pyplot as plt
import plotly.express as px

from pyodide import to_js, create_proxy
from pyodide.http import open_url


df = pd.DataFrame({})
chart_data_mapping = {
    "Line Chart": "line_plot.csv",
}

chart_type = document.querySelector("#chart-type")


def plot(fig):
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    js.plot(graphJSON)


def read_data(change):
    global df
    url = "./data/{}"
    df = pd.read_csv(open_url(url.format(chart_data_mapping[chart_type.value])))

    if chart_type.value == "Line Chart":
        df["Date"] = pd.to_datetime(df["Date"])

    df.head().to_html()
    js.update_initial_df(to_js(df.head().to_html()))


chart_type.addEventListener("change", create_proxy(read_data))
