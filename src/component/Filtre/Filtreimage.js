import React from 'react';
import FilterGallery from './FilterGallery';

const App = () => {
  const items = [
    { id: 1, src: 'https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwfac0587b/images/hi-res/SKU/SKU_1330/461812_swatch.jpg?sw=585&sh=585&sm=fit', title: 'Image 1', category: 'Soin visage' },
    { id: 2, src: 'https://www.sephora.fr/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwa0609fbe/images/hi-res/SKU/SKU_2395/560832_swatch.jpg', title: 'Image 2', category: 'Soin cheveux' },
    { id: 3, src: 'https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw53311056/images/hi-res/SKU/SKU_3783/547656_swatch.jpg?sw=585&sh=585&sm=fit', title: 'Image 3', category: 'Soin corps' },
    
  ];

  return <div style={{ width: '90vw', height: '300px'}}> <FilterGallery items={items} /> </div>;
};

export default App;
