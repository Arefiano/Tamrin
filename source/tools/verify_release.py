"""Verify that published GitHub Pages files match a fresh build."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "source" / "out" / "tamrin"
FILES = (
    "index.html", "sw.js", "manifest.webmanifest",
    "icon-180.png", "icon-192.png", "icon-512.png",
    "media/rear-delt-fly.mp4", "media/rear-delt-fly.webm", "media/rear-delt-fly.png",
)
errors = []
for name in FILES:
    released, generated = ROOT / name, OUT / name
    if not released.is_file() or not generated.is_file():
        errors.append(f"Missing file: {name}")
    elif released.read_bytes() != generated.read_bytes():
        errors.append(f"Outdated published file: {name}")
if errors:
    print("Release parity check failed:")
    print("\n".join(f" - {item}" for item in errors))
    sys.exit(1)
print(f"Release parity OK: {len(FILES)} published files match the fresh build")
