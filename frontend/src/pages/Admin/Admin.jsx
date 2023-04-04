import { useState } from "react";
import TopBar from "../../components/AdminComponents/TopBar/TopBar";
import Sidebar from "../../components/AdminComponents/TopBar/Sidebar";
import Dashboard from "../../components/AdminComponents/Dashboard/";
import Users from "../../components/AdminComponents/Users/Users";
import UserForm from "../../components/AdminComponents/UserForm/UserForm";
import Calendar from "../../components/AdminComponents/Calendar/calendar";
import Bar from "../../components/AdminComponents/BarChart/";
import Pie from "../../components/AdminComponents/PieChart";
import School from "../../components/AdminComponents/School/School"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [selectedSideBarItem, setSelectedSideBarItem] = useState("Dashboard");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", flexDirection: "row" }}>
          <Sidebar
            isSidebar={isSidebar}
            setSelectedSideBarItem={setSelectedSideBarItem}
          />
          <main className="content" style={{ flexGrow: 1 }}>
            <TopBar setIsSidebar={setIsSidebar} />
            {selectedSideBarItem === "Dashboard" && <Dashboard />}
            {selectedSideBarItem === "Manage Users" && <Users />}
            {selectedSideBarItem === "Manage School" && <School />}
            {selectedSideBarItem === "Profile Form" && <UserForm />}
            {selectedSideBarItem === "Calendar" && <Calendar />}
            {selectedSideBarItem === "Pie Chart" && <Pie />}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
