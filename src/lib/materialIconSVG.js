import svgObjects from '../style/icons/material-design-icons/iconListObj';

const allowedTypes = [
  'action',
  'alert',
  'av',
  'communication',
  'content',
  'device',
  'editor',
  'maps',
  'file',
  'hardware',
  'image',
  'maps',
  'navigation',
  'notification',
  'places',
  'social',
  'toggle'
];

const allowedSize = [
  'small',
  'large'
];

/**
 * Returns Inline SVG for given iconName and type
 * @param iconName {string} name of icon required
 * @param type {string=maps} Type of icon
 * @param size {string=small} Size of SVG icon required
 * @param color {string} Hex code for the fill Color
 * @returns Inline SVG for the given icon or null
 */
function getSVG(iconName, type, size, color) {
  console.log('Getting svg...', iconName, type, size);
  if (!iconName) {
    return null;
  }
  size = size || 'small';
  type = type || 'maps';
  if (allowedSize.indexOf(size) === -1) {
    return null;
  }
  if (allowedTypes.indexOf(type) === -1) {
    return null;
  }
  const iconSize = size === 'small' ? '24px' : '48px';
  const iconPath = `material-design-icons/${type}/svg/production/ic_${iconName}_${iconSize}.svg`;
  const foundSvg = svgObjects.find(iconObj => iconObj.name === iconPath)
  if (!foundSvg) {
    console.log('Not found', iconPath);
    return
  }
  const iconObj = {
    url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(foundSvg.svg),
    strokeColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 1,
    scale: 10,
    fill: '#ff0000',
    fillOpacity: 0.5
  }
  return iconObj;
}

export {getSVG};
export {allowedTypes};
export {allowedSize};

export default {
  getSVG,
  allowedSize,
  allowedTypes
};
