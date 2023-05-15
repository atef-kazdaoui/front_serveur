const cart=[];
const handleCart= (state=cart,action)=>{
const produit=action.paload;
switch(action.type){
    case ADDITEM:
        //verifier si le produit existe
        const exist = state.find((x)=>x.id===produit.id);
        if(exist){
            return state.map((x)=>x.id===produit.id ?{...x,qty: x.qty + 1}:x)
        }else{
            const produit=action.payload;
            return {
                ...state,{
                    ...produit,
                    ...qty:1,

                }
                

            }
        }
        break;
case "DELETEITEM":
    const exist1=state.find((x)=>x.id === product.id)
    if (exist1.qty === 1){
        return state.filter((x)=>x.id !== exist1.id)
    }else{
        return state.map((x)=>{
            x.id === produit.id ? {...x,qty:x.qty-1}:x
        })
    }
        default break;
    }
}

export default handleCart;