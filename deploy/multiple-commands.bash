# cd into right dir
cd ~/dhbw-richie

# Pull new changes on master
git checkout master && git pull

# cd into backend folder
cd backend

# install dependencies
npm install

# Build and run production stuff
pm2 start npm --name "DHBW-Richie Backend" -- run start:prod # Will build because of prestart skript
