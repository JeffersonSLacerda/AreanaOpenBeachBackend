FROM mcr.microsoft.com/vscode/devcontainers/typescript-node

#All initial commands could be added here
RUN apt update && apt install -y openssl procps

RUN mkdir -p /home/node/app \ 
  && chown -R node:node /home/node/app \
  && mkdir -p /home/node/app/node_modules \ 
  && chown -R node:node /home/node/app/node_modules

WORKDIR /home/node/app

ARG USERNAME=node

#non root user
USER node

# Used to persist bash history as per https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.zsh_history" \
  && echo "create zsh history volume" \
  && mkdir ~/commandhistory \
  && touch ~/commandhistory/.zsh_history \
  && chown -R $USERNAME ~/commandhistory \
  && echo "$SNIPPET" >> "/home/node/.zshrc"

# install jless (because its not available at https://containers.dev/features at time of writing)
RUN NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
  && (echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/node/.profile \
  && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
  && brew install jless

#COPY .docker/scripts/start-dev.sh .docker/scripts

#COPY package.json package-lock.json /home/node/app/

#CMD [ "tail", "-f", "/dev/null" ]
CMD [ "/home/node/app/.docker/scripts/start-dev.sh" ]