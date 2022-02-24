import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chart from "react-apexcharts";

const options = {
  chart: {
    id: "basic-bar"
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
};

const series = [
  {
    name: "values",
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    name: "levels",
    data: [50, 10, 75, 20, 80, 95, 30, 5]
  }
];

const pieSeries = [44, 55, 41, 17, 15];
const pieOptions = {
  labels: ['value1', 'value2', 'value3', 'value4', 'value5']
};

const HomeDashboard = () => {
  return (
    <>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography>Home Dashboard</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Chart
              options={options}
              series={series}
              type="bar"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Chart
              options={options}
              series={series}
              type="line"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Chart
              options={options}
              series={series}
              type="area"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Chart
              options={pieOptions}
              series={pieSeries}
              type="donut"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Chart
              options={pieOptions}
              series={pieSeries}
              type="pie"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Chart
              options={pieOptions}
              series={pieSeries}
              type="radialBar"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default HomeDashboard;
