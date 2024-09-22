// services/uploadService.js
const axios = require('axios');
const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const path = require('path');
require('dotenv').config();

const imgurClientId = process.env.IMGUR_CLIENT_ID;
const youtubeClientId = process.env.YOUTUBE_CLIENT_ID;
const youtubeClientSecret = process.env.YOUTUBE_CLIENT_SECRET;
const youtubeRedirectUri = process.env.YOUTUBE_REDIRECT_URI;

// Upload Image to Imgur
exports.uploadImage = async (filePath) => {
  try {
    const imageData = fs.readFileSync(filePath, 'base64');
    const response = await axios.post('https://api.imgur.com/3/image', {
      image: imageData,
      type: 'base64',
    }, {
      headers: {
        Authorization: `Client-ID ${imgurClientId}`,
      },
    });

    fs.unlinkSync(filePath); // Remove file after upload
    return response.data.data.link; // Return Imgur link
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

// Upload Video to YouTube
exports.uploadVideo = async (filePath) => {
  try {
    const oauth2Client = new OAuth2(
      youtubeClientId,
      youtubeClientSecret,
      youtubeRedirectUri
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN, // Set your refresh token here
    });

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    const videoResponse = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: path.basename(filePath),
          description: 'Video upload',
          tags: ['test', 'upload'],
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: fs.createReadStream(filePath),
      },
    });

    fs.unlinkSync(filePath); // Remove file after upload
    return `https://youtu.be/${videoResponse.data.id}`; // Return YouTube link
  } catch (error) {
    throw new Error('Video upload failed');
  }
};
