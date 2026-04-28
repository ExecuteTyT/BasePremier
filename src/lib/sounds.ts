export type SoundName = "hover" | "click" | "success";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

// Synthesized scissors snip: white noise burst through bandpass filter
function snip(gain = 0.12, freqHz = 5200, duration = 0.07): void {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") void ac.resume();

  const bufSize = Math.ceil(ac.sampleRate * duration);
  const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ac.createBufferSource();
  noise.buffer = buf;

  const bpf = ac.createBiquadFilter();
  bpf.type = "bandpass";
  bpf.frequency.value = freqHz;
  bpf.Q.value = 0.7;

  const vol = ac.createGain();
  const t0 = ac.currentTime;
  vol.gain.setValueAtTime(0, t0);
  vol.gain.linearRampToValueAtTime(gain, t0 + 0.004);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  noise.connect(bpf);
  bpf.connect(vol);
  vol.connect(ac.destination);

  noise.start(t0);
  noise.stop(t0 + duration + 0.01);
}

export function playSound(name: SoundName, muted: boolean): void {
  if (muted || typeof window === "undefined") return;
  try {
    if (name === "hover") {
      // Light, high snip — brief metallic whisper
      snip(0.07, 6000, 0.045);
    } else if (name === "click") {
      // Fuller snip — two blades meeting
      snip(0.13, 4800, 0.06);
      snip(0.08, 7200, 0.04);
    } else if (name === "success") {
      // Satisfying double-snip
      snip(0.1, 5000, 0.06);
      setTimeout(() => snip(0.12, 5500, 0.07), 120);
    }
  } catch {
    // AudioContext not available
  }
}
