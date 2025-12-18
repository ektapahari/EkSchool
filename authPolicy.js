const fs = require("fs");
const path = require("path");

const policyPath = path.resolve(__dirname, "config", "roles-policy.json");
const policyRaw = fs.readFileSync(policyPath, "utf-8");
const policy = JSON.parse(policyRaw);

function canAccess(role, module, action) {
  const roleData = policy.roles[role];
  if (!roleData) return false;
  const permissions = roleData.permissions[module];
  return Array.isArray(permissions) ? permissions.includes(action) : false;
}

module.exports = { canAccess, policy };
