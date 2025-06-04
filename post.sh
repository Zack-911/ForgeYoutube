#!/bin/bash

curl -X POST http://localhost:8084/channelUpload \
  -H "Content-Type: application/json" \
  -d '{
    "channelId": "UC123456789",
    "videoId": "dQw4w9WgXcQ"
  }'
