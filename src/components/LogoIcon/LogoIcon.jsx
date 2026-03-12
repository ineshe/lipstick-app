import logoImage from '../../assets/logo-ovue-text-hori.webp';

const LogoIcon = ({ width = 'auto', height = 50, color = "currentColor", ...props }) => {
  return (
    <div
      style={{
        width,
        height,
        aspectRatio: width === 'auto' ? '2352 / 840' : undefined, // match your image's aspect ratio
        maskMode: 'luminance',
        backgroundColor: color,
        maskImage: `url(${logoImage})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${logoImage})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
      {...props}
    />
  );
};

export default LogoIcon