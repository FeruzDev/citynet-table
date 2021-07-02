import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-4 offset-4 my-5 text-center">
                        <img src="/404.png" alt="" className='w-100'/>

                        <h4 className="mt-5">Страница не найдена !</h4>

                        <Link to='/'>Перейти на главную страницу</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;