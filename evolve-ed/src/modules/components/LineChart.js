import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useLocation } from "react-router-dom";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};


const LineChart = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [numQuestions, setNumQuestions] = useState([]);
  const location = useLocation();
  const { username } = location.state || {};
  console.log(username);
  useEffect(() => {
    // Fetch data from the API
    fetch('https://bargichk.pythonanywhere.com/students/getStudent')
      .then(response => response.json())
      .then(data => {
        // Filter data for user "KeabB24" and extract numQuestions
        const numQuestionsKeabB24 = data
          .filter(entry => entry.user === username)
          .map(entry => entry.numQuestions);
        
        // Set the numQuestions state
        setNumQuestions(numQuestionsKeabB24);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(numQuestions.slice(0, 7));
  console.log("Current user: ", username)
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Logged In',
      data: [0, 86, 28, 115, 48, 210, 136]
    },
    {
      name: 'Tasks Done',
      data: numQuestions.slice(-7)
    }
  ]);
  
  useEffect(() => {
    setSeries([
      {
        name: 'Logged in',
        data: slot === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Tasks Done',
        data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : numQuestions.slice(-7)
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

LineChart.propTypes = {
  slot: PropTypes.string
};

export default LineChart;