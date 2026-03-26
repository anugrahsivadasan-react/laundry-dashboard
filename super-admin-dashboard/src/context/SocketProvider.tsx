import { useEffect } from "react"
import SocketContext from "./SocketContext"
import { useAppSelector } from "../redux/hooks"
import socket from "../config/soket"

export default function SocketProvider({ children }: any) {
  const user = useAppSelector((state) => state.auth.user)
  console.log(user)
  useEffect(() => {
    if (!user?.id) return

    console.log("Socket connecting...")

    if (!socket.connected) {
      socket.connect()
    }
    const handleConnect = () => {
      console.log("Socket connected:", socket.id)

      socket.emit("join", {
        userId: user.id,
        role: user.role,
      })
    }
    socket.on("connect", handleConnect)

    return () => {
      socket.off("connect", handleConnect)
    }
    // socket.on("connect", () => {
    //   console.log("Socket connected:", socket.id)

    //   // join personal room
    //   socket.emit("join", { userId: user?.id, role: user?.role })
    // })

    // cleanup only on logout / app destroy
    // return () => {
    //   socket.disconnect()
    //   console.log("Socket disconnected")
    // }
  }, [user?.id])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
