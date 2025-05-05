export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: '#f0f0f0',
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 5,
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: '#f0f0f0',
      },
    }
  },
};
