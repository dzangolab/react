FROM node:16-alpine as base

RUN apk add --update --no-cache git

WORKDIR /var/workspace

RUN npm install -g pnpm@8 \
  && pnpm config set store-dir .pnpm-store

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY turbo.json turbo.json
COPY apps/demo/package.json apps/demo/package.json
# COPY libs/core/package.json libs/core/package.json

RUN pnpm install --frozen-lockfile

FROM base as build
ARG api_base_url=''
ARG app_build=''
ARG app_title='Dzangolab React Demo'
ARG app_version='0.1.0'
ARG feature_show_version=1
ARG locale_storage_namespace='demo-react__'

ENV VITE_API_BASE_URL $api_base_url
ENV VITE_APP_BUILD $app_build
ENV VITE_APP_TITLE $app_title
ENV VITE_APP_VERSION $app_version
ENV VITE_FEATURE_SHOW_VERSION $feature_show_version
ENV VITE_LOCALE_STORAGE_NAMESPACE $locale_storage_namespace

WORKDIR /var/workspace

COPY apps/ apps/
# COPY libs/core libs/core

RUN pnpm install -r --frozen-lockfile --ignore-scripts \
  && pnpm --filter "@dzangolab/demo-..." build

FROM nginx:1.26-alpine as production

COPY apps/demo/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /var/workspace/apps/demo/dist /usr/share/nginx/html
