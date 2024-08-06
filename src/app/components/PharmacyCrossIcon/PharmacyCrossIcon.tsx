
interface PharmacyCrossIconProps {
    className?: string;
    style?: React.CSSProperties;
}

const PharmacyCrossIcon: React.FC<PharmacyCrossIconProps> = ({ className, style }) => {
    return (
        <div className={className} style={style}>
            {/* Reemplaza el siguiente contenido con el SVG o la imagen de la cruz */}
            <img src="/farmacia.png" alt="Pharmacy Cross Icon" width={64} />
        </div>
    );
};

export default PharmacyCrossIcon;
