import { Redirect, Route } from "react-router"



export const ProtectedRoute = ({component: Component, ...props}) => {

            return(
                <Route>
                    {() => props.loggedIn ? <Component {...props} /> : <Redirect to="/login" />}
                </Route>
            )
        }