import React from "react"
import Login from "../pages/Login/Login"
import Banks from "../pages/Banks/Banks"
import Calculator from "../pages/Calculator/Calculator"

export interface IRoute {
    path: string;
    element: React.FunctionComponent;
}

export enum RouteNames {
    LOGIN = '/login',
    BANKS = '/banks',
    CALCULATOR = '/calculator'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login}
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.BANKS, element: Banks},
    { path: RouteNames.CALCULATOR, element: Calculator}
]