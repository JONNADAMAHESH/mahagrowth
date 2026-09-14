const fs = require('fs');

let content = fs.readFileSync('src/context/AuthContext.tsx', 'utf-8');
content = content.replace(
  /if \(!data\.user\) {[\s\S]*?return { success: true, user: authUser };/,
  `if (!data.user) {
        return { success: false, error: "Signup successful but no user returned. Check email for confirmation." };
      }
      
      if (!data.session) {
        return { success: true, user: undefined, message: "Please check your email to verify your account before logging in." };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
        email: data.user.email || "",
        role: data.user.user_metadata?.role || "CLIENT",
        company: data.user.user_metadata?.company || "My Company",
        permissions: [],
        token: "",
      };
      return { success: true, user: authUser };`
);

fs.writeFileSync('src/context/AuthContext.tsx', content);
