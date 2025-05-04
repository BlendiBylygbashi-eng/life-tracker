# Complete Feature Development Workflow

## When to Create a Branch

### Always Create a Branch When:
- Adding new features
- Making significant changes
- Bug fixes that need testing
- Changes that need review
- Changes that might take multiple commits

### Can Commit Directly to Main When:
- Fixing typos
- Updating documentation
- Very small, obvious fixes
- Changes that:
  - Don't affect functionality
  - Don't need review
  - Can be tested instantly
  - Are completely self-contained

**Rule of Thumb:**
- If you can test the change in under a minute → Maybe direct to main
- If someone should review it → Branch
- If it could break something → Branch
- If you might need to make more related changes → Branch
- If you're not 100% confident → Branch

When in doubt, create a branch. The cost of creating a branch is very low, but the cost of breaking main can be high!

## 1. Feature Planning
- Identify the feature requirements
- Consider the implementation approach
- Think about where changes will be needed
- Plan the testing strategy

## 2. Branch Creation
```bash
# Ensure main is up-to-date
git checkout main
git pull

# Create and switch to feature branch
git checkout -b feature/descriptive-name
```

## 3. Development
- Make code changes
- Test locally
- Make additional changes as needed
- Keep changes focused on the feature

## 4. Commit Changes
```bash
# Check what files changed
git status

# Stage changes
git add .  # all changes
# or
git add specific-file.tsx  # specific files

# Commit with descriptive message
git commit -m "feat: description of changes"
```

## 5. Push to GitHub
```bash
# First time pushing this branch
git push -u origin feature/descriptive-name

# Subsequent pushes
git push
```

## 6. Create Pull Request (PR)
- Go to GitHub repository
- Click "Create Pull Request"
- Fill out PR details:
  - Title: Clear description of feature
  - Description:
    - What changes were made
    - How to test
    - Technical details
    - Any related issues

## 7. Review Process
- Review the changes yourself
- Check for:
  - Code quality
  - Potential bugs
  - Test coverage
  - Documentation
- Address any feedback

## 8. Merge Process
- Click "Merge Pull Request"
- Choose merge type:
  - Create a merge commit (default)
  - Squash and merge
  - Rebase and merge
- Confirm merge

## 9. Clean Up
```bash
# Delete remote branch (can use GitHub UI)
# Update local main
git checkout main
git pull

# Delete local feature branch
git branch -d feature/descriptive-name
```

## Common Commands Reference
```bash
# Check branch status
git status

# See all branches
git branch

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b branch-name

# Pull latest changes
git pull

# Push changes
git push

# See commit history
git log
```

## Best Practices
- One feature per branch
- Keep commits focused and clear
- Write descriptive commit messages
- Test before pushing
- Keep PRs reasonably sized
- Clean up branches after merging

## Commit Message Format
### Commit Types
| Type     | Description                                      |
|----------|--------------------------------------------------|
| feat     | New feature                                      |
| fix      | Bug fix                                          |
| docs     | Documentation                                    |
| style    | Formatting                                       |
| refactor | Code restructuring                               |
| test     | Adding tests                                     |
| chore    | Maintenance                                      |

Example: `feat: add weekly gym session tracking to dashboard`


## Common Issues
- Always pull main before creating feature branch
- Resolve conflicts early
- Don't commit sensitive data
- Keep feature branches short-lived
- Regular commits are better than one big commit

# Direct-to-Main Workflow
For small, safe changes that don't require review or extensive testing.

## 1. Verify Change Type
Confirm your change fits the criteria:
- Documentation updates
- Typo fixes
- Small, obvious fixes
- Changes you can instantly verify
- No risk of breaking functionality

## 2. Make Changes
- Make your changes
- Test/verify immediately
- Keep changes focused and minimal

## 3. Check Status
```bash
# See what files changed
git status

# Optionally review changes
git diff
```

## 4. Stage and Commit
```bash
# Stage changes
git add specific-file.md
# or
git add .  # if you're confident about all changes

# Commit with descriptive message
git commit -m "docs: add branch creation guidelines to workflow guide"
```

## 5. Pull Before Push
```bash
# Get any remote changes first
git pull

# If there are conflicts:
# 1. Resolve conflicts
# 2. Test again
# 3. Commit conflict resolution
```

## 6. Push to Main
```bash
git push
```

## Best Practices for Direct Changes
- Double-check you're on main: `git branch`
- Always pull before pushing
- Keep changes small and focused
- If in doubt, use a feature branch instead
- Verify changes immediately after push
- Use appropriate commit type (docs, style, etc.)

## Example Use Cases
- Updating README
- Fixing documentation typos
- Updating comments in code
- Minor formatting fixes
- Adding development guides (like this one!)