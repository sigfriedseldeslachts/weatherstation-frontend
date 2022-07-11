FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# Copy app
COPY . /usr/src/nuxt-app/

# Update and install
RUN yarn && \
  yarn build && \
  rm -rf /usr/src/nuxt-app/node_modules && \
  yarn install --production && \
  yarn cache clean

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["yarn", "start"]
