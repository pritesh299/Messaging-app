#Base image 
FROM node:22-alpine

# Working directry
WORKDIR /app

# Copy over file 
COPY . .

# Run commands to build the code 
RUN npm install
RUN npm run build 
RUN npx prisma generate 


# env variable adding

# Exports port 
EXPOSE 3000

# Final command that runs while running the container 
CMD ["npm" , "start"]
