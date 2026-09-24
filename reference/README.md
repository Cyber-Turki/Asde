# reference/

Third-party reference material vendored into this project. Nothing here is
loaded by the app, the build, ESLint, Tailwind's class scan or the Claude Code
harness — it is read by people and agents, never executed.

## ai-design-vault

`ai-design-vault/` is Textura's framework-agnostic design vault —
<https://github.com/textura-agency/ai-design-vault> — at commit `f0cdc2b`
(2026-08-18, "feat: init"), vendored without its git history.

**Start at `ai-design-vault/README.md` — it is the map.** Then
`ai-design-vault/obsidian/README.md` for its Map of Content.

It is a **reference, not an installation**. Its notes on layout, typography,
colour, spacing and motion inform how UI is built here; its file structure and
machinery do not. How it is applied, and what wins when it and this project's own
vault disagree, is written in `obsidian/frontend/design-reference.md` (ADR-0026).

### What was vendored

| Kept | Why |
|---|---|
| `obsidian/` | the notes — the reference itself |
| `README.md` | the map |
| `AGENTS.md` | its full hard-rules list, which the README links to |
| `LICENSE.md` | Unlicense — travels with the copied content |

### What was deliberately left out

`.claude/` (its hooks, skills, commands and `stack.json`), `install.sh`,
`CLAUDE.md` and `.cursorrules`. Those install the kit *as* a project's harness,
and this project already has one fitted to Next 16. **Do not run its `/adapt`;
do not copy its `.claude/` to the root.**

It sits outside `obsidian/` on purpose: the two vaults share note names
(`design-system`, `new-page`, …), so nesting one inside the other would make
wikilinks ambiguous. To browse it with the graph view, open
`reference/ai-design-vault/obsidian/` as a separate Obsidian vault.

### Updating

Re-clone upstream, replace the four entries above, and record the new commit
here and in `obsidian/meta/changelog.md`.
