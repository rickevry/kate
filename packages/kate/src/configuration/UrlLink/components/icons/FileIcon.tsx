import React from 'react';

// const buildIconUrl = (fileName: string): string => {
//   if (!fileName) return '';

//   fileName = fileName.toLowerCase();
//   const lastDot = fileName.lastIndexOf('.');
//   if (lastDot === -1 || fileName.length - lastDot > 5) {
//     return 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/20/folder.svg?v6';
//   }

//   let docType = fileName.substring(fileName.lastIndexOf('.') + 1);

//   if (docType === 'doc') docType = 'docx';
//   if (docType === 'ppt') docType = 'pptx';
//   if (docType === 'xls') docType = 'xlsx';
//   if (docType === 'xlsm') docType = 'xlsx';

//   if (docType === 'aspx')
//     return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/spo.png';
//   if (docType === 'mht')
//     return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/html.png';
//   if (docType === 'pdf')
//     return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/pdf.png';

//   return `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`;
// };

export const UrlIcon = () => {
  return (
    <img
      alt="url"
      style={{ width: '1em', height: '1em' }}
      src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20220628.003/assets/item-types/20/link.svg"
    />
  );
};
