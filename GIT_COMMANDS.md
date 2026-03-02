# 📝 Git Commands - Copy & Paste Reference

## First Time Setup

Run once per machine:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@gmail.com"
```

---

## Initial Setup for This Project

One time only (partially done):

```bash
cd c:\Users\HP\Desktop\tp7

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/champions-league.git

# Rename master branch to main
git branch -M main

# First push to GitHub
git push -u origin main
```

**After this, main branch is tracked automatically** ✅

---

## Making Changes & Pushing Updates

### After Making Code Changes:

```bash
# See what changed
git status

# Add all changes to staging
git add .

# Commit with message
git commit -m "feature: clear description of changes"

# Push to GitHub
git push
```

Or all in one:
```bash
git add . && git commit -m "feature: description" && git push
```

---

## Commit Message Examples

### Good Commit Messages:
```bash
git commit -m "feat: add player statistics page"
git commit -m "fix: resolve API error on matches page"
git commit -m "refactor: reorganize database queries"
git commit -m "docs: update README with deployment steps"
git commit -m "style: format code with prettier"
git commit -m "test: add unit tests for auth service"
```

### Format:
```
<type>: <short description>

<optional longer description>
<optional list of changes>
```

---

## Common Branch Workflow

### For New Features:

```bash
# Create feature branch
git checkout -b feature/add-statistics

# Make changes, commit regularly
git add .
git commit -m "feat: implement statistics logic"

# Push feature branch
git push -u origin feature/add-statistics

# On GitHub: Create Pull Request
# Once approved: merge to main
```

### Merge PR to main:

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge feature branch
git merge feature/add-statistics

# Push
git push origin main

# Delete feature branch
git branch -d feature/add-statistics
git push origin --delete feature/add-statistics
```

---

## Useful Commands

### See Commit History:
```bash
# Last 5 commits
git log --oneline -5

# Pretty formatted
git log --oneline --all --graph

# By author
git log --author="Your Name"
```

### See What Changed:
```bash
# Changes not staged
git diff

# Changes staged
git diff --cached

# Between branches
git diff main feature/new-feature
```

### Undo Changes:

```bash
# Discard local changes to file
git checkout -- filename.ts

# Unstage file
git reset HEAD filename.ts

# Go back one commit (safe)
git reset --soft HEAD~1

# Go back one commit (discard)
git reset --hard HEAD~1
```

### Sync with GitHub:

```bash
# Get latest from GitHub
git pull origin main

# Push local commits
git push origin main

# Force push (careful!)
git push -f origin main
```

---

## GitHub Workflow Steps

### Step 1: Create Branch
```bash
git checkout -b feature/my-feature
```

### Step 2: Make Changes
```bash
# Edit files...
git add .
git commit -m "feat: implement feature"
```

### Step 3: Push Branch
```bash
git push -u origin feature/my-feature
```

### Step 4: Create Pull Request
- Open GitHub
- Click "Create Pull Request"
- Review changes
- Click "Merge"

### Step 5: Update Local
```bash
git checkout main
git pull origin main
```

---

## Syncing Across Devices

### Device 1 - Push changes:
```bash
git add .
git commit -m "feat: changes"
git push origin main
```

### Device 2 - Get changes:
```bash
git pull origin main
```

---

## Emergency Commands

### Oops, Wrong Branch!
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1
# Switch branch
git checkout correct-branch
# Commit again
git add .
git commit -m "message"
```

### Accidentally On Master:
```bash
# Create branch from current commit
git branch new-feature

# Reset master
git reset --hard origin/main

# Switch to feature
git checkout new-feature
```

### Lost Commits:
```bash
# Find them
git reflog

# Recover
git reset --hard <commit-hash>
```

---

## Vercel Auto-Deploy

Every time you push to `main`:
```bash
git push origin main
```

Vercel automatically:
1. Detects the push
2. Rebuilds the app
3. Deploys within 2 minutes ⚡

**No manual deploy needed!**

---

## Railway Auto-Deploy

Same as Vercel:
```bash
git push origin main
```

Railway automatically:
1. Detects changes
2. Rebuilds backend
3. Deploys within 1 minute ⚡

**Zero-downtime deployments!**

---

## Daily Workflow

### Morning - Get Latest:
```bash
git pull origin main
```

### During Day - Make Changes:
```bash
# Multiple times per day:
git add .
git commit -m "feature/fix: description"
```

### End of Day - Push Everything:
```bash
git push origin main
```

---

## Pro Tips

### Alias (faster shortcuts):
```bash
# Add to Git config
git config --global alias.st status
git config --global alias.add-all add .
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.log-pretty log --oneline --all --graph

# Now use:
git st          # instead of git status
git co -b feat  # instead of git checkout -b feat
git log-pretty  # instead of git log --oneline...
```

### Check Before Push:
```bash
# See what you're about to push
git log origin/main..HEAD --oneline

# See what you're about to pull
git log HEAD..origin/main --oneline
```

### Auto-format Messages:
```bash
git config commit.template path/to/template.txt
```

---

## Reference

### Three States:
1. **Modified** - Changed but not staged
2. **Staged** - Staged but not committed
3. **Committed** - Saved in history

### Three Zones:
1. **Working Directory** - Your files
2. **Staging Area** - `git add` puts here
3. **Repository** - `git commit` puts here
4. **Remote** - `git push` puts here

## Flow:
```
Working Directory
       ↓ (git add)
   Staging Area
       ↓ (git commit)
   Repository (Local)
       ↓ (git push)
   Remote (GitHub)
```

---

## Help

```bash
# General help
git help

# Help for specific command
git help commit
git help push
git help branch

# Quick reference
git --help
```

---

## You're Ready!

Bookmark this for daily use. Most common commands:

```bash
git status              # Check status
git add .               # Stage changes
git commit -m "msg"     # Commit
git push                # Push to GitHub
git pull                # Get updates
```

**That's 90% of what you'll use!** 🚀

---

**Pro**: Master these commands → No more Git problems! 💪
