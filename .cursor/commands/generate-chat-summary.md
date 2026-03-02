# Generate Chat Summary

## Overview

Review all git changes on the current branch and the conversation history to generate a concise summary of what was done. This command is **read-only** — it must NOT modify any files or code.

## Steps

1. **Identify the base branch**: Run `git log --oneline main..HEAD` (or `master..HEAD`) to list all commits on the current branch that are not in the base branch.
2. **Review git diff**: Run `git diff main...HEAD --stat` to get a summary of all changed files, and `git diff main...HEAD` to understand the actual code changes.
3. **Review the conversation**: Go through the full chat history to understand the context, intent, and purpose behind each change.
4. **Generate the summary**: Produce a plain-text summary in the following format:

```
Summary
<One-line high-level description of the feature or task>

<Bullet list — one line per concrete change made, starting with a verb (Added, Updated, Created, Removed, Fixed, Installed, etc.)>
```

5. **Output only the summary text**: Do NOT modify any files. Just return the summary so the user can copy it.

## Rules

- Output should be in english
- Do NOT create, edit, or delete any file.
- Do NOT run any command that modifies the repository (no git add, commit, push, etc.).
- Each line in the bullet list should describe a single concrete change.
- Use past tense verbs: Added, Created, Updated, Fixed, Removed, Installed, Integrated, etc.
- Keep it concise — no explanations, just the list of changes.
