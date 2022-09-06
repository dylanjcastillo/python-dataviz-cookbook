import numpy as np
import pandas as pd

from pyodide.http import open_url

# Create sample dataframe
url = "./data/all_stocks_2006-01-01_to_2018-01-01.csv"
df = pd.read_csv(open_url(url))
df_initial = df.copy()

df_initial.head()
