"use strict";
console.log("Main script loaded");
// Sample transactions data
const transactions = [
    {
        id: "1",
        description: "Monthly Subscription",
        amount: 99.99,
        date: "2024-04-24",
        status: "completed",
    },
    {
        id: "2",
        description: "Office Supplies",
        amount: 245.5,
        date: "2024-04-23",
        status: "pending",
    },
    {
        id: "3",
        description: "Software License",
        amount: 499.0,
        date: "2024-04-22",
        status: "completed",
    },
    {
        id: "4",
        description: "Marketing Campaign",
        amount: 1200.0,
        date: "2024-04-21",
        status: "failed",
    },
];
// Function to populate transactions table
function populateTransactionsTable(filteredTransactions = transactions) {
    const tableBody = document.getElementById("transactionsTable");
    if (!tableBody)
        return;
    tableBody.innerHTML = filteredTransactions
        .map((transaction) => `
        <tr class="border-t border-github-light hover:bg-github-light hover:text-white">
            <td class="px-6 py-4">${transaction.description}</td>
            <td class="px-6 py-4">$${transaction.amount.toFixed(2)}</td>
            <td class="px-6 py-4">${transaction.date}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-sm ${transaction.status === "completed"
        ? "bg-green-900 text-green-300"
        : transaction.status === "pending"
            ? "bg-yellow-900 text-yellow-300"
            : "bg-red-900 text-red-300"}">
                    ${transaction.status}
                </span>
            </td>
        </tr>
    `)
        .join("");
}
// Function to filter transactions
function filterTransactions(searchTerm, statusFilter) {
    return transactions.filter((transaction) => {
        const matchesSearch = transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
}
// Function to export transactions to CSV
function exportToCSV() {
    const headers = ["ID", "Description", "Amount", "Date", "Status"];
    const csvContent = [
        headers.join(","),
        ...transactions.map((t) => [t.id, `"${t.description}"`, t.amount, t.date, t.status].join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
}
const CHART_CONFIGS = {
    revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [30000, 35000, 40000, 45231, 48000, 52000],
                borderColor: "#58a6ff",
                backgroundColor: "rgba(88, 166, 255, 0.1)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    },
    expense: {
        labels: ["Salaries", "Marketing", "Operations", "R&D"],
        datasets: [
            {
                data: [40, 25, 20, 15],
                backgroundColor: ["#58a6ff", "#238636", "#da3633", "#8957e5"],
                borderWidth: 0,
            },
        ],
    },
};
// Initialize charts
function initializeCharts() {
    // Destroy existing charts if they exist
    if ("Chart" in window) {
        const Chart = window.Chart;
        // Helper function to get theme colors
        const getThemeColors = () => {
            const isDark = document.body.classList.contains("dark-theme");
            return {
                textColor: isDark ? "#ffffff" : "#000000",
                gridColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            };
        };
        // Helper function to create chart options
        const createChartOptions = (showLegend = false) => {
            const { textColor, gridColor } = getThemeColors();
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: showLegend,
                        position: showLegend ? "right" : undefined,
                        labels: showLegend
                            ? {
                                color: textColor,
                                padding: 20,
                                font: { size: 14 },
                            }
                            : undefined,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                    },
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                    },
                },
            };
        };
        // Clean up existing charts
        ["revenueChart", "expenseChart"].forEach((id) => {
            const existingChart = Chart.getChart(id);
            if (existingChart) {
                existingChart.destroy();
            }
        });
        // Initialize Revenue Chart
        const revenueCtx = document.getElementById("revenueChart");
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: "line",
                data: CHART_CONFIGS.revenue,
                options: createChartOptions(false),
            });
        }
        // Initialize Expense Chart
        const expenseCtx = document.getElementById("expenseChart");
        if (expenseCtx) {
            new Chart(expenseCtx, {
                type: "doughnut",
                data: CHART_CONFIGS.expense,
                options: createChartOptions(true),
            });
        }
    }
    else {
        console.error("Chart.js not loaded!");
    }
}
// Theme constants and functions
const THEME_KEY = "theme-preference";
const DARK_THEME = "dark-theme";
const LIGHT_THEME = "light-theme";
let isDark = false;
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark = savedTheme === DARK_THEME || (!savedTheme && prefersDark);
    applyTheme();
}
function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem(THEME_KEY, isDark ? DARK_THEME : LIGHT_THEME);
    applyTheme();
}
function applyTheme() {
    // Update body class
    document.body.classList.remove(DARK_THEME, LIGHT_THEME);
    document.body.classList.add(isDark ? DARK_THEME : LIGHT_THEME);
    // Update theme icon
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fas fa-moon" : "fas fa-sun";
        }
    }
    // Update chart colors
    updateChartColors();
}
function updateChartColors() {
    const textColor = isDark ? "#ffffff" : "#000000";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    if (typeof window !== "undefined" && "Chart" in window) {
        const Chart = window.Chart;
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = gridColor;
        if (Chart.instances) {
            Object.values(Chart.instances).forEach((chart) => {
                if (chart.config?.options) {
                    // Update scales
                    if (chart.config.options.scales) {
                        Object.values(chart.config.options.scales).forEach((scale) => {
                            if (scale.grid)
                                scale.grid.color = gridColor;
                            if (scale.ticks)
                                scale.ticks.color = textColor;
                        });
                    }
                    // Update legend
                    if (chart.config.options.plugins?.legend) {
                        chart.config.options.plugins.legend.labels = { color: textColor };
                    }
                }
                chart.update();
            });
        }
    }
}
// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing...");
    // Initialize theme
    initTheme();
    // Initialize charts
    initializeCharts();
    // Populate transactions table
    populateTransactionsTable();
    // Set up search and filter functionality
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    if (searchInput && statusFilter) {
        searchInput.addEventListener("input", () => {
            const filtered = filterTransactions(searchInput.value, statusFilter.value);
            populateTransactionsTable(filtered);
        });
        statusFilter.addEventListener("change", () => {
            const filtered = filterTransactions(searchInput.value, statusFilter.value);
            populateTransactionsTable(filtered);
        });
    }
    // Set up theme toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            toggleTheme();
            // Reinitialize charts when theme changes
            initializeCharts();
        });
    }
    // Set up export button
    const exportButton = document.getElementById("exportButton");
    if (exportButton) {
        exportButton.addEventListener("click", exportToCSV);
    }
});
//# sourceMappingURL=main.js.map