export async function fetchMusicData() {
    try {
        const response = await fetch(
            "https://openmusic-fake-api.onrender.com/api/musics"
        );
        const musics = await response.json(); 
        if(musics !== null) {
            return musics; 

        } else {
            return null; 
        }
    } catch (error) {
        throw error; 
    }
}