FROM node:16

COPY sources.list /etc/apt/sources.list

ARG USERNAME=node

RUN apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# RUN npm install lerna --location=global
# RUN chown -R $USERNAME /data
USER $USERNAME
# RUN yarn install && npm run bootstrap && \
    # tar -czf dep.tar.gz ./node_modules