FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# Copy app
COPY . /usr/src/nuxt-app/

# Update and install
RUN apk --no-cache upgrade && \
  apk add --no-cache git python3 make g++ && \
  yarn && \
  yarn build && \
  rm -rf /usr/src/nuxt-app/node_modules && \
  yarn install --production && \
  yarn cache clean && \
  apk del git python3 make g++

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["yarn", "start"]
