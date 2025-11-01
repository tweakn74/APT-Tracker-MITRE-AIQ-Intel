# Contributing to APT Tracker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (browser, OS, etc.)
   - Screenshots if applicable

### Suggesting Features

1. Check [Discussions](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/discussions) for similar ideas
2. Create a new discussion with:
   - Clear use case
   - Proposed solution
   - Alternatives considered
   - Impact on existing functionality

### Adding New Feed Sources

To add a new threat intelligence feed:

1. Verify the source is:
   - Reputable and authoritative
   - Regularly updated
   - Publicly accessible
   - Relevant to threat intelligence

2. Test the feed:

   ```bash
   curl -I https://example.com/feed.xml
   ```

3. Add to `DEFAULT_FEEDS` in `wrangler.toml`

4. Submit a PR with:
   - Source name and URL
   - Brief description
   - Why it's valuable

### Code Contributions

#### Setup Development Environment

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/APT-Tracker-MITRE-AIQ-Intel.git
cd APT-Tracker-MITRE-AIQ-Intel

# Install dependencies
npm install

# Create a branch
git checkout -b feature/your-feature-name
```

#### Development Workflow

1. **Write Code**
   - Follow existing code style
   - Add comments for complex logic
   - Keep functions small and focused

2. **Write Tests**
   - Add tests for new functionality
   - Ensure existing tests still pass
   - Aim for high coverage

3. **Run Checks**

   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

4. **Test Locally**

   ```bash
   npm run dev
   # Test at http://localhost:8787
   ```

5. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `test:` - Tests
   - `refactor:` - Code refactoring
   - `chore:` - Maintenance

6. **Push and Create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub.

#### Pull Request Guidelines

- **Title:** Clear and descriptive
- **Description:**
  - What changes were made
  - Why they were made
  - How to test them
- **Tests:** All tests must pass
- **Documentation:** Update README if needed
- **Size:** Keep PRs focused and reasonably sized

### Code Style

#### JavaScript

- Use ES6+ features
- Prefer `const` over `let`
- Use async/await over promises
- Add JSDoc comments for functions
- Keep lines under 100 characters

Example:

```javascript
/**
 * Extract tags from text
 * @param {string} text - Text to analyze
 * @returns {string[]} Array of tags
 */
export function extractTags(text) {
  const tags = new Set();
  // Implementation...
  return Array.from(tags);
}
```

#### HTML/CSS

- Use semantic HTML
- Follow BEM naming for CSS classes
- Ensure accessibility (ARIA labels, keyboard nav)
- Mobile-first responsive design

#### Testing

- Test file names: `*.test.js`
- Use descriptive test names
- Test edge cases
- Mock external dependencies

Example:

```javascript
test('extractTags - should extract CVE identifiers', () => {
  const text = 'Critical vulnerability CVE-2024-1234';
  const tags = extractTags(text);
  assert.ok(tags.includes('CVE-2024-1234'));
});
```

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update API documentation for endpoint changes
- Include examples where helpful

### Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainer directly
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Performance

- Minimize API calls
- Use caching where appropriate
- Avoid blocking operations
- Test with realistic data volumes

### Accessibility

- Use semantic HTML
- Include ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Review Process

1. **Automated Checks**
   - Linting
   - Type checking
   - Tests
   - Build

2. **Code Review**
   - Maintainer reviews code
   - Feedback provided
   - Changes requested if needed

3. **Merge**
   - Once approved, PR is merged
   - Automatic deployment to production

## Getting Help

- **Questions:** Use [Discussions](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/discussions)
- **Bugs:** Use [Issues](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/issues)
- **Chat:** (Add Discord/Slack if available)

## Recognition

Contributors will be:

- Listed in README.md
- Mentioned in release notes
- Credited in commit history

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to APT Tracker! 🛡️
