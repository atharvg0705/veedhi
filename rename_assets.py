import os
import re
import magic

FOLDER_PATH = r"D:\Users\Atharv Gunjal\Downloads\Veedhu\assets"

MIME_MAP = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/bmp": ".bmp",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
}

def natural_key(name):
    return [int(x) if x.isdigit() else x.lower() for x in re.split(r"(\d+)", name)]

def detect_extension(filepath):
    try:
        mime = magic.from_file(filepath, mime=True)
        return MIME_MAP.get(mime)
    except Exception as e:
        print(f"❌ Error reading {filepath}: {e}")
        return None

def next_available_name(folder, ext, start_num):
    n = start_num
    while True:
        candidate = f"v{n}{ext}"
        candidate_path = os.path.join(folder, candidate)
        if not os.path.exists(candidate_path):
            return candidate, n
        n += 1

def rename_assets(folder):
    files = sorted([
        f for f in os.listdir(folder)
        if os.path.isfile(os.path.join(folder, f))
    ], key=natural_key)

    counter = 1
    renamed = []
    skipped = []

    for filename in files:
        old_path = os.path.join(folder, filename)
        true_ext = detect_extension(old_path)

        if true_ext is None:
            skipped.append(filename)
            print(f"⚠️ Skipped (unsupported type): {filename}")
            continue

        new_name, counter = next_available_name(folder, true_ext, counter)
        new_path = os.path.join(folder, new_name)

        try:
            os.rename(old_path, new_path)
            print(f"✅ {filename} -> {new_name}")
            renamed.append((filename, new_name))
            counter += 1
        except Exception as e:
            print(f"❌ Failed to rename {filename}: {e}")
            skipped.append(filename)

    print(f"\nDone: {len(renamed)} renamed, {len(skipped)} skipped.")

if __name__ == "__main__":
    rename_assets(r"D:\Users\Atharv Gunjal\Downloads\Veedhu\assets")