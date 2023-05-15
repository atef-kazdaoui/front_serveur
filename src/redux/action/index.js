//ajout produit dans panier 
export const addcart=(produit)=>{
    return {
        type:"ADDITEM",
        payload:produit
    }
}

//supprimer des produits du panier
export const deletcart=(produit)=>{
    return {
        type:"DELETEITEM",
        payload:produit
    }
}