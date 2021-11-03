FROM 'node:latest'
WORKDIR /app
COPY . .
RUN yarn
EXPOSE ${PORT}
CMD ["yarn", "start"]