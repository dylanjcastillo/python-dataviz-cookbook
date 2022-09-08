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
fig
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

fig
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
fig
`,
    "Plotly Express": `
fig = px.line(
    df, 
    x="Date", 
    y="Close", 
    color="Name", 
    title="Stock Prices (2015 - 2017)"
)
plot(fig) # Ignore this
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
    ax=ax
)
ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)
ax.get_legend().remove()
fig
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
fig
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
fig
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
plot(fig)
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
fig
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
fig
`,
    "Seaborn": `
import matplotlib.ticker as mticker

df_long = df.melt(
    id_vars="Year",
    value_vars=["Open", "Close"],
    var_name="Category",
    value_name="Price",
) # Seaborn works better with long data

fig, ax = plt.subplots(figsize=(12, 6))
sns.barplot(data=df_long, x="Year", y="Price", hue="Category", ax=ax)

ax.yaxis.set_major_formatter(
    mticker.StrMethodFormatter("$\{x:1.0f\}")
)

ax.set_title("Maximum opening and closing price per year - AAPL")
ax.legend(title=None)
fig
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
plot(fig)
`
}

const stacked_bar_chart = {
    "Pandas": ``,
    "Matplotlib": ``,
    "Seaborn": ``,
    "Plotly Express": ``
}

module.exports = {
    line_chart,
    bar_chart,
    grouped_bar_chart,
    stacked_bar_chart,
}
