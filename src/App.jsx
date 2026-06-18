import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Award, RotateCcw, Compass, ChevronRight, Play } from 'lucide-react';
import { storyData } from './data/storyData';
import VisualPanel from './components/VisualPanel';
import EndingArchive from './components/EndingArchive';
import { audioSynth } from './utils/audioSynth';

const App = () => {
  // 1. State Hooks
  const [currentSceneId, setCurrentSceneId] = useState('scene-start');
  const [history, setHistory] = useState(['scene-start']);
  const [unlockedEndings, setUnlockedEndings] = useState(() => {
    try {
      const saved = localStorage.getItem('unlockedEndings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('soundEnabled') === 'true';
  });
  const [showArchive, setShowArchive] = useState(false);
  const [currentEndingSceneIndex, setCurrentEndingSceneIndex] = useState(null);
  const [timeDisplay, setTimeDisplay] = useState('12:00');

  // 2. Real-time Status Bar Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTimeDisplay(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Audio Control Synchronizer
  useEffect(() => {
    if (!soundEnabled) {
      audioSynth.stopAll();
      return;
    }

    // Stop all first to reset tracks
    audioSynth.stopAll();

    // Map scene and ending state to synthesizers
    if (currentSceneId === 'scene-start') {
      audioSynth.startFactory();
    } else if (currentSceneId === 'scene-road-big' || currentSceneId === 'scene-bypass-big' || currentSceneId === 'scene-valley') {
      audioSynth.startWind();
    } else if (currentSceneId === 'scene-road-forest' || currentSceneId === 'scene-stone') {
      audioSynth.startClock();
    } else if (currentSceneId === 'scene-chase') {
      audioSynth.startBoiling();
    } else if (currentSceneId === 'ending-a1') {
      audioSynth.startBoiling();
    } else if (currentSceneId === 'ending-b1') {
      if (currentEndingSceneIndex === 3) {
        // Trigger synchronized gunshot sound effect on Ending B-1 Scene 4!
        audioSynth.playGunshot();
      }
      audioSynth.startWind();
    } else if (currentSceneId === 'ending-b2' || currentSceneId === 'ending-b3' || currentSceneId === 'ending-c1') {
      audioSynth.startWind();
    }

    return () => audioSynth.stopAll();
  }, [currentSceneId, currentEndingSceneIndex, soundEnabled]);

  // 4. Choice & Transition Handlers
  const handleChoice = (nextSceneId) => {
    setCurrentSceneId(nextSceneId);
    setHistory(prev => [...prev, nextSceneId]);
    
    const nextScene = storyData[nextSceneId];
    if (nextScene && nextScene.type === 'ending') {
      setCurrentEndingSceneIndex(0);
      // Log ending unlock
      setUnlockedEndings(prev => {
        if (!prev.includes(nextSceneId)) {
          const updated = [...prev, nextSceneId];
          localStorage.setItem('unlockedEndings', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    } else {
      setCurrentEndingSceneIndex(null);
    }
  };

  const handleNextEndingScene = (scenesLength) => {
    if (currentEndingSceneIndex < scenesLength - 1) {
      setCurrentEndingSceneIndex(prev => prev + 1);
      // Scroll text content back to top
      const scrollArea = document.getElementById('scroll-container');
      if (scrollArea) scrollArea.scrollTop = 0;
    } else {
      // Completed ending, go back to start
      handleReset();
    }
  };

  const handleReset = () => {
    setCurrentSceneId('scene-start');
    setHistory(['scene-start']);
    setCurrentEndingSceneIndex(null);
    const scrollArea = document.getElementById('scroll-container');
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('soundEnabled', String(next));
      return next;
    });
  };

  const handleSelectEndingFromArchive = (endingId) => {
    setCurrentSceneId(endingId);
    setCurrentEndingSceneIndex(0);
    setShowArchive(false);
    setHistory(prev => [...prev, endingId]);
    const scrollArea = document.getElementById('scroll-container');
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // Get current scene/ending data
  const scene = storyData[currentSceneId];
  if (!scene) return null;

  const isEnding = scene.type === 'ending';
  const currentEndingScene = isEnding && scene.scenes ? scene.scenes[currentEndingSceneIndex] : null;

  return (
    <div className="app-container">
      <div className="phone-frame">
        {/* 모바일 상태 표시줄 */}
        <div className="status-bar">
          <span className="brand-title">紅緞 (홍단)</span>
          <span className="status-time">{timeDisplay}</span>
        </div>

        {/* 상단 액션 바 */}
        <header className="app-header">
          <button className="reset-btn" onClick={handleReset} title="처음부터 다시 시작">
            <RotateCcw size={16} />
            <span>처음으로</span>
          </button>
          
          <h1 className="header-title">붉은 댕기 소녀</h1>
          
          <div className="header-actions">
            <button className="audio-toggle" onClick={toggleSound} title={soundEnabled ? '음소거' : '소리 켜기'}>
              {soundEnabled ? <Volume2 size={18} className="pulse-icon" /> : <VolumeX size={18} />}
            </button>
            <button className="archive-toggle" onClick={() => setShowArchive(true)} title="잠금 해제 엔딩 보관함">
              <Award size={18} />
              {unlockedEndings.length > 0 && <span className="archive-badge">{unlockedEndings.length}</span>}
            </button>
          </div>
        </header>

        {/* 인터랙티브 스토리 콘텐츠 프레임 */}
        <main className="content-area" id="scroll-container">
          {/* 비주얼 일러스트 패널 */}
          <VisualPanel image={scene.image} title={scene.title} />

          {/* 비주얼 가이드 연출 큐 */}
          <div className="visual-cue">
            <div className="cue-dot" />
            <p>{scene.visualCue}</p>
          </div>

          {/* 사운드 연출 안내 가이드 */}
          {soundEnabled && (
            <div className="sound-indicator">
              <span className="sound-wave">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="sound-text">{scene.sound}</span>
            </div>
          )}

          {/* 스토리 텍스트 렌더러 */}
          <div className="story-text-container">
            {isEnding ? (
              <div className="ending-layout">
                <div className="ending-intro">
                  <span className="ending-badge-large">{scene.badge}</span>
                  <h2 className="ending-title">{scene.title}</h2>
                </div>

                {currentEndingScene && (
                  <div className="ending-scene-block animate-fade-up">
                    <h3 className="ending-scene-subtitle">{currentEndingScene.subtitle}</h3>
                    <p className="novel-paragraph">{currentEndingScene.text}</p>
                  </div>
                )}

                <div className="ending-nav">
                  <button 
                    className="next-scene-btn" 
                    onClick={() => handleNextEndingScene(scene.scenes.length)}
                  >
                    <span>
                      {currentEndingSceneIndex === scene.scenes.length - 1 
                        ? '스토리 완료 (처음으로)' 
                        : `다음 장면 읽기 (${currentEndingSceneIndex + 1}/${scene.scenes.length})`}
                    </span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="novel-layout animate-fade-up">
                <h2 className="novel-scene-title">{scene.title}</h2>
                {scene.paragraphs.map((p, idx) => (
                  <p key={idx} className="novel-paragraph">{p}</p>
                ))}

                {/* 선택 분기 단락 */}
                <div className="choices-section">
                  <span className="section-label">운명의 방향을 선택하세요</span>
                  <div className="choices-grid">
                    {scene.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        className="choice-button"
                        onClick={() => handleChoice(choice.nextScene)}
                      >
                        <span className="choice-num-tag">{choice.label}</span>
                        <p className="choice-text">{choice.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 잠금 해제 업적 아카이브 오버레이 모달 */}
      {showArchive && (
        <EndingArchive
          unlockedEndings={unlockedEndings}
          onClose={() => setShowArchive(false)}
          onSelectEnding={handleSelectEndingFromArchive}
        />
      )}
    </div>
  );
};

export default App;
