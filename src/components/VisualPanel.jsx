import React, { useState, useEffect } from 'react';

const VisualPanel = ({ image, title }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [image]);

  return (
    <div className="visual-panel-container">
      {loading && <div className="skeleton-loader" />}
      <img
        key={image} // Force animation reset on image change
        src={image}
        alt={title}
        className={`storyboard-img ${loading ? 'hidden' : 'zoom-animation'}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          e.target.src = 'https://placehold.co/800x600/2b2724/f5f2eb?text=' + encodeURIComponent(title);
        }}
      />
    </div>
  );
};

export default VisualPanel;
