import {
    line_chart
} from "./line_chart.js";

function get_sample_code(chart_type, library) {

    if (chart_type === "Line Chart") {
        return line_chart[library];
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

