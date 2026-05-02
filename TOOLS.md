Image conversion and deployment helper

This repo already contains `Images/WebP` versions for many assets. To convert remaining JPEG/PNG/SVG files to WebP and update HTML references automatically, use the following steps locally.

1) Convert images to WebP (lossy) using cwebp (install from libwebp):

# Convert a single file
cwebp -q 80 "Images/Silver Products (1).jpeg" -o "Images/WebP/Silver Products (1).webp"

# Batch convert all jpegs to WebP into Images/WebP
mkdir -p Images/WebP
for f in Images/*.jpeg; do cwebp -q 80 "$f" -o "Images/WebP/$(basename "${f%.*}").webp"; done

2) Validate visually that quality is acceptable and file sizes are smaller.

3) Replace HTML references (already many were updated). To mass-replace remaining <img> tags with <picture>, use a small script or manually edit files.

Optional: automate replacement with a simple Node.js script (example below) that looks for images/ and swaps src to WebP where available.

If you want, I can produce that Node script and run edits in the repo (I won't convert images here to avoid altering binary files)."}