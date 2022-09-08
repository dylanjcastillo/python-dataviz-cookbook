import {
    line_chart,
    bar_chart,
    grouped_bar_chart,
    stacked_bar_chart,
    stacked_area_chart,
    pie_chart,
    donut_chart,
    histogram,
    scatter_plot,
    box_plot
} from "./chart_code.js";


function get_sample_code(chart_type, library) {

    if (chart_type === "Line Chart") {
        return line_chart[library];
    } else if (chart_type === "Bar Chart") {
        return bar_chart[library];
    } else if (chart_type === "Grouped Bar Chart") {
        return grouped_bar_chart[library];
    } else if (chart_type === "Stacked Bar Chart") {
        return stacked_bar_chart[library];
    } else if (chart_type === "Stacked Area Chart") {
        return stacked_area_chart[library];
    } else if (chart_type === "Pie Chart") {
        return pie_chart[library];
    } else if (chart_type === "Donut Chart") {
        return donut_chart[library];
    } else if (chart_type === "Histogram") {
        return histogram[library];
    } else if (chart_type === "Scatter Plot") {
        return scatter_plot[library];
    } else if (chart_type === "Box Plot") {
        return box_plot[library];
    }
    return "";
}

export function update_repl_code(selected_library) {
    let chart_type = document.getElementById("chart-type");
    console.log(selected_library);
    let code_str = get_sample_code(chart_type.value, selected_library);

    if (code_str != "") {
        document.getElementById("output-repl").remove();
        let repl = document.createElement("py-repl");

        repl.textContent = code_str;
        repl.setAttribute("std-out", "output");
        repl.id = "output-repl";
        document.getElementById("container-repl").appendChild(repl);

        if (code_str.match("\$")) {
            let editor_lines = document.getElementById("container-repl").getElementsByClassName("cm-line");
            for (var i = 0; i < editor_lines.length; i++) {
                editor_lines[i].textContent = editor_lines[i].textContent.replace("amp;", "").replace("&lt;",
                    "<").replace("&gt;", ">");
            }
        }
    }
}
