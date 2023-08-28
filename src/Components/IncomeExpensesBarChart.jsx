import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../Context/Auth/AuthContextProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Income and Expenses Bar Chart",
    },
  },
};

function IncomeExpensesBarChart() {
  const userData = useContext(AuthContext).loggedInUser.monthlyIncomeExpenses;

  const labels = userData.map((item) => item.month);
  const incomeData = userData.map((item) => item.income);
  const expensesData = userData.map((item) => item.expenses);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Expenses",
        data: expensesData,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default IncomeExpensesBarChart;
