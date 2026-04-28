export type SoundName = "hover" | "click" | "success";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tone(freq: number, gain: number, duration: number, startOffset = 0): void {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") void ac.resume();

  const osc = ac.createOscillator();
  const vol = ac.createGain();
  osc.connect(vol);
  vol.connect(ac.destination);

  osc.type = "sine";
  osc.frequency.value = freq;

  const t0 = ac.currentTime + startOffset;
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(gain, t0 + 0.003);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.start(t0);
  osc.stop(t0 + duration + 0.01);
}

export function playSound(name: SoundName, muted: boolean): void {
  if (muted || typeof window === "undefined") return;
  try {
    if (name === "hover") {
      tone(1100, 0.07, 0.05);
    } else if (name === "click") {
      tone(650, 0.12, 0.08);
    } else if (name === "success") {
      tone(440, 0.12, 0.1, 0);
      tone(554, 0.1, 0.1, 0.1);
    }
  } catch {
    // AudioContext not available in this environment
  }
}
