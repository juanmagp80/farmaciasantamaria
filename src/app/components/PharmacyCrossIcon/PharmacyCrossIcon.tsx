// components/PharmacyCrossIcon/PharmacyCrossIcon.tsx
import React from 'react';

interface PharmacyCrossIconProps {
    className?: string;
    style?: React.CSSProperties;
}

const PharmacyCrossIcon: React.FC<PharmacyCrossIconProps> = ({ className }) => {
    return (
        <img
            src="/farmacia.png"
            width={48}
            alt="Pharmacy Cross"
            className={className}
        />
    );
};

export default PharmacyCrossIcon;
