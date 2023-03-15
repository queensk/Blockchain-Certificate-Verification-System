import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "../../components/AdminComponents/TopBar/TopBar";
import Sidebar from "../../components/AdminComponents/TopBar/Sidebar";
import Dashboard from "../../components/AdminComponents/Dashboard/";
import Users from "../../components/AdminComponents/Users/Users";
import UserForm from "../../components/AdminComponents/UserForm/UserForm";
import Calendar from "../../components/AdminComponents/Calendar/calendar";
import Bar from "../../components/AdminComponents/BarChart/BarChart";

// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
// import Calendar from "./scenes/calendar/calendar";

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
            {selectedSideBarItem === "Profile Form" && <UserForm />}
            {selectedSideBarItem === "Calendar" && <Calendar />}
            {selectedSideBarItem === "Calendar" && <Bar />}

            {/* <Routes> */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route path="/" element={<Users />} /> */}
            {/* <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            {/* </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
