---
description: Create a Conventional Commit from staged changes only
---
Create a git commit following the Conventional Commits 1.0.0 specification. Use staged changes only.

## Workflow

1. Inspect only staged changes with one Git command that includes both the summary and patch:
   ```bash
   git diff --staged --patch-with-stat
   ```
2. If there are no staged changes, tell the user there is nothing staged and stop without committing.
3. Draft the message from the staged diff only. Ignore unstaged changes, untracked files, and working-tree context unless it is also staged.
4. Do not stage files. Do not use `git add`, `git commit -a`, or any command that includes unstaged changes.
5. Before committing, verify the complete subject is at most 50 characters and body/footer lines are wrapped at 72 characters. Shorten or rewrap the message as needed without changing its meaning.
6. Commit the staged changes with the validated message.

## Message format

```text
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

- Use `feat` for a new feature and `fix` for a bug fix. Other types may include `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, and `revert`.
- Add an optional noun scope when it clarifies the affected area, for example `feat(auth): ...`.
- For breaking changes, include `!` after the type/scope or a footer starting with `BREAKING CHANGE: `. Prefer both when the staged diff clearly shows migration details that belong in the footer.
- Keep the entire subject line at most 50 characters, including the type, optional scope, optional `!`, colon, and spaces. Move extra detail into the body rather than exceeding the limit.
- Keep the description short, imperative, lowercase unless a proper noun is required, and without a trailing period.
- Separate the subject from the body or footers with a blank line.
- Add a body only when the staged changes need explanation beyond the subject line. Explain what changed and why; hard-wrap body lines at 72 characters.
- Add footers as git trailers when relevant, for example `Refs: #123` or `BREAKING CHANGE: ...`. Wrap footer prose at 72 characters using valid continuation lines; preserve required trailer syntax and unbreakable URLs or identifiers.

## Commit command

For a single-line message:

```bash
git commit -m "<type>[optional scope]: <description>"
```

For a multi-paragraph message, pass each paragraph as a separate `-m` argument for portability across macOS, Linux, and Windows. Preserve actual line breaks within each argument to enforce the 72-character wrapping; separate `-m` arguments insert blank lines between paragraphs:

```bash
git commit -m "<type>[optional scope]: <description>" -m "<body paragraph>" -m "<footer>"
```

Quote message arguments safely for the active shell so message text is passed literally. Do not use a fixed temporary message-file path.

## Output

After a successful commit, report the full commit message in a fenced `text` block and the resulting commit hash, if available. If committing fails, report the failure without claiming success. Do not claim unstaged or untracked changes were committed.

## Examples

```text
feat(tasks): add task creation flow
```

```text
fix(db): handle missing migration metadata

Avoid crashing when older local databases do not yet have migration
records.
```

```text
feat(api)!: require authenticated project requests

BREAKING CHANGE: project API calls now require a valid session token.
```
