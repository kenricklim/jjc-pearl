# Quick Test - Is the Website Working?

Follow these steps in order to quickly verify your website is functioning.

## 🚀 Step 1: Start the Server

Open terminal in the project folder and run:

```bash
npm run dev
```

**✅ Success looks like:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

**❌ If you see errors:**
- "Cannot find module" → Run `npm install` first
- "Port 3000 already in use" → Close other apps using port 3000, or use `npm run dev -- -p 3001`

## 🌐 Step 2: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:3000**

**✅ Success:** You see the homepage with:
- "Empowered to Inspire" heading
- Green/white color scheme
- Navigation bar at top
- Two buttons: "Become a Member" and "Visit the Freedom Wall"

**❌ If you see:**
- "This site can't be reached" → Server isn't running, go back to Step 1
- Blank page → Check browser console (F12) for errors
- "404 Not Found" → Make sure you're at `localhost:3000` not another port

## 📄 Step 3: Test Navigation

Click each link in the navigation bar:

- [ ] **Home** → Should show homepage
- [ ] **About Us** → Should show JCI Values and Mission/Vision
- [ ] **Leadership** → Should show board members grid
- [ ] **Events** → Should show events (including Mangrove Tree Planting)
- [ ] **Join Us** button → Should go to Membership page

**✅ Success:** All pages load without errors

**❌ If pages don't load:** Check browser console (F12 → Console tab) for error messages

## 🔐 Step 4: Test Login (Optional - Requires Supabase Setup)

1. Click **"Community Login"** or go to `/login`
2. Click **"Sign in with Google"**
3. Complete Google sign-in

**✅ Success:** 
- Redirected to `/community` page
- Navbar shows your name instead of "Community Login"

**❌ If login fails:**
- Check `.env.local` file exists with Supabase credentials
- Verify Google OAuth is configured in Supabase Dashboard
- See SETUP.md for detailed OAuth setup

## 💬 Step 5: Test Community Features (After Login)

### Freedom Wall:
1. You should see "Freedom Wall" tab
2. Click **"New Post"**
3. Type a message and click **"Post"**
4. **✅ Success:** Your post appears immediately

### Service Desk:
1. Click **"Service Desk"** tab
2. Click **"New Ticket"**
3. Fill out the form and submit
4. **✅ Success:** Your ticket appears in the list

## 🔍 Step 6: Check Browser Console

1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for any **red error messages**

**✅ Success:** No red errors (warnings in yellow are usually okay)

**❌ If you see errors:**
- Copy the error message
- Check if it's related to Supabase (means you need to configure `.env.local`)
- Check if it's a missing module (run `npm install`)

## 📱 Step 7: Test Mobile View

1. Press **F12** to open Developer Tools
2. Click the **device toggle** icon (or press Ctrl+Shift+M)
3. Select a mobile device (e.g., iPhone 12)
4. Check if the website looks good on mobile

**✅ Success:** 
- Navigation is accessible
- Text is readable
- Buttons are tappable
- Layout adjusts properly

## ✅ Quick Checklist

Mark these as you test:

- [ ] Server starts without errors
- [ ] Homepage loads at localhost:3000
- [ ] Navigation links work
- [ ] All pages display correctly
- [ ] No console errors (F12)
- [ ] Mobile view works
- [ ] Login works (if Supabase configured)
- [ ] Community features work (if logged in)

## 🐛 Common Issues

### "Module not found" errors
```bash
npm install
```

### "Invalid API key" or Supabase errors
- Create `.env.local` file
- Add your Supabase credentials
- Restart dev server

### Pages show 404
- Make sure you're using the correct URL
- Check that files exist in `app/` folder
- Restart dev server

### Styling looks broken
- Check if Tailwind CSS is working
- Verify `tailwind.config.ts` exists
- Restart dev server

## 📚 Need More Details?

- **Full testing guide:** See `TESTING.md`
- **Setup instructions:** See `SETUP.md`
- **Troubleshooting:** Check browser console and terminal for error messages

---

**Quick Status Check:**

If Steps 1-3 work → ✅ **Basic website is working!**
If Steps 4-5 work → ✅ **Full functionality is working!**

