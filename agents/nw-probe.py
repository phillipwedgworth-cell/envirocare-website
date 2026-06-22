#!/usr/bin/env python3
"""
NeuronWriter get-query shape probe.
Run:  python agents/nw-probe.py [QUERY_ID]
Needs NEURONWRITER_API_KEY in .env (same folder you run from) or environment.
"""
import os, sys, json, socket

# --- connectivity preflight (turns a 40-line traceback into one clear line) ---
HOST = "app.neuronwriter.com"
try:
    socket.gethostbyname(HOST)
except socket.gaierror:
    sys.exit(f"DNS FAIL: can't resolve {HOST}. This is a local network/DNS issue, "
             f"not your API key. Check internet/VPN and re-run.")

try:
    import httpx
except ImportError:
    sys.exit("Missing httpx. Run: pip install httpx python-dotenv")

# load .env if present, but never crash on a malformed line
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

key = os.getenv("NEURONWRITER_API_KEY")
if not key:
    sys.exit("NEURONWRITER_API_KEY not set (not in .env or environment).")

qid = sys.argv[1] if len(sys.argv) > 1 else "3641aef869425c81"
BASE = "https://app.neuronwriter.com/neuron-api/0.5/writer"
HEAD = {"X-API-KEY": key, "Content-Type": "application/json"}

try:
    r = httpx.post(f"{BASE}/get-query", headers=HEAD, json={"query": qid}, timeout=30)
except httpx.ConnectError as e:
    sys.exit(f"CONNECT FAIL (network/DNS): {e}")

print("get-query status", r.status_code, r.headers.get("content-type"))
if r.status_code != 200:
    print(r.text[:500]); sys.exit()

d = r.json()
print("TOP-LEVEL KEYS:", list(d.keys()) if isinstance(d, dict) else type(d))
if isinstance(d, dict):
    for k, v in d.items():
        if isinstance(v, dict):
            print(f"  {k}: dict len={len(v)} | subkeys: {list(v.keys())[:8]}")
        elif isinstance(v, list):
            sample = list(v[0].keys()) if v and isinstance(v[0], dict) else (v[0] if v else "")
            print(f"  {k}: list len={len(v)} | sample: {sample}")
        else:
            print(f"  {k}: {str(v)[:80]}")
