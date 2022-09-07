import js
import json
import plotly

import numpy as np
import pandas as pd
import seaborn as sns

import matplotlib.pyplot as plt
import plotly.express as px

from pyodide.http import open_url

# Create sample dataframe
url = "./data/all_stocks_2006-01-01_to_2018-01-01.csv"
df = pd.read_csv(open_url(url))
df_initial_0123123 = df.head().copy()

def plot(fig):
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    js.plot(graphJSON)


df_initial_0123123.head()
