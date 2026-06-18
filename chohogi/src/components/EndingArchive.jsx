import React from 'react';
import { Lock, Unlock, X, Award } from 'lucide-react';

const ENDING_DETAILS = {
  'ending-a1': {
    title: "Ending A-1. 초호기 프로젝트 완벽 기동",
    hint: "시방서 순서대로 빌드 검증을 거친 후 빅터에게 최종 검수를 요청하여 무사히 런칭을 성공시키세요.",
    badge: "완벽 기동 해피엔딩",
    color: "#059669", // Jade Green
    thumbnail: "https://placehold.co/80x80/059669/ffffff?text=A-1"
  },
  'ending-b1': {
    title: "Ending B-1. 대혼란의 버그 폭풍",
    hint: "시방서 검토나 QA 검수 단계 없이 조급하게 프로덕션 배포를 감행해 보세요.",
    badge: "시스템 크래시 엔딩",
    color: "#b22222", // Vivid Red
    thumbnail: "https://placehold.co/80x80/b22222/ffffff?text=B-1"
  },
  'ending-b2': {
    title: "Ending B-2. 적막속의 침묵 작전",
    hint: "사운드 연출을 배제하고 라덱의 사운드 합성을 거부하여 조용한 분위기 속에서 이야기를 끝마치세요.",
    badge: "조용한 침묵 엔딩",
    color: "#4b5563", // Gray
    thumbnail: "https://placehold.co/80x80/4b5563/ffffff?text=B-2"
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
