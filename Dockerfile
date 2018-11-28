FROM node:11.2

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

RUN chmod +x run

# Build app and start server from script
CMD ["/usr/src/app/run"]
