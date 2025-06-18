# ForgeYoutube Functions

## Get

### $downloadVideoFromUrl (v1.0.1)
Downloads a video file from a direct URL with custom filename and path.

**Arguments:**

- `url` (String, required) - Direct video file URL (e.g. https://domain.com/video)
- `path` (String, required) - Subdirectory to save in (relative to project root)
- `filename` (String, required) - Name of the file to save as (no extension)

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $youtubeStreamLink (v1.0.0)
Returns the direct video stream URL for a given YouTube video ID.

**Arguments:**

- `videoId` (String, required) - YouTube video ID (e.g., dQw4w9WgXcQ)

**Returns:** `String`
**Brackets:** `true`
**Unwrap:** `true`

### $getLatestVideo (v1.0.3)
Gets the most recent video from a YouTube channel.

**Arguments:**

- `channel` (String, required) - Channel ID or handle (e.g. UC... or @username)

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getPlaylistItems (v1.0.0)
Fetches items (videos) from a playlist

**Arguments:**

- `playlistId` (String, required) - YouTube playlist ID
- `limit` (Number, optional) - Maximum number of items to return

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getMusicLyrics (v1.0.0)
Fetches lyrics for a YouTube Music track (video ID)

**Arguments:**

- `videoId` (String, required) - YouTube Music video ID

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

## Info

### $extractVideoID (v1.0.0)
Extracts a YouTube video ID from a URL or string.

**Arguments:**

- `input` (String, required) - YouTube URL or video ID

**Returns:** `String`
**Brackets:** `true`
**Unwrap:** `true`

### $getVideoCaptions (v1.1.0)
Returns the available captions/subtitles for a YouTube video by its ID.

**Arguments:**

- `videoID` (String, required) - The ID of the YouTube video

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getChannelInfo (v1.0.0)
Gets info about a YouTube channel by ID or handle.

**Arguments:**

- `identifier` (String, required) - Channel ID or handle (e.g. UC... or @username)

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getComments (v1.0.0)
Fetches top-level comments for a video

**Arguments:**

- `videoId` (String, required) - YouTube video ID
- `limit` (Number, optional) - Number of comments to return

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getVideoEngagement (v1.0.0)
Returns basic engagement stats for a YouTube video (views, likes, comments)

**Arguments:**

- `videoId` (String, required) - YouTube video ID

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $getVideoStats (v1.1.0)
Returns views, likes, comments count for a video

**Arguments:**

- `videoID` (String, required) - The ID of the YouTube video

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

## Search

### $youtubeChannelSearch (v1.0.0)
Searches YouTube and returns the top channels in JSON format.

**Arguments:**

- `query` (String, required) - The search query to look up on YouTube
- `limit` (Number, optional) - Number of channels to return (default 5)
- `sortBy` (String, optional) - Sort results by: relevance, rating, upload_date, view_count

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $ytMusicSearch (v1.0.0)
Searches YouTube Music and returns top songs.

**Arguments:**

- `query` (String, required) - Query to search on YouTube Music
- `limit` (Number, optional) - Number of songs to return (default 5)

**Returns:** `String`
**Brackets:** `true`
**Unwrap:** `true`

### $youtubePlaylistSearch (v1.1.0)
Searches YouTube and returns the top playlists in JSON format. Supports filters.

**Arguments:**

- `query` (String, required) - The search query to look up on YouTube
- `limit` (Number, optional) - Number of playlists to return (default: 5)
- `uploadDate` (String, optional) - Upload date filter: all, hour, today, week, month, year
- `duration` (String, optional) - Video duration filter: all, short, medium, long
- `sortBy` (String, optional) - Sort results by: relevance, rating, upload_date, view_count
- `features` (String, optional) - Comma-separated features: hd, subtitles, 4k, live, etc.

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

### $youtubeVideoSearch (v1.0.1)
Searches YouTube and returns the top videos in JSON format with execution time. Supports filters.

**Arguments:**

- `query` (String, required) - The search query to look up on YouTube
- `limit` (Number, optional) - Maximum number of videos to return (default 5, max 25)
- `uploadDate` (String, optional) - Upload date filter: all, hour, today, week, month, year
- `duration` (String, optional) - Video duration filter: all, short, medium, long
- `sortBy` (String, optional) - Sort results by: relevance, rating, upload_date, view_count
- `features` (String, optional) - Comma-separated features: hd, subtitles, 4k, live, etc.

**Returns:** `Json`
**Brackets:** `true`
**Unwrap:** `true`

