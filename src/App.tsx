import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

// Savings Summary component
const Transactions = () => {
  const store = useRetirementStore();
  const totalSpend = store.categories.reduce(
    (sum, c) => sum + c.monthlySpend,
    0
  );
  const monthlySavings = store.monthlyIncome - totalSpend;
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Savings Summary
      </Typography>
      <Typography variant="h6">
        Projected Monthly Savings: {formatCurrency(monthlySavings)}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Spending Breakdown:
      </Typography>
      <ul>
        {store.categories.map((category) => (
          <li key={category.name}>
            {category.name}: {formatCurrency(category.monthlySpend)}
          </li>
        ))}
      </ul>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Total Spend: {formatCurrency(totalSpend)}
      </Typography>
    </Box>
  );
};

import useRetirementStore from "./stores/useRetirementStore";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Death to Work
          </Typography>
          <Button color="inherit" to="/" component={NavLink}>
            Dashboard
          </Button>
          <Button color="inherit" to="/settings" component={NavLink}>
            Settings
          </Button>
          <Button color="inherit" to="/transactions" component={NavLink}>
            Transactions
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
