export function getYoutubeEmbedUrl(url: string | null): string | null {
    if (!url) return null;

    const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]{11})/;

    const match = url.match(regExp);

    return match
        ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
        : null;
}