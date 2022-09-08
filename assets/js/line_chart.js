const line_chart = {
    "Pandas": `
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
    rot=0
)
fig
`,
    "Matplotlib": `
fig, ax = plt.subplots(figsize=(6, 4))

for l, g in df.groupby("Name"):
    ax.plot(g["Date"], g["Close"], label=l)

ax.set_title("Stock prices (2015 - 2017)")
ax.set_ylabel("Close")
ax.set_xlabel("Date")
ax.legend(title="Name")
fig
`,
    "Seaborn": `
fig, ax = plt.subplots(figsize=(6, 4))
sns.lineplot(
    data=df, 
    x="Date", 
    y="Close", 
    hue="Name", 
    ax=ax
)
ax.set_title("Stock Prices (2015 - 2017)")
fig
`,
    "Plotly Express": `
fig = px.line(
    df, x="Date", y="Closing Price", color="Name", title="Stock Prices (2006 - 2017)"
)
plot(fig) # Ignore this
`
}

module.exports = {
    line_chart
}
