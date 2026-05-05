import {BrowserRouter, Route, Routes} from 'react-router-dom'

export default function AppProtectedRoute(){
    return(
        <BrowserRouter>
            <Routes>
                {/**Publica */}
                <Route
                path="/login"
                element= {<Login onLogin={checkAuth}/>}
                />
                {/**Protegidas */}
                <Route/>
                {/**Default */}
                <Route/>
            </Routes>
        </BrowserRouter>
    );
}