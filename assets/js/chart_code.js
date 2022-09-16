const line_chart = {
    "Pandas": `
import matplotlib.dates as mdates

fig, ax = plt.subplots(figsize=(6, 4))

df_wide = df.pivot(
    index="Date", 
    columns="Name", 
    values="Close"
) # Pandas requires variables in columns to plot them

df_wide.plot(
    title="Stock prices (2015 - 2017)", 
    ylabel="Closing Price", 
    ax=ax,
)
ax.xaxis.set_major_formatter(
    mdates.DateFormatter("%b-%y")
)
fig # Not necessary if using a notebook
`,
    "Matplotlib": `
import matplotlib.dates as mdates

fig, ax = plt.subplots(figsize=(6, 4))

for l, g in df.groupby("Name"):
    ax.plot(g["Date"], g["Close"], label=l)

ax.xaxis.set_major_formatter(
    mdates.DateFormatter("%b-%y")
)
ax.tick_params(axis='x', rotation=30)

ax.set_title("Stock prices (2015 - 2017)")
ax.set_ylabel("Close")
ax.set_xlabel("Date")
ax.legend(title="Name")

fig # Not necessary if using a notebook
`,
    "Seaborn": `
import matplotlib.dates as mdates

fig, ax = plt.subplots(figsize=(6, 4))
sns.lineplot(
    data=df, 
    x="Date", 
    y="Close", 
    hue="Name", 
    ax=ax
)
ax.xaxis.set_major_formatter(
    mdates.DateFormatter("%b-%y")
)
ax.tick_params(axis='x', rotation=30)
ax.set_title("Stock Prices (2015 - 2017)")
fig # Not necessary if using a notebook
`,
    "Plotly Express": `
fig = px.line(
    df, 
    x="Date", 
    y="Close", 
    color="Name", 
    title="Stock Prices (2015 - 2017)"
)
fig.update_yaxes(tickprefix="$")
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const bar_chart = {
    "Pandas": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

df.plot.bar(
    x="Year",
    y="Open",
    rot=0,
    ylabel="Opening price",
    title="Maximum opening price per year - AAPL",
    legend=None,
    ax=ax
)
ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)
fig # Not necessary if using a notebook
     `,
    "Matplotlib": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

x = np.arange(len(df.Year))
width = 0.5

ax.bar(x, df.Open, width, label="Open")

ax.set_xlabel("Year")
ax.set_ylabel("Opening price")
ax.set_title("Maximum opening price per year - AAPL")

ax.set_xticks(x)
ax.set_xticklabels(df.Year)

ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)
fig # Not necessary if using a notebook
`,
    "Seaborn": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

sns.barplot(
    data=df,
    x="Year",
    y="Open",
    color="blue",
    ax=ax
)

ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

ax.set_title("Maximum opening price per year - AAPL")
fig # Not necessary if using a notebook
 `,
    "Plotly Express": `
 fig = px.bar(
    df,
    x="Year",
    y="Open",
    title="Max opening price per year - AAPL",
    labels={"value": "Opening price"},
)
fig.update_yaxes(tickprefix="$")
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const grouped_bar_chart = {
    "Pandas": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

df.plot.bar(
    x="Year",
    y=["Open", "Close"],
    rot=0,
    ylabel="Price",
    title="Maximum opening and closing price per year - AAPL",
    ax=ax
)
ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)
fig # Not necessary if using a notebook
     `,
    "Matplotlib": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

x = np.arange(len(df.Year))
width = 0.25

ax.bar(x - width / 2, df.Open, width, label="Open")
ax.bar(x + width / 2, df.Close, width, label="Close")

ax.set_xlabel("Year")
ax.set_ylabel("Price")
ax.set_title("Maximum opening and closing price per year - AAPL")

ax.set_xticks(x)
ax.set_xticklabels(df.Year)

ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)
ax.legend()
fig # Not necessary if using a notebook
`,
    "Seaborn": `
import matplotlib.ticker as mticker

df_long = df.melt(
    id_vars="Year",
    value_vars=["Open", "Close"],
    var_name="Category",
    value_name="Price",
) # Seaborn works better with long data

fig, ax = plt.subplots(figsize=(6, 4))
sns.barplot(data=df_long, x="Year", y="Price", hue="Category", ax=ax)

ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

ax.set_title("Maximum opening and closing price per year - AAPL")
ax.legend(title=None)
fig # Not necessary if using a notebook
 `,
    "Plotly Express": `
fig = px.bar(
    df,
    x="Year",
    y=["Open", "Close"],
    barmode="group",
    title="Max opening and closing price per year - AAPL",
    labels={"value": "Price"},
)
fig.update_yaxes(tickprefix="$")
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const stacked_bar_chart = {
    "Pandas": `
fig, ax = plt.subplots(figsize=(6, 4))
df_wide = df.pivot(
    index="Year", columns="Name", values="Volume"
) # Pandas works better with wide data
df_wide.plot.bar(
    ylabel="Volume (billions of shares)",
    title="Trading volume per year for selected shares",
    stacked=True,
    ax=ax,
    rot=0
)
fig # Not necessary if using a notebook
`,
    "Matplotlib": `
fig, ax = plt.subplots(figsize=(6, 4))

bottom = np.zeros(df.Year.nunique())
for i, g in df.groupby("Name"):
    ax.bar(
        g["Year"], 
        g["Volume"], 
        bottom=bottom, 
        label=i, 
        width=0.5
    )
    bottom += g["Volume"].values

ax.set_title("Trading volume per year for selected shares")
ax.set_ylabel("Volume (billions of shares)")
ax.set_xlabel("Year")

ax.legend()

fig # Not necessary if using a notebook
`,
    "Seaborn": `
fig, ax = plt.subplots(figsize=(6, 4))

ax = sns.histplot(
    data=df,
    x="Year",
    hue="Name",
    weights="Volume",
    multiple="stack",
    shrink=0.5,
    discrete=True,
    hue_order=df.groupby("Name").Volume.sum().sort_values().index,
)

ax.set_title("Trading volume per year for selected shares")
ax.set_ylabel("Volume (billions of shares)")

legend = ax.get_legend()
legend.set_bbox_to_anchor((1, 1))
fig # Not necessary if using a notebook
`,
    "Plotly Express": `
fig = px.bar(
    df,
    x="Year",
    y="Volume",
    color="Name",
    title="Trading volume per year for selected shares",
    barmode="stack",
    labels={"Volume": "Volume (billions of shares)"},
)
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const stacked_area_chart = {
    "Pandas": `
import matplotlib.dates as mdates
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

df_wide = df.pivot(
    index="Date", columns="Name", values="Volume Perc"
) # Pandas works better with wide data

df_wide.plot.area(
    rot=0,
    title="Distribution of daily trading volume - 2017",
    stacked=True,
    ax=ax
)

ax.tick_params(axis="x", rotation=30)
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b-%y"))

fig # Not necessary if using a notebook
`,
    "Matplotlib": `
import matplotlib.dates as mdates
import matplotlib.ticker as mticker

df_wide = df.pivot(
    index="Date", columns="Name", values="Volume Perc"
)

fig, ax = plt.subplots(figsize=(6, 4))

ax.stackplot(
    df_wide.index, 
    [df_wide[col].values for col in sorted(df.Name.unique())], 
    labels=sorted(df.Name.unique())
)

ax.set_title("Distribution of daily trading volume - 2017")

ax.tick_params(axis="x", rotation=30)
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b-%y"))

fig # Not necessary if using a notebook
`,
    "Seaborn": `# Seaborn does not support stacked area charts`,
    "Plotly Express": `
    # Plotly express
fig = px.area(
    df,
    x="Date",
    y="Volume Perc",
    color="Name",
    title="Distribution of daily trading volume - 2017",
)
fig.update_layout(yaxis_tickformat=".0%")
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const donut_chart = {
    "Pandas": `
fig, ax = plt.subplots(figsize=(6, 6))
df.set_index("Name").plot.pie(
    y="Volume",
    wedgeprops=dict(width=0.5),
    autopct="%1.0f%%",
    pctdistance=0.75,
    title="Distribution of total trading volume for selected stocks (2006 - 2017)",
    ax=ax
)
fig # Not necessary if using a notebook
`,
    "Matplotlib": `
fig, ax = plt.subplots(figsize=(6, 6))

ax.pie(
    df.Volume,
    labels=df.Name,
    wedgeprops=dict(width=0.5),
    autopct="%1.0f%%",
    pctdistance=0.75,
)
ax.set_title("Distribution of total trading volume for selected stocks (2006 - 2017)")
ax.legend()
fig`,
    "Seaborn": `# Seaborn does not support donut charts`,
    "Plotly Express": `
fig = px.pie(
    data_frame=df,
    values="Volume",
    names="Name",
    hole=0.5,
    color="Name",
    title="Distribution of trading volume for selected stocks (2006 - 2017)",
)
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const pie_chart = {
    "Pandas": `
fig, ax = plt.subplots(figsize=(6, 6))
df.set_index("Name").plot.pie(
    y="Volume",
    autopct="%1.0f%%",
    pctdistance=0.75,
    title="Distribution of total trading volume for selected stocks (2006 - 2017)",
    ax=ax
)
fig    
    `,
    "Matplotlib": `
fig, ax = plt.subplots(figsize=(6, 6))

ax.pie(
    df.Volume,
    labels=df.Name,
    autopct="%1.0f%%",
    pctdistance=0.75,
)
ax.set_title("Distribution of total trading volume for selected stocks (2006 - 2017)")
ax.legend()
fig`,
    "Seaborn": `# Seaborn does not support pie charts`,
    "Plotly Express": `
fig = px.pie(
    data_frame=df,
    values="Volume",
    names="Name",
    color="Name",
    title="Distribution of trading volume for selected stocks (2006 - 2017)",
)
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const histogram = {
    "Pandas": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

df.plot.hist(
    y="Close",
    legend=None,
    ax=ax,
    title="Distribution of Closing Prices - GOOGL",
    xlabel="Closing Price"
)
ax.xaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

fig`,
    "Matplotlib": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

ax.hist(df.Close, alpha=0.75, bins=30)

ax.set_title("Distribution of Closing Prices - GOOGL")
ax.set_xlabel("Closing Price")
ax.xaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

fig`,
    "Seaborn": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

sns.histplot(data=df, x="Close", hue="Name", ax=ax)

ax.set_title("Distribution of Closing Prices - GOOGL")
ax.set_xlabel("Closing Price")
ax.xaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

fig`,
    "Plotly Express": `
fig = px.histogram(
    df,
    x="Close",
    labels={"Close": "Closing Price"},
    title="Distribution of Closing Prices - GOOGL",
    nbins=30
)
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const scatter_plot = {
    "Pandas": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 6))
df_wide = df.pivot(index="Date", columns="Name", values="Return")

ax = df_wide.plot.scatter(
    x="GOOGL", 
    y="AMZN", 
    title="Daily returns - GOOGL vs. AMZN", 
    ax=ax
)

ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
ax.xaxis.set_major_formatter(mticker.PercentFormatter(1))
fig`,
    "Matplotlib": `
import matplotlib.ticker as mticker

df_wide = df.pivot(
    index="Date", columns="Name", values="Return"
)

fig, ax = plt.subplots(figsize=(6, 6))

ax.scatter(x=df_wide["GOOGL"], y=df_wide["AMZN"])

ax.set_xlabel("GOOGL")
ax.set_ylabel("AMZN")
ax.set_title("Daily returns - GOOGL vs. AMZN")

ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
ax.xaxis.set_major_formatter(mticker.PercentFormatter(1))
fig`,
    "Seaborn": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 6))

df_wide = df.pivot(index="Date", columns="Name", values="Return")

sns.scatterplot(data=df_wide, x="GOOGL", y="AMZN", ax=ax)

ax.set_title("Daily returns - GOOGL vs AMZN")
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
ax.xaxis.set_major_formatter(mticker.PercentFormatter(1))
fig`,
    "Plotly Express": `
fig = px.scatter(
    data_frame=df_wide, 
    x="GOOGL", 
    y="AMZN", 
    title="Daily returns - GOOGL vs. AMZN"
)
fig.update_layout(yaxis_tickformat=".0%", xaxis_tickformat=".0%")
plot(fig) # Replace this line by fig.show() to use in a notebook
`
}

const box_plot = {
    "Pandas": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

df_wide = df.pivot(
    index="Date", columns="Name", values="Return"
)
df_wide.boxplot(
    column=["AMZN", "GOOGL", "IBM", "JPM"],
    ax=ax
)

ax.set_ylabel("Daily returns")
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
fig # Not necessary if using a notebook
`,
    "Matplotlib": `
import matplotlib.ticker as mticker

df_wide = df.pivot(index="Date", columns="Name", values="Return")

fig, ax = plt.subplots(figsize=(6, 4))

ax.boxplot(
    [df_wide[col] for col in sorted(df.Name.unique())], 
    vert=True, 
    autorange=True, 
    labels=sorted(df.Name.unique())
)

ax.set_ylabel("Daily returns")
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
fig # Not necessary if using a notebook
`,
    "Seaborn": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

sns.boxplot(
    data=df,
    x="Name", 
    y="Return", 
    order=sorted(df.Name.unique()),
    ax=ax
)

ax.set_ylabel("Daily returns")
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
fig # Not necessary if using a notebook
`,
    "Plotly Express": `
fig = px.box(
    df, 
    x="Name", 
    y="Return", 
    category_orders={"Name": sorted(df.Name.unique())}
)
fig.update_layout(yaxis_tickformat=".0%")
plot(fig)
`
}
const strip_plot = {
    "Pandas": `# Pandas does not support strip plots`,
    "Matplotlib": `# Matplotlib does not support strip plots`,
    "Seaborn": `
import matplotlib.ticker as mticker

fig, ax = plt.subplots(figsize=(6, 4))

sns.stripplot(
    data=df,
    x="Name", 
    y="Return", 
    order=sorted(df.Name.unique()),
    alpha=0.3,
    ax=ax
)

ax.set_ylabel("Daily returns")
ax.yaxis.set_major_formatter(mticker.PercentFormatter(1))
fig # Not necessary if using a notebook
`,
    "Plotly Express": `
fig = px.strip(
    df, 
    x="Name", 
    y="Return", 
    category_orders={"Name": sorted(df.Name.unique())},
    color="Name"
)
fig.update_layout(yaxis_tickformat=".0%")
plot(fig)
`
}
module.exports = {
    line_chart,
    bar_chart,
    grouped_bar_chart,
    stacked_bar_chart,
    stacked_area_chart,
    donut_chart,
    pie_chart,
    histogram,
    scatter_plot,
    box_plot,
    strip_plot
}
