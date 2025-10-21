# Complete Deployment Guide: Moving to DigitalOcean

## Overview
This guide will walk you through deploying your beautiful new Rapha Lumina website to DigitalOcean App Platform step by step.

---

## Part 1: Prepare Your GitHub Repository

### Step 1: Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Sign up with your email
3. Verify your email address

### Step 2: Create a New Repository
1. Click the **"+"** icon in top right
2. Select **"New repository"**
3. Settings:
   - **Repository name**: raphalumina-website
   - **Description**: Official website for Rapha Lumina spiritual coaching
   - **Public** (recommended) or Private
   - ✅ Add a README file
   - Click **"Create repository"**

### Step 3: Upload Your Website Files
There are two ways to do this:

**Method A: Using GitHub Web Interface (Easier)**
1. In your repository, click **"Add file"** → **"Upload files"**
2. Drag and drop ALL files from the raphalumina-website folder
3. Make sure to maintain the folder structure:
   ```
   /
   ├── index.html
   ├── robots.txt
   ├── sitemap.xml
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── main.js
   └── images/
       ├── image_1.jpeg
       ├── image_2.jpeg
       ├── image_3.png
       ├── image_4.png
       └── image_5.png
   ```
4. Add commit message: "Initial website upload"
5. Click **"Commit changes"**

**Method B: Using Git Command Line (Advanced)**
```bash
# Navigate to your website folder
cd raphalumina-website

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial website upload"

# Link to your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/raphalumina-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 2: Sign Up for DigitalOcean

### Step 1: Create Account
1. Go to https://www.digitalocean.com
2. Click **"Sign Up"**
3. Sign up with email or GitHub
4. Verify your email address

### Step 2: Add Payment Method
1. Go to **Billing** → **Payment Methods**
2. Add credit/debit card
3. Don't worry - you get **$200 credit for 60 days** (won't be charged immediately)

### Step 3: Claim Your $200 Credit
- The credit should automatically apply
- You'll see it in your **Billing** section
- This gives you 8 months free on the $25/month plan!

---

## Part 3: Deploy Your Website

### Step 1: Create Your App
1. From DigitalOcean dashboard, click **"Create"** → **"Apps"**
2. Click **"Create App"**

### Step 2: Connect Your GitHub Repository
1. Select **"GitHub"** as your source
2. Click **"Authorize DigitalOcean"**
3. Select your repository: **raphalumina-website**
4. Branch: **main**
5. Autodeploy: ✅ **Enable** (website updates automatically when you push changes)
6. Click **"Next"**

### Step 3: Configure Resources
1. DigitalOcean will detect it's a static site
2. **Resource Type**: Select **"Static Site"**
3. **Name**: raphalumina-website
4. **Build Command**: Leave empty (no build needed)
5. **Output Directory**: / (root directory)
6. Click **"Next"**

### Step 4: Choose Your Plan
1. Select **"Edit Plan"**
2. For a static site with chatbot API calls, choose:
   
   **Option A: Start with Static Site (Recommended for Testing)**
   - **Free Static Site** - $0/month
   - 1 GiB bandwidth
   - Perfect for initial testing
   - Can upgrade anytime
   
   **Option B: If You Want Room to Grow Immediately**
   - **Shared 1 vCPU / 2 GiB** - $25/month
   - 200 GiB bandwidth
   - Better performance
   - Recommended for serious launch

3. Click **"Back"** then **"Next"**

### Step 5: Environment Variables
This is where you add your Claude API key securely:

1. Click **"Edit"** next to your app component
2. Scroll to **"Environment Variables"**
3. Click **"Add Variable"**
4. Add:
   - **Key**: `CLAUDE_API_KEY`
   - **Value**: `[YOUR_CLAUDE_API_KEY_HERE]` (Get this from the Word document you uploaded)
   - **Encrypt**: ✅ Yes

⚠️ **IMPORTANT**: Never commit your API key to GitHub. Always use environment variables!

5. Click **"Save"**
6. Click **"Next"**

### Step 6: Name Your App
1. **App Name**: raphalumina
2. **Region**: Choose closest to your audience (e.g., **New York** for USA, **London** for Europe, **Singapore** for Asia)
3. Click **"Next"**

### Step 7: Review & Launch
1. Review all settings
2. Your temporary URL will be: **raphalumina.ondigitalocean.app**
3. Click **"Create Resources"**
4. Wait 3-5 minutes for deployment

### Step 8: Check Your Deployment
1. Once deployment completes, you'll see ✅ **"Deployed Successfully"**
2. Click on the URL to view your site: **https://raphalumina.ondigitalocean.app**
3. Test the chatbot!
4. Check all pages and links

---

## Part 4: Connect Your Custom Domain

### Step 1: Add Domain in DigitalOcean
1. In your App, go to **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter: **raphalumina.com**
4. Choose: ✅ **"You manage your domain"**
5. Also add: **www.raphalumina.com**
6. Click **"Add Domain"**

### Step 2: Get Your DNS Records
DigitalOcean will provide DNS records. You'll see something like:

```
Type: CNAME
Name: @
Value: raphalumina.ondigitalocean.app

Type: CNAME  
Name: www
Value: raphalumina.ondigitalocean.app
```

Or:

```
Type: A
Name: @
Value: 143.198.xxx.xxx (IP address)

Type: CNAME
Name: www
Value: raphalumina.ondigitalocean.app
```

**Copy these records - you'll need them in the next step!**

### Step 3: Update Your Domain Registrar

You need to find where raphalumina.com is registered. Common registrars:
- GoDaddy
- Namecheap
- Google Domains
- Hover
- Cloudflare

**Instructions for most registrars:**

1. Log in to your domain registrar
2. Find **"DNS Settings"** or **"DNS Management"**
3. Look for existing A or CNAME records pointing to your old host
4. **Delete** old records for @ and www
5. **Add new records** from DigitalOcean (from Step 2)
6. **Save changes**

**Common Registrar-Specific Guides:**

**GoDaddy:**
1. My Products → Domains → DNS
2. Add new CNAME records
3. Save

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Add new records
3. Save

**Cloudflare:**
1. DNS → Add record
2. Make sure proxy (orange cloud) is OFF for DigitalOcean
3. Save

### Step 4: Wait for DNS Propagation
- DNS changes take **24-48 hours** to propagate worldwide
- Usually happens within 2-6 hours
- Check progress: https://www.whatsmydns.net

### Step 5: SSL Certificate (Automatic)
- DigitalOcean automatically provisions a free Let's Encrypt SSL certificate
- Once DNS is propagated, SSL will be active within 30 minutes
- Your site will be accessible via HTTPS

---

## Part 5: Post-Deployment Checklist

### Immediate Tests (Day 1):
- [ ] Visit https://raphalumina.com
- [ ] Check https://www.raphalumina.com (www version)
- [ ] Test all navigation links
- [ ] Test chatbot functionality
- [ ] Submit contact form
- [ ] Check on mobile device
- [ ] Check loading speed: https://pagespeed.web.dev

### Within First Week:
- [ ] Set up Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Create social media profiles
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Get feedback from friends/family
- [ ] Create Google Business Profile

### First Month:
- [ ] Write first blog post
- [ ] Monitor chatbot conversations
- [ ] Check analytics for visitor behaviour
- [ ] Optimise based on data
- [ ] Start building backlinks

---

## Part 6: Updating Your Website

Whenever you want to make changes:

**Method 1: GitHub Web Interface**
1. Go to your GitHub repository
2. Navigate to the file you want to edit
3. Click the pencil icon (Edit)
4. Make changes
5. Commit changes
6. DigitalOcean auto-deploys within 2-3 minutes

**Method 2: Git Command Line**
```bash
# Make changes to your local files
# Then:
git add .
git commit -m "Describe your changes"
git push origin main

# DigitalOcean auto-deploys
```

---

## Part 7: Monitoring & Maintenance

### View Deployment Logs
1. DigitalOcean Dashboard → Your App
2. Click **"Runtime Logs"**
3. Check for any errors

### Check Build History
1. Your App → **"Deployments"**
2. See all past deployments
3. Can rollback if needed

### Monitor Performance
1. **Settings** → **"Insights"**
2. View bandwidth usage
3. Monitor uptime

### Cost Management
1. Check **Billing** regularly
2. Set up billing alerts
3. Track $200 credit usage

---

## Troubleshooting Common Issues

### Issue: Website Not Loading
**Solution:**
- Check if deployment succeeded
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

### Issue: Chatbot Not Responding
**Solution:**
- Check Claude API key in environment variables
- Check browser console for errors (F12)
- Verify API key is valid
- Check if you've hit API rate limits

### Issue: Images Not Showing
**Solution:**
- Check file paths are correct
- Ensure images uploaded to GitHub
- Check browser console for 404 errors
- Verify images are in correct folders

### Issue: SSL Certificate Not Working
**Solution:**
- Wait 30 minutes after DNS propagation
- Force SSL renewal in DigitalOcean settings
- Check if domain is properly verified

### Issue: Mobile Layout Broken
**Solution:**
- The CSS is fully responsive
- Clear mobile browser cache
- Check if JavaScript is enabled
- Test in incognito mode

---

## Getting Help

### DigitalOcean Support
- Documentation: https://docs.digitalocean.com
- Community: https://www.digitalocean.com/community
- Support Tickets: Available on paid plans

### Development Help
- Your chatbot uses Claude API directly
- Check Anthropic documentation: https://docs.anthropic.com
- Monitor API usage in Anthropic console

---

## Security Best Practices

1. ✅ **Never commit API keys to GitHub**
   - Always use environment variables
   - Keep keys in DigitalOcean settings

2. ✅ **Keep dependencies updated**
   - Check for library updates monthly
   - Update if security patches released

3. ✅ **Monitor access logs**
   - Check for unusual activity
   - Set up alerts for high bandwidth usage

4. ✅ **Backup your repository**
   - GitHub is your backup
   - Download local copy periodically

5. ✅ **Use strong passwords**
   - GitHub account
   - DigitalOcean account
   - Domain registrar account

---

## Next Steps After Deployment

### Week 1: Launch
- Share website on social media
- Email existing contacts
- Test everything thoroughly

### Month 1: Content
- Add first blog posts
- Collect testimonials
- Refine chatbot responses

### Month 2: Growth
- Start SEO optimization
- Build backlinks
- Guest blog opportunities

### Month 3: Scale
- Analyze traffic patterns
- Upgrade plan if needed
- Add new features based on feedback

---

## Cost Breakdown Reminder

**Starting Costs:**
- **First 60 days**: FREE ($200 credit)
- **After credit**: $25/month (recommended plan)
- **Domain renewal**: ~$12/year
- **Total Year 1**: ~$312

**No hidden fees!**
- No bandwidth overage fees (200GB included)
- No build minutes charges
- Free SSL certificate
- Free CDN

---

## Success Metrics to Track

### Traffic Metrics:
- Unique visitors/month
- Page views
- Bounce rate
- Average session duration

### Engagement Metrics:
- Chatbot conversations
- Contact form submissions
- Social shares
- Time on page

### SEO Metrics:
- Keyword rankings
- Backlinks
- Domain authority
- Indexed pages

### Conversion Metrics:
- Inquiry rate
- Booking rate
- Email signups

---

## Conclusion

You're ready to launch! 🚀

Your website is:
✅ Beautiful and professional
✅ SEO-optimized
✅ Mobile-responsive
✅ Fast-loading
✅ Secure (HTTPS)
✅ Interactive (chatbot)
✅ Easy to maintain

**Remember**: The $200 credit gives you 8 months FREE on the $25/month plan, so there's no financial risk to get started!

If you run into any issues during deployment, don't hesitate to ask for help. You've got this! 🌟✨

---

## Quick Reference

**Important URLs:**
- GitHub Repo: https://github.com/YOUR_USERNAME/raphalumina-website
- DigitalOcean Dashboard: https://cloud.digitalocean.com
- Temp URL: https://raphalumina.ondigitalocean.app
- Final URL: https://raphalumina.com

**Important Credentials to Save:**
- GitHub username & password
- DigitalOcean login
- Domain registrar login
- Claude API key (stored in DigitalOcean environment variables)

**Support Contacts:**
- DigitalOcean: https://www.digitalocean.com/support
- Domain Registrar: [Your registrar's support]
- Claude API: https://support.anthropic.com

---

Good luck with your launch! May your spiritual coaching business flourish! 🙏💫
