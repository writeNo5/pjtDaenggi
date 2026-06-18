import React from 'react';
import { Lock, Unlock, X, Award } from 'lucide-react';

const ENDING_DETAILS = {
  'ending-a1': {
    title: "Ending A-1. 평화로운 황혼의 안가",
    hint: "순사의 삼엄한 불심검문을 의연하고 지혜롭게 대담한 위장으로 무사히 대처하여 통과하세요.",
    badge: "정석 임무 완수 결말",
    color: "#059669", // Jade Green
    thumbnail: "/images/ending_a1.png"
  },
  'ending-b1': {
    title: "Ending B-1. 저격수의 붉은 탄환",
    hint: "사냥개 시게루의 경계 속에서 기밀문서와 돌멩이를 바꿔치기한 후, 산포수 백 아저씨의 초소를 찾아 달려가세요.",
    badge: "동맹 및 저격 연대 결말",
    color: "#3b82f6", // Blue
    thumbnail: "/images/ending_b1.png"
  },
  'ending-b2': {
    title: "Ending B-2. 어둠이 덮친 오두막",
    hint: "시게루의 그럴듯한 신사 가식에 눈이 가려 속은 채 할머니의 골짜기 위치를 상세히 알려주고 침상으로 다가가세요.",
    badge: "밀정 함정 체포 결말",
    color: "#4b5563", // Gray
    thumbnail: "/images/ending_b2.png"
  },
  'ending-b3': {
    title: "Ending B-3. 벼랑 끝의 응징",
    hint: "가방 속 강돌을 시게루에게 탈탈 빼앗긴 후, 안개비 내린 위태로운 벼랑 끝으로 도망쳐 직접 댕기로 덫을 놓아 유인하세요.",
    badge: "주체적 자력 처단 결말",
    color: "#b22222", // Vivid Red
    thumbnail: "/images/ending_b3.png"
  },
  'ending-c1': {
    title: "Ending C-1. 숲의 비밀과 새로운 동지",
    hint: "순사의 위협을 피해 험악한 숲속 안갯길 절벽 비탈길 또는 계곡 가시덤불 깊은 곳으로 무모하게 도망쳐 숨어 보세요.",
    badge: "만주 청년 독립군 결말",
    color: "#8b5cf6", // Purple
    thumbnail: "/images/ending_c1.png"
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
            <span>조국의 봄 기밀수집록 ({unlockedCount}/{totalEndings})</span>
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
