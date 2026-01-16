# Supabase Storage Limits Reference

This document provides detailed information about Supabase Storage limits for the Events feature.

## 📊 Quick Reference

| Plan | Max File Size | Total Storage | Monthly Bandwidth | Cost |
|------|--------------|--------------|------------------|------|
| **Free** | 50 MB | 1 GB | 2 GB | $0 |
| **Pro** | 5 GB (standard)<br>50 GB (resumable) | 100 GB included | 250 GB included | $25/month |
| **Team** | 5 GB (standard)<br>50 GB (resumable) | 200 GB included | 500 GB included | $599/month |
| **Enterprise** | Custom (up to 500 GB) | Custom | Custom | Custom |

## 📁 File Size Limits

### Per File Upload

**Free Plan:**
- Maximum: **50 MB per file** (global limit)
- This is the maximum you can configure for any bucket
- Standard uploads work fine for files under 50 MB

**Paid Plans (Pro, Team, Enterprise):**
- **Standard uploads**: Up to **5 GB per file**
  - Uses multipart/form-data through supabase-js
  - Performance may degrade with very large files
- **Resumable uploads (S3 protocol)**: Up to **50 GB per file**
  - Better for large files and network interruptions
  - More reliable for files over 1 GB
- **Global limit**: Can be configured up to **500 GB per file** (Enterprise)

### Current Implementation

The Events feature currently enforces:
- **5 MB per image** (client-side validation)
- This is well below Free tier limits
- Ensures fast uploads and good user experience

**To change the limit**, edit `app/events/page.tsx`:
```typescript
// Line ~130, change 5 to your desired MB limit
if (file.size > 5 * 1024 * 1024) {
  alert(`${file.name} is too large. Maximum file size is 5MB.`);
  return false;
}
```

## 💾 Total Storage Limits

### Free Tier
- **1 GB** total storage included
- Additional storage: **$0.021 per GB/month**
- Example: 10 GB total = $0.189/month (9 GB × $0.021)

### Paid Plans
- **Pro**: 100 GB included, then $0.021 per GB/month
- **Team**: 200 GB included, then $0.021 per GB/month
- **Enterprise**: Custom allocation

### Storage Usage Calculation

For event images:
- Average optimized image: ~200-500 KB
- Average unoptimized image: ~2-5 MB

**Example calculations:**
- 1,000 optimized images (300 KB avg) = ~300 MB
- 1,000 unoptimized images (3 MB avg) = ~3 GB
- 10,000 optimized images = ~3 GB
- 10,000 unoptimized images = ~30 GB

**Recommendation**: Optimize images before upload to stay within Free tier limits longer.

## 🌐 Bandwidth Limits

### Free Tier
- **2 GB** egress (download) bandwidth per month
- Additional bandwidth: **$0.09 per GB**
- Example: 10 GB bandwidth = $0.72/month (8 GB × $0.09)

### Paid Plans
- **Pro**: 250 GB included, then $0.09 per GB
- **Team**: 500 GB included, then $0.09 per GB
- **Enterprise**: Custom allocation

### Bandwidth Usage Calculation

Each time someone views an event image, it counts toward bandwidth:
- Average image: ~300 KB
- 1,000 views = ~300 MB
- 10,000 views = ~3 GB

**Note**: Images are cached by browsers and CDNs, so repeat views use less bandwidth.

## 🎯 Recommendations for Event Images

### 1. Optimize Images Before Upload

**Best Practices:**
- **Compress JPEG images**: Use 80-90% quality (barely noticeable difference)
- **Use WebP format**: 25-35% smaller than JPEG
- **Resize large images**: Max 1920x1080 for web display
- **Remove EXIF data**: Can reduce file size by 10-20%

**Tools:**
- Online: TinyPNG, Squoosh, ImageOptim
- Desktop: ImageOptim (Mac), FileOptimizer (Windows)
- CLI: sharp, imagemin

### 2. Monitor Usage

**Check your usage:**
1. Go to Supabase Dashboard
2. Navigate to **Storage**
3. View total storage used
4. Check bandwidth in **Settings** > **Usage**

**Set up alerts:**
- Configure alerts in Supabase Dashboard
- Get notified when approaching limits

### 3. Upgrade Strategy

**When to upgrade:**
- **Free → Pro**: When you exceed 1 GB storage or 2 GB bandwidth/month
- **Pro → Team**: When you need more storage/bandwidth or team features

**Cost comparison:**
- Free tier: $0/month (limited)
- Pro: $25/month (100 GB storage, 250 GB bandwidth)
- Team: $599/month (200 GB storage, 500 GB bandwidth)

### 4. Alternative Solutions

If you need more storage/bandwidth:
- **Use a CDN**: Cloudflare, Cloudinary, or Imgix
- **Compress images**: Reduce storage needs by 50-70%
- **Lazy loading**: Reduce initial bandwidth usage
- **Image optimization service**: Automatic compression and resizing

## 🔧 Configuration

### Adjust File Size Limit

Edit `app/events/page.tsx`:

```typescript
// Current: 5 MB
if (file.size > 5 * 1024 * 1024) {
  alert(`${file.name} is too large. Maximum file size is 5MB.`);
  return false;
}

// Example: Increase to 10 MB
if (file.size > 10 * 1024 * 1024) {
  alert(`${file.name} is too large. Maximum file size is 10MB.`);
  return false;
}
```

### Configure Bucket Limits

In Supabase Dashboard:
1. Go to **Storage** > **Buckets**
2. Select `event-images` bucket
3. Click **Settings**
4. Adjust **File size limit** (cannot exceed global limit)

## 📈 Usage Examples

### Small Organization
- **Events per year**: 24
- **Images per event**: 3-5
- **Total images**: ~100/year
- **Storage needed**: ~30-50 MB/year (optimized)
- **Bandwidth**: ~1-2 GB/month
- **Plan needed**: **Free tier** is sufficient

### Medium Organization
- **Events per year**: 50
- **Images per event**: 5-10
- **Total images**: ~400/year
- **Storage needed**: ~200-400 MB/year (optimized)
- **Bandwidth**: ~5-10 GB/month
- **Plan needed**: **Free tier** or **Pro** (if bandwidth exceeds 2 GB)

### Large Organization
- **Events per year**: 100+
- **Images per event**: 10-20
- **Total images**: ~1,500+/year
- **Storage needed**: ~1-3 GB/year (optimized)
- **Bandwidth**: ~20-50 GB/month
- **Plan needed**: **Pro plan** recommended

## ⚠️ Important Notes

1. **Free tier limits are per project**, not per user
2. **Storage and bandwidth are separate limits**
3. **Overage charges apply automatically** if you exceed included limits
4. **Monitor usage regularly** to avoid unexpected charges
5. **Images are stored permanently** until manually deleted
6. **Consider implementing image cleanup** for old events

## 🔗 Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Pricing](https://supabase.com/pricing)
- [Storage File Limits](https://supabase.com/docs/guides/storage/uploads/file-limits)
- [Storage Best Practices](https://supabase.com/docs/guides/storage/best-practices)
