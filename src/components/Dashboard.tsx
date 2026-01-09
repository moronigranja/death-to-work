import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useRetirementStore from "../stores/useRetirementStore";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const store = useRetirementStore();
  const [result, setResult] = useState({ age: 0, feedback: "" } as {
    age: number;
    feedback: string;
  });

  const totalSpend = store.categories.reduce(
    (sum, c) => sum + c.monthlySpend,
    0
  );
  const monthlySavings = store.monthlyIncome - totalSpend;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleRecalculate = () => {
    setResult(store.computeRetirementAge());
  };

  return (
    <Container className="dashboard-container">
      <Typography variant="h4" component="h1" className="dashboard-header">
        Retirement Dashboard
      </Typography>
      <div className="dashboard-grid">
        <div className="grid-item">
          <Card>
            <CardContent>
              <Typography variant="h6">Current Age</Typography>
              <TextField
                type="number"
                value={store.currentAge}
                onChange={(e) => store.updateCurrentAge(Number(e.target.value))}
                fullWidth
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid-item">
          <Card>
            <CardContent>
              <Typography variant="h6">Current Savings</Typography>
              <TextField
                type="number"
                value={store.currentSavings}
                onChange={(e) =>
                  store.updateCurrentSavings(Number(e.target.value))
                }
                fullWidth
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid-item">
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Income</Typography>
              <TextField
                type="number"
                value={store.monthlyIncome}
                onChange={(e) =>
                  store.updateMonthlyIncome(Number(e.target.value))
                }
                fullWidth
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid-item">
          <Card>
            <CardContent>
              <Typography variant="h6">Retirement Goal</Typography>
              <TextField
                type="number"
                value={store.retirementGoal}
                onChange={(e) =>
                  store.updateRetirementGoal(Number(e.target.value))
                }
                fullWidth
              />
            </CardContent>
          </Card>
        </div>
        {store.categories.map((category) => (
          <div className="grid-item" key={category.name}>
            <Card>
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <TextField
                  type="number"
                  value={category.monthlySpend}
                  onChange={(e) =>
                    store.updateCategorySpend(
                      category.name,
                      Number(e.target.value)
                    )
                  }
                  fullWidth
                />
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="grid-item">
          <Card>
            <CardContent>
              <Typography variant="h6">
                Monthly Savings: {formatCurrency(monthlySavings)}
              </Typography>
              <Typography variant="h6">Retirement Age: {result.age}</Typography>
              <Typography>{result.feedback}</Typography>
              <Button variant="contained" onClick={handleRecalculate}>
                Recalculate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
