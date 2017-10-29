MONGO_HOST=127.0.0.1
MONGO_PORT=12345
MONGO_BASE=pornselecta
MONGO_PATH=backend/database
MONGODB_URL=mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_BASE}

export MONGO_HOST
export MONGO_PORT
export MONGO_BASE
export MONGODB_URL

BACKEND_PORT=8120
BACKEND_HOST=127.0.0.1

export BACKEND_PORT
export BACKEND_HOST
export BACKEND_URL

##############################

run:
	node backend/main.js

