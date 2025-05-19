import React from 'react';

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Unlocking the Power of Your Subconscious Mind</h1>

      <p style={styles.paragraph}>
        Most people don’t realize it, but the subconscious mind runs the show. It’s the silent force
        behind your habits, beliefs, fears, and daily decisions. While your conscious mind handles
        logic and short-term thinking, your subconscious is like a supercomputer working in the
        background, constantly processing information, shaping your reality, and influencing your
        behavior — whether you know it or not.
      </p>

      <h2 style={styles.subtitle}>What Is the Subconscious Mind?</h2>
      <p style={styles.paragraph}>
        The subconscious mind is the mental space where everything you've seen, felt, and
        experienced is stored — even the things you don’t consciously remember. Unlike your conscious
        mind, which is rational and analytical, the subconscious is instinctual, emotional, and
        deeply responsive to repetition and imagery. It doesn’t distinguish between what’s real and
        imagined. It simply accepts whatever it's fed — through language, behavior, trauma, and
        routine.
      </p>

      <p style={styles.paragraph}>
        It’s why people often find themselves stuck in loops — repeating the same relationship
        patterns, making the same mistakes, or holding back when they logically want to move forward.
        Your subconscious programming creates your default operating system. If you never update it,
        you’ll keep running on outdated code.
      </p>

      <h2 style={styles.subtitle}>Why the Subconscious Mind Matters</h2>
      <p style={styles.paragraph}>
        Research suggests that up to 95% of your daily actions and decisions are driven by the
        subconscious mind. That means only 5% of your day is being steered by your conscious,
        rational self. If you're struggling with procrastination, anxiety, self-sabotage, or limiting
        beliefs, it's not a character flaw — it's subconscious conditioning at play.
      </p>

      <p style={styles.paragraph}>
        This is both the bad news and the good news. The bad news: you're not in control as much as
        you think. The good news: once you understand how the subconscious works, you can actively
        reprogram it and change your life from the inside out.
      </p>

      <h2 style={styles.subtitle}>How to Reprogram Your Subconscious Mind</h2>
      <p style={styles.paragraph}>
        Rewiring your subconscious isn’t about force — it’s about influence. It takes repetition,
        clarity, and emotion. Here are a few powerful methods:
      </p>
      <ul style={styles.list}>
        <li>
          <strong>Affirmations:</strong> Repeating positive, present-tense statements like
          “I am confident,” “I am in control,” or “I deserve success” can begin to overwrite
          old negative beliefs.
        </li>
        <li>
          <strong>Visualization:</strong> The subconscious responds powerfully to images. Spend 5–10
          minutes daily visualizing the life you want to live. The clearer and more emotional the
          imagery, the more effective it becomes.
        </li>
        <li>
          <strong>Meditation:</strong> This helps slow down your brainwaves and quiet the conscious
          mind. In this relaxed state, the subconscious becomes more open to suggestion and insight.
        </li>
        <li>
          <strong>Journaling:</strong> Writing uncovers hidden thought patterns and brings awareness
          to what’s been running beneath the surface. This awareness is the first step to change.
        </li>
        <li>
          <strong>Environment:</strong> Your subconscious is shaped by your surroundings — the
          people you interact with, the media you consume, and the habits you reinforce. Align your
          environment with the reality you want to live.
        </li>
      </ul>

      <h2 style={styles.subtitle}>Final Thoughts</h2>
      <p style={styles.paragraph}>
        Your subconscious mind isn’t your enemy — it’s your autopilot. But if you never take control
        of what’s being programmed into it, you’ll live on default, stuck in patterns that don’t
        serve you. The moment you start feeding it new beliefs, habits, and images of the life you
        actually want, everything begins to shift.
      </p>

      <p style={styles.paragraph}>
        You are not a prisoner of your past. You are the architect of your mind. And when you
        reprogram the subconscious, your external reality starts to match the internal changes
        you’ve made.
      </p>

      <p style={styles.paragraph}>
        The process takes consistency and patience — but the payoff is massive. You’ll think
        differently, feel differently, and most importantly, you’ll act differently. And that’s how
        real transformation happens — from the inside out.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.7,
    color: '#2c2c2c',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#111',
  },
  subtitle: {
    fontSize: '1.75rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#222',
  },
  paragraph: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
  list: {
    paddingLeft: '1.5rem',
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
};

export default App;