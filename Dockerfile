FROM arm32v7/node:11.2

# Commands will run in this directory
WORKDIR /usr/src/app
# Copy source code to image
COPY . .

# Install dependencies
RUN cd client && \
    yarn install && \
    cd .. &&\
    \
    yarn install

# Install dependencies
RUN cd client && \
    yarn build && \
    cd .. &&\
    \
    yarn build

ENV NODE_ENV production

# Build app and start server from script
CMD ["yarn", "start"]