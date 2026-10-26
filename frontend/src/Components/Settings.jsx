import React from "react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("system");
  const [settings, setSettings] = useState({
    academicYear: "2026/2027",
    maxStudents: "100",
    allowRegistrations: "true",
    theme: localStorage.getItem("appTheme") || "Dark",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setSettings((Prev) => ({
      ...Prev,
      [name]: newValue,
    }));
    if (name === "theme") {
      localStorage.setItem("appTheme", newValue);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h2 style={styles.headerTitle}>System Settings</h2>

        <div style={styles.contentLayout}>
          <aside style={styles.sidebar}>
            <button
              style={
                activeTab === "system" ? styles.activeTabBtn : styles.tabBtn
              }
              onClick={() => setActiveTab("system")}
            >
              System Defaults
            </button>
            <button
              style={
                activeTab === "preferences"
                  ? styles.activeTabbtn
                  : styles.tabBtn
              }
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </button>
          </aside>

          <main style={styles.formCard}>
            <form onSubmit={handleSave}>
              {activeTab === "system" && (
                <div>
                  <h3 style={styles.sectionHeader}>Academic Configuration</h3>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Current Academic Session</label>
                    <input
                      type="text"
                      name="academicYear"
                      value={settings.academicYear}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Max Students</label>
                    <input
                      type="text"
                      name="maxStudents"
                      value={settings.maxStudents}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="allowRegistrations"
                      name="allowRegistrations"
                      checked={settings.allowRegistrations}
                      onChange={handleChange}
                    />
                    <label htmlFor="allowRegistrations" style={styles.label}>
                      Enable new student registrations
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h3 style={styles.sectionHeader}>Display & Interface</h3>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Theme Mode</label>
                    <select
                      name="theme"
                      value={settings.theme}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="Dark">Dark Mode</option>
                      <option value="Light">Light Mode</option>
                    </select>
                  </div>
                </div>
              )}

              <button type="submit" style={styles.saveBtn}>
                Save Changes
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    backgroundColor: "#4a7bb0",
    minHeight: "calc(100vh - 70px)",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: "24px",
    marginBottom: "20px",
  },
  contentLayout: {
    display: "flex",
    gap: "20px",
  },
  sidebar: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tabBtn: {
    padding: "12px 16px",
    backgroundColor: "#3b628c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
  },
  activeTabBtn: {
    padding: "12px 16px",
    backgroundColor: "#1a1d24",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  formCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "2px",
    borderRadius: "6px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    color: "#1a1d24",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
  },
  label: {
    fontSize: "14px",
    color: "1px solid #ccc",
    fontWeight: "500",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  saveBtn: {
    backgroundColor: "#1a1d24",
    color: "#ffffff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
