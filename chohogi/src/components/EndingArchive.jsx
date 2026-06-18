import React from 'react';
import { Lock, Unlock, X, Award } from 'lucide-react';

const ENDING_DETAILS = {
  'ending-a1': {
    title: "Ending A-1. 지상 귀환",
    hint: "강화 대기압 잠수 슈트를 기동하고 침수 구역을 수중 돌파하여 부력 탈출 포트를 사출하세요.",
    badge: "완벽 생존 엔딩",
    color: "#059669", // Jade Green
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=80&auto=format&fit=crop"
  },
  'ending-b1': {
    title: "Ending B-1. 기압 괴사",
    hint: "원격 콘솔을 연결해 무리하게 로봇 팔로 기압 문을 파괴하다 기벽 균열을 발생시키세요.",
    badge: "내폭 압쇄 엔딩",
    color: "#b22222", // Vivid Red
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=80&auto=format&fit=crop"
  },
  'ending-b2': {
    title: "Ending B-2. 심해의 요람",
    hint: "지열 우회 동선 격실로 직접 우회 진입하여 고온 가스를 마시고 발전 기어를 수동 연결하세요.",
    badge: "희생적 완수 엔딩",
    color: "#d97706", // Amber
    thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=80&auto=format&fit=crop"
  },
  'ending-b3': {
    title: "Ending B-3. 심해의 괴물",
    hint: "중앙 인공지능 리바이어던의 안전 프로토콜을 강제 포맷하여 외창 주변 보호막을 해제하세요.",
    badge: "미스터리 소멸 엔딩",
    color: "#7c3aed", // Purple
    thumbnail: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=80&auto=format&fit=crop"
  }
};

const EndingArchive = ({ unlockedEndings, onClose, onSelectEnding }) => {
  const totalEndings = Object.keys(ENDING_DETAILS).length;
  const unlockedCount = unlockedEndings.length;

  return (
    <div className="archive-overlay">
      <div className="archive-modal">
        <div className="archive-header">
          <div className="archive-progress">
            <Award className="progress-icon" />
            <span>초호기 기동수집록 ({unlockedCount}/{totalEndings})</span>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close archive">
            <X size={20} />
          </button>
        </div>

        <div className="archive-list">
          {Object.entries(ENDING_DETAILS).map(([id, details]) => {
            const isUnlocked = unlockedEndings.includes(id);
            return (
              <div
                key={id}
                className={`archive-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                style={isUnlocked ? { borderLeftColor: details.color } : {}}
              >
                {isUnlocked ? (
                  <>
                    <div className="archive-thumb-container">
                      <img src={details.thumbnail} alt={details.title} className="archive-thumb" />
                      <div className="unlock-badge">
                        <Unlock size={12} />
                        <span>해금됨</span>
                      </div>
                    </div>
                    <div className="archive-info">
                      <span className="badge-text" style={{ backgroundColor: details.color + '20', color: details.color }}>
                        {details.badge}
                      </span>
                      <h3>{details.title}</h3>
                      <button className="read-ending-btn" onClick={() => onSelectEnding(id)}>
                        결말 읽기
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="archive-thumb-container locked-thumb">
                      <div className="lock-icon-wrapper">
                        <Lock size={24} />
                      </div>
                    </div>
                    <div className="archive-info">
                      <span className="badge-text locked-badge">
                        비밀 결말
                      </span>
                      <h3>??? (비밀 결말)</h3>
                      <p className="hint-text">
                        <strong>단서:</strong> {details.hint}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EndingArchive;
