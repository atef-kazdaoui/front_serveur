import React, { useState } from 'react';

function FilterGallery({ items }) {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('Soin visage')}>Soin visage</button>
        <button onClick={() => setFilter('Soin corps')}>Soin corps </button>
        <button onClick={() => setFilter('Soin cheveux')}>Soin cheveux </button>
      </div>
      <div>
        
        {filteredItems.map(item => (
            
          <img style={{width:"10cm"}} key={item.id} src={item.src} alt={item.title} />
        ))}
        <button>Ajouter au panier</button>
        
        
      </div>
    </div>
  );
}

export default FilterGallery;
