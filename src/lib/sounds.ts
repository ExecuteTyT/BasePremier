export type SoundName = "hover" | "click" | "success";

const SOUND_URLS: Record<SoundName, string> = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
};

type Sound = { play: () => void };

function createSound(url: string): Sound {
  let audio: HTMLAudioElement | null = null;
  return {
    play() {
      if (typeof window === "undefined") return;
      if (!audio) {
        audio = new Audio(url);
        audio.volume = 0.35;
      }
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
  };
}

const sounds: Record<SoundName, Sound> = {
  hover: createSound(SOUND_URLS.hover),
  click: createSound(SOUND_URLS.click),
  success: createSound(SOUND_URLS.success),
};

export function playSound(name: SoundName, muted: boolean): void {
  if (muted) return;
  sounds[name].play();
}
