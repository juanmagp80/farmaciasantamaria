import React, { useEffect } from 'react';

const GoogleReviewsWidget: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.setAttribute('data-use-service-core', '');
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className="elfsight-app-5154ee20-02b9-4cab-917c-6da598b18266" data-elfsight-app-lazy></div>
        </div>
    );
};

export default GoogleReviewsWidget;