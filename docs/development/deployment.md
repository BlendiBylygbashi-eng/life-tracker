# Deployment Guide

## Production Build

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

3. **Environment Variables**
   - Set production environment variables
   - Ensure database connection string is correct
   - Configure any external services

## Deployment Options

### Vercel (Recommended)
1. Connect to GitHub repository
2. Configure environment variables
3. Deploy with automatic builds

### Manual Deployment
1. **Server Requirements**
   - Node.js 16.x+
   - SQLite or other database
   - PM2 or similar process manager

2. **Setup Steps**
   ```bash
   npm install --production
   npm run build
   npm start
   ```

## Post-Deployment

### Monitoring
- Check application logs
- Monitor database performance
- Track error rates

### Maintenance
- Regular database backups
- Update dependencies
- Monitor security advisories
