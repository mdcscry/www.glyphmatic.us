#!/usr/bin/env python3
"""Send a minimax voice quote to Telegram."""
import json
import random
from pathlib import Path

QUOTES_FILE = Path.home() / "Documents/www.glyphmatic.us/_cron/quotes.json"

with open(QUOTES_FILE) as f:
    quotes = json.load(f)

quote = random.choice(quotes["minimax"])
message = f"🤖 minimax here — {quote}"

# Send via OpenClaw message system
import subprocess
result = subprocess.run(
    ["openclaw", "message", "send", "--to", "8233843319", "--message", message, "--channel", "telegram"],
    capture_output=True,
    text=True
)
print(f"Sent: {message}")
