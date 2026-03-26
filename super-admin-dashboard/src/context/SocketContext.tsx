import { createContext, useContext } from "react"
import socket from "../config/soket"

const SocketContext = createContext(socket)

export const useSocket = () => useContext(SocketContext)

export default SocketContext
