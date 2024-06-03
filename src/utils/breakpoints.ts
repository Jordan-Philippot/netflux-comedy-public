export enum size {
  mobile = "576px",
  tablet = "768px",
  laptop = "992px",
  laptopL = "1200px",
  desktop = "1800px",
}
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};
