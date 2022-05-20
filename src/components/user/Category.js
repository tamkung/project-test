import React from 'react'
import { ThesisType } from "../user/ThesisType";
function Category() {
    return (
        <div className='default-bg'>
            <div className='flexbox'>
                <div >
                    {ThesisType.map((item, idex) => {
                        return (
                            <div type='button' key={idex}>
                                <div className='itemflex' onClick={()=> window.location.href=(item.path)}>
                                    {item.icons}
                                    {item.title}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default Category