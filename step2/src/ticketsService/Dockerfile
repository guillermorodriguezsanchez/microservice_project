    FROM node:19.0.0
    
    RUN mkdir -p /usr/src/ticket
    
    COPY  package*.json ./
    
    RUN npm install 
    
    COPY . .
    
    EXPOSE 3000

    CMD ["npm", "run","serve"]

