import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Award, RotateCcw, Play, ChevronRight } from 'lucide-react';
import { storyData } from './data/storyData';
import VisualPanel from './components/VisualPanel';
import EndingArchive from './components/EndingArchive';
import { audioSynth } from './utils/audioSynth';
import './App.css';

const App = () => {
  // 1. State Hooks
  const [isLanding, setIsLanding] = useState(true);
  const [currentSceneId, setCurrentSceneId] = useState('scene-start');
  const [history, setHistory] = useState(['scene-start']);
  const [unlockedEndings, setUnlockedEndings] = useState(() => {
    try {
      const saved = localStorage.getItem('unlockedEndings_chohogi');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('soundEnabled_chohogi') === 'true';
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

    audioSynth.stopAll();

    if (currentSceneId === 'scene-start') {
      audioSynth.startFactory();
    } else if (currentSceneId === 'scene-build') {
      audioSynth.startClock();
    } else if (currentSceneId === 'scene-scenario') {
      audioSynth.startWind();
    } else if (currentSceneId === 'ending-a1') {
      audioSynth.startBoiling();
    } else if (currentSceneId === 'ending-b1') {
      audioSynth.playGunshot();
    } else if (currentSceneId === 'ending-b2') {
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
      setUnlockedEndings(prev => {
        if (!prev.includes(nextSceneId)) {
          const updated = [...prev, nextSceneId];
          localStorage.setItem('unlockedEndings_chohogi', JSON.stringify(updated));
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
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setIsLanding(true);
    setCurrentSceneId('scene-start');
    setHistory(['scene-start']);
    setCurrentEndingSceneIndex(null);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('soundEnabled_chohogi', String(next));
      return next;
    });
  };

  const handleSelectEndingFromArchive = (endingId) => {
    setIsLanding(false);
    setCurrentSceneId(endingId);
    setCurrentEndingSceneIndex(0);
    setShowArchive(false);
    setHistory(prev => [...prev, endingId]);
  };

  // 5. Scroll Position Reset Hook (Triggered on state update to guarantee DOM is updated)
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-container');
    if (scrollArea) {
      scrollArea.scrollTop = 0;
    }
  }, [currentSceneId, currentEndingSceneIndex, isLanding]);

  const scene = storyData[currentSceneId];
  if (!scene) return null;

  const isEnding = scene.type === 'ending';
  const currentEndingScene = isEnding && scene.scenes ? scene.scenes[currentEndingSceneIndex] : null;

  return (
    <div className="app-container">
      <div className="phone-frame">
        {/* 모바일 상태 표시줄 */}
        <div className="status-bar">
          <span className="brand-title">초호기 (UNIT 01)</span>
          <span className="status-time">{timeDisplay}</span>
        </div>

        {/* 상단 액션 바 */}
        <header className="app-header">
          <button className="reset-btn" onClick={handleReset} title="처음부터 다시 시작">
            <RotateCcw size={16} />
            <span>처음으로</span>
          </button>
          
          <h1 className="header-title">초호기 기동 작전</h1>
          
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
          {isLanding ? (
            <div className="landing-layout animate-fade-up">
              <span className="landing-brand">UNIT 01</span>
              <h2 className="landing-title">초호기 기동 작전</h2>
              <p className="landing-subtitle">
                시방서 검증을 위한 개발팀의 연대기
              </p>
              
              <div className="visual-panel-container">
                <VisualPanel image="https://placehold.co/800x450/2b2724/f5f2eb?text=Operation+Cho-ho-gi" title="초호기 기동 작전" />
              </div>
              
              <p className="landing-description">
                쿠엔틴을 위시한 개발 리더십과 엘리샤, 아이리스, 라덱, 안티그래비티, 빅터의 초호기 기동 성공을 향한 여정. 
                시방서의 표준 규칙들이 과연 올바르게 동작할 것인가? 당신의 결정으로 초호기를 완전 구동하세요.
              </p>
              
              <button className="start-story-btn" onClick={() => { setIsLanding(false); }} style={{ display: 'flex', gap: '8px' }}>
                <Play size={18} />
                <span>이야기 시작하기</span>
              </button>
            </div>
          ) : (
            <>
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
                    <VisualPanel image={scene.image} title={scene.title} />

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
                    <VisualPanel image={scene.image} title={scene.title} />
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
            </>
          )}
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
