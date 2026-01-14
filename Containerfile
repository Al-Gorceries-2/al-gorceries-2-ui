FROM node:22 as builder

WORKDIR /app

ARG VITE_AL_GORCERIES_2_API_URL
ENV VITE_AL_GORCERIES_2_API_URL=${VITE_AL_GORCERIES_2_API_URL}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
