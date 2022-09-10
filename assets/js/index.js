import Alpine from 'alpinejs';
import {
    update_repl_code
} from './repl.js';

window.Alpine = Alpine;

Alpine.data('radioData', () => ({
    selectedLibrary: 'Pandas',
    libraries: [{
            id: "pandas-option",
            value: "Pandas",
            label: "Pandas"
        },
        {
            id: "mpl-option",
            value: "Matplotlib",
            label: "Matplotlib"
        },
        {
            id: "sns-option",
            value: "Seaborn",
            label: "Seaborn"
        },
        {
            id: "px-option",
            value: "Plotly Express",
            label: "Plotly Express"
        },
    ],
    init() {
        update_repl_code("Pandas");
    },
    update_repl() {
        if (this.$el.id === "chart-type") {
            update_repl_code(this.selectedLibrary);
        } else {
            update_repl_code(this.$el.getAttribute('value'));
        }
    },
    copy_to_clipboard() {
        const repl_lines = document.querySelectorAll("#output-repl .cm-line");
        const prefix = document.getElementById("copy-code-prefix");

        let text_to_copy = prefix.textContent;

        repl_lines.forEach((line) => {
            text_to_copy += "\n" + line.textContent;
        });

        this.$el.textContent = "Copied!";
        this.$el.classList.add("bg-rose-400");
        setTimeout(() => {
            this.$el.textContent = "Copy to clipboard";
            this.$el.classList.remove("bg-rose-400");
        }, 2000);

        navigator.clipboard.writeText(text_to_copy);
    }
}));

Alpine.start();

const observer = new MutationObserver((event) => {
    let elements = document.querySelectorAll('div[id^="output-"]');
    [].forEach.call(elements, function (element) {
        if (parseInt(element.id.split("-")[1]) != elements.length) {
            element.classList.add("hidden");
        } else {
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

document.addEventListener('DOMContentLoaded', function () {
    var about_button = document.getElementById('about');
    var close_modal_button = document.getElementById('close-modal');
    var btn_run = document.getElementById('btnRun');

    btn_run.classList.remove("opacity-0");
    btn_run.classList.remove("group-hover:opacity-100");
    btn_run.classList.add("hover:opacity-75")

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

});
