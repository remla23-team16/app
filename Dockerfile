FROM node:18-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN ls
RUN ./node_modules/.bin/svelte-kit sync
RUN npm run build
ENV PORT=3000
ENV BACKEND_URL=http://localhost:8080
EXPOSE $PORT
CMD ["node", "build/index.js"]
