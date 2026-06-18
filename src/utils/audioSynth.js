// Web Audio API Synthesizer for high-fidelity self-contained sound effects
// Works offline, no network latency, zero external asset dependencies!

let audioCtx = null;

// Node references
let windNode = null;
let boilingNode = null;
let factoryNode = null;
let clockInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper: Create a buffer filled with white noise
function createNoiseBuffer(ctx, duration = 2) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export const audioSynth = {
  // 1. Wind (스산한 산바람 소리)
  startWind() {
    try {
      this.stopWind();
      const ctx = getAudioContext();
      
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 3);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.value = 0.12;

      // LFO to modulate filter frequency (simulates gusty wind)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08; // slow gusts
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 250; // sweep range in Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start();
      noise.start();

      windNode = { noise, lfo, gain, filter };
    } catch (e) {
      console.warn("Failed to play synthesized wind:", e);
    }
  },

  stopWind() {
    if (windNode) {
      try {
        windNode.noise.stop();
        windNode.lfo.stop();
      } catch (e) {}
      windNode = null;
    }
  },

  // 2. Boiling (한약 다려지는 부글부글 끓는 소리)
  startBoiling() {
    try {
      this.stopBoiling();
      const ctx = getAudioContext();

      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 1.5);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 220;
      filter.Q.value = 4.0;

      const gain = ctx.createGain();
      gain.gain.value = 0.08;

      // LFO to simulate random water bubbling gain/frequency modulation
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 3.5; // Bubble frequency

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04;

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain); // modulate volume

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start();
      noise.start();

      boilingNode = { noise, lfo, gain };
    } catch (e) {
      console.warn("Failed to play synthesized boiling:", e);
    }
  },

  stopBoiling() {
    if (boilingNode) {
      try {
        boilingNode.noise.stop();
        boilingNode.lfo.stop();
      } catch (e) {}
      boilingNode = null;
    }
  },

  // 3. Factory (덜커덩거리는 기계 굉음)
  startFactory() {
    try {
      this.stopFactory();
      const ctx = getAudioContext();

      // Low frequency rumble hum
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 55; // Low A hum

      const oscFilter = ctx.createBiquadFilter();
      oscFilter.type = 'lowpass';
      oscFilter.frequency.value = 120;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.05;

      osc.connect(oscFilter);
      oscFilter.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();

      // Rhythmic machinery thumping
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 1.0);
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 180;
      noiseFilter.Q.value = 2.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.0;

      // Modulate gain rhythmically (thump thump...)
      const pulseLfo = ctx.createOscillator();
      pulseLfo.type = 'square';
      pulseLfo.frequency.value = 1.25; // 75 BPM rhythm

      const pulseGain = ctx.createGain();
      pulseGain.gain.value = 0.07;

      pulseLfo.connect(pulseGain);
      pulseGain.connect(noiseGain.gain);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      pulseLfo.start();
      noise.start();

      factoryNode = { osc, noise, pulseLfo, oscGain, noiseGain };
    } catch (e) {
      console.warn("Failed to play synthesized factory:", e);
    }
  },

  stopFactory() {
    if (factoryNode) {
      try {
        factoryNode.osc.stop();
        factoryNode.noise.stop();
        factoryNode.pulseLfo.stop();
      } catch (e) {}
      factoryNode = null;
    }
  },

  // 4. Clock (회중시계 초침 소리 째깍째깍)
  startClock() {
    try {
      this.stopClock();
      const ctx = getAudioContext();

      const tick = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);

        filter.type = 'highpass';
        filter.frequency.value = 800;

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      };

      // Play once immediately
      tick();
      clockInterval = setInterval(tick, 1000);
    } catch (e) {
      console.warn("Failed to start clock ticks:", e);
    }
  },

  stopClock() {
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
    }
  },

  // 5. Gunshot (탕-! 화승총 격발 효과음)
  playGunshot() {
    try {
      const ctx = getAudioContext();

      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 2.0);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Failed to play synthesized gunshot:", e);
    }
  },

  stopAll() {
    this.stopWind();
    this.stopBoiling();
    this.stopFactory();
    this.stopClock();
  }
};
