FROM mcr.microsoft.com/vscode/devcontainers/typescript-node

#All initial commands could be added here
RUN apt update && apt install -y openssl procps

# Used to persist bash history as per https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir ~/commandhistory \
  && touch ~/commandhistory/.bash_history \
  && chown -R root ~/commandhistory \
  && echo "$SNIPPET" >> "/home/node/.bashrc"

# install jless (because its not available at https://containers.dev/features at time of writing)
RUN NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
  && (echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/node/.profile \
  && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
  && brew install jless

#non root user
USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

#COPY .docker/scripts/start-dev.sh .docker/scripts

#COPY package.json package-lock.json /home/node/app/

#CMD [ "tail", "-f", "/dev/null" ]
CMD [ "/home/node/app/.docker/scripts/start-dev.sh" ]