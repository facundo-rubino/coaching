# Admin System Setup Guide

## Overview

This coaching platform now includes a simple admin system with two types of users:

1. **Regular Users**: Can consume the existing coaching platform
2. **Admin Users**: Have access to the admin panel to manage contact form submissions

## Features

### For Admins:
- View, search, and filter contact form submissions
- Update contact status (new → read → replied)
- Delete unwanted contact submissions
- Pagination for large datasets
- Email integration for replying to contacts

### For Developers:
- As the developer, you can create additional admin users by running the creation script
- Manage the database directly for advanced user management

## Setup Instructions

### 1. Environment Variables

Make sure your `.env.local` file contains the following variables:

```bash
# MongoDB Configuration
MONGODB_URI=your-mongodb-connection-string

# Authentication (IMPORTANT: Change these in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production

# Next.js
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Install Dependencies

The following packages have been added:
- `bcryptjs` - Password hashing
- `@types/bcryptjs` - TypeScript types for bcryptjs
- `jsonwebtoken` - JWT token generation/verification
- `@types/jsonwebtoken` - TypeScript types for JWT
- `next-auth` - Authentication framework (for future enhancements)

### 3. Database Models

Two new models have been created:
- `User.ts` - Admin user management
- `Contact.ts` - Already existed, enhanced with better indexing

### 4. Create Your First Admin

Run the following command to create your first admin user:

```bash
npm run create-admin
```

This will create an admin with:
- Email: `admin@coaching.com`
- Password: `admin123`
- Role: `admin`

**IMPORTANT**: Change these credentials immediately after first login!

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Access the Admin Panel

1. Go to `http://localhost:3001/admin/login` (or whatever port Next.js is running on)
2. Login with the admin credentials:
   - Email: `admin@coaching.com`  
   - Password: `admin123`
3. You'll be redirected to the admin dashboard
4. **Important**: Change these credentials immediately after first login!

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout wrapper
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx        # Admin login page
│   │   └── contacts/
│   │       └── page.tsx        # Contact management
│   └── api/
│       └── admin/
│           ├── auth/
│           │   ├── login/route.ts
│           │   ├── logout/route.ts
│           │   └── verify/route.ts
│           └── contacts/route.ts
├── components/
│   ├── admin-auth-provider.tsx # Authentication context
│   └── admin-layout.tsx        # Admin panel layout
├── lib/
│   └── auth.ts                 # Authentication utilities
└── models/
    ├── User.ts                 # Admin user model
    └── Contact.ts              # Contact form model
```

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/verify` - Verify token

### Contacts Management
- `GET /api/admin/contacts` - List contacts (with pagination, search, filters)
- `PATCH /api/admin/contacts` - Update contact status
- `DELETE /api/admin/contacts` - Delete contact

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: Bcrypt with salt rounds for secure password storage
3. **Role-Based Access Control**: Different permission levels for admins and super admins
4. **HTTP-Only Cookies**: Secure token storage
5. **Input Validation**: Server-side validation for all inputs
6. **CSRF Protection**: Built-in protection against cross-site request forgery

## Usage Tips

1. **First Time Setup**: Create an admin user using the provided script
2. **Password Security**: Change default passwords immediately in production
3. **Environment Variables**: Never commit real secrets to version control
4. **Database Backups**: Regularly backup your MongoDB database
5. **HTTPS**: Always use HTTPS in production
6. **Multiple Admins**: Run the create-admin script multiple times with different emails to create more admin users

## Future Enhancements

Consider adding:
- Password reset functionality
- Email notifications for new contacts
- Advanced analytics and reporting
- Bulk operations for contacts
- Content management system
- API rate limiting
- Audit logs for admin actions

## Troubleshooting

### Common Issues:

1. **Can't login**: Check if environment variables are set correctly
2. **Database connection errors**: Verify MongoDB URI in .env.local
3. **Permission denied**: Make sure user has correct role
4. **Token expired**: Clear browser cookies and login again

### Development:

For development debugging:
- Check browser console for client-side errors
- Check terminal output for server-side errors
- Use MongoDB Compass to inspect database directly
- Verify API responses in browser network tab

## Production Deployment

Before deploying to production:

1. Change all default passwords and secrets
2. Set `NODE_ENV=production`
3. Use strong, unique JWT secrets
4. Enable HTTPS
5. Set up proper MongoDB security
6. Configure proper CORS settings
7. Set up monitoring and logging
