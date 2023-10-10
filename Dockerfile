FROM node:18

COPY . ./app

WORKDIR /app

RUN npm install --verbose
RUN npm install -g @nestjs/cli
RUN npm run build

CMD [ "npm", "run", "start:dev" ]