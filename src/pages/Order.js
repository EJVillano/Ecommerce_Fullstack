import { useEffect, useState, useContext } from 'react';

import UserOrder from '../components/UserOrder';
import AdminOrder from '../components/AdminOrder';
import UserContext from '../UserContext';

export default function Order(){

  const { user } = useContext(UserContext);




		return(
            <>	
                {
                    (user.isAdmin === true) ?

                        <AdminOrder/>
                        :
						<>
                        	<UserOrder />
						</>
                }
            </>
        )
}