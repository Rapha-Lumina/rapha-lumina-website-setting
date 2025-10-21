# 🔒 SECURITY & API KEY SETUP

## ⚠️ CRITICAL: Your API Key Security

Your Claude API key from the Word document is **HIGHLY SENSITIVE** and should **NEVER** be committed to GitHub or shared publicly.

---

## 🔑 Your API Key Location

Your Claude API key is in the Word document you uploaded: **Pictures_I_like.docx**

The key starts with: `sk-ant-api03-uyb7p...`

**KEEP THIS PRIVATE!**

---

## ✅ How to Use Your API Key Securely

### For DigitalOcean Deployment (RECOMMENDED):

1. **DO NOT add the API key to any files**
2. **DO add it as an environment variable in DigitalOcean:**
   - Go to your app in DigitalOcean
   - Settings → Environment Variables
   - Add variable:
     - Name: `CLAUDE_API_KEY`
     - Value: [paste your API key from the Word doc]
     - Encrypt: ✅ Yes
   
3. The JavaScript code is already configured to use environment variables

### For Local Testing (Optional):

If you want to test locally:

1. Create a file called `.env` in the website root
2. Add your API key:
   ```
   CLAUDE_API_KEY=your_actual_api_key_here
   ```
3. **NEVER commit this file to GitHub** (already in .gitignore)

---

## 🚨 What To Do If Key Is Exposed

If your API key was accidentally committed to GitHub:

### Step 1: Revoke the Old Key
1. Go to https://console.anthropic.com/
2. Navigate to API Keys
3. Delete the exposed key immediately

### Step 2: Generate New Key
1. Create a new API key
2. Save it securely (password manager recommended)
3. Update it in DigitalOcean environment variables

### Step 3: Clean Git History (if needed)
```bash
# Remove from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch js/main.js" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (⚠️ careful!)
git push origin --force --all
```

Or create a fresh repository with the cleaned files.

---

## 🛡️ Security Best Practices

### ✅ DO:
- Store API keys in environment variables
- Use DigitalOcean's encrypted environment variables
- Keep the Word document with your API key secure
- Use `.gitignore` to exclude sensitive files
- Rotate API keys regularly (every 3-6 months)
- Monitor API usage in Anthropic console

### ❌ DON'T:
- Commit API keys to GitHub
- Share API keys in chat/email
- Store keys in plain text files committed to git
- Use the same key for multiple projects
- Leave unused keys active

---

## 📋 Checklist Before Deploying

- [ ] API key is NOT in any files committed to GitHub
- [ ] `.gitignore` includes `.env` and sensitive files
- [ ] API key added to DigitalOcean environment variables
- [ ] Verified key works (test chatbot after deployment)
- [ ] Saved API key securely (password manager or Word doc)

---

## 🔍 How to Check If Your Key Is Exposed

1. Search your GitHub repository:
   - Go to your repo
   - Press `/` (search)
   - Type: `sk-ant-api`
   - Should return NO results

2. Check files locally:
   ```bash
   grep -r "sk-ant-api" .
   ```
   Should only appear in `.env` (which is not committed)

---

## 💡 Environment Variable Configuration

The JavaScript code uses this pattern:
```javascript
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || 'YOUR_API_KEY_HERE';
```

This means:
- In production (DigitalOcean): Uses environment variable
- In development: Falls back to placeholder (won't work until you add real key)

---

## 📞 Support Resources

**If key is compromised:**
- Anthropic Support: https://support.anthropic.com
- Immediately revoke and regenerate

**For deployment questions:**
- See: deployment-guide.md
- DigitalOcean Docs: https://docs.digitalocean.com

---

## ⚡ Quick Setup Summary

1. ✅ Keep API key in Word document (secure)
2. ✅ Add to DigitalOcean as environment variable
3. ✅ Never commit to GitHub
4. ✅ Test chatbot after deployment
5. ✅ Monitor usage regularly

---

**Remember: Your API key is like a password. Treat it with the same level of security!** 🔒

---

## 📝 Notes

- The API key in your Word document is valid and ready to use
- DigitalOcean encrypts environment variables automatically
- You can always regenerate keys at https://console.anthropic.com/
- API usage is monitored and billed by Anthropic (separate from hosting)

**Stay secure!** 🛡️✨
