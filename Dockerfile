FROM 'node:latest'
WORKDIR /app
COPY src .sequelizerc package.json tsconfig.json tslint.json ./
RUN "npm i -g yarn && yarn && yarn start"
EXPOSE ${PORT}