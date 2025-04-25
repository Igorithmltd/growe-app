// /lib/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./app/api/**/*.ts'], // Adjust if your routes are elsewhere
});
