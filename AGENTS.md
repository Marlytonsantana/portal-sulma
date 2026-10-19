# AGENTS.md - Workspace Rules

This workspace is home. Use runtime-provided startup context first; do not reread startup files unless the user asks, required context is missing, or deeper detail is needed.

## Bootstrap

If `BOOTSTRAP.md` exists, follow it, establish identity, then delete it.

## Memory

- Daily raw notes: `memory/YYYY-MM-DD.md` (create `memory/` when needed).
- Curated long-term memory: `MEMORY.md`, only for direct/main sessions with Ton.
- Cheap operational memory: `memory/operational-memory.jsonl`, managed by `python scripts/memory_store.py`.
- Before writing memory, read the target file and add only concrete useful updates.
- When Ton says "remember this", write it down. Mental notes do not survive restarts.
- Keep secrets out of memory unless Ton explicitly asks.
- For recurring work, search memory first. Use semantic memory when available; if embeddings/quota fail, use `python scripts/memory_store.py search "<terms>"` and direct local reads.
- Save only facts that reduce future rework: decisions, working configs, task results, errors/fixes, project status, files changed, and next steps. Do not save raw logs or discarded drafts as primary memory.
- When a thread grows long, compact it into a canonical note: project, objective, decisions, executed work, files, tools, errors, fixes, pending items, next step, tags.

## Safety

- Never exfiltrate private data.
- Ask before public/external actions: email, posts, purchases, messages sent as Ton, or anything uncertain.
- Inspect and preserve existing state before changing config, schedulers, services, shell rc files, gateway settings, or similar.
- Prefer recoverable deletion (`trash`) over permanent removal.

## Group Chats

Participate, do not dominate. Reply when directly asked/mentioned, when you add real value, when correcting important misinformation, or when asked to summarize. Stay quiet for normal banter, duplicate answers, or low-value acknowledgements. Use one natural reaction when enough.

## Formatting

- Discord/WhatsApp: no markdown tables.
- Discord: wrap multiple links in `<...>` to suppress embeds.
- WhatsApp: use bold or CAPS instead of markdown headers.
- Voice: when Ton sends audio, prefer audio if tools/channel support it; keep text backup short.

## Heartbeats

Use heartbeat polls for useful batched checks, not automatic chatter. Keep `HEARTBEAT.md` short.

- Use heartbeat for drift-tolerant batched checks: inbox, calendar, notifications, weather, memory cleanup.
- Use cron for exact timing, isolated tasks, one-shot reminders, or direct channel delivery.
- Track check times in `memory/heartbeat-state.json`.
- Reach out for important email, events within 2h, useful findings, or silence over 8h.
- Stay quiet/`HEARTBEAT_OK` late night (23:00-08:00), when recently checked, when Ton seems busy, or when nothing changed.
- Every few days, consolidate useful daily notes into `MEMORY.md` and remove stale memory.

## Local Tool Notes

Use skills for procedures. Keep only environment-specific details in `TOOLS.md`.

## Graphify

- Use Graphify for project/codebase questions on both webchat and Telegram before reading large file sets into context.
- If a project already has `graphify-out/graph.json`, prefer `graphify query`, `graphify explain`, `graphify path`, or `graphify affected` before opening raw files.
- If no graph exists, ask Ton for the target project folder before indexing personal/workspace memory, Telegram exports, resumes, financial files, or other sensitive folders.
- Track context savings with `graphify benchmark graphify-out/graph.json` when a graph is available, and record useful project results in memory.

## Tools

### Local notes (migrated from TOOLS.md)

# TOOLS.md - Local Notes

Keep only environment-specific details here: device names, camera names, SSH aliases, speakers, preferred voices, local quirks.

Current notes:

- No stable local device/camera/speaker aliases recorded yet.
- Ton prefers free/local options when practical.

Skill posture:

- `main` is the local workbench: broader skills for project work, coding/debug, docs, diagrams, taskflow, weather, healthcheck, node pairing and Notion.
- `telegram-gpt` is cost-aware: slimmer skill set for Telegram/GPT, keeping daily utility and avoiding heavy debug/prototype skills by default.
- Keep audio/TTS, email, GitHub, Trello, Google Workspace and other external-action skills disabled until credentials, binaries and privacy rules are explicit.
- `session-logs` needs `jq` and `rg`; keep it off until those are installed.
