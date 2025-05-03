# Contributing Guidelines

## Code Contribution Process

1. **Fork & Clone**
   - Fork the repository
   - Clone your fork locally

2. **Branch**
   - Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development Guidelines**
   - Follow TypeScript best practices
   - Maintain existing code style
   - Add appropriate comments
   - Update documentation

4. **Commit Messages**
   Follow conventional commits:
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `test:` Tests

5. **Testing**
   - Add tests for new features
   - Ensure all tests pass
   - Check TypeScript compilation

6. **Pull Request**
   - Clear PR description
   - Reference related issues
   - Update documentation

## Code Style Guide

### TypeScript
- Use explicit types
- Avoid `any`
- Document complex functions

### Components
- One component per file
- Use functional components
- Document props with interfaces

### CSS/Styling
- Use Tailwind classes
- Follow mobile-first approach
- Maintain consistent spacing
