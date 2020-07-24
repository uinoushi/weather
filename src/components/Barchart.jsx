import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { XAxis, ResponsiveContainer, Bar, BarChart, Cell } from "recharts";

const useStyles = makeStyles((theme) => ({
  chart: {
    width: "100%",
    maxWidth: theme.layout.maxWidth,
    height: 400,
    margin: theme.spacing(3, "auto", 2),
  },
}));

const Barchart = ({ data }) => {
  const classes = useStyles();

  if (!data) {
    return null;
  }

  return (
    <div className={classes.chart}>
      <ResponsiveContainer>
        <BarChart width={400} height={400} data={data}>
          <XAxis fontSize={10} interval={0} dataKey="name" />
          <Bar barSize={80} fill="#0277bd" yAxisId="a" dataKey="temp">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
