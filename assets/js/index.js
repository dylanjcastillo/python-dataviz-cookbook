import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

const observer = new MutationObserver((event) => {
    let elements = document.querySelectorAll('div[id^="output-"]');
    [].forEach.call(elements, function (element) {
        if (parseInt(element.id.split("-")[1]) != elements.length) {
            element.classList.add("hidden");
        } else {
            console.log(element);
            if (element.getElementsByTagName('img').length > 0) {
                var img = element.getElementsByTagName('img')[0]
                img.setAttribute("x-bind", "imgModal");

                Alpine.bind("imgModal", () => ({
                    type: 'button',
                    '@click'() {
                        this.$dispatch('lightbox', {
                            imgModalSrc: img.getAttribute("src"),
                        })
                    },
                }));
            }
        }
    });
});

const output = document.getElementById('output');

observer.observe(output, {
    childList: true,
    subtree: true
});

const manipulate = {
    "Apply a function to multiple columns": `def func(sepal_length, sepal_width):
    if sepal_length / sepal_width > 0.5:
        return (sepal_length + sepal_width) / 10
    else:
        return sepal_length / 5

df.apply(
    lambda row: func(row["sepal_length"], row["sepal_width"]), 
    axis=1
)`,
    "Create a new column": `df["length_width_ratio"] = df["sepal_length"] / df["sepal_width"]
df.head()`,
    "Create a new column in a method chain": `(
    df
    .groupby('iris_class')
    .agg(
        avg_sepal_length=('sepal_length', 'mean'), 
        avg_sepal_width=('sepal_width', 'mean')
    )
    .assign(is_wide=lambda df_: df_.avg_sepal_width > df_.avg_sepal_length)
)`,
    "Fill missing values": `df = df.fillna(value={
    "sepal_length": np.mean(df.sepal_length),
    "sepal_width": np.mean(df.sepal_width),
    "petal_length": 0,
    "petal_width": 0,
    "iris_class": ""
})
  
df[df.isnull().any(axis=1)]`,
    "Generate bins": `df["petal_width_size"] = pd.cut(
    df.petal_width, 
    bins=3, 
    labels=["Small", "Medium", "Large"]
)
df[["petal_width", "petal_width_size"]]`,
    "Map values of a column": `iris_ids = {
    "Iris-setosa": 1,
    "Iris-virginica": 2,
    "Iris-versicolor": 3
}
      
df["iris_class"].map(iris_ids)`,

}

const join_df = {
    "Merge DataFrames": `df2 = pd.DataFrame(
    {
        "iris_class" : ["Iris-setosa", "Iris-versicolor", "Iris-virginica"],
        "id_class": [1, 2, 3]
    }
)

df.merge(df2, how="left", on="iris_class")`,
    "Concatenate DataFrames": `df2 = pd.DataFrame(
    columns=["sepal_length", "sepal_width", "petal_length", "petal_width", "iris_class"],
    data=[[10,10,10,10, "Iris-setosa"]]
)
pd.concat([df2, df], axis=0)`,
}
const aggregations = {
    "Apply an aggregation function to a column": `df.petal_length.max()
# This also applies to other agg functions (sum, min, std, var, etc.)`,
    "Apply an aggregation function per group to all columns": `df.groupby("iris_class").mean()
# This also applies to other agg functions (sum, min, std, var, etc.)`,
    "Create columns with specific aggregations per column": `(df
.groupby("iris_class")
.agg(
    max_petal_length=('petal_length', max), 
    min_petal_width=('petal_width', min))
)`,
}
const summarize = {
    "Number of rows and columns": "df.shape",
    "Get the # of rows with each unique value": "df.iris_class.value_counts(dropna=False)",
    "Get the # of distinct values of a column": "df.petal_length.nunique()",
    "Get the distinct values of a column": "df.petal_length.unique()",
    "Basic descriptive statistics of the data": "df.describe()",
}
const reshape = {
    "Gather columns into rows": `df.melt(id_vars=["iris_class"], var_name="feature", value_name="value")`,
    "Sort rows": "df.sort_values(by=['sepal_length', 'sepal_width'])",
    "Sort index": "df.sort_index()",
    "Reset index": "df.reset_index()",
    "Remove columns": "df.drop(columns=['sepal_length', 'sepal_width'])",
    "Rename columns": `df.rename(
    columns={
        'sepal_length': 'sepal_length_new', 
        'sepal_width': 'sepal_width_new'
    }
)`,
}
const subset_cols = {
    "Select a single column": "df['sepal_length']",
    "Select multiple columns": "df[['sepal_length', 'sepal_width']]",
    "Select columns using regex": "df.filter(regex='^petal')",
}

const subset_rows = {
    "Filter with logical criteria": `df[
    (df.sepal_length == 6.4) 
    & (df.sepal_width == 3.2)
]`,
    "Filter with query strings": `df.query("sepal_length == 6.4 & sepal_width == 3.2")`,
    "Find duplicates": "df[df.duplicated(keep=False)]",
    "Drop duplicates": "df.drop_duplicates()",
    "Find rows missing values": "df[df.isnull().any(axis=1)]",
    "Exclude rows missing values": "df.dropna()",
    "Filter rows using a list of values": "df[df.sepal_length.isin([6.4, 6.5, 6.6])]",
    "Sample of n rows": "df.sample(n=3)",
    "First n rows": "df.head(3)",
    "Last n rows": "df.tail(3)"
}
const subset_rows_cols = {
    "Access rows/columns by labels or boolean array": "df.loc[df.petal_length < 3, ['sepal_length', 'sepal_width']]",
    "Acccess row/columns by index": "df.iloc[0:3, [0, 1]]",
    "Access a single value by index": "df.iat[0, 0]",
    "Access a single value by label": "df.at[0, 'sepal_length']",
}

function get_operations(category) {
    let operations = ["Choose an operation"];
    let ops_obj = {};

    if (category === "subset_rows") {
        ops_obj = subset_rows;
    }
    if (category === "subset_cols") {
        ops_obj = subset_cols;
    }
    if (category === "subset_rows_cols") {
        ops_obj = subset_rows_cols;
    }
    if (category === "reshape") {
        ops_obj = reshape;
    }
    if (category === "summarize") {
        ops_obj = summarize;
    }
    if (category === "aggregations") {
        ops_obj = aggregations;
    }
    if (category === "join_df") {
        ops_obj = join_df;
    }
    if (category === "manipulate") {
        ops_obj = manipulate;
    }
    for (var key in ops_obj) {
        operations.push(key);
    }
    return operations;
}

function get_sample_code(category, operation) {

    if (category === "subset_rows") {
        return subset_rows[operation];
    }
    if (category === "subset_cols") {
        return subset_cols[operation];
    }
    if (category === "subset_rows_cols") {
        return subset_rows_cols[operation];
    }
    if (category === "reshape") {
        return reshape[operation];
    }
    if (category === "summarize") {
        return summarize[operation];
    }
    if (category === "aggregations") {
        return aggregations[operation];
    }
    if (category === "join_df") {
        return join_df[operation];
    }
    if (category === "manipulate") {
        return manipulate[operation];
    }
    return "";
}

function update_categories() {
    let category = document.getElementById("category");
    document.getElementById("operation").innerHTML = "";
    operations = get_operations(category.value);

    for (var i = 0; i < operations.length; i++) {
        var option = document.createElement("option");
        option.text = operations[i];
        option.value = operations[i];
        if (i == 0) {
            option.selected = true;
        }
        document.getElementById("operation").appendChild(option);
    }
}

function update_repl() {
    let category = document.getElementById("category");
    let operation = document.getElementById("operation");

    let code_str = get_sample_code(category.value, operation.value);

    if (code_str != "") {
        document.getElementById("output-repl").remove();
        let repl = document.createElement("py-repl");

        repl.textContent = code_str;
        repl.setAttribute("std-out", "output");
        repl.setAttribute("std-err", "errors");
        repl.id = "output-repl";
        document.getElementById("container-repl").appendChild(repl);

        if (code_str.match("\$")) {
            let editor_lines = document.getElementById("container-repl").getElementsByClassName("cm-line");
            for (var i = 0; i < editor_lines.length; i++) {
                editor_lines[i].textContent = editor_lines[i].textContent.replace("amp;", "").replace("&lt;", "<").replace("&gt;", ">");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var about_button = document.getElementById('about');
    var close_modal_button = document.getElementById('close-modal');

    about_button.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById("modal-id").classList.toggle("hidden");
        document.getElementById("modal-id" + "-backdrop").classList.toggle("hidden");
        document.getElementById("modal-id").classList.toggle("flex");
        document.getElementById("modal-id" + "-backdrop").classList.toggle("flex");
    });

    close_modal_button.addEventListener('click', function () {
        document.getElementById("modal-id").classList.toggle("hidden");
        document.getElementById("modal-id" + "-backdrop").classList.toggle("hidden");
        document.getElementById("modal-id").classList.toggle("flex");
        document.getElementById("modal-id" + "-backdrop").classList.toggle("flex");
    });

    document.getElementById("category").addEventListener("change", update_categories);
    update_categories();
    document.getElementById("operation").addEventListener("change", update_repl);
});
