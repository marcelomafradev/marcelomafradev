declare namespace NodeJS {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
    SPOTIFY_FAVORITE_SONGS_LIMIT: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    DATABASE_URL: string;
    AUTH_SECRET: string;
  }
}
