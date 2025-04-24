interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    status: "completed" | "pending" | "failed";
}
declare const transactions: Transaction[];
declare function populateTransactionsTable(filteredTransactions?: Transaction[]): void;
declare function filterTransactions(searchTerm: string, statusFilter: string): Transaction[];
declare function exportToCSV(): void;
interface ChartDataConfig {
    labels: string[];
    datasets: {
        label?: string;
        data: number[];
        borderColor?: string;
        backgroundColor: string | string[];
        borderWidth?: number;
        tension?: number;
        fill?: boolean;
    }[];
}
declare const CHART_CONFIGS: {
    revenue: ChartDataConfig;
    expense: ChartDataConfig;
};
declare function initializeCharts(): void;
declare const THEME_KEY = "theme-preference";
declare const DARK_THEME = "dark-theme";
declare const LIGHT_THEME = "light-theme";
declare let isDark: boolean;
declare function initTheme(): void;
declare function toggleTheme(): void;
declare function applyTheme(): void;
declare function updateChartColors(): void;
