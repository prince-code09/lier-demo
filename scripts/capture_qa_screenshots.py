import subprocess
import os
import tempfile
import time
import shutil

BASE_URL = "http://localhost:5173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = os.path.abspath("screenshots")
os.makedirs(OUTPUT_DIR, exist_ok=True)

temp_profile = tempfile.mkdtemp(prefix="chrome_lier_qa_")

tests = [
    # 1. Primary Device Profiles (Home)
    {"name": "01_mobile_360_android_home", "path": "/", "w": 360, "h": 780},
    {"name": "02_mobile_375_iphone_se_home", "path": "/", "w": 375, "h": 667},
    {"name": "03_mobile_390_iphone14_home", "path": "/", "w": 390, "h": 844},
    {"name": "04_mobile_402_iphone16pro_home", "path": "/", "w": 402, "h": 874},
    {"name": "05_mobile_412_samsung_pixel_home", "path": "/", "w": 412, "h": 915},
    {"name": "06_mobile_430_iphone_promax_home", "path": "/", "w": 430, "h": 932},
    {"name": "07_tablet_768_ipad_mini_home", "path": "/", "w": 768, "h": 1024},
    {"name": "08_tablet_820_ipad_air_home", "path": "/", "w": 820, "h": 1180},
    {"name": "09_tablet_1024_ipad_pro_home", "path": "/", "w": 1024, "h": 1366},
    {"name": "10_desktop_1366_laptop_home", "path": "/", "w": 1366, "h": 768},
    {"name": "11_desktop_1440_baseline_home", "path": "/", "w": 1440, "h": 900},
    {"name": "12_desktop_1920_fhd_home", "path": "/", "w": 1920, "h": 1080},

    # 2. Key Routes on Mobile (390px) & Desktop (1440px)
    {"name": "13_mobile_390_shop_boutique", "path": "/shop", "w": 390, "h": 844},
    {"name": "14_desktop_1440_shop_boutique", "path": "/shop", "w": 1440, "h": 900},
    {"name": "15_mobile_390_pdp_alpine", "path": "/product/alpine-mist", "w": 390, "h": 844},
    {"name": "16_desktop_1440_pdp_alpine", "path": "/product/alpine-mist", "w": 1440, "h": 900},
    {"name": "17_mobile_390_pdp_musk", "path": "/product/crist-ash-musk", "w": 390, "h": 844},
    {"name": "18_mobile_390_pdp_combo", "path": "/product/duo-combo", "w": 390, "h": 844},
    {"name": "19_mobile_390_about_house", "path": "/about", "w": 390, "h": 844},
    {"name": "20_desktop_1440_about_house", "path": "/about", "w": 1440, "h": 900},
    {"name": "21_mobile_390_contact_concierge", "path": "/contact", "w": 390, "h": 844},
    {"name": "22_desktop_1440_checkout", "path": "/checkout", "w": 1440, "h": 900},
    {"name": "23_mobile_390_checkout", "path": "/checkout", "w": 390, "h": 844},
]

results = []

print(f"Starting QA capture for {len(tests)} scenarios across viewports...")

for t in tests:
    target_url = f"{BASE_URL}{t['path']}"
    out_file = os.path.join(OUTPUT_DIR, f"{t['name']}.png")
    
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--user-data-dir={temp_profile}",
        f"--window-size={t['w']},{t['h']}",
        f"--screenshot={out_file}",
        "--virtual-time-budget=2500",
        target_url
    ]
    
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
        exists = os.path.exists(out_file)
        size_kb = os.path.getsize(out_file) / 1024 if exists else 0
        status = "PASS" if exists and size_kb > 20 else "FAIL"
        results.append({
            "name": t["name"],
            "viewport": f"{t['w']}x{t['h']}",
            "path": t["path"],
            "status": status,
            "size_kb": f"{size_kb:.1f} KB",
            "file": out_file
        })
        print(f"[{status}] {t['name']} ({t['w']}x{t['h']}) -> {size_kb:.1f} KB")
    except Exception as e:
        results.append({
            "name": t["name"],
            "viewport": f"{t['w']}x{t['h']}",
            "path": t["path"],
            "status": "FAIL",
            "error": str(e)
        })
        print(f"[FAIL] {t['name']}: {e}")

# Cleanup temp profile
try:
    shutil.rmtree(temp_profile, ignore_errors=True)
except Exception:
    pass

print("\n--- FINAL QA SUMMARY ---")
pass_count = sum(1 for r in results if r.get("status") == "PASS")
fail_count = len(results) - pass_count
print(f"Total: {len(results)} | Passed: {pass_count} | Failed: {fail_count}")

# Generate markdown table summary
print("\n| Scenario | Viewport | Path | Status | File Size |")
print("| :--- | :---: | :---: | :---: | :--- |")
for r in results:
    print(f"| {r['name']} | {r['viewport']} | `{r['path']}` | **{r['status']}** | {r.get('size_kb', '0 KB')} |")
