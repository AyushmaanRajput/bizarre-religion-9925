import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../Context/Auth/AuthContextProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Income and Expenses Chart",
    },
  },
};

function IncomeExpenses() {
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
        borderColor: "rgb(0, 128, 0)",
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default IncomeExpenses;
