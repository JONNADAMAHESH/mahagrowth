const fs = require('fs');
let content = fs.readFileSync('src/pages/LoginPage.tsx', 'utf-8');

content = content.replace(
  /const res = await register\(\{[\s\S]*?\}\);\s*if \(res\.success\) \{[\s\S]*?onNavigate\("portal"\);\s*\}, 800\);\s*\}/,
  `const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      company: regCompany || undefined,
      role: "client",
    });

    if (res.success) {
      if (res.message) {
        // Email confirmation required
        setSuccessMessage(res.message);
        setTimeout(() => {
          setActiveTab("login");
          setLoginEmail(regEmail);
          setLoginPassword("");
          setSuccessMessage(null);
        }, 5000);
      } else {
        // Logged in directly
        setSuccessMessage(\`Account created! Welcome to Maha Growth.\`);
        setTimeout(() => {
          onNavigate("portal");
        }, 800);
      }
    }`
);

fs.writeFileSync('src/pages/LoginPage.tsx', content);
