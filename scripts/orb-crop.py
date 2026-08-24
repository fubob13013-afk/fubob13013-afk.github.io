#!/usr/bin/env python3
"""移植自 App 的 scripts/orb-assets.py：同样式前景检测裁切，输出到网站素材目录。"""
import os
import shutil
import subprocess

SRC_DIR = r"E:\作品集\ai产品经理作品集\待补素材\01-语音助手"
OUT_DIR = r"E:\作品集\ai产品经理作品集\website\public\video\orb"
STATE_MAP = {"orb-idle": "02", "orb-listening": "04", "orb-working": "06"}

DS_W, DS_H = 320, 180
SRC_W, SRC_H = 2560, 1440
SCALE = SRC_W // DS_W

FG_WITHIN_WHITE = 24
FG_MIN_CHROMA = 28


def foreground_bbox(buf: bytes):
    x0, y0, x1, y1, count = DS_W, DS_H, -1, -1, 0
    for y in range(DS_H):
        base = y * DS_W * 3
        for x in range(DS_W):
            i = base + x * 3
            r, g, b = buf[i], buf[i + 1], buf[i + 2]
            mx, mn = max(r, g, b), min(r, g, b)
            if mx > 235 and (mx - mn) < FG_WITHIN_WHITE:
                continue
            if (mx - mn) < FG_MIN_CHROMA and mx < 235:
                continue
            count += 1
            if x < x0: x0 = x
            if x > x1: x1 = x
            if y < y0: y0 = y
            if y > y1: y1 = y
    if count == 0:
        return None
    return x0, y0, x1, y1, count


def sample(ffm, path):
    bboxes = []
    for k in range(10):
        t = round(0.3 + k * (9.0 / 9), 2)
        r = subprocess.run(
            [ffm, "-v", "error", "-ss", str(t), "-i", path,
             "-frames:v", "1", "-vf", f"scale={DS_W}:{DS_H}",
             "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
            capture_output=True,
        )
        if r.returncode == 0 and r.stdout:
            bb = foreground_bbox(r.stdout)
            if bb:
                bboxes.append(bb)
    return bboxes


def to_even(v):
    return v if v % 2 == 0 else v + 1


def main():
    ffm = shutil.which("ffmpeg")
    os.makedirs(OUT_DIR, exist_ok=True)
    for out_name, num in STATE_MAP.items():
        # 找到带中文后缀的源文件（02_空闲-idle.mp4 等）
        src = None
        for f in os.listdir(SRC_DIR):
            if f.startswith(num + "_") and f.endswith(".mp4"):
                src = os.path.join(SRC_DIR, f)
                break
        if not src:
            print(f"[warn] 找不到 {num} 的源文件，跳过")
            continue
        bboxes = sample(ffm, src)
        if not bboxes:
            print(f"[warn] {num}: 无前景，跳过")
            continue
        x0 = min(b[0] for b in bboxes)
        y0 = min(b[1] for b in bboxes)
        x1 = max(b[2] for b in bboxes)
        y1 = max(b[3] for b in bboxes)
        w, h = x1 - x0 + 1, y1 - y0 + 1
        cx = (x0 + x1) / 2 * SCALE
        cy = (y0 + y1) / 2 * SCALE
        side = int(max(w, h) * SCALE * 1.02)  # App 用 1.04，这里收紧到 1.02：边缘刚好卡球
        side = to_even(min(side, SRC_W))
        crop_x = to_even(max(0, min(int(cx - side / 2), SRC_W - side)))
        crop_y = to_even(max(0, min(int(cy - side / 2), SRC_H - side)))
        out = os.path.join(OUT_DIR, f"{out_name}.mp4")
        r = subprocess.run(
            [ffm, "-y", "-v", "error", "-i", src,
             "-filter_complex",
             f"crop={side}:{side}:{crop_x}:{crop_y},setsar=1,scale=720:720:flags=lanczos",
             "-c:v", "libx264", "-preset", "medium", "-crf", "24",
             "-an", "-movflags", "+faststart", "-pix_fmt", "yuv420p", out],
            capture_output=True,
        )
        if r.returncode != 0:
            print(f"[err] {num}: {r.stderr.decode('utf-8', 'replace')[-300:]}")
            raise SystemExit(1)
        print(f"[ok] {num} -> {out_name}.mp4  crop={side}x{side}@{crop_x},{crop_y}")


if __name__ == "__main__":
    main()
