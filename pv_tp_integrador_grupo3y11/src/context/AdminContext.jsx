import { createContext,useContext,useEffect,useState } from "react";
//import { jsx } from "react/jsx-runtime";
//creacion del contexto global para manejar la secion del administrador
const AdminContext=createContext();

export const AdminProvider=({children})=>{
    //estado global del admin
    //inicializa leyendo localStorage para mantener la secion al recargar (f5)
    const[admin,setAdmin]=useState(()=>{
        const adminGuardado=localStorage.getItem("admin");
        let adminInicial;
        if(adminGuardado){
            adminInicial=JSON.parse(adminGuardado)
        }else{
            adminInicial=null;
        }
        return adminInicial;
    });
    //funcion para iniciar sesion
    //guarda los datos del administrador en el estado global
    const login=(datosAdmin)=>{
        setAdmin(datosAdmin);
    };
     // Función para cerrar sesión
     // Limpia localStorage y resetea el estado global
    const logout=()=>{
        localStorage.removeItem("admin")
        setAdmin(null);
     };
    // Cada vez que cambia el admin, se guarda en localStorage
    useEffect(()=>{
      if (admin){
        localStorage.setItem(
            "admin",
            JSON.stringify(admin)
        );
    }
    },[admin]);
    return(
       <AdminContext.Provider
         value={{
         admin,
         login,
         logout
        }}
        >{children}
       </AdminContext.Provider>
);
};

export const useAdmin=()=>{
    return useContext(AdminContext);
};