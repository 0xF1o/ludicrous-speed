# LudicrousSpeed

A tiny RSVP speed reader. One HTML file, no dependencies, no build step.

Open `index.html` in a browser — that's it.

Or serve it with Docker (port 8731):

```sh
docker compose up -d     # http://localhost:8731
docker compose down
```

The compose file mounts this folder read-only into `nginx:alpine`, so edits are live after a refresh.

## What it does

Paste text or load a `.txt`/`.md` file (or drop it on the page), then read one word at a time. The highlighted letter is the **optimal recognition point (ORP)**; it stays fixed at the screen centre so your eyes never move.

## Controls

| Action | How |
| --- | --- |
| Play / pause | Space or the round button |
| Skip word | ← / → |
| Speed ±20 wpm | ↑ / ↓ or the Speed slider |
| Restart | R |
| Start reading | Ctrl/Cmd + Enter |
| Seek | Click the progress bar |
| Text size | Size slider |
| Theme | Header toggle: auto → light → dark |
| Edit text | "Edit text" button |

Pauses are longer after sentence ends, commas, paragraphs and long words. Speed, text size, theme and the last text are remembered in `localStorage`.

## Theme

By default the theme follows your OS light/dark setting and switches live when you change it
(the half-filled button with a dashed border means *auto*). Click it to force light or dark;
that choice is stored and wins until you click back to auto.
