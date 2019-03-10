function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image(100, 100)
        img.onload = () => res(img)
        img.src = src
    })
}

function loadSound(src: string): Promise<HTMLAudioElement> {
    return new Promise<HTMLAudioElement>((res, rej) => {
        const audio = new Audio(src)
        audio.onload = () => res(audio)
        audio.load()
    })
}

export { loadImage, loadSound }