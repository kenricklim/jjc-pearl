# How to Add or Change the Logo

This guide explains how to add or change the logo for your JJC Puerto Princesa Perlas website.

## 📁 Where to Put Your Logo Image

### Step 1: Place Your Logo File

Put your logo image file in the **`public`** folder:

```
jci-pearl-1/
  └── public/
      └── your-logo.png  (or .jpg, .svg, etc.)
```

**Current logo location:** `public/jjcperlas_logo.jpg`

### Step 2: Supported Image Formats

You can use any of these formats:
- `.png` (recommended for logos with transparency)
- `.jpg` / `.jpeg` (good for photos)
- `.svg` (scalable vector graphics - best for logos)
- `.webp` (modern, efficient format)

**Recommended:** Use `.png` or `.svg` for logos

### Step 3: Update the Navbar Code

The logo is displayed in the navigation bar. To change it:

1. Open `components/navbar.tsx`
2. Find this line (around line 43):
   ```tsx
   src="/jjcperlas_logo.jpg"
   ```
3. Change it to your logo filename:
   ```tsx
   src="/your-logo.png"
   ```

**Example:**
- If your logo is `public/my-logo.png`, use: `src="/my-logo.png"`
- If your logo is `public/logo.svg`, use: `src="/logo.svg"`

## 🎨 Logo Size Recommendations

For best results, your logo should be:
- **Width:** 200-400 pixels (or larger for high-resolution displays)
- **Height:** 40-80 pixels (to fit nicely in the navbar)
- **Aspect Ratio:** Keep it roughly square or slightly wider than tall
- **File Size:** Under 100KB for fast loading

### Current Logo Settings

The navbar displays the logo at:
- **Size:** 40px × 40px (h-10 w-10 in Tailwind)
- **Display:** `object-contain` (maintains aspect ratio)

## 🔧 How to Change Logo Size

If you want to make the logo bigger or smaller:

1. Open `components/navbar.tsx`
2. Find this line (around line 41):
   ```tsx
   <div className="relative h-10 w-10 flex-shrink-0">
   ```
3. Change the size:
   - `h-8 w-8` = 32px × 32px (smaller)
   - `h-10 w-10` = 40px × 40px (current)
   - `h-12 w-12` = 48px × 48px (larger)
   - `h-16 w-16` = 64px × 64px (much larger)

**Example - Make logo bigger:**
```tsx
<div className="relative h-12 w-12 flex-shrink-0">
```

## 📝 Complete Example

Here's how the logo code looks in the navbar:

```tsx
<div className="relative h-10 w-10 flex-shrink-0">
  <Image
    src="/jjcperlas_logo.jpg"  // Change this to your logo filename
    alt="JJC Puerto Princesa Perlas Logo"
    fill
    className="object-contain"
    priority
    sizes="40px"
  />
</div>
```

## 🖼️ Using SVG Logos (Recommended)

SVG logos are best because they scale perfectly at any size. If you have an SVG:

1. Place it in `public/` folder: `public/logo.svg`
2. Update navbar: `src="/logo.svg"`
3. Optionally, you can use it directly without Next.js Image component:

```tsx
<img 
  src="/logo.svg" 
  alt="JJC Puerto Princesa Perlas Logo"
  className="h-10 w-10 object-contain"
/>
```

## 🎯 Quick Steps Summary

1. **Put your logo file** in the `public/` folder
2. **Open** `components/navbar.tsx`
3. **Find** the line with `src="/jjcperlas_logo.jpg"`
4. **Change** it to your logo filename (e.g., `src="/my-logo.png"`)
5. **Save** the file
6. **Refresh** your browser to see the change

## 🔍 Current Logo

The website currently uses: `public/jjcperlas_logo.jpg`

To change it, simply replace this file or update the filename in `components/navbar.tsx`.

## 💡 Tips

- **Test different sizes:** Try `h-8`, `h-10`, `h-12` to see what looks best
- **Use transparent backgrounds:** PNG with transparency works best
- **Optimize images:** Compress large images before adding them
- **Keep it simple:** Simple logos work better at small sizes

## 🐛 Troubleshooting

### Logo doesn't appear
- Check the filename matches exactly (case-sensitive)
- Make sure the file is in the `public/` folder (not `public/images/`)
- Check browser console (F12) for 404 errors
- Restart the dev server: `npm run dev`

### Logo looks blurry
- Use a higher resolution image
- Use SVG format for crisp display at any size
- Check if the image is being scaled up too much

### Logo is too big/small
- Adjust the `h-10 w-10` classes in navbar.tsx
- Try different Tailwind size classes

---

**Need help?** The logo code is in `components/navbar.tsx` around line 40-50.
