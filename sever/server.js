const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const XML_FILE_PATH = path.join(__dirname, "users.xml");

// Initialize XML file if it doesn't exist
async function initializeXMLFile() {
  try {
    await fs.access(XML_FILE_PATH);
  } catch {
    const initialXML =
      '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n</users>';
    await fs.writeFile(XML_FILE_PATH, initialXML);
  }
}

// Save user data to XML file
app.post("/save-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Read existing XML file
    let xmlContent = await fs.readFile(XML_FILE_PATH, "utf-8");

    // Create new user entry
    const userEntry = `\n  <user>\n    <name>${name}</name>\n    <email>${email}</email>\n    <password>${password}</password>\n  </user>\n`;

    // Insert new user before closing </users> tag
    xmlContent = xmlContent.replace("</users>", `${userEntry}</users>`);

    // Write updated content back to file
    await fs.writeFile(XML_FILE_PATH, xmlContent);

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, error: "Failed to save user data" });
  }
});

// Verify user credentials
app.post("/verify-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const xmlContent = await fs.readFile(XML_FILE_PATH, "utf-8");

    if (
      xmlContent.includes(`<email>${email}</email>`) &&
      xmlContent.includes(`<password>${password}</password>`)
    ) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ success: false, error: "Failed to verify user" });
  }
});

// Initialize XML file and start server
initializeXMLFile().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
