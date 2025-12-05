FROM node:18-alpine

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY prisma ./prisma

RUN npx prisma generate



COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
