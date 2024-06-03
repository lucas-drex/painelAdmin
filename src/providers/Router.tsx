import React from 'react';
import Home from '../pages/index';

interface IRouterContext {
    componentRoute: React.ReactNode
    to: (component: React.ReactNode) => void
    modalComponent: React.ReactNode | null
    modal: (component: React.ReactNode) => void;

    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    route: string
    setRoute: React.Dispatch<React.SetStateAction<string>>
}

const RouterContext = React.createContext<IRouterContext>({} as IRouterContext);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
    const [componentRoute, setComponentRoute] = React.useState<React.ReactNode>(<Home />);
    const [modalComponent, setModalComponent] = React.useState<React.ReactNode | null>(null);
    
    const [title, setTitle] = React.useState<string>('');
    const [route, setRoute] = React.useState<string>('/');

    const to = (component: React.ReactNode) => {
        setComponentRoute(component);
    }

    const modal = (component: React.ReactNode) => {
        setModalComponent(component);
        
    }

    return (
        <RouterContext.Provider value={{ componentRoute, to, title, setTitle, route, setRoute, modalComponent, modal }}>
            {children}
        </RouterContext.Provider>
    )
}

export const useRouter = () => React.useContext(RouterContext)